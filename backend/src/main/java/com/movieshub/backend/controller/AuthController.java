package com.movieshub.backend.controller;

import com.movieshub.backend.model.User;
import com.movieshub.backend.repository.UserRepository;
import com.movieshub.backend.util.EmailUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.mail.MessagingException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
    @Autowired
    private EmailUtil emailUtil;
    @Autowired
    private UserRepository userRepository;
    private String generatedOtp;

    @PostMapping("/signup")
    public ResponseEntity<Map<String, String>> signUp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        if (email == null || email.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email is required"));
        }
        try {
            generatedOtp = emailUtil.generateOtp();
            emailUtil.sendOtpEmail(email, generatedOtp);
            Map<String, String> response = new HashMap<>();
            response.put("message", "OTP sent to email");
            return ResponseEntity.ok(response);
        } catch (MessagingException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("error", "Failed to send OTP"));
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<Map<String, String>> verifyOtp(@RequestParam String email, @RequestParam String otp,
            @RequestParam String password) {
        if (generatedOtp != null && generatedOtp.equals(otp)) {
            User newUser = new User();
            newUser.setEmail(email);
            newUser.setPassword(password);
            userRepository.save(newUser);
            Map<String, String> response = new HashMap<>();
            response.put("message", "User registered successfully");
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(400).body(Map.of("error", "Invalid OTP"));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestParam String email, @RequestParam String password) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent() && userOpt.get().getPassword().equals(password)) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Login successful");
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(400).body(Map.of("error", "Invalid credentials"));
        }
    }
}