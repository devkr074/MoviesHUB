package com.movieshub.backend.services;

import org.springframework.stereotype.Service;
import com.movieshub.backend.repositories.UserRepository;
import java.util.concurrent.ConcurrentHashMap;
import com.movieshub.backend.models.OtpDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.movieshub.backend.models.User;
import java.util.Optional;
import java.util.Random;
import java.time.LocalDateTime;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final ConcurrentHashMap<String, OtpDetails> otpStore = new ConcurrentHashMap<>();
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, EmailService emailService, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.emailService = emailService;
        this.passwordEncoder = passwordEncoder;
    }

    public int registerUser(String email, String password, String otp) {
        if (userRepository.findByEmail(email).isPresent()) {
            System.out.println("Registration failed: User with email " + email + " already exists.");
            return 2;
        }
        if (!validateOtp(email, otp)) {
            System.out.println("Registration failed: OTP validation failed for email: " + email);
            return 1;
        }
        User newUser = new User();
        newUser.setEmail(email);
        newUser.setPassword(passwordEncoder.encode(password));
        try {
            userRepository.save(newUser);
            otpStore.remove(email);
            System.out.println("User registered successfully: " + email);
            return 0;
        } catch (Exception e) {
            System.err.println("Error saving user during registration for email " + email + ": " + e.getMessage());
            return 3;
        }
    }

    public int loginUser(String email, String password) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty()) {
            System.out.println("Login failed: User not found with email: " + email);
            return 2;
        }
        User user = userOptional.get();
        if (passwordEncoder.matches(password, user.getPassword())) {
            System.out.println("Login successful for user: " + email);
            return 0;
        } else {
            System.out.println("Login failed: Invalid password for user: " + email);
            return 1;
        }
    }

    public int sendOtp(String email) {
        if (userRepository.findByEmail(email).isPresent()) {
            System.out.println("User with email " + email + " already exists. Not sending OTP.");
            return 2;
        }
        OtpDetails existingOtp = otpStore.get(email);
        if (existingOtp != null && !existingOtp.canResend()) {
            System.out.println("OTP resend cooldown active for email: " + email);
            return 1;
        }
        String otp = String.format("%06d", new Random().nextInt(999999));
        LocalDateTime expiryTime = LocalDateTime.now().plusMinutes(2);
        LocalDateTime nextResendTime = LocalDateTime.now().plusMinutes(1);
        OtpDetails newOtpDetails = new OtpDetails(otp, expiryTime, nextResendTime);
        otpStore.put(email, newOtpDetails);
        emailService.sendOtpEmail(email, otp);
        System.out.println("OTP sent to " + email + ": " + otp);
        return 0;
    }

    public boolean validateOtp(String email, String otp) {
        OtpDetails storedOtp = otpStore.get(email);
        if (storedOtp == null) {
            System.out.println("No OTP found for email: " + email);
            return false;
        }
        if (!storedOtp.isValid()) {
            System.out.println("OTP expired for email: " + email);
            otpStore.remove(email);
            return false;
        }
        if (!storedOtp.getOtp().equals(otp)) {
            System.out.println("Invalid OTP for email: " + email);
            return false;
        }
        return true;
    }
}