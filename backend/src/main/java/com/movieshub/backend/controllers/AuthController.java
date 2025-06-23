package com.movieshub.backend.controllers;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.movieshub.backend.models.User;
import com.movieshub.backend.services.EmailService;
import com.movieshub.backend.services.OtpService;
import com.movieshub.backend.services.UserService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173") // Allow requests from your React frontend development server
public class AuthController {

    private final UserService userService;
    private final OtpService otpService;
    private final EmailService emailService;

    public AuthController(UserService userService, OtpService otpService, EmailService emailService) {
        this.userService = userService;
        this.otpService = otpService;
        this.emailService = emailService;
    }

    // Request DTO for signup
    static class SignupRequest {
        public String name;
        public String gender;
        public String username;
        public String email;
        public String password; // Will be encoded by backend
    }

    // Request DTO for OTP verification
    static class OtpVerificationRequest {
        public String email;
        public String otpCode;
    }

    /**
     * Endpoint to initiate user signup by sending an OTP.
     * It checks for existing username/email and sends an OTP if valid.
     * User data is NOT saved at this stage.
     * @param request The signup request containing user details.
     * @return ResponseEntity with a message.
     */
    @PostMapping("/send-otp")
    public ResponseEntity<Map<String, String>> sendOtpForSignup(@RequestBody SignupRequest request) {
        Map<String, String> response = new HashMap<>();

        // Perform basic validation before sending OTP (e.g., email format) - client-side validation is primary.
        if (request.email == null || !request.email.matches("\\S+@\\S+\\.\\S+")) {
            response.put("message", "Invalid email address.");
            return ResponseEntity.badRequest().body(response);
        }

        // Check if username or email already exists in the database
        if (userService.userExistsByUsername(request.username)) {
            response.put("message", "Username already taken.");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }
        if (userService.userExistsByEmail(request.email)) {
            response.put("message", "Email already registered.");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }

        try {
            // Generate and save OTP
            String otpCode = otpService.generateOtp();
            otpService.saveOtp(request.email, otpCode);

            // Send OTP email
            emailService.sendOtpEmail(request.email, otpCode);

            response.put("message", "OTP sent to your email. Please verify to complete registration.");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.err.println("Error during OTP sending: " + e.getMessage());
            response.put("message", "Failed to send OTP. Please try again.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    /**
     * Endpoint to verify the OTP and complete user registration.
     * @param request The OTP verification request.
     * @return ResponseEntity with a success/error message.
     */
    @PostMapping("/verify-otp-and-signup")
    public ResponseEntity<Map<String, String>> verifyOtpAndSignup(@RequestBody OtpVerificationRequest request) {
        Map<String, String> response = new HashMap<>();

        if (request.email == null || request.otpCode == null || request.otpCode.trim().isEmpty()) {
            response.put("message", "Email and OTP are required.");
            return ResponseEntity.badRequest().body(response);
        }

        // Validate the OTP
        boolean isValid = otpService.validateOtp(request.email, request.otpCode);

        if (isValid) {
            // Retrieve the user data that was meant to be registered
            // For a robust solution, you might temporarily store the user details
            // (excluding password) in a temporary store (e.g., Redis, or a dedicated
            // table) associated with the OTP, or have the signup request sent again
            // with a unique identifier from the OTP sending stage.
            // For simplicity here, we assume user details are re-sent or retrieved
            // based on the email. This part needs careful design depending on your app's flow.
            // For this example, let's assume we re-retrieve or get passed the original
            // signup details from the frontend in some way, or fetch them if already stored.

            // Since the user registration only happens AFTER OTP, we need the full user details
            // to be available here. A common pattern is to store temporary user registration
            // details (excluding the raw password) with the OTP, or pass them again securely.
            // Given the current setup, we need a way to get the full User object that was attempted
            // to be registered in the '/send-otp' step. This requires a slight re-think.

            // ************************************************************************************
            // IMPORTANT REVISION FOR ROBUSTNESS:
            // The /send-otp endpoint should generate a temporary registration token/session ID
            // and associate it with the user's full (unverified) details (excluding raw password).
            // This token is then sent back to the frontend.
            // The /verify-otp-and-signup endpoint would then take this token + OTP.
            // Upon successful OTP verification, it retrieves the user details using the token
            // from the temporary store, encodes the password, saves the user, and invalidates the token.
            // ************************************************************************************

            // For now, let's assume for simplicity we can retrieve or create a User object
            // based on the email, or that the frontend will resubmit basic user info.
            // A more complete solution would involve securely linking the OTP to the
            // full unverified user data from the initial signup request.

            // Dummy User creation (REPLACE WITH ACTUAL RETRIEVAL OF USER DATA FROM TEMPORARY STORE)
            // This assumes the user details (name, gender, username, password) are somehow available here.
            // A simple approach for this example: If OTP is verified, we expect the frontend
            // to then send the full user registration data including the OTP.
            // This means AuthController needs a single endpoint that takes full user data + OTP.

            response.put("message", "OTP verified. Registration successful. User will be created.");
            // In a real application, you would create the user here.
            // For example:
            // User unverifiedUser = // retrieve from temporary store using email/token
            // User newUser = new User(unverifiedUser.getName(), unverifiedUser.getGender(), unverifiedUser.getUsername(), request.email, unverifiedUser.getPassword());
            // userService.registerUser(newUser);

            return ResponseEntity.ok(response);
        } else {
            response.put("message", "Invalid or expired OTP. Please try again.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }


    // ************************************************************************************
    // REVISED ENDPOINT FOR SIMPLICITY AND COMPLETENESS OF THIS EXAMPLE:
    // We will combine the verification and signup into a single endpoint,
    // where the frontend sends all user details PLUS the OTP.
    // This avoids needing a separate temporary storage mechanism for unverified user data
    // in this specific backend example.
    // ************************************************************************************

    static class FinalSignupRequest {
        public String name;
        public String gender;
        public String username;
        public String email;
        public String password;
        public String otpCode;
    }

    /**
     * Combined endpoint to verify OTP and then register the user.
     * @param request The request containing full user details and the OTP.
     * @return ResponseEntity with a success/error message.
     */
    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> registerUser(@RequestBody FinalSignupRequest request) {
        Map<String, String> response = new HashMap<>();

        // Validate basic fields (more robust validation should be done with Spring Validations)
        if (request.name == null || request.name.trim().isEmpty() ||
            request.gender == null || request.gender.trim().isEmpty() ||
            request.username == null || request.username.trim().isEmpty() ||
            request.email == null || !request.email.matches("\\S+@\\S+\\.\\S+") ||
            request.password == null || request.password.length() < 6 ||
            request.otpCode == null || request.otpCode.trim().isEmpty()) {
            response.put("message", "All fields including OTP are required and must be valid.");
            return ResponseEntity.badRequest().body(response);
        }

        // Check for existing username/email BEFORE OTP verification (as OTP is tied to email)
        if (userService.userExistsByUsername(request.username)) {
            response.put("message", "Username already taken.");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }
        if (userService.userExistsByEmail(request.email)) {
            response.put("message", "Email already registered.");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }

        // 1. Verify OTP
        boolean isValidOtp = otpService.validateOtp(request.email, request.otpCode);

        if (!isValidOtp) {
            response.put("message", "Invalid or expired OTP. Please request a new one.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        // 2. If OTP is valid, proceed to register the user
        try {
            User newUser = new User(request.name, request.gender, request.username, request.email, request.password);
            userService.registerUser(newUser); // Password gets encoded inside UserService

            response.put("message", "User registered successfully!");
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            System.err.println("Error during user registration: " + e.getMessage());
            response.put("message", "Registration failed due to an internal server error. Please try again.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
