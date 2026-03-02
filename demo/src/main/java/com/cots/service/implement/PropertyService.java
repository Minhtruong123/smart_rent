package com.cots.service.implement;

import com.cots.dto.response.AmenityDTO;
import com.cots.dto.response.ImageDTO;
import com.cots.dto.response.PropertyDTO;
import com.cots.model.Property;
import com.cots.model.PropertyImage;
import com.cots.repository.PropertyRepository;
import com.cots.service.IPropertyService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class PropertyService implements IPropertyService {
    @Autowired
    private PropertyRepository propertyRepository;
    private List<ImageDTO> mapImages(Property p) {
        return p.getPropertyImages().stream()
                .map(img -> ImageDTO.builder()
                        .url(img.getImageUrl())
                        .isMain(img.getIsMain())
                        .build())
                .toList();
    }

    @Override
    public Page<PropertyDTO> getPropertiesForPage(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return propertyRepository.findAll(pageable)
                .map(this::convertToDTO);
    }

    @Override
    public PropertyDTO getPropertyDetail(Long id) {
        Property p = propertyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Property not found"));
        return convertToDTO(p);
    }

    @Override
    public List<AmenityDTO> mapAmenities(Property p) {
        if (p.getPropertyAmenities() == null) return List.of();

        return p.getPropertyAmenities().stream()
                .map(pa -> AmenityDTO.builder()
                        .name(pa.getAmenity().getName())
                        .icon(pa.getAmenity().getIcon())
                        .build())
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

        return PropertyDTO.builder()
                .id(p.getId())
                .image(p.getPropertyImages().stream()
                        .filter(PropertyImage::getIsMain)
                        .findFirst()
                        .map(PropertyImage::getImageUrl)
                        .orElse("default_image.jpg"))
                .price(String.format("%,.0f VNĐ/tháng", p.getPrice()))
                .title(p.getTitle())
                .location(location)
                .type(p.getType().toString())
                .bedrooms(bedrooms)
                .bathrooms(bathrooms)
                .totalRooms(totalRooms)
                .area(p.getArea() + "m²")
                .images(mapImages(p))
                .amenities(mapAmenities(p))
                .build();
    }
}
