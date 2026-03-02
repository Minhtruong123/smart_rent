package com.cots.dto.response;

import lombok.Builder;

@Builder
public record AmenityDTO(
        String name,
        String icon
) {
}
