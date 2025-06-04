package com.movieshub.backend.service;
import com.movieshub.backend.model.Library;
import com.movieshub.backend.repository.LibraryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class LibraryService {

    @Autowired
    private LibraryRepository libraryItemRepository;

    public Library addLibraryItem(Library item) {
        return libraryItemRepository.save(item);
    }

    public List<Library> getLibraryItemsByUser(Long userId) {
        return libraryItemRepository.findByUserId(userId);
    }
}
