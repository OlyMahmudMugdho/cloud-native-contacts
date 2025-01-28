package com.mahmud.aws_cloud_native_contacts.dto.auth;

import com.mahmud.aws_cloud_native_contacts.dto.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private UserDTO user;
} 