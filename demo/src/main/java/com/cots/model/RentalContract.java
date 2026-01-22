package com.cots.model;

import com.cots.enums.ContractStatus;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "rental_contracts")
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RentalContract {
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
    LocalDate startDate;
    LocalDate endDate;
    Double monthlyRent;
    Double deposit;
    @Enumerated(EnumType.STRING)
    ContractStatus status;
}
