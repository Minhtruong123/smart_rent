package com.cots.service;

import com.cots.dto.response.PropertyDTO;
import com.cots.model.Property;
import org.springframework.data.domain.Page;

import java.util.List;

public interface IPropertyService {
    Page<PropertyDTO> getPropertiesForPage(int page, int size);
    PropertyDTO getPropertyDetail(Long id);
    PropertyDTO convertToDTO(Property p);
}
