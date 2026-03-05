package com.cots.repository;

import com.cots.model.Property;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {
    @Query("SELECT p FROM Property p")
    List<Property> findAllWithDetails();
    Page<Property> findByOwner_Email(String email, Pageable pageable);
    Optional<Property> findByIdAndOwner_Email(Long id, String email);
}
