package com.movieshub.backend.services;
import org.springframework.stereotype.Service;
import org.springframework.mail.javamail.JavaMailSender;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.MimeMessageHelper;
import jakarta.mail.MessagingException;
@Service
public class EmailService {
    private final JavaMailSender mailSender;
    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }
    public void sendOtpEmail(String toEmail, String code) {
        MimeMessage message = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(toEmail);
            helper.setSubject("MoviesHUB Signup");
            helper.setText("Verification code for MoviesHUB Signup is <b>" + code + "</b>.", true);
            mailSender.send(message);
        } catch (MessagingException e) {
            System.err.println("Failed to send email to " + toEmail + ": " + e.getMessage());
        }
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> aa2c37e3446e9e53df7d635eea23166886cb847f
