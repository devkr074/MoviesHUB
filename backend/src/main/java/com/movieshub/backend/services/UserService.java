package com.movieshub.backend.services;
import org.springframework.stereotype.Service;

import com.movieshub.backend.models.OtpDetails;
import com.movieshub.backend.models.User;
import com.movieshub.backend.repositories.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder; // Necessary for password hashing

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Service class for managing User-related business logic, including OTP generation and validation,
 * and user registration and login.
 */
@Service
public class UserService {

    private final UserRepository userRepository;
    private final EmailService emailService;
    private final ConcurrentHashMap<String, OtpDetails> otpStore = new ConcurrentHashMap<>();
    private final PasswordEncoder passwordEncoder;
    public UserService(UserRepository userRepository, EmailService emailService, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.emailService = emailService;
        this.passwordEncoder = passwordEncoder; // Initialize PasswordEncoder
    }

    /**
     * Registers a new user after validating OTP.
     *
     * @param email The user's email.
     * @param password The user's plain text password.
     * @param otp The OTP provided by the user.
     * @return 0 for successful registration.
     * 1 if OTP validation fails (invalid or expired).
     * 2 if a user with the email already exists.
     * 3 for other errors during user saving.
     */
    public int registerUser(String email, String password, String otp) {
        // 1. Check if user with this email already exists
        if (userRepository.findByEmail(email).isPresent()) {
            System.out.println("Registration failed: User with email " + email + " already exists.");
            return 2; // User already exists
        }

        // 2. Validate OTP
        if (!validateOtp(email, otp)) {
            System.out.println("Registration failed: OTP validation failed for email: " + email);
            return 1; // OTP is invalid or expired
        }

        // 3. Create new user entity
        User newUser = new User();
        newUser.setEmail(email);
        newUser.setPassword(passwordEncoder.encode(password)); // Hash the password before saving

        // 4. Save user to database
        try {
            userRepository.save(newUser);
            otpStore.remove(email); // Clear OTP after successful registration
            System.out.println("User registered successfully: " + email);
            return 0; // Success
        } catch (Exception e) {
            System.err.println("Error saving user during registration for email " + email + ": " + e.getMessage());
            return 3; // Other error during saving
        }
    }

    /**
     * Authenticates a user based on their email and password.
     *
     * @param email The user's email.
     * @param password The plain text password provided by the user.
     * @return 0 for successful login.
     * 1 if password mismatch.
     * 2 if user not found.
     */
    public int loginUser(String email, String password) {
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            System.out.println("Login failed: User not found with email: " + email);
            return 2; // User not found
        }

        User user = userOptional.get();
        // Compare the provided plain password with the stored hashed password
        if (passwordEncoder.matches(password, user.getPassword())) {
            System.out.println("Login successful for user: " + email);
            return 0; // Success
        } else {
            System.out.println("Login failed: Invalid password for user: " + email);
            return 1; // Password mismatch
        }
    }

    /**
     * Sends an OTP to the given email address.
     * Implements a cooldown period for sending subsequent OTPs.
     * Checks if a user with the given email already exists before sending OTP.
     *
     * @param email The email address to send the OTP to.
     * @return 0 if OTP was sent successfully, 1 if cooldown is active, 2 if user already exists.
     */
    public int sendOtp(String email) {
        // Check if user with this email already exists
        if (userRepository.findByEmail(email).isPresent()) {
            System.out.println("User with email " + email + " already exists. Not sending OTP.");
            return 2; // User already exists
        }

        // Check cooldown for resending OTP
        OtpDetails existingOtp = otpStore.get(email);
        if (existingOtp != null && !existingOtp.canResend()) {
            System.out.println("OTP resend cooldown active for email: " + email);
            return 1; // Cannot resend yet
        }

        // Generate a 6-digit OTP
        String otp = String.format("%06d", new Random().nextInt(999999));
        // OTP valid for 2 minutes
        LocalDateTime expiryTime = LocalDateTime.now().plusMinutes(2);
        // Resend available after 1 minute
        LocalDateTime nextResendTime = LocalDateTime.now().plusMinutes(1);

        OtpDetails newOtpDetails = new OtpDetails(otp, expiryTime, nextResendTime);
        otpStore.put(email, newOtpDetails);

        emailService.sendOtpEmail(email, otp);
        System.out.println("OTP sent to " + email + ": " + otp);
        return 0; // OTP sent successfully
    }

    /**
     * Validates the provided OTP for a given email.
     *
     * @param email The email address associated with the OTP.
     * @param otp The OTP to validate.
     * @return true if the OTP is valid and not expired, false otherwise.
     */
    public boolean validateOtp(String email, String otp) {
        OtpDetails storedOtp = otpStore.get(email);

        if (storedOtp == null) {
            System.out.println("No OTP found for email: " + email);
            return false; // No OTP sent or already validated
        }

        if (!storedOtp.isValid()) {
            System.out.println("OTP expired for email: " + email);
            otpStore.remove(email); // Remove expired OTP
            return false; // OTP has expired
        }

        if (!storedOtp.getOtp().equals(otp)) {
            System.out.println("Invalid OTP for email: " + email);
            return false; // OTP mismatch
        }

        // OTP is valid
        // otpStore.remove(email); // Optional: Remove OTP immediately after successful validation if single-use
        return true;
    }
}
