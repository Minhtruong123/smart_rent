package com.cots.dto.response;

public record OwnerDTO(
        String fullName,
        String email,
        String phone,
        String avatarUrl
) {
}
