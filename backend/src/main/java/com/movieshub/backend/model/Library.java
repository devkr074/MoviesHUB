package com.movieshub.backend.model;
import jakarta.persistence.*;

@Entity
@Table(name = "library")
public class Library {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId; // ID of the user
    private String title; // Movie or Show title
    private String type;  // "movie" or "show"

    // Constructors
    public Library() {}

    public Library(Long userId, String title, String type) {
        this.userId = userId;
        this.title = title;
        this.type = type;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getType() { 
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
