package com.movieshub.backend.controller;

import com.movieshub.backend.model.FavoriteMovie;
import com.movieshub.backend.service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorites")
@CrossOrigin(origins = "http://localhost:5173")
public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;

    // Add movie to favorites
    @PostMapping("/add")
    public ResponseEntity<FavoriteMovie> addFavorite(@RequestBody FavoriteMovie favoriteMovie) {
        FavoriteMovie savedFavorite = favoriteService.addFavorite(favoriteMovie);
        return ResponseEntity.ok(savedFavorite);
    }

    // Get favorite movies for a user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<FavoriteMovie>> getFavorites(@PathVariable Long userId) {
        List<FavoriteMovie> favorites = favoriteService.getFavoritesByUser(userId);
        return ResponseEntity.ok(favorites);
    }

    // Remove a favorite movie
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> removeFavorite(@PathVariable Long id) {
        favoriteService.removeFavorite(id);
        return ResponseEntity.ok("Favorite movie removed successfully");
    }
}
