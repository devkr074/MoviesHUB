package com.movieshub.backend.controller;

import com.movieshub.backend.model.Favorites;
import com.movieshub.backend.service.FavoritesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/favorites")
@CrossOrigin(origins = "http://localhost:5173")
public class FavoritesController {
    @Autowired
    private FavoritesService favoriteService;

    @PostMapping("/add")
    public Favorites addFavoriteItem(@RequestBody Favorites item) {
        return favoriteService.addFavoriteItem(item);
    }

    @GetMapping("/{userId}")
    public List<Favorites> getFavoriteItems(@PathVariable Long userId) {
        return favoriteService.getFavoriteItemsByUser(userId);
    }
}