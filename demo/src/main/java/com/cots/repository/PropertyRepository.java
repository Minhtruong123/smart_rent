package com.cots.repository;

import com.cots.model.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {
    @Query("SELECT p FROM Property p")
    List<Property> findAllWithDetails();
}
