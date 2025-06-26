package com.movieshub.backend.controllers;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.movieshub.backend.services.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.http.ResponseEntity;
import java.util.Map;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.HashMap;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/send-otp")
    public ResponseEntity<String> sendOtp(@RequestBody String email) {
        int result = userService.sendOtp(email);
        if (result == 0) {
            return ResponseEntity.ok("Verification code sent to your " + email);
        } else if (result == 1) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("A user with this email already exists. Please try logging in or using a different email.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Unable to send OTP. Please try again later.");
        }
    }

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
        if (password.length() < 8) {
            response.put("message", "Password must be at least 8 characters long.");
            return ResponseEntity.badRequest().body(response);
        }
        int registrationResult = userService.registerUser(email, password, otp);
        if (registrationResult == 0) {
            response.put("message", "User registered successfully!");
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } else if (registrationResult == 1) {
            response.put("message", "Registration failed: Invalid or expired OTP. Please request a new one.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } else if (registrationResult == 2) {
            response.put("message", "Registration failed: A user with this email already exists.");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        } else {
            response.put("message", "Registration failed due to an internal server error. Please try again.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}