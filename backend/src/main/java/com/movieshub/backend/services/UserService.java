package com.movieshub.backend.services;
import org.springframework.stereotype.Service;
import com.movieshub.backend.repositories.UserRepository;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.movieshub.backend.models.User;
import java.util.Random;
@Service
public class UserService {
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final ConcurrentHashMap<String, String> otpStore = new ConcurrentHashMap<>();
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
    public int sendOtp(String email) {
        if (userRepository.findByEmail(email).isPresent()) {
            return 1;
        }
        String otp = String.format("%06d", new Random().nextInt(999999));
        otpStore.put(email, otp);
        emailService.sendOtpEmail(email, otp);
        return 0;
    }
    public boolean validateOtp(String email, String otp) {
        String storedOtp = otpStore.get(email);
        if (storedOtp == null) {
            System.out.println("No OTP found for email: " + email);
            return false;
        }
        if (!storedOtp.equals(otp)) {
            System.out.println("Invalid OTP for email: " + email);
            return false;
        }
        return true;
    }
}