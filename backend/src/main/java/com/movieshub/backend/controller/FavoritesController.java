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

    // Endpoint to add an item to favorites
    @PostMapping("/add")
    public Favorites addFavoriteItem(@RequestBody Favorites item) {
        return favoriteService.addFavoriteItem(item);
    }

    // Endpoint to fetch all favorite items for a user
    @GetMapping("/{userId}")
    public List<Favorites> getFavoriteItems(@PathVariable Long userId) {
        return favoriteService.getFavoriteItemsByUser(userId);
    }
}
