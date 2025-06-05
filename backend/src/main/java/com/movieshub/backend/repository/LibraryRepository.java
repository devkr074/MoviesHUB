package com.movieshub.backend.repository;

import com.movieshub.backend.model.Library;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LibraryRepository extends JpaRepository<Library, Long> {
    List<Library> findByUserId(Long userId);
}