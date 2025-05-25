package com.movieshub.backend.service;

import com.movieshub.backend.model.FavoriteMovie;
import com.movieshub.backend.repository.FavoriteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class FavoriteService {

    @Autowired
    private FavoriteRepository favoriteRepository;

    // Add a movie to favorites
    public FavoriteMovie addFavorite(FavoriteMovie favoriteMovie) {
        favoriteMovie.setAddedAt(LocalDateTime.now());
        return favoriteRepository.save(favoriteMovie);
    }

    // Get all favorite movies for a user
    public List<FavoriteMovie> getFavoritesByUser(Long userId) {
        return favoriteRepository.findByUserId(userId);
    }

    // Remove a favorite movie
    public void removeFavorite(Long id) {
        favoriteRepository.deleteById(id);
    }
}
