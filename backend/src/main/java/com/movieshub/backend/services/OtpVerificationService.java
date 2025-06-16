package com.movieshub.backend.services;

import org.springframework.stereotype.Service;
import com.movieshub.backend.models.OtpVerification;
import com.movieshub.backend.repositories.OtpVerificationRepository;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
public class OtpVerificationService {
    private final OtpVerificationRepository otpVerificationRepository;
    private final EmailService emailService;

    public OtpVerificationService(OtpVerificationRepository otpVerificationRepository, EmailService emailService) {
        this.otpVerificationRepository = otpVerificationRepository;
        this.emailService = emailService;
    }

    public String resendOtp(String email) {
        Optional<OtpVerification> existingOtp = otpVerificationRepository.findByEmail(email);

        if (existingOtp.isPresent()) {
            OtpVerification otpVerification = existingOtp.get();
            LocalDateTime lastSentTime = LocalDateTime.parse(otpVerification.getCreatedAt());

            // Ensure 30-second cooldown before resending
            if (LocalDateTime.now().isBefore(lastSentTime.plusSeconds(30))) {
                return "Wait 30 seconds before requesting a new OTP.";
            }

            // Generate new OTP and update database
            String newOtp = String.valueOf(new Random().nextInt(900000) + 100000);
            otpVerification.setOtp(newOtp);
            otpVerification.setCreatedAt(LocalDateTime.now().toString());
            otpVerification.setExpiresAt(LocalDateTime.now().plusMinutes(5).toString());
            otpVerification.setVerified(false);
            otpVerificationRepository.save(otpVerification);

            emailService.sendOtpEmail(email, newOtp); // Send new OTP via email
            return "New OTP sent!";
        }

        return "Email not registered for OTP.";
    }

    public String generateOtp(String email) {
        String otp = String.valueOf(new Random().nextInt(900000) + 100000); // 6-digit OTP
        LocalDateTime createdAt = LocalDateTime.now();
        LocalDateTime expiresAt = createdAt.plusMinutes(5);

        OtpVerification otpVerification = new OtpVerification();
        otpVerification.setEmail(email);
        otpVerification.setOtp(otp);
        otpVerification.setCreatedAt(createdAt.toString());
        otpVerification.setExpiresAt(expiresAt.toString());
        otpVerification.setVerified(false);

        otpVerificationRepository.save(otpVerification);
        emailService.sendOtpEmail(email, otp); // Send OTP via email
        return "OTP sent successfully!";
    }

    public String verifyOtp(String email, String otp) {
        Optional<OtpVerification> existingOtp = otpVerificationRepository.findByEmail(email);
        if (existingOtp.isEmpty()) {
            return "OTP not found!";
        }

        OtpVerification otpVerification = existingOtp.get();
        if (otpVerification.isVerified()) {
            return "OTP already verified!";
        }

        if (LocalDateTime.now().isAfter(LocalDateTime.parse(otpVerification.getExpiresAt()))) {
            return "OTP expired!";
        }

        if (!otpVerification.getOtp().equals(otp)) {
            return "Invalid OTP!";
        }

        otpVerification.setVerified(true);
        otpVerificationRepository.save(otpVerification);
        return "OTP verified successfully!";
    }
}