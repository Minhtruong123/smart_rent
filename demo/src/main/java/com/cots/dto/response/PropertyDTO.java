package com.cots.dto.response;

import lombok.Builder;

import java.util.List;
@Builder
public record PropertyDTO(
        Long id,
        String image,
        String badge,
        String price,
        String title,
        String location,
        String type,
        String bedrooms,
        Integer bathrooms,
        String totalRooms,
        String area,
        List<ImageDTO> images,
        List<AmenityDTO> amenities
) {
}
