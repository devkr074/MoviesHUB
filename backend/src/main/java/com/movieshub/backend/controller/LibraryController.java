package com.movieshub.backend.controller;
import com.movieshub.backend.model.Library;
import com.movieshub.backend.service.LibraryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/library")
@CrossOrigin(origins = "http://localhost:5173") // Customize CORS settings as needed
public class LibraryController {

    @Autowired
    private LibraryService libraryService;

    // Endpoint to add an item to library
    @PostMapping("/add")
    public Library addLibraryItem(@RequestBody Library item) {
        return libraryService.addLibraryItem(item);
    }

    // Endpoint to fetch all library items for a user
    @GetMapping("/{userId}")
    public List<Library> getLibraryItems(@PathVariable Long userId) {
        return libraryService.getLibraryItemsByUser(userId);
    }
}
