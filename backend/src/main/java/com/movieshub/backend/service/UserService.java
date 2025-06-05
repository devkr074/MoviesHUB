package com.movieshub.backend.service;

import com.movieshub.backend.model.TempUser;
import com.movieshub.backend.model.User;
import com.movieshub.backend.repository.TempUserRepository;
import com.movieshub.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.Random;

@Service
public class UserService {
    @Autowired
    private User user;
    private UserRepository userRepository;
    private TempUserRepository tempUserRepository;
    private EmailService emailService;
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public String generateOtp() {
        Random random = new Random();
        int otpValue = 100000 + random.nextInt(900000);
        return String.valueOf(otpValue);
    }

    public String signup(TempUser tempUser) {
        if (userRepository.findByEmail(tempUser.getEmail()).isPresent()) {
            return "User with this email already exists.";
        }
        if (userRepository.findByUsername(tempUser.getUsername()).isPresent()) {
            return "Username already taken.";
        }
        String otp = generateOtp();
        tempUser.setOtp(otp);
        tempUser.setPassword(passwordEncoder.encode(tempUser.getPassword()));
        tempUserRepository.save(tempUser);
        boolean emailSent = emailService.sendOtpEmail(tempUser.getEmail(), otp);
        if (emailSent) {
            return "OTP sent to email.";
        } else {
            return "Error sending OTP email. Try Again.";
        }
    }

    public String verifyOtp(String email, String otpInput) {
        Optional<TempUser> optionalUser = tempUserRepository.findByEmail(email);
        if (optionalUser.isPresent()) {
            TempUser tempUser = optionalUser.get();
            if (tempUser.getOtp() != null && tempUser.getOtp().equals(otpInput)) {
                user.setUsername(tempUser.getUsername());
                user.setPassword(tempUser.getPassword());
                user.setEmail(tempUser.getEmail());
                userRepository.save(user);
                tempUserRepository.delete(tempUser);
                return "User Sign Up successfully.";
            } else {
                return "Incorrect OTP.";
            }
        }
        return "User not found.";
    }

    public User login(String usernameOrEmail, String password) {
        Optional<User> optionalUser = userRepository.findByEmail(usernameOrEmail);
        if (!optionalUser.isPresent()) {
            optionalUser = userRepository.findByUsername(usernameOrEmail);
        }
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (passwordEncoder.matches(password, user.getPassword())) {
                return user;
            }
        }
        return null;
    }
}