package com.cots.controller;

import com.cots.dto.request.PropertyRequestDTO;
import com.cots.service.implement.PropertyService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/property")
@RequiredArgsConstructor
public class PropertyController extends AbstractController{
    private final PropertyService propertyService;
    @GetMapping("/list")
    public ResponseEntity<?> getList(@RequestParam(defaultValue = "0") int page,
                                     @RequestParam(defaultValue = "6") int size,
                                     @RequestParam(required = false) String title,
                                     @RequestParam(required = false) String type,
                                     @RequestParam(required = false) Double minPrice,
                                     @RequestParam(required = false) Double maxPrice,
                                     @RequestParam(required = false) Integer bedrooms){
        return ResponseEntity.ok(propertyService.getPropertiesForPage(page, size, title, type, minPrice, maxPrice, bedrooms));
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getDetail(@PathVariable Long id) {
        return ok(propertyService.getPropertyDetail(id));
    }
    @GetMapping("/owner-list")
    public ResponseEntity<?> getOwnerProperties(Principal principal,
                                                @RequestParam(defaultValue = "0") int page,
                                                @RequestParam(defaultValue = "6") int size){
        String email = principal.getName();
        return ok(propertyService.getPropertiesByOwner(email, page, size));
    }
    @PostMapping("/owner")
    public ResponseEntity<?> createProperty(@RequestBody PropertyRequestDTO request, Principal principal) {
        return ok(propertyService.createProperty(principal.getName(), request));
    }

    @PutMapping("/owner/{id}")
    public ResponseEntity<?> updateProperty(@PathVariable Long id,
                                            @RequestBody PropertyRequestDTO request,
                                            Principal principal) {
        return ResponseEntity.ok(propertyService.updateProperty(id, principal.getName(), request));
    }

    @DeleteMapping("/owner/{id}")
    public ResponseEntity<?> deleteProperty(@PathVariable Long id, Principal principal) {
        propertyService.deleteProperty(id, principal.getName());
        return ResponseEntity.ok().body("Xóa bất động sản thành công");
    }
}
