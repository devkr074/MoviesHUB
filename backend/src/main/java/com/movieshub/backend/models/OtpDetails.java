package com.movieshub.backend.models;
import java.time.LocalDateTime;
public class OtpDetails {
    private String otp;
    private LocalDateTime expiryTime;
    private LocalDateTime nextResendTime;
    public OtpDetails(String otp, LocalDateTime expiryTime, LocalDateTime nextResendTime) {
        this.otp = otp;
        this.expiryTime = expiryTime;
        this.nextResendTime = nextResendTime;
    }
    public String getOtp() {
        return otp;
    }
    public LocalDateTime getExpiryTime() {
        return expiryTime;
    }
    public LocalDateTime getNextResendTime() {
        return nextResendTime;
    }
    public boolean isValid() {
        return LocalDateTime.now().isBefore(expiryTime);
    }
    public boolean canResend() {
        return LocalDateTime.now().isAfter(nextResendTime);
    }
}