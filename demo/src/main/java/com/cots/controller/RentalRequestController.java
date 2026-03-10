package com.cots.controller;

import com.cots.dto.request.RentalRequestDTO;
import com.cots.dto.request.RentalRequestStatusDTO;
import com.cots.service.implement.RentalRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/rental-requests")
@RequiredArgsConstructor
public class RentalRequestController extends AbstractController{
    private final RentalRequestService rentalRequestService;
    @PostMapping
    public ResponseEntity<String> sendRequest(
            @RequestBody RentalRequestDTO dto,
            Principal principal) {
        rentalRequestService.createRequest(dto, principal.getName());
        return ResponseEntity.ok("Yêu cầu của bạn đã được gửi!");
    }

    @PostMapping("/{requestId}/approve")
    public ResponseEntity<String> approve(@PathVariable Long requestId) {
        rentalRequestService.approveRequest(requestId);
        return ResponseEntity.ok("Hợp đồng đã được tạo thành công!");
    }
    @GetMapping("/check")
    public ResponseEntity<?> checkStatus(@RequestParam Long propertyId, Principal principal) {
        if (principal == null) {
            return ResponseEntity.ok(new RentalRequestStatusDTO(false, null, true));
        }
        return ResponseEntity.ok(rentalRequestService.checkUserRequestStatus(propertyId, principal.getName()));
    }
}
