package com.cots.repository;

import com.cots.model.RentalRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RentalRequestRepository extends JpaRepository<RentalRequest, Long> {
    @Query("SELECT r FROM RentalRequest r " +
            "WHERE r.property.id = :propertyId AND r.tenant.email = :email " +
            "ORDER BY r.createdAt DESC")
    List<RentalRequest> findRequestHistory(
            @Param("propertyId") Long propertyId,
            @Param("email") String email
    );
    List<RentalRequest> findByTenant_EmailOrderByCreatedAtDesc(String email);
    List<RentalRequest> findByProperty_Owner_EmailOrderByCreatedAtDesc(String email);
}
