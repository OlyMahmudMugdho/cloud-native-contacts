package com.mahmud.aws_cloud_native_contacts.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileStorageService {

    private final Path uploadDir;

    public FileStorageService(@Value("${app.upload.dir:${user.dir}/uploads}") String uploadPath) {
        this.uploadDir = Paths.get(uploadPath).toAbsolutePath().normalize();
        createUploadDirectory();
    }

    private void createUploadDirectory() {
        try {
            if (!Files.exists(uploadDir)) {
                Files.createDirectories(uploadDir);
            }
            System.out.println("============ File Storage Configuration ============");
            System.out.println("Working Directory: " + System.getProperty("user.dir"));
            System.out.println("Upload Directory Absolute Path: " + uploadDir.toAbsolutePath());
            System.out.println("Upload Directory Exists: " + Files.exists(uploadDir));
            System.out.println("Upload Directory Is Readable: " + Files.isReadable(uploadDir));
            System.out.println("Upload Directory Is Writable: " + Files.isWritable(uploadDir));
            System.out.println("================================================");
        } catch (IOException e) {
            throw new RuntimeException("Could not create upload directory at " + uploadDir, e);
        }
    }

    public String storeFile(MultipartFile file) {
        try {
            // Generate unique filename
            String originalFilename = file.getOriginalFilename();
            String fileExtension = "";
            if (originalFilename != null && originalFilename.contains(".")) {
                fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }
            String filename = UUID.randomUUID().toString() + fileExtension;

            // Create the file in the uploads directory
            Path targetLocation = uploadDir.resolve(filename);
            Files.copy(file.getInputStream(), targetLocation);

            return "/uploads/" + filename;
        } catch (IOException e) {
            throw new RuntimeException("Could not store file. Please try again!", e);
        }
    }

    public void deleteFile(String filename) {
        try {
            if (filename != null && filename.startsWith("/uploads/")) {
                filename = filename.substring("/uploads/".length());
                Path filePath = uploadDir.resolve(filename);
                Files.deleteIfExists(filePath);
            }
        } catch (IOException e) {
            throw new RuntimeException("Could not delete file. Please try again!", e);
        }
    }
} 