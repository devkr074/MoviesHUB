package com.movieshub.backend.models;

import lombok.Data;
import jakarta.persistence.*;

@Data
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String gender;
    private String username;
    private String email;
    private String password;

    public User() {
    }

    public User(String name, String gender, String username, String email, String password) {
        this.name = name;
        this.gender = gender;
        this.username = username;
        this.email = email;
        this.password = password;
    }
}