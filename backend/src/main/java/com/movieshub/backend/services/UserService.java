package com.movieshub.backend.services;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.movieshub.backend.dtos.LoginRequest;
import com.movieshub.backend.dtos.SignupRequest;
import com.movieshub.backend.models.User;
import com.movieshub.backend.repositories.UserRepository;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private OtpService otpService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private AuthenticationManager authenticationManager; // Inject AuthenticationManager

    // This map will temporarily store user data before OTP verification
    // Key: email, Value: User object (with encoded password)
    private final java.util.Map<String, User> pendingUsers = new java.util.HashMap<>();

    // Method to handle initial signup request (send OTP)
    @Transactional
    public void registerUser(SignupRequest request) {
        // 1. Basic validation (already done by @Valid in controller, but good to have service-level too)
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new IllegalArgumentException("Passwords do not match.");
        }
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already registered.");
        }
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new IllegalArgumentException("Username already taken.");
        }

        // 2. Encode password
        String encodedPassword = bCryptPasswordEncoder.encode(request.getPassword());

        // 3. Create a User object but DO NOT save it to DB yet
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(encodedPassword);
        user.setEnabled(false); // User is not enabled until OTP verification

        // 4. Store user data temporarily in pendingUsers map
        // If an entry for this email already exists (e.g., re-requesting OTP), update it
        pendingUsers.put(request.getEmail(), user);

        // 5. Generate and send OTP
        String otp = otpService.generateOtp(request.getEmail());
        emailService.sendOtpEmail(request.getEmail(), otp);
    }

    /**
     * Sends (or re-sends) an OTP to an email address only if a signup
     * process has already been initiated for that email.
     * This prevents arbitrary OTP requests for non-existent pending signups.
     * @param email The email address to send OTP to.
     * @throws IllegalArgumentException if no pending signup exists for the email.
     */
    public void requestOtpForPendingSignup(String email) {
        // Check if there's a pending user for this email
        if (!pendingUsers.containsKey(email)) {
            throw new IllegalArgumentException("No pending signup found for this email. Please initiate registration first.");
        }

        // Generate and send OTP
        String otp = otpService.generateOtp(email);
        emailService.sendOtpEmail(email, otp);
    }


    // Method to verify OTP and save user
    @Transactional
    public User verifyAndSaveUser(String email, String otp) {
        // 1. Validate OTP
        boolean isValidOtp = otpService.validateOtp(email, otp);

        if (!isValidOtp) {
            throw new IllegalArgumentException("Invalid or expired OTP.");
        }

        // 2. Retrieve user from pendingUsers
        User userToSave = pendingUsers.remove(email); // Remove from pending after successful verification

        if (userToSave == null) {
            throw new IllegalArgumentException("No pending signup found for this email. Please register first.");
        }

        // 3. Enable the user
        userToSave.setEnabled(true);

        // 4. Save user to database
        return userRepository.save(userToSave);
    }

    /**
     * Authenticates a user based on provided identifier (username or email) and password.
     * @param loginRequest DTO containing identifier and password.
     * @return The authenticated User entity.
     * @throws AuthenticationException if authentication fails.
     */
    public User loginUser(LoginRequest loginRequest) {
        try {
            // Create an authentication token with the provided identifier and password
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getIdentifier(), loginRequest.getPassword())
            );
            // Set the authenticated object in the SecurityContext (optional, but good practice for session-based auth)
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Retrieve the user from the database based on the identifier used for login
            // The identifier could be either username or email.
            // We use the same logic as UserDetailsService to find the actual user.
            return userRepository.findByEmail(loginRequest.getIdentifier())
                    .or(() -> userRepository.findByUsername(loginRequest.getIdentifier()))
                    .orElseThrow(() -> new UsernameNotFoundException("User not found after successful authentication. This should not happen."));

        } catch (AuthenticationException e) {
            // Catch specific authentication exceptions and re-throw with a generic message
            throw new IllegalArgumentException("Invalid credentials or account not verified.");
        }
    }


    // Optional: Get user by email (e.g., for login or profile lookup)
    public Optional<User> findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}