package com.movieshub.backend.repository;

import com.movieshub.backend.model.Favorites;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FavoritesRepository extends JpaRepository<Favorites, Long> {
    List<Favorites> findByUserId(Long userId);
}