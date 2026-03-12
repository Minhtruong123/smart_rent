package com.cots.dto.response;

import lombok.Builder;

@Builder
public record OwnerRentalRequestDTO(
        Long id,
        String status,
        String requestDate,
        String message,
        PropertyInfo property,
        TenantInfo tenant
) {
    public record PropertyInfo(
            String title,
            String address,
            Double price,
            String image
    ) {}

    public record TenantInfo(
            String name,
            String phone,
            String email,
            String avatar,
            String idNumber,
            String idIssueDate,
            String idIssuePlace,
            String occupation
    ) {}
}
