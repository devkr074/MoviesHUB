package com.movieshub.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Global CORS configuration for the Spring Boot application.
 * This configures the backend to accept cross-origin requests from the specified frontend URL.
 */
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    /**
     * Configures CORS mappings for the application.
     * @param registry The CorsRegistry to configure.
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Apply CORS to all API endpoints starting with /api/
        registry.addMapping("/api/**")
                // Allow requests from your React frontend's development server
                .allowedOrigins("http://localhost:5173")
                // Specify which HTTP methods are allowed
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                // Allow all headers in the request
                .allowedHeaders("*")
                // Allow credentials (like cookies, authorization headers) to be sent with cross-origin requests
                .allowCredentials(true)
                // How long the results of a preflight request can be cached (in seconds)
                .maxAge(3600);
    }
}
