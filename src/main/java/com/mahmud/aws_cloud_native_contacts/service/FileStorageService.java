package com.mahmud.aws_cloud_native_contacts.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class FileStorageService {

    private final CloudinaryService cloudinaryService;

    public String storeFile(MultipartFile file) {
        return cloudinaryService.uploadImage(file);
    }

    public void deleteFile(String fileUrl) {
        if (fileUrl != null && fileUrl.contains("cloudinary.com")) {
            cloudinaryService.deleteImage(fileUrl);
        }
    }
} 