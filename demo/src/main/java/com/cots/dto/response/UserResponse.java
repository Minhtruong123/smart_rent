package com.cots.dto.response;

import lombok.Builder;

@Builder
public record UserResponse (
        Long id,
        String email,
        String fullName,
        String phoneNumber,
        String role
){}
