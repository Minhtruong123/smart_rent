package com.cots.service;

import com.cots.dto.request.RentalRequestDTO;
import com.cots.dto.request.RentalRequestStatusDTO;

public interface IRentalRequestService {
    void createRequest(RentalRequestDTO dto, String tenantEmail);
    public void approveRequest(Long requestId);
    RentalRequestStatusDTO checkUserRequestStatus(Long id, String tenantEmail);
}
