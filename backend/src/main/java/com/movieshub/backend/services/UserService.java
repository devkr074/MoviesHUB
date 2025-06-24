package com.movieshub.backend.services;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.movieshub.backend.models.User;
import com.movieshub.backend.repositories.UserRepository;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Checks if a user with the given username already exists.
     * @param username The username to check.
     * @return true if the username exists, false otherwise.
     */
    public boolean userExistsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    /**
     * Checks if a user with the given email already exists.
     * @param email The email to check.
     * @return true if the email exists, false otherwise.
     */
    public boolean userExistsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    /**
     * Registers a new user. Password will be encoded before saving.
     * This method is called ONLY after OTP verification.
     * @param user The user object to save.
     * @return The saved user object.
     */
    @Transactional
    public User registerUser(User user) {
        // Encode the password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    /**
     * Finds a user by email.
     * @param email The email of the user to find.
     * @return An Optional containing the User if found, or empty.
     */
    public Optional<User> findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    /**
     * Authenticates a user by username or email and password.
     * @param identifier The username or email of the user.
     * @param rawPassword The raw password provided by the user.
     * @return An Optional containing the authenticated User if credentials are valid, or empty otherwise.
     */
    public Optional<User> authenticateUser(String identifier, String rawPassword) {
        // Try to find by username first
        Optional<User> userOptional = userRepository.findByUsername(identifier);

        // If not found by username, try by email
        if (userOptional.isEmpty()) {
            userOptional = userRepository.findByEmail(identifier);
        }

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            // Compare the raw password with the encoded password using PasswordEncoder
            if (passwordEncoder.matches(rawPassword, user.getPassword())) {
                return Optional.of(user); // Authentication successful
            }
        }
        return Optional.empty(); // Authentication failed
    }
}
