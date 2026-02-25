package com.cots.model;

import com.cots.enums.PropertyStatus;
import com.cots.enums.PropertyType;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "properties")
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Property {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String title;
    @Column(columnDefinition = "TEXT")
    String description;
    String address;
    String ward;
    String district;
    String city;
    Double area;
    Double price;
    @Enumerated(EnumType.STRING)
    PropertyType type;
    PropertyStatus status;
    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL)
    List<PropertyImage> propertyImages;
    @OneToOne(mappedBy = "property")
    ApartmentDetail apartmentDetails;
    @OneToOne(mappedBy = "property")
    private HouseDetail houseDetails;
    @OneToOne(mappedBy = "property")
    private RoomDetail roomDetails;
    @ManyToOne
    @JsonManagedReference
    @JoinColumn(referencedColumnName = "id")
    User owner;
    @CreationTimestamp
    LocalDateTime createdAt;
}
