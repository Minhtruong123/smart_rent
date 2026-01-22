package com.cots.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "apartment_details")
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ApartmentDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @OneToOne
    @MapsId
    Property property;
    Integer floor;
    Integer bedrooms;
    Integer bathrooms;
}
