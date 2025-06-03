package com.movieshub.backend.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.util.Random;

@Component
public class EmailUtil {
    private final JavaMailSender mailSender;
    @Value("${spring.mail.username}")
    private String fromEmail;

    public EmailUtil(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public String generateOtp() {
        int otp = 100000 + new Random().nextInt(900000); // 6-digit OTP
        return String.valueOf(otp);
    }

    public void sendOtpEmail(String toEmail, String otp) throws MessagingException {
        String subject = "Your OTP Code for MovieHub";
        String text = "Your OTP code is: " + otp;
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setFrom(fromEmail);
        helper.setTo(toEmail);
        helper.setSubject(subject);
        helper.setText(text);
        mailSender.send(message);
    }
}