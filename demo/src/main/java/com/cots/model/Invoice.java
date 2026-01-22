package com.cots.model;

import com.cots.enums.InvoiceStatus;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "invoices")
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @ManyToOne
    @JsonManagedReference
    @JoinColumn(referencedColumnName = "id")
    RentalContract contract;
    Double rentalFee;
    Double serviceFee;
    Double utilityFee;
    Double totalAmount;
    LocalDate dueDate;
    @Enumerated(EnumType.STRING)
    InvoiceStatus status;
}
