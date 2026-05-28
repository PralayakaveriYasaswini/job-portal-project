package com.jobportal.JobPortalBackend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        // =========================
        // PROFILE IMAGES
        // =========================

        registry.addResourceHandler("/uploads/profile-images/**")
                .addResourceLocations(
                        "file:" + System.getProperty("user.dir") + "/uploads/profile-images/"
                );

        // =========================
        // RESUMES
        // =========================

        registry.addResourceHandler("/uploads/resumes/**")
                .addResourceLocations(
                        "file:" + System.getProperty("user.dir") + "/uploads/resumes/"
                );
    }
}