package com.youtube.videoservice.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    // to allow requests from different origins
    @Override
    public void addCorsMappings(CorsRegistry corsRegistry){

        // 1. Allow this for all urls (/**)
        // 2. Allow all origins (*)
        // 3. Allowed Http Methods
        corsRegistry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS");
    }
}
