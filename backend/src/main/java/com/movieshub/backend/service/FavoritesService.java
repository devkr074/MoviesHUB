package com.movieshub.backend.service;
import com.movieshub.backend.model.Favorites;
import com.movieshub.backend.repository.FavoritesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FavoritesService {

    @Autowired
    private FavoritesRepository favoriteItemRepository;

    public Favorites addFavoriteItem(Favorites item) {
        return favoriteItemRepository.save(item);
    }

    public List<Favorites> getFavoriteItemsByUser(Long userId) {
        return favoriteItemRepository.findByUserId(userId);
    }
}
