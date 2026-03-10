package com.cots.dto.request;

import lombok.Builder;

@Builder
public record RentalRequestStatusDTO(
        boolean hasHistory,
        String latestStatus,
        boolean canRequest) {
}
