package com.mahmud.aws_cloud_native_contacts.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${app.upload.dir}")
    private String uploadDir;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
        
        System.out.println("============ Resource Handler Configuration ============");
        System.out.println("Upload Directory Config Value: " + uploadDir);
        System.out.println("Upload Path Absolute: " + uploadPath);
        System.out.println("File exists: " + uploadPath.toFile().exists());
        System.out.println("File is directory: " + uploadPath.toFile().isDirectory());
        System.out.println("File can read: " + uploadPath.toFile().canRead());
        System.out.println("=================================================");
        
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:" + uploadPath.toString() + "/")
                .setCachePeriod(3600); // Cache for 1 hour
    }
} 