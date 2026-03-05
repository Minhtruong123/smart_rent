package com.cots.service;

import com.cots.dto.request.PropertyRequestDTO;
import com.cots.dto.response.AmenityDTO;
import com.cots.dto.response.PropertyDTO;
import com.cots.model.Property;
import org.springframework.data.domain.Page;

import java.util.List;

public interface IPropertyService {
    Page<PropertyDTO> getPropertiesForPage(int page, int size);
    PropertyDTO getPropertyDetail(Long id);
    List<AmenityDTO> mapAmenities(Property p);
    PropertyDTO convertToDTO(Property p);
    Page<PropertyDTO> getPropertiesByOwner(String email, int page, int size);
    PropertyDTO createProperty(String email, PropertyRequestDTO request);
    PropertyDTO updateProperty(Long id, String email, PropertyRequestDTO request);
    void deleteProperty(Long id, String email);
}
