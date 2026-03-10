package com.cots.dto.response;

import com.cots.enums.RentalRequestStatus;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record RentalRequestResponse(
        Long id,
        String tenantName,
        String propertyTitle,
        String message,
        RentalRequestStatus status,
        LocalDateTime createdAt) {
}
