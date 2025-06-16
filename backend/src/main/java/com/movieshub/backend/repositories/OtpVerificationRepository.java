package com.movieshub.backend.repositories;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.movieshub.backend.models.OtpVerification;

public interface OtpVerificationRepository extends JpaRepository<OtpVerification, Long> {
    Optional<OtpVerification> findByEmail(String email);
}