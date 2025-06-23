package com.movieshub.backend.services;

import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    /**
     * Sends an OTP email to the specified recipient.
     * @param to The recipient's email address.
     * @param otpCode The OTP code to send.
     */
    public void sendOtpEmail(String to, String otpCode) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("your-email@example.com"); // Configure this in application.properties or replace
            message.setTo(to);
            message.setSubject("Your DeepSeek Account Verification Code");
            message.setText("Your verification code for DeepSeek is: " + otpCode +
                            "\n\nThis code is valid for 5 minutes. Please do not share it with anyone.");
            mailSender.send(message);
            System.out.println("OTP email sent successfully to " + to);
        } catch (MailException e) {
            System.err.println("Error sending OTP email to " + to + ": " + e.getMessage());
            // In a real application, you might want to throw a custom exception
            // or log this error more formally.
        }
    }
}
