package com.movieshub.backend.services;

import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.Random;
import java.util.HashMap;
import java.util.Map;

@Service
public class OtpService {

    // In-memory storage for OTPs. Key: email, Value: OtpDetails
    private final Map<String, OtpDetails> otpCache = new HashMap<>();

    // Inner class to store OTP and its expiry
    private static class OtpDetails {
        String otp;
        LocalDateTime expiryTime;

        OtpDetails(String otp, LocalDateTime expiryTime) {
            this.otp = otp;
            this.expiryTime = expiryTime;
        }

        boolean isExpired() {
            return LocalDateTime.now().isAfter(expiryTime);
        }
    }

    public String generateOtp(String email) {
        Random random = new Random();
        int otp = 1000 + random.nextInt(9000); // 4-digit OTP
        LocalDateTime expiryTime = LocalDateTime.now().plusMinutes(5); // OTP valid for 5 minutes

        otpCache.put(email, new OtpDetails(String.valueOf(otp), expiryTime));
        return String.valueOf(otp);
    }

    public boolean validateOtp(String email, String otp) {
        OtpDetails storedOtp = otpCache.get(email);

        if (storedOtp == null) {
            return false; // No OTP generated for this email
        }
        if (storedOtp.isExpired()) {
            otpCache.remove(email); // Remove expired OTP
            return false; // OTP expired
        }
        if (storedOtp.otp.equals(otp)) {
            otpCache.remove(email); // OTP successfully used, remove it
            return true;
        }
        return false; // OTP mismatch
    }
}