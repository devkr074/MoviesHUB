package com.movieshub.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.movieshub.backend.model.TempUser;
import java.util.Optional;

public interface TempUserRepository extends JpaRepository<TempUser, Long> {
    Optional<TempUser> findByEmail(String email);

    Optional<TempUser> findByUsername(String username);
}