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

    @PostMapping("/owner/approve/{requestId}")
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
    @GetMapping("/me")
    public ResponseEntity<?> getMyRentalRequests(Principal principal){
        return ResponseEntity.ok(rentalRequestService.getMyRequests(principal.getName()));
    }
    @GetMapping("/owner/me")
    public ResponseEntity<?> getOwnerRentalRequest(Principal principal){
        var ownerRequests = rentalRequestService.getOwnerRequests(principal.getName());
        return ResponseEntity.ok(ownerRequests);
    }
    @PostMapping("/owner/reject/{id}")
    public ResponseEntity<?> rejectRequest(@PathVariable Long id) {
        try {
            rentalRequestService.rejectRequest(id);
            return ResponseEntity.ok("Đã từ chối yêu cầu thuê thành công!");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @DeleteMapping("/cancel/{id}")
    public ResponseEntity<?> cancelRequest(@PathVariable Long id, Principal principal){
        try {
            rentalRequestService.cancelRequest(id, principal.getName());
            return noContent();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
