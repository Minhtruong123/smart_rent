package com.cots.dto.request;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
public record PropertyRequestDTO(
        String title,
        String description,
        String address,
        String ward,
        String district,
        String city,
        Double area,
        Double price,
        String type,
        String status,
        Integer bedrooms,
        Integer bathrooms,
        Integer totalRooms,
        List<Long> amenityIds,
        List<String> imageUrls
) {
}
