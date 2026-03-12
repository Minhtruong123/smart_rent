package com.cots.service.implement;

import com.cots.dto.request.RentalRequestDTO;
import com.cots.dto.request.RentalRequestStatusDTO;
import com.cots.dto.response.OwnerRentalRequestDTO;
import com.cots.dto.response.RentalRequestResponse;
import com.cots.dto.response.myRentalRequestDTO;
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

    @Override
    public List<myRentalRequestDTO> getMyRequests(String tenantEmail) {
        List<RentalRequest> requests = rentalRequestRepository.findByTenant_EmailOrderByCreatedAtDesc(tenantEmail);

        return requests.stream().map(req -> {
            Property property = req.getProperty();
            User owner = property.getOwner();

            return myRentalRequestDTO.builder()
                    .id(req.getId())
                    .createdAt(req.getCreatedAt())
                    .propertyName(property.getTitle())
                    .ownerName(owner != null ? owner.getFullName() : "Đang cập nhật")
                    .ownerAvatar(owner != null ? owner.getAvatarUrl() : null)
                    .price(property.getPrice())
                    .status(req.getStatus().name())
                    .build();
        }).toList();
    }

    @Override
    @Transactional
    public void cancelRequest(Long rentalRequestId, String email) {
        RentalRequest request = rentalRequestRepository.findById(rentalRequestId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy yêu cầu thuê"));

        if (!request.getTenant().getEmail().equals(email)) {
            throw new RuntimeException("Bạn không có quyền hủy yêu cầu này");
        }

        if (request.getStatus() != RentalRequestStatus.PENDING) {
            throw new RuntimeException("Chỉ có thể hủy yêu cầu đang ở trạng thái chờ duyệt");
        }

        rentalRequestRepository.delete(request);
    }

    @Override
    public List<OwnerRentalRequestDTO> getOwnerRequests(String ownerEmail) {
        List<RentalRequest> requests = rentalRequestRepository.findByProperty_Owner_EmailOrderByCreatedAtDesc(ownerEmail);
        return requests.stream().map(req -> {
            Property property = req.getProperty();
            User tenant = req.getTenant();

            String mainImage = null;
            if (property.getPropertyImages() != null && !property.getPropertyImages().isEmpty()) {
                mainImage = property.getPropertyImages().stream()
                        .filter(img -> img.getIsMain() != null && img.getIsMain())
                        .findFirst()
                        .map(img -> img.getImageUrl())
                        .orElse(property.getPropertyImages().get(0).getImageUrl());
            }

            String fullAddress = property.getAddress() != null ? property.getAddress() : "";
            if (property.getWard() != null) fullAddress += ", " + property.getWard();
            if (property.getDistrict() != null) fullAddress += ", " + property.getDistrict();
            if (property.getCity() != null) fullAddress += ", " + property.getCity();

            OwnerRentalRequestDTO.PropertyInfo propertyInfo = new OwnerRentalRequestDTO.PropertyInfo(
                    property.getTitle(),
                    fullAddress,
                    property.getPrice(),
                    mainImage
            );

            OwnerRentalRequestDTO.TenantInfo tenantInfo = new OwnerRentalRequestDTO.TenantInfo(
                    tenant.getFullName() != null ? tenant.getFullName() : "Khách hàng",
                    tenant.getPhone() != null ? tenant.getPhone() : "Chưa có SĐT",
                    tenant.getEmail(),
                    tenant.getAvatarUrl(),
                    "Đang cập nhật",
                    "Đang cập nhật",
                    "Đang cập nhật",
                    "Đang cập nhật"
            );

            return OwnerRentalRequestDTO.builder()
                    .id(req.getId())
                    .status(req.getStatus().name())
                    .requestDate(req.getCreatedAt() != null ? req.getCreatedAt().toString() : null)
                    .message("Khách hàng quan tâm đến bất động sản của bạn.")
                    .property(propertyInfo)
                    .tenant(tenantInfo)
                    .build();
        }).toList();
    }

    @Override
    public void rejectRequest(Long requestId) {
        RentalRequest request = rentalRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Yêu cầu không tồn tại"));

        if (request.getStatus() != RentalRequestStatus.PENDING) {
            throw new RuntimeException("Chỉ có thể từ chối yêu cầu đang ở trạng thái chờ duyệt");
        }

        request.setStatus(RentalRequestStatus.REJECTED);
        rentalRequestRepository.save(request);
    }
}
