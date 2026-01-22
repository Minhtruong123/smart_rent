package com.cots.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "room_details")
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoomDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @OneToOne
    @MapsId
    Property property;
    Integer capacity;
    Boolean hasRooftop;
}
