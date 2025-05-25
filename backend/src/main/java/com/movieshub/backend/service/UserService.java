package com.movieshub.backend.service;

import com.movieshub.backend.model.User;
import com.movieshub.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // User Registration
    public User registerUser(User user) {
        return userRepository.save(user);
    }

    // User Login
    public Optional<User> loginUser(String email, String password) {
        return userRepository.findByEmail(email)
                .filter(user -> user.getPassword().equals(password)); // Ideally, passwords should be encrypted.
    }
}
