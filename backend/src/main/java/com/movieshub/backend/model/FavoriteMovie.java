package com.movieshub.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "favorite_movies")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class FavoriteMovie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    private String movieId;
    private String title;
    private String description;
    private String posterUrl;

    @Column(name = "added_at")
    private LocalDateTime addedAt;
}
