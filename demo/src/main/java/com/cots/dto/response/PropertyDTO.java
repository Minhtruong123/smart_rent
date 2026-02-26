package com.cots.dto.response;

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
        String area
) {
}
