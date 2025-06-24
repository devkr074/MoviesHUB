package com.movieshub.backend.services;

public interface EmailService {
    void sendOtpEmail(String toEmail, String code);
}