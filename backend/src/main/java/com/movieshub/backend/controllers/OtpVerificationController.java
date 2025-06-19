package com.movieshub.backend.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.movieshub.backend.services.OtpVerificationService;

@RestController
@RequestMapping("/api/otp")
public class OtpVerificationController {
    private final OtpVerificationService otpVerificationService;

    public OtpVerificationController(OtpVerificationService otpVerificationService) {
        this.otpVerificationService = otpVerificationService;
    }

    @PostMapping("/send")
    public ResponseEntity<String> sendOtp(@RequestParam String email) {
        String result = otpVerificationService.generateOtp(email);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verifyOtp(@RequestParam String email, @RequestParam String otp) {
        String result = otpVerificationService.verifyOtp(email, otp);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/resend")
    public ResponseEntity<String> resendOtp(@RequestParam String email) {
        String result = otpVerificationService.resendOtp(email);
        return ResponseEntity.ok(result);
    }
}