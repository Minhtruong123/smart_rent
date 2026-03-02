package com.cots.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "amenities")
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Amenity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String name;
    String icon;
}
