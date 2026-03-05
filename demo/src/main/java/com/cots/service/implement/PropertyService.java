package com.cots.service.implement;

import com.cots.dto.request.PropertyRequestDTO;
import com.cots.dto.response.AmenityDTO;
import com.cots.dto.response.ImageDTO;
import com.cots.dto.response.PropertyDTO;
import com.cots.enums.PropertyStatus;
import com.cots.enums.PropertyType;
import com.cots.model.*;
import com.cots.repository.PropertyRepository;
import com.cots.repository.UserRepository;
import com.cots.service.IPropertyService;
import jakarta.transaction.Transactional;
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
    private final UserRepository userRepository;
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

    @Override
    @Transactional
    public Page<PropertyDTO> getPropertiesByOwner(String email, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());

        return propertyRepository.findByOwner_Email(email, pageable)
                .map(this::convertToDTO);
    }

    @Override
    @Transactional
    public PropertyDTO createProperty(String email, PropertyRequestDTO request) {
        User owner = userRepository.findByEmailAndActiveTrue(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Property property = Property.builder()
                .title(request.title())
                .description(request.description())
                .address(request.address())
                .ward(request.ward())
                .district(request.district())
                .city(request.city())
                .area(request.area())
                .price(request.price())
                .type(PropertyType.valueOf(request.type().toUpperCase()))
                .status(PropertyStatus.valueOf(request.status().toUpperCase()))
                .owner(owner)
                .build();

        savePropertyDetails(property, request);

        return convertToDTO(propertyRepository.save(property));
    }

    @Override
    @Transactional
    public PropertyDTO updateProperty(Long id, String email, PropertyRequestDTO request) {
        Property property = propertyRepository.findByIdAndOwner_Email(id, email)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy BĐS hoặc bạn không có quyền sửa"));

        property.setTitle(request.title());
        property.setDescription(request.description());
        property.setPrice(request.price());
        property.setStatus(PropertyStatus.valueOf(request.status().toUpperCase()));

        savePropertyDetails(property, request);

        return convertToDTO(propertyRepository.save(property));
    }

    @Override
    public void deleteProperty(Long id, String email) {
        Property property = propertyRepository.findByIdAndOwner_Email(id, email)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy BĐS hoặc bạn không có quyền xóa"));

        propertyRepository.delete(property);
    }

    private void savePropertyDetails(Property property, PropertyRequestDTO request) {
        if (request.type() == null) return;

        if ("APARTMENT".equalsIgnoreCase(request.type())) {
            ApartmentDetail detail = property.getApartmentDetails();
            if (detail == null) {
                detail = new ApartmentDetail();
                detail.setProperty(property);
            }
            detail.setBedrooms(request.bedrooms() != null ? request.bedrooms() : 0);
            detail.setBathrooms(request.bathrooms() != null ? request.bathrooms() : 0);
            property.setApartmentDetails(detail);

        } else if ("HOUSE".equalsIgnoreCase(request.type())) {
            HouseDetail detail = property.getHouseDetails();
            if (detail == null) {
                detail = new HouseDetail();
                detail.setProperty(property);
            }
            detail.setTotalRooms(request.totalRooms() != null ? request.totalRooms() : 0);
            property.setHouseDetails(detail);

        } else if ("ROOM".equalsIgnoreCase(request.type())) {
            RoomDetail detail = property.getRoomDetails();
            if (detail == null) {
                detail = new RoomDetail();
                detail.setProperty(property);
            }
            property.setRoomDetails(detail);
        }
    }
}
