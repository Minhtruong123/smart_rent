package com.cots.dto.response;

import lombok.Builder;

@Builder
public record ImageDTO(
        String url,
        boolean isMain
) {
}
