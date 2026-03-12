package com.cots.service;

import com.cots.dto.request.RentalRequestDTO;
import com.cots.dto.request.RentalRequestStatusDTO;
import com.cots.dto.response.OwnerRentalRequestDTO;
import com.cots.dto.response.myRentalRequestDTO;

import java.util.List;

public interface IRentalRequestService {
    void createRequest(RentalRequestDTO dto, String tenantEmail);
    public void approveRequest(Long requestId);
    RentalRequestStatusDTO checkUserRequestStatus(Long id, String tenantEmail);
    List<myRentalRequestDTO> getMyRequests(String tenantEmail);
    void cancelRequest(Long rentalRequestId, String email);
    List<OwnerRentalRequestDTO> getOwnerRequests(String ownerEmail);
    void rejectRequest(Long requestId);
}
