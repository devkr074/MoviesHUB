package com.example.movieshub.service;
import com.example.movieshub.model.User;
import com.example.movieshub.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    public User registerUser(User user) {
        return userRepository.save(user);
    }
    public User loginUser(String email, String password) {
        return userRepository.findByEmail(email)
                .filter(user -> user.getPassword().equals(password))
                .orElse(null);
    }
}