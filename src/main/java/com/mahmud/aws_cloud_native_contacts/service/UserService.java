package com.mahmud.aws_cloud_native_contacts.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.mahmud.aws_cloud_native_contacts.dto.UserDTO;
import com.mahmud.aws_cloud_native_contacts.entity.User;
import com.mahmud.aws_cloud_native_contacts.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final PasswordEncoder passwordEncoder;
    @Autowired
    private final Cloudinary cloudinary;

    public UserDTO getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username)
                .map(this::mapToDTO)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
    }

    @Transactional
    public UserDTO updateProfile(UserDTO userDTO) {
        User currentUser = getCurrentUserEntity();
        
        currentUser.setName(userDTO.getName());
        currentUser.setEmail(userDTO.getEmail());
        
        if (userDTO.getPhotoUrl() != null) {
            currentUser.setPhotoUrl(userDTO.getPhotoUrl());
        }
        
        return mapToDTO(userRepository.save(currentUser));
    }


    @Transactional
    public String updateProfilePicture(MultipartFile file) throws IOException {
        User user = getCurrentUserEntity();

        // Upload image to Cloudinary
        Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());

        // Retrieve the URL of the uploaded image
        String photoUrl = (String) uploadResult.get("url");

        // Save the image URL in the database
        user.setPhotoUrl(photoUrl);
        userRepository.save(user);

        return photoUrl;
    }
/* 
    @Transactional
    public String updateProfilePicture(MultipartFile file) throws IOException {
        User user = getCurrentUserEntity();
        
        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        Path uploadPath = Paths.get("uploads");
        
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        
        Files.copy(file.getInputStream(), uploadPath.resolve(fileName));
        
        String photoUrl = "/uploads/" + fileName;
        user.setPhotoUrl(photoUrl);
        userRepository.save(user);
        
        return photoUrl;
    } */

    public User getCurrentUserEntity() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
    }

    private UserDTO mapToDTO(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .name(user.getName())
                .email(user.getEmail())
                .photoUrl(user.getPhotoUrl())
                .build();
    }
} 