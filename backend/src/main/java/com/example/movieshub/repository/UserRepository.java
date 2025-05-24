package com.example.movieshub.repository;
import com.example.movieshub.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;
public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);
}