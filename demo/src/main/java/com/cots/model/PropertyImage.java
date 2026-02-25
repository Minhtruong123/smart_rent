package com.cots.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "property_images")
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PropertyImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @Column(name = "image_url")
    String imageUrl;
    @Column(name = "is_main")
    Boolean isMain = false;
    @ManyToOne
    @JsonManagedReference
    @JoinColumn(referencedColumnName = "id")
    Property property;
}
