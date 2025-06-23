package com.movieshub.backend.services;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendOtpEmail(String toEmail, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("devkr074@gmail.com"); // Must match spring.mail.username
        message.setTo(toEmail);
        message.setSubject("Your OTP for Signup Verification");
        message.setText("Dear User,\n\nYour One-Time Password (OTP) for signup verification is: " + otp +
                        "\n\nThis OTP is valid for 5 minutes. Do not share this with anyone.\n\n" +
                        "Thanks,\nYour Application Team");

        try {
            mailSender.send(message);
            System.out.println("OTP email sent successfully to: " + toEmail);
        } catch (MailException e) {
            System.err.println("Error sending OTP email to " + toEmail + ": " + e.getMessage());
            // Log the exception properly in a real application
            throw new RuntimeException("Failed to send OTP email: " + e.getMessage());
        }
    }
}