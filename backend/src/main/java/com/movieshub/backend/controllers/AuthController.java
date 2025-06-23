package com.movieshub.backend.controllers;
import jakarta.validation.Valid;

import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.movieshub.backend.dtos.LoginRequest;
import com.movieshub.backend.dtos.OtpRequest;
import com.movieshub.backend.dtos.SignupRequest;
import com.movieshub.backend.dtos.VerificationRequest;
import com.movieshub.backend.services.UserService;

import org.springframework.security.authentication.BadCredentialsException;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@Valid @RequestBody OtpRequest otpRequest) {
        try {
            userService.requestOtpForPendingSignup(otpRequest.getEmail());
            return ResponseEntity.ok("OTP sent to " + otpRequest.getEmail());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error sending OTP: " + e.getMessage());
        }
    }


    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signupRequest) {
        try {
            userService.registerUser(signupRequest);
            return ResponseEntity.ok("Registration initiated. OTP sent to your email. Please verify.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error during registration: " + e.getMessage());
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@Valid @RequestBody VerificationRequest verificationRequest) {
        try {
            userService.verifyAndSaveUser(verificationRequest.getEmail(), verificationRequest.getOtp());
            return ResponseEntity.ok("Account successfully verified and registered!");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error during OTP verification: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            User authenticatedUser = (User) userService.loginUser(loginRequest);
            // Return the email of the authenticated user. Frontend will store it in local storage.
            return ResponseEntity.ok(((OtpRequest) authenticatedUser).getEmail());
        } catch (IllegalArgumentException e) {
            // This will catch "Invalid credentials or account not verified."
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        } catch (BadCredentialsException e) {
            // Spring Security might throw this directly for bad password/username
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username/email or password.");
        } catch (Exception e) {
            // Catch any other unexpected errors
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred during login: " + e.getMessage());
        }
    }
}