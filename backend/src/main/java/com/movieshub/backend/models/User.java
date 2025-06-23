package com.movieshub.backend.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "users") // Good practice to explicitly name the table
@Data // Lombok: Generates getters, setters, toString, equals, and hashCode
@NoArgsConstructor // Lombok: Generates no-argument constructor
@AllArgsConstructor // Lombok: Generates constructor with all fields
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password; // This will store the BCrypt encoded password

    private boolean isEnabled = false; // To track if the user has verified their OTP/email

    // You can add more fields as needed, e.g., firstName, lastName, etc.
}