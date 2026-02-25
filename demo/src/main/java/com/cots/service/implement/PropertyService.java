package com.cots.service.implement;

import com.cots.dto.response.PropertyDTO;
import com.cots.model.Property;
import com.cots.model.PropertyImage;
import com.cots.repository.PropertyRepository;
import com.cots.service.IPropertyService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PropertyService implements IPropertyService {
    @Autowired
    PropertyRepository propertyRepository;
    @Override
    public List<PropertyDTO> getPropertiesForPage() {
        return propertyRepository.findAll().stream()
                .map(this::convertToDTO)
                .toList();
    }

    @Override
    public PropertyDTO convertToDTO(Property p) {
        String location = String.format("%s, %s, %s", p.getWard(), p.getDistrict(), p.getCity());
        String bedrooms = "0";
        Integer bathrooms = 0;
        String totalRooms = "0";

        if ("apartment".equalsIgnoreCase(p.getType().toString()) && p.getApartmentDetails() != null) {
            bedrooms = String.valueOf(p.getApartmentDetails().getBedrooms());
            bathrooms = p.getApartmentDetails().getBathrooms();
        } else if ("house".equalsIgnoreCase(p.getType().toString()) && p.getHouseDetails() != null) {
            totalRooms = String.valueOf(p.getHouseDetails().getTotalRooms());
        } else if ("room".equalsIgnoreCase(p.getType().toString()) && p.getRoomDetails() != null) {
            bedrooms = "Studio";
            bathrooms = 1;
        }

        return new PropertyDTO(
                p.getId(),
                p.getPropertyImages().stream()
                        .filter(PropertyImage::getIsMain)
                        .findFirst()
                        .map(PropertyImage::getImageUrl)
                        .orElse("default_image.jpg"), // Map từ properties.image_url
                p.getStatus().toString(),
                String.format("%,.0f VNĐ/tháng", p.getPrice()),
                p.getTitle(),
                location,
                bedrooms,
                bathrooms,
                totalRooms,
                p.getArea() + "m²"
        );
    }
}
