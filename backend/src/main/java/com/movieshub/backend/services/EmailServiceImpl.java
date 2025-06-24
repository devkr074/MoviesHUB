package com.movieshub.backend.services;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

/**
 * Implementation of the EmailService interface using Spring's JavaMailSender.
 * This class sends actual emails for OTP verification.
 */
@Service // Marks this class as a Spring service component
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender; // Inject JavaMailSender

    public EmailServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Override
    public void sendOtpEmail(String toEmail, String code) {
        MimeMessage message = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true); // true for multipart message
            helper.setTo(toEmail);
            helper.setSubject("Your OTP for Signup Verification");
            helper.setText("Your verification code is: <b>" + code + "</b>. It is valid for 2 minutes.", true); // true for HTML content

            mailSender.send(message);
            System.out.println("Email with OTP sent successfully to: " + toEmail);
        } catch (MessagingException e) {
            System.err.println("Failed to send email to " + toEmail + ": " + e.getMessage());
            // In a production app, you might log this error or rethrow a custom exception
        }
    }
}
