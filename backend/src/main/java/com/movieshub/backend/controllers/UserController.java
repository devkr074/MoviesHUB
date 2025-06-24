package com.movieshub.backend.controllers;
// UserController.java
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.movieshub.backend.services.UserService;

import java.util.HashMap;
import java.util.Map;

/**
 * REST Controller for User-related operations, including signup and OTP management.
 */
@RestController // Marks this class as a REST controller
@RequestMapping("/api/users") // Base path for all endpoints in this controller
@CrossOrigin(origins = "http://localhost:5173") // Allowing requests from your React frontend
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Endpoint to send a verification OTP to the specified email.
     *
     * @param request A map containing the "email" field.
     * @return ResponseEntity indicating success or failure.
     */
    @PostMapping("/send-otp")
    public ResponseEntity<Map<String, String>> sendOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        Map<String, String> response = new HashMap<>();

        if (email == null || email.trim().isEmpty()) {
            response.put("message", "Email is required.");
            return ResponseEntity.badRequest().body(response);
        }

        // The userService.sendOtp returns an int: 0 for success, 1 for cooldown, 2 for user exists
        int result = userService.sendOtp(email);
        if (result == 0) { // OTP sent successfully
            response.put("message", "Verification code sent to your email.");
            return ResponseEntity.ok(response);
        } else if (result == 1) { // Cooldown active
            response.put("message", "Please wait before requesting another OTP.");
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body(response); // 429 Too Many Requests
        } else if (result == 2) { // User already exists
            response.put("message", "A user with this email already exists. Please try logging in or using a different email.");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response); // 409 Conflict
        } else { // Generic error
            response.put("message", "Unable to send OTP. Please try again later.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response); // 500 Internal Server Error
        }
    }

    /**
     * Endpoint for user registration (signup) with OTP verification.
     *
     * @param request A map containing "email", "password", and "otp" fields.
     * @return ResponseEntity indicating success or failure of registration.
     */
    @PostMapping("/signup")
    public ResponseEntity<Map<String, String>> signup(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");
        String otp = request.get("otp");
        Map<String, String> response = new HashMap<>();

        if (email == null || email.trim().isEmpty() ||
            password == null || password.trim().isEmpty() ||
            otp == null || otp.trim().isEmpty()) {
            response.put("message", "All fields (email, password, otp) are required.");
            return ResponseEntity.badRequest().body(response);
        }

        // Validate password length on backend as well, matching frontend
        if (password.length() < 8) {
            response.put("message", "Password must be at least 8 characters long.");
            return ResponseEntity.badRequest().body(response);
        }

        // Corrected: userService.registerUser now returns an int status code
        int registrationResult = userService.registerUser(email, password, otp);

        if (registrationResult == 0) { // Success
            // If you need the registered user's details (like ID or email)
            // you'd typically fetch it here after successful registration,
            // or modify registerUser to return a custom object containing status and user details.
            response.put("message", "User registered successfully!");
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } else if (registrationResult == 1) { // OTP invalid or expired
            response.put("message", "Registration failed: Invalid or expired OTP. Please request a new one.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } else if (registrationResult == 2) { // User already exists
            response.put("message", "Registration failed: A user with this email already exists.");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response); // 409 Conflict
        } else { // Generic error (registrationResult == 3)
            response.put("message", "Registration failed due to an internal server error. Please try again.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response); // 500 Internal Server Error
        }
    }
}
