package com.cots.dto.response;

import lombok.Builder;

import java.time.LocalDateTime;
@Builder
public record myRentalRequestDTO(
        Long id,
        LocalDateTime createdAt,
        String propertyName,
        String ownerName,
        String ownerAvatar,
        Double price,
        String status
) {
}
