package com.mahmud.aws_cloud_native_contacts.controller;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.mahmud.aws_cloud_native_contacts.dto.auth.AuthRequest;
import com.mahmud.aws_cloud_native_contacts.dto.auth.AuthResponse;
import com.mahmud.aws_cloud_native_contacts.dto.auth.ForgotPasswordRequest;
import com.mahmud.aws_cloud_native_contacts.dto.auth.RegisterRequest;
import com.mahmud.aws_cloud_native_contacts.dto.auth.ResetPasswordRequest;
import com.mahmud.aws_cloud_native_contacts.service.AuthService;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> authenticate(@Valid @RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.authenticate(request));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<Void> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        authService.forgotPassword(request);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/reset-password")
    public ResponseEntity<Void> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
        authService.resetPassword(request);
        return ResponseEntity.ok().build();
    }
} 