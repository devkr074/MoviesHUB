package com.movieshub.backend.services;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.movieshub.backend.models.OtpVerification;
import com.movieshub.backend.repositories.OtpVerificationRepository;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
public class OtpService {

    private final OtpVerificationRepository otpVerificationRepository;
    private static final long OTP_VALIDITY_MINUTES = 5; // OTP valid for 5 minutes

    public OtpService(OtpVerificationRepository otpVerificationRepository) {
        this.otpVerificationRepository = otpVerificationRepository;
    }

    /**
     * Generates a new 6-digit OTP.
     * @return The generated OTP code as a String.
     */
    public String generateOtp() {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000); // Generates a 6-digit number
        return String.valueOf(otp);
    }

    /**
     * Saves or updates an OTP for a given email.
     * @param email The email for which the OTP is generated.
     * @param otpCode The generated OTP code.
     * @return The saved OtpVerification object.
     */
    @Transactional
    public OtpVerification saveOtp(String email, String otpCode) {
        // Delete any existing OTPs for this email to ensure only one active OTP per email
        otpVerificationRepository.deleteByEmail(email);

        LocalDateTime now = LocalDateTime.now();
        LocalDateTime expiresAt = now.plusMinutes(OTP_VALIDITY_MINUTES);
        OtpVerification otpVerification = new OtpVerification(email, otpCode, now, expiresAt);
        return otpVerificationRepository.save(otpVerification);
    }

    /**
     * Validates an OTP for a given email.
     * @param email The email to validate the OTP against.
     * @param otpCode The OTP code provided by the user.
     * @return true if the OTP is valid and not expired, false otherwise.
     */
    @Transactional
    public boolean validateOtp(String email, String otpCode) {
        Optional<OtpVerification> otpVerificationOptional = otpVerificationRepository.findByEmail(email);

        if (otpVerificationOptional.isPresent()) {
            OtpVerification otpVerification = otpVerificationOptional.get();
            if (otpVerification.getOtpCode().equals(otpCode) && !otpVerification.isExpired()) {
                // OTP is valid and not expired, delete it after successful verification
                otpVerificationRepository.delete(otpVerification);
                return true;
            } else {
                // If OTP is incorrect or expired, delete it to prevent further attempts with invalid/expired OTP
                otpVerificationRepository.delete(otpVerification);
            }
        }
        return false;
    }

    /**
     * Checks if an OTP exists for a given email (useful for resend logic).
     * @param email The email to check for an existing OTP.
     * @return true if an OTP exists for the email, false otherwise.
     */
    public boolean hasExistingOtp(String email) {
        Optional<OtpVerification> otpVerificationOptional = otpVerificationRepository.findByEmail(email);
        return otpVerificationOptional.isPresent() && !otpVerificationOptional.get().isExpired();
    }
}
