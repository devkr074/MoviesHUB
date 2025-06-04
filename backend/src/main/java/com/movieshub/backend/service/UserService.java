package com.movieshub.backend.service;

import com.movieshub.backend.model.User;
import com.movieshub.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Random;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // Generates a 6-digit OTP
    public String generateOtp() {
        Random random = new Random();
        int otpValue = 100000 + random.nextInt(900000);
        return String.valueOf(otpValue);
    }

    // Signup method: validates user, generates OTP, hashes password, and sends email
    public String signup(User user) {
        if(userRepository.findByEmail(user.getEmail()).isPresent()){
            return "User with this email already exists.";
        }
        if(userRepository.findByUsername(user.getUsername()).isPresent()){
            return "Username already taken.";
        }

        String otp = generateOtp();
        user.setOtp(otp);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setVerified(false);
        userRepository.save(user);

        boolean emailSent = emailService.sendOtpEmail(user.getEmail(), otp);
        if(emailSent){
            return "OTP sent to email.";
        } else {
            return "Error sending OTP email.";
        }
    }

    // Verifies the OTP entered by the user
    public String verifyOtp(String email, String otpInput) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if(optionalUser.isPresent()){
            User user = optionalUser.get();
            if(user.getOtp() != null && user.getOtp().equals(otpInput)){
                user.setVerified(true);
                user.setOtp(null); // clear OTP after successful verification
                userRepository.save(user);
                return "User verified successfully.";
            } else {
                return "Incorrect OTP.";
            }
        }
        return "User not found.";
    }

    // Login method: checks credentials and whether the user is verified
    public User login(String usernameOrEmail, String password) {
        Optional<User> optionalUser = userRepository.findByEmail(usernameOrEmail);
        if(!optionalUser.isPresent()){
            optionalUser = userRepository.findByUsername(usernameOrEmail);
        }
        if(optionalUser.isPresent()){
            User user = optionalUser.get();
            if(user.getVerified() && passwordEncoder.matches(password, user.getPassword())){
                return user;
            }
        }
        return null;
    }
}
