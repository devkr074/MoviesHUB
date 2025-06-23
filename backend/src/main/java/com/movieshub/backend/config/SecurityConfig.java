package com.movieshub.backend.config;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.movieshub.backend.repositories.UserRepository;

import java.util.Arrays;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import java.util.Collections;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final UserRepository userRepository;

    public SecurityConfig(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Configure how user details are loaded for authentication
    @Bean
    public UserDetailsService userDetailsService() {
        return identifier -> { // identifier can be email or username
            return userRepository.findByEmail(identifier)
                    .map(user -> org.springframework.security.core.userdetails.User.withUsername(user.getEmail())
                            .password(user.getPassword())
                            .roles("USER") // Assign a default role
                            .disabled(!user.isEnabled()) // Account must be enabled (verified OTP)
                            .build())
                    .or(() -> userRepository.findByUsername(identifier) // Try finding by username if not by email
                            .map(user -> org.springframework.security.core.userdetails.User.withUsername(user.getUsername())
                                    .password(user.getPassword())
                                    .roles("USER")
                                    .disabled(!user.isEnabled())
                                    .build()))
                    .orElseThrow(() -> new UsernameNotFoundException("User not found with identifier: " + identifier));
        };
    }

    // Configure AuthenticationManager to use our UserDetailsService and PasswordEncoder
    @Bean
    public AuthenticationManager authenticationManager(UserDetailsService userDetailsService, BCryptPasswordEncoder passwordEncoder) {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService);
        authenticationProvider.setPasswordEncoder(passwordEncoder);
        return new ProviderManager(authenticationProvider);
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Disable CSRF for REST APIs
            .cors(cors -> cors.configurationSource(corsConfigurationSource())) // Enable CORS
            .authorizeHttpRequests(authorize -> authorize
                // Allow public access to signup, OTP, and login endpoints
                .requestMatchers("/api/auth/register", "/api/auth/send-otp", "/api/auth/verify-otp", "/api/auth/login").permitAll()
                .anyRequest().authenticated() // All other requests require authentication
            );
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Collections.singletonList("http://localhost:5173")); // Your React app URL
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true); // Allow sending cookies/auth headers
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // Apply CORS to all paths
        return source;
    }
}