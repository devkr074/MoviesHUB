package com.movieshub.backend.controller;

import com.movieshub.backend.model.User;
import com.movieshub.backend.repository.UserRepository;
import com.movieshub.backend.service.UserService;
import com.movieshub.backend.util.JwtUtil;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173") // Allow CORS; customize as needed
public class UserController {
    @Autowired
    private UserService userService;
    private UserRepository userRepository;
    @Autowired
    private JwtUtil jwtUtil;

    // Endpoint for user signup
    @PostMapping("/signup")
    public String signup(@RequestBody User user) {
        return userService.signup(user);
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@RequestBody User updatedUser) {
        Optional<User> optionalUser = userRepository.findById(updatedUser.getId());
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setUsername(updatedUser.getUsername());
            user.setEmail(updatedUser.getEmail());
            // Agar aap password update karna chahte hain, use bhi handle kar lo (optional)
            userRepository.save(user);
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }

    // Endpoint for OTP verification
    @PostMapping("/verify-otp")
    public String verifyOtp(@RequestParam String email, @RequestParam String otp) {
        return userService.verifyOtp(email, otp);
    }

    // Endpoint for user login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String usernameOrEmail, @RequestParam String password) {
        User user = userService.login(usernameOrEmail, password);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials or user not verified.");
        }
        // Generate JWT token using username (or email)
        String token = jwtUtil.generateToken(user.getUsername());
        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("user", user);
        responseBody.put("token", token);
        return ResponseEntity.ok(responseBody);
    }

    // Future endpoints for Library/Favorites can be added here
}


// In src/main/java/com/movieshub/controller/UserController.java