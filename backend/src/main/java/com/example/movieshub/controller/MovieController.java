package com.example.movieshub.controller;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
@RestController
@RequestMapping("/api/movies")
public class MovieController {
    @GetMapping("/search")
    public ResponseEntity<?> searchMovies(@RequestParam String query) {
        String apiKey = "API_KEY"; 
        String url = "https://api.tracktv.com/search?query=" + query + "&api_key=" + apiKey;
        RestTemplate restTemplate = new RestTemplate();
        Object apiResponse = restTemplate.getForObject(url, Object.class);
        return ResponseEntity.ok(apiResponse);
    }
}