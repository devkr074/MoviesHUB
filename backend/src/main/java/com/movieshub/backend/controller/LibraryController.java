package com.movieshub.backend.controller;

import com.movieshub.backend.model.Library;
import com.movieshub.backend.service.LibraryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/library")
@CrossOrigin(origins = "http://localhost:5173")
public class LibraryController {
    @Autowired
    private LibraryService libraryService;

    @PostMapping("/add")
    public Library addLibraryItem(@RequestBody Library item) {
        return libraryService.addLibraryItem(item);
    }

    @GetMapping("/{userId}")
    public List<Library> getLibraryItems(@PathVariable Long userId) {
        return libraryService.getLibraryItemsByUser(userId);
    }
}