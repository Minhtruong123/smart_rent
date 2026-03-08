package com.cots.repository;

import com.cots.enums.PropertyType;
import com.cots.model.Property;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {
    Page<Property> findByOwner_Email(String email, Pageable pageable);
    Optional<Property> findByIdAndOwner_Email(Long id, String email);
    Page<Property> findByTitleContainingIgnoreCase(Pageable pageable, String title);
    @Query("SELECT p FROM Property p " +
            "LEFT JOIN p.apartmentDetails ad " +
            "LEFT JOIN p.houseDetails hd " +
            "WHERE (:title IS NULL OR LOWER(p.title) LIKE LOWER(CONCAT('%', :title, '%'))) AND " +
            "(:type IS NULL OR p.type = :type) AND " +
            "(:minPrice IS NULL OR p.price >= :minPrice) AND " +
            "(:maxPrice IS NULL OR p.price <= :maxPrice) AND " +
            "(:bedrooms IS NULL OR " +
            "  (p.type = 'APARTMENT' AND ad.bedrooms >= :bedrooms) OR " +
            "  (p.type = 'HOUSE' AND hd.totalRooms >= :bedrooms)" +
            ")")
    Page<Property> searchProperties(
            @Param("title") String title,
            @Param("type") PropertyType type,
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice,
            @Param("bedrooms") Integer bedrooms,
            Pageable pageable);
}
