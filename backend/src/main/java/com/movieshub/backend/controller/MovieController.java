package com.movieshub.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/movies")
@CrossOrigin(origins = "http://localhost:5173") // Allow frontend access
public class MovieController {

    private static final String API_KEY = "YOUR_TRACKTV_API_KEY";
    private static final String API_URL = "https://api.tracktv.com/search?query=";

    @GetMapping("/search")
    public ResponseEntity<?> searchMovies(@RequestParam String query) {
        String fullUrl = API_URL + query + "&api_key=" + API_KEY;
        
        RestTemplate restTemplate = new RestTemplate();
        Object apiResponse = restTemplate.getForObject(fullUrl, Object.class);
        
        return ResponseEntity.ok(apiResponse);
    }
}
