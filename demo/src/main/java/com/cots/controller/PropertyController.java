package com.cots.controller;

import com.cots.service.implement.PropertyService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/property")
@RequiredArgsConstructor
public class PropertyController extends AbstractController{
    @Autowired
    PropertyService propertyService;
    @GetMapping("/list")
    public ResponseEntity<?> getList(@RequestParam(defaultValue = "0") int page,
                                     @RequestParam(defaultValue = "6") int size){
        return ResponseEntity.ok(propertyService.getPropertiesForPage(page, size));
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getDetail(@PathVariable Long id) {
        return ok(propertyService.getPropertyDetail(id));
    }
}
