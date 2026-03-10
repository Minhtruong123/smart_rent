package com.cots.dto.request;

import lombok.Builder;
@Builder
public record RentalRequestDTO(
        Long id,
        String message) {
}
