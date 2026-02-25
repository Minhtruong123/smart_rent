package com.cots.controller;

import com.cots.service.implement.PropertyService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/property")
@RequiredArgsConstructor
public class PropertyController extends AbstractController{
    @Autowired
    PropertyService propertyService;
    @GetMapping("/list")
    public ResponseEntity<?> getList(){
        return ResponseEntity.ok(propertyService.getPropertiesForPage());
    }
}
