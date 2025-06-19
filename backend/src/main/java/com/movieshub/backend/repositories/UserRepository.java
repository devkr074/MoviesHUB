package com.movieshub.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.movieshub.backend.models.User;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsernameOrEmail(String username, String email);
}