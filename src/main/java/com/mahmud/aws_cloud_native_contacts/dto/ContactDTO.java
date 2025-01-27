package com.mahmud.aws_cloud_native_contacts.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ContactDTO {
    private Long id;

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Phone number is required")
    private String phoneNumber;

    @Email(message = "Invalid email format")
    private String email;

    private String description;

    private String address;

    private String photoUrl;
} 