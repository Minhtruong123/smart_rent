package com.cots.service.implement;

import com.cots.dto.request.RentalRequestDTO;
import com.cots.dto.request.RentalRequestStatusDTO;
import com.cots.enums.ContractStatus;
import com.cots.enums.RentalRequestStatus;
import com.cots.model.Property;
import com.cots.model.RentalContract;
import com.cots.model.RentalRequest;
import com.cots.model.User;
import com.cots.repository.PropertyRepository;
import com.cots.repository.RentalContractRepository;
import com.cots.repository.RentalRequestRepository;
import com.cots.repository.UserRepository;
import com.cots.service.IRentalRequestService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RentalRequestService implements IRentalRequestService {
    private final RentalRequestRepository rentalRequestRepository;
    private final RentalContractRepository contractRepository;
    private final UserRepository userRepository;
    private final PropertyRepository propertyRepository;
    @Transactional
    @Override
    public void createRequest(RentalRequestDTO dto, String tenantEmail) {
        User tenant = userRepository.findByEmail(tenantEmail)
                .orElseThrow(() -> new RuntimeException("Người dùng không tồn tại"));
        Property property = propertyRepository.findById(dto.id())
                .orElseThrow(() -> new RuntimeException("Bất động sản không tồn tại"));

        RentalRequest request = RentalRequest.builder()
                .tenant(tenant)
                .property(property)
                .status(RentalRequestStatus.PENDING)
                .build();
        rentalRequestRepository.save(request);
    }

    @Override
    public void approveRequest(Long requestId) {
        RentalRequest request = rentalRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request không tồn tại"));

        request.setStatus(RentalRequestStatus.APPROVED);
        rentalRequestRepository.save(request);

        RentalContract contract = RentalContract.builder()
                .tenant(request.getTenant())
                .property(request.getProperty())
                .startDate(LocalDate.now())
                .endDate(LocalDate.now().plusMonths(12))
                .monthlyRent(request.getProperty().getPrice())
                .status(ContractStatus.ACTIVE)
                .build();
        contractRepository.save(contract);
    }

    @Override
    public RentalRequestStatusDTO checkUserRequestStatus(Long id, String tenantEmail) {
        List<RentalRequest> history = rentalRequestRepository.findRequestHistory(id, tenantEmail);

        if (history.isEmpty()) {
            return new RentalRequestStatusDTO(false, null, true);
        }

        RentalRequest latestRequest = history.get(0);
        RentalRequestStatus status = latestRequest.getStatus();

        boolean canRequest = (status == RentalRequestStatus.REJECTED);

        return new RentalRequestStatusDTO(true, status.name(), canRequest);
    }
}
