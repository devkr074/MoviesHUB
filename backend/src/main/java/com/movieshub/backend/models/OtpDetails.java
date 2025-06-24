package com.movieshub.backend.models;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class OtpDetails {
    private String otp;
    private LocalDateTime expiryTime;
    private LocalDateTime nextResendTime;

    public OtpDetails(String otp, LocalDateTime expiryTime, LocalDateTime nextResendTime) {
        this.otp = otp;
        this.expiryTime = expiryTime;
        this.nextResendTime = nextResendTime;
    }

    public boolean isValid() {
        return LocalDateTime.now().isBefore(expiryTime);
    }

    public boolean canResend() {
        return LocalDateTime.now().isAfter(nextResendTime);
    }
}