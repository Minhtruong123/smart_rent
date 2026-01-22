package com.cots.model;

import com.cots.enums.RentalRequestStatus;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "rental_requests")
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RentalRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @ManyToOne
    @JsonManagedReference
    @JoinColumn(referencedColumnName = "id")
    User tenant;
    @ManyToOne
    @JsonManagedReference
    @JoinColumn(referencedColumnName = "id")
    Property property;
    @Enumerated(EnumType.STRING)
    RentalRequestStatus status;
    @CreationTimestamp
    LocalDateTime createdAt;
}
