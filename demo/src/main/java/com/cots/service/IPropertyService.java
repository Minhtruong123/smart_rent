package com.cots.service;

import com.cots.dto.response.PropertyDTO;
import com.cots.model.Property;

import java.util.List;

public interface IPropertyService {
    List<PropertyDTO> getPropertiesForPage();
    PropertyDTO convertToDTO(Property p);
}
