package com.movieshub.backend.config;
// SecurityConfig.java // Adjust package name as per your project structure

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

/**
 * Spring Security configuration for the application.
 * This class configures security settings, including password encoding and request authorization.
 */
@Configuration // Marks this class as a source of bean definitions
@EnableWebSecurity // Enables Spring Security's web security features
public class SecurityConfig {

    /**
     * Defines the password encoder to be used for hashing passwords.
     * BCryptPasswordEncoder is a strong hashing function recommended for passwords.
     * @return An instance of BCryptPasswordEncoder.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Configures the security filter chain for HTTP requests.
     * - Disables CSRF protection (for API-only applications; consider enabling and using tokens for production).
     * - Authorizes specific requests:
     * - POST /api/users/send-otp and /api/users/signup are permitted without authentication.
     * - All other requests require authentication.
     * @param http The HttpSecurity object to configure.
     * @return The configured SecurityFilterChain.
     * @throws Exception if an error occurs during configuration.
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Disable CSRF for stateless APIs, assuming token-based auth
            .authorizeHttpRequests(authorize -> authorize
                .requestMatchers("/api/users/send-otp", "/api/users/signup").permitAll() // Allow these endpoints without authentication
                .anyRequest().authenticated() // All other requests require authentication
            );
        // If you were using sessions, you might add .formLogin() or .httpBasic() here.
        // For a typical React/Spring Boot setup, you'd likely integrate JWT or similar.

        return http.build();
    }

    /**
     * Configures the CORS filter to allow cross-origin requests from your frontend.
     * It allows requests from "http://localhost:5173" (your React dev server)
     * with POST method and specific headers.
     *
     * @return An instance of CorsFilter.
     */
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true); // Allow sending of cookies/authorization headers
        config.addAllowedOrigin("http://localhost:5173"); // Allow your React frontend origin
        config.addAllowedHeader("*"); // Allow all headers
        config.addAllowedMethod("POST"); // Allow POST method for send-otp and signup
        // You might want to add other methods like GET, PUT, DELETE for other endpoints
        config.addAllowedMethod("GET");
        config.addAllowedMethod("PUT");
        config.addAllowedMethod("DELETE");
        source.registerCorsConfiguration("/**", config); // Apply this CORS config to all paths
        return new CorsFilter(source);
    }
}
