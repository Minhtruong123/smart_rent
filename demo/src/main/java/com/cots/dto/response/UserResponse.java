package com.cots.dto.response;

import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record UserResponse (
        Long id,
        String email,
        String fullName,
        String phoneNumber,
        String role,
        LocalDateTime createdAt
){}
