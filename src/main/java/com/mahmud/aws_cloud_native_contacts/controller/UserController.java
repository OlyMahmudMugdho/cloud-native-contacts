package com.mahmud.aws_cloud_native_contacts.controller;

import com.mahmud.aws_cloud_native_contacts.dto.UserDTO;
import com.mahmud.aws_cloud_native_contacts.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserDTO> getCurrentUser() {
        return ResponseEntity.ok(userService.getCurrentUser());
    }

    @PutMapping("/me")
    public ResponseEntity<UserDTO> updateProfile(@Valid @RequestBody UserDTO userDTO) {
        return ResponseEntity.ok(userService.updateProfile(userDTO));
    }

    @PutMapping(value = "/me/photo", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> updateProfilePicture(@RequestParam("file") MultipartFile file) throws IOException {
        String photoUrl = userService.updateProfilePicture(file);
        return ResponseEntity.ok(photoUrl);
    }
} 