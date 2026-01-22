package com.cots.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "house_details")
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class HouseDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @OneToOne
    @MapsId
    Property property;
    Integer numberOfFloors;
    Integer totalRooms;
    Boolean hasYard;
}
