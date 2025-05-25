package com.movieshub.backend.repository;

import com.movieshub.backend.model.FavoriteMovie;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FavoriteRepository extends JpaRepository<FavoriteMovie, Long> {
    List<FavoriteMovie> findByUserId(Long userId);
}
