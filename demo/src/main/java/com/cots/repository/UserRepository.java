package com.cots.repository;

import com.cots.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmailAndActiveTrue(String email);
    boolean existsByEmail(String email);
    Optional<User> findByEmail(String email);
    @Query("SELECT p.owner FROM Property p WHERE p.id = :propertyId")
    Optional<User> findOwnerByPropertyId(@Param("propertyId") Long propertyId);
}
