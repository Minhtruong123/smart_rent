import React, { useState, useEffect } from "react";
import styles from "./DetailRealEstatePage.module.css";

export default function DetailRealEstatePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isActionBarVisible, setIsActionBarVisible] = useState(false);
  const [isBackToTopVisible, setIsBackToTopVisible] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const galleryImages = [
    {
      large:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80",
      thumb:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=200&q=80",
      alt: "Tổng quan căn hộ",
    },
    {
      large:
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80",
      thumb:
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=200&q=80",
      alt: "Phòng khách",
    },
    {
      large:
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=80",
      thumb:
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=200&q=80",
      alt: "Phòng bếp",
    },
    {
      large:
        "https://images.unsplash.com/photo-1560185007-5f0bb1866cab?w=1200&q=80",
      thumb:
        "https://images.unsplash.com/photo-1560185007-5f0bb1866cab?w=200&q=80",
      alt: "Phòng ngủ chính",
    },
    {
      large:
        "https://images.unsplash.com/photo-1564540583246-934409427776?w=1200&q=80",
      thumb:
        "https://images.unsplash.com/photo-1564540583246-934409427776?w=200&q=80",
      alt: "Phòng tắm",
    },
  ];

  const similarProperties = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
      price: "5.5 triệu/tháng",
      title: "Căn hộ Sunrise City",
      location: "Quận 7, TP.HCM",
      bedrooms: 1,
      bathrooms: 1,
      area: "55m²",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      price: "7.2 triệu/tháng",
      title: "Căn hộ Masteri Thảo Điền",
      location: "Quận 2, TP.HCM",
      bedrooms: 2,
      bathrooms: 2,
      area: "70m²",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80",
      price: "3.5 triệu/tháng",
      title: "Studio Lexington Residence",
      location: "Quận 2, TP.HCM",
      bedrooms: "Studio",
      bathrooms: 1,
      area: "35m²",
    },
  ];

  const amenities = [
    { icon: "fas fa-wifi", text: "Wi-Fi tốc độ cao" },
    { icon: "fas fa-snowflake", text: "Điều hòa trung tâm" },
    { icon: "fas fa-tv", text: 'Smart TV 55"' },
    { icon: "fas fa-parking", text: "Chỗ đỗ xe" },
    { icon: "fas fa-swimming-pool", text: "Hồ bơi" },
    { icon: "fas fa-dumbbell", text: "Phòng gym" },
    { icon: "fas fa-shield-alt", text: "An ninh 24/7" },
    { icon: "fas fa-utensils", text: "Bếp đầy đủ thiết bị" },
    { icon: "fas fa-wind", text: "Ban công rộng" },
    { icon: "fas fa-tshirt", text: "Máy giặt & Máy sấy" },
  ];

  const nearbyPlaces = [
    { icon: "fas fa-store", text: "Vincom Center", distance: "50m" },
    {
      icon: "fas fa-utensils",
      text: "Nhà hàng The Coffee House",
      distance: "100m",
    },
    { icon: "fas fa-hospital", text: "Bệnh viện Vinmec", distance: "200m" },
    {
      icon: "fas fa-school",
      text: "Trường Quốc tế Vinschool",
      distance: "300m",
    },
    { icon: "fas fa-bus", text: "Trạm xe buýt", distance: "150m" },
    { icon: "fas fa-tree", text: "Công viên trung tâm", distance: "100m" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsActionBarVisible(scrollY > 600);
      setIsBackToTopVisible(scrollY > 300);
    };

    const handleKeyDown = (e) => {
      if (!isModalOpen) return;

      if (e.key === "Escape") {
        setIsModalOpen(false);
      } else if (e.key === "ArrowLeft") {
        setCurrentImageIndex(
          (prev) => (prev - 1 + galleryImages.length) % galleryImages.length,
        );
      } else if (e.key === "ArrowRight") {
        setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen, galleryImages.length]);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const navigateGallery = (direction) => {
    if (direction === "prev") {
      setCurrentImageIndex(
        (prev) => (prev - 1 + galleryImages.length) % galleryImages.length,
      );
    } else {
      setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <div
        className={`${styles.backToTop} ${isBackToTopVisible ? styles.active : ""}`}
        onClick={scrollToTop}
      >
        <i className="fas fa-arrow-up"></i>
      </div>

      {/* Property Details Section */}
      <section className={styles.propertyDetails}>
        <div className={styles.propertyContainer}>
          {/* Breadcrumbs */}
          <div className={styles.breadcrumbs}>
            <a href="/">Trang chủ</a>
            <span className={styles.separator}>
              <i className="fas fa-chevron-right"></i>
            </span>
            <a href="/#properties">Bất động sản</a>
            <span className={styles.separator}>
              <i className="fas fa-chevron-right"></i>
            </span>
            <span>Căn hộ cao cấp Vinhomes Central Park</span>
          </div>

          {/* Property Gallery */}
          <div className={styles.propertyGallery}>
            <div className={styles.galleryMain} onClick={openModal}>
              <img
                src={galleryImages[0].large}
                alt="Căn hộ cao cấp Vinhomes Central Park"
              />
              <button className={styles.viewAllPhotos} onClick={openModal}>
                <i className="fas fa-images"></i> Xem tất cả (
                {galleryImages.length} ảnh)
              </button>
            </div>
            <div className={styles.galleryThumbnails}>
              <div className={styles.galleryThumbnail}>
                <img src={galleryImages[1].thumb} alt={galleryImages[1].alt} />
              </div>
              <div className={styles.galleryThumbnail}>
                <img src={galleryImages[2].thumb} alt={galleryImages[2].alt} />
              </div>
            </div>
          </div>

          {/* Property Content */}
          <div className={styles.propertyContent}>
            <div className={styles.propertyMain}>
              {/* Property Info */}
              <div className={styles.propertyInfo}>
                <div className={styles.propertyHeader}>
                  <div className={styles.propertyBadge}>Hot</div>
                  <h1 className={styles.propertyTitle}>
                    Căn hộ cao cấp Vinhomes Central Park
                  </h1>
                  <div className={styles.propertyLocation}>
                    <i className="fas fa-map-marker-alt"></i> 208 Nguyễn Hữu
                    Cảnh, Quận Bình Thạnh, TP.HCM
                  </div>
                  <div className={styles.propertyPrice}>8.500.000₫ / tháng</div>
                  <div className={styles.propertyPriceNote}>
                    Đã bao gồm phí quản lý, không bao gồm điện nước
                  </div>
                </div>

                <div className={styles.propertyFeatures}>
                  <div className={styles.propertyFeature}>
                    <div className={styles.featureIcon}>
                      <i className="fas fa-bed"></i>
                    </div>
                    <div className={styles.featureText}>Phòng ngủ</div>
                    <div className={styles.featureValue}>2 phòng</div>
                  </div>
                  <div className={styles.propertyFeature}>
                    <div className={styles.featureIcon}>
                      <i className="fas fa-bath"></i>
                    </div>
                    <div className={styles.featureText}>Phòng tắm</div>
                    <div className={styles.featureValue}>2 phòng</div>
                  </div>
                  <div className={styles.propertyFeature}>
                    <div className={styles.featureIcon}>
                      <i className="fas fa-vector-square"></i>
                    </div>
                    <div className={styles.featureText}>Diện tích</div>
                    <div className={styles.featureValue}>75m²</div>
                  </div>
                  <div className={styles.propertyFeature}>
                    <div className={styles.featureIcon}>
                      <i className="fas fa-calendar-alt"></i>
                    </div>
                    <div className={styles.featureText}>Năm xây dựng</div>
                    <div className={styles.featureValue}>2018</div>
                  </div>
                  <div className={styles.propertyFeature}>
                    <div className={styles.featureIcon}>
                      <i className="fas fa-couch"></i>
                    </div>
                    <div className={styles.featureText}>Nội thất</div>
                    <div className={styles.featureValue}>Đầy đủ</div>
                  </div>
                </div>

                <div className={styles.propertyDescription}>
                  <h3>Mô tả</h3>
                  <p>
                    Căn hộ cao cấp Vinhomes Central Park tọa lạc tại vị trí đắc
                    địa của Quận Bình Thạnh, TP.HCM. Với diện tích 75m², căn hộ
                    được thiết kế sang trọng, hiện đại với 2 phòng ngủ và 2
                    phòng tắm, đáp ứng đầy đủ nhu cầu sinh hoạt của gia đình 3-4
                    thành viên.
                  </p>
                  {isDescriptionExpanded && (
                    <>
                      <p>
                        Căn hộ được trang bị đầy đủ nội thất cao cấp, sẵn sàng
                        để ở ngay. Phòng khách rộng rãi với cửa kính lớn đón ánh
                        sáng tự nhiên, mang đến không gian sống thoáng đãng và
                        ấm cúng. Nhà bếp hiện đại với đầy đủ thiết bị như tủ
                        lạnh, bếp từ, lò vi sóng, máy rửa chén...
                      </p>
                      <p>
                        Cư dân Vinhomes Central Park được thừa hưởng hệ thống
                        tiện ích đẳng cấp bao gồm: hồ bơi, phòng gym, spa, khu
                        vui chơi trẻ em, công viên, trường học quốc tế, và trung
                        tâm thương mại Vincom ngay trong khu đô thị. Hệ thống an
                        ninh 24/7 đảm bảo an toàn tuyệt đối cho cư dân.
                      </p>
                      <p>
                        Vị trí đắc địa giúp cư dân dễ dàng di chuyển đến các
                        quận trung tâm như Quận 1, Quận 2 chỉ trong vài phút.
                        Đặc biệt, từ căn hộ có thể ngắm nhìn toàn cảnh sông Sài
                        Gòn và công viên trung tâm rộng 14ha - lá phổi xanh của
                        thành phố.
                      </p>
                    </>
                  )}
                  {!isDescriptionExpanded && (
                    <span
                      className={styles.readMore}
                      onClick={() => setIsDescriptionExpanded(true)}
                    >
                      Xem thêm
                    </span>
                  )}
                </div>
              </div>

              {/* Amenities Section */}
              <div className={styles.propertyAmenities}>
                <h3>Tiện ích</h3>
                <div className={styles.amenitiesGrid}>
                  {amenities.map((amenity, index) => (
                    <div key={index} className={styles.amenityItem}>
                      <div className={styles.amenityIcon}>
                        <i className={amenity.icon}></i>
                      </div>
                      <div className={styles.amenityText}>{amenity.text}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location Section */}
              <div className={styles.propertyLocationInfo}>
                <h3>Vị trí</h3>
                <div className={styles.mapContainer}>
                  <div className={styles.mapPlaceholder}>
                    <i className="fas fa-map-marked-alt"></i>
                    <p>Bản đồ hiển thị vị trí bất động sản</p>
                  </div>
                </div>

                <div className={styles.nearbyPlaces}>
                  <h4>Địa điểm lân cận</h4>
                  <div className={styles.nearbyPlacesList}>
                    {nearbyPlaces.map((place, index) => (
                      <div key={index} className={styles.nearbyPlace}>
                        <i className={place.icon}></i>
                        <div>
                          <div className={styles.nearbyPlaceText}>
                            {place.text}
                          </div>
                          <div className={styles.nearbyPlaceDistance}>
                            {place.distance}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Similar Properties */}
              <div className={styles.similarProperties}>
                <h3>Bất động sản tương tự</h3>
                <div className={styles.similarPropertiesGrid}>
                  {similarProperties.map((property) => (
                    <div
                      key={property.id}
                      className={styles.similarPropertyCard}
                    >
                      <div className={styles.similarPropertyImage}>
                        <img src={property.image} alt={property.title} />
                      </div>
                      <div className={styles.similarPropertyInfo}>
                        <div className={styles.similarPropertyPrice}>
                          {property.price}
                        </div>
                        <h4 className={styles.similarPropertyTitle}>
                          {property.title}
                        </h4>
                        <div className={styles.similarPropertyLocation}>
                          <i className="fas fa-map-marker-alt"></i>{" "}
                          {property.location}
                        </div>
                        <div className={styles.similarPropertyFeatures}>
                          <div className={styles.similarPropertyFeature}>
                            <i className="fas fa-bed"></i> {property.bedrooms}
                          </div>
                          <div className={styles.similarPropertyFeature}>
                            <i className="fas fa-bath"></i> {property.bathrooms}
                          </div>
                          <div className={styles.similarPropertyFeature}>
                            <i className="fas fa-vector-square"></i>{" "}
                            {property.area}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className={styles.propertySidebar}>
              {/* Contact Form */}
              <div className={styles.contactCard}>
                <div className={styles.contactHeader}>
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="Người cho thuê"
                    className={styles.contactAvatar}
                  />
                  <div>
                    <div className={styles.contactName}>Nguyễn Văn An</div>
                    <div className={styles.contactRole}>Chủ nhà</div>
                    <div className={styles.contactRating}>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star-half-alt"></i>
                      <div className={styles.contactRatingScore}>
                        4.5 (28 đánh giá)
                      </div>
                    </div>
                  </div>
                </div>

                <form className={styles.contactForm}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name">Họ tên</label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Nhập họ tên của bạn"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Nhập địa chỉ email"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="phone">Số điện thoại</label>
                    <input
                      type="tel"
                      id="phone"
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="message">Lời nhắn</label>
                    <textarea
                      id="message"
                      placeholder="Nhập lời nhắn cho người cho thuê..."
                    ></textarea>
                  </div>
                </form>

                <div className={styles.contactActions}>
                  <button className={`${styles.btn} ${styles.btnPrimary}`}>
                    <i className="fas fa-paper-plane"></i> Gửi yêu cầu xem nhà
                  </button>
                  <button className={`${styles.btn} ${styles.btnOutline}`}>
                    <i className="fas fa-phone-alt"></i> Gọi trực tiếp
                  </button>
                </div>

                <div className={styles.contactInfo}>
                  <div className={styles.contactInfoItem}>
                    <i className="fas fa-phone-alt"></i> +84 901 234 567
                  </div>
                  <div className={styles.contactInfoItem}>
                    <i className="fas fa-envelope"></i> an.nguyen@gmail.com
                  </div>
                  <div className={styles.contactInfoItem}>
                    <i className="fas fa-clock"></i> Phản hồi trong vòng 24 giờ
                  </div>
                </div>
              </div>

              {/* Booking Widget */}
              <div className={styles.bookingWidget}>
                <h3>Chi tiết giao dịch</h3>
                <div className={styles.bookingDetails}>
                  <div className={styles.bookingDetail}>
                    <div className={styles.bookingDetailLabel}>
                      Tiền thuê hàng tháng
                    </div>
                    <div className={styles.bookingDetailValue}>8.500.000₫</div>
                  </div>
                  <div className={styles.bookingDetail}>
                    <div className={styles.bookingDetailLabel}>Phí quản lý</div>
                    <div className={styles.bookingDetailValue}>Đã bao gồm</div>
                  </div>
                  <div className={styles.bookingDetail}>
                    <div className={styles.bookingDetailLabel}>Tiền cọc</div>
                    <div className={styles.bookingDetailValue}>
                      2 tháng (17.000.000₫)
                    </div>
                  </div>
                  <div className={styles.bookingDetail}>
                    <div className={styles.bookingDetailLabel}>
                      Thời hạn thuê tối thiểu
                    </div>
                    <div className={styles.bookingDetailValue}>12 tháng</div>
                  </div>
                  <div className={styles.bookingDetail}>
                    <div className={styles.bookingDetailLabel}>
                      Ngày có thể vào ở
                    </div>
                    <div className={styles.bookingDetailValue}>15/03/2026</div>
                  </div>
                  <div className={styles.bookingDetail}>
                    <div className={styles.bookingDetailLabel}>
                      Phương thức thanh toán
                    </div>
                    <div className={styles.bookingDetailValue}>3 tháng/lần</div>
                  </div>
                  <div className={styles.bookingDetail}>
                    <div className={styles.bookingDetailLabel}>Điện</div>
                    <div className={styles.bookingDetailValue}>
                      Theo giá nhà nước
                    </div>
                  </div>
                  <div className={styles.bookingDetail}>
                    <div className={styles.bookingDetailLabel}>Nước</div>
                    <div className={styles.bookingDetailValue}>
                      100.000₫/người/tháng
                    </div>
                  </div>
                  <div className={styles.bookingDetail}>
                    <div className={styles.bookingDetailLabel}>Internet</div>
                    <div className={styles.bookingDetailValue}>Miễn phí</div>
                  </div>
                </div>

                <div className={styles.bookingTotal}>
                  <div className={styles.bookingTotalLabel}>
                    Tổng phải trả ban đầu
                  </div>
                  <div className={styles.bookingTotalValue}>25.500.000₫</div>
                </div>

                <div className={styles.contactActions}>
                  <button className={`${styles.btn} ${styles.btnPrimary}`}>
                    <i className="fas fa-calendar-check"></i> Đặt lịch xem nhà
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Action Bar */}
      <div
        className={`${styles.propertyActionBar} ${isActionBarVisible ? styles.visible : ""}`}
      >
        <div className={styles.actionBarPrice}>8.500.000₫ / tháng</div>
        <div className={styles.actionBarButtons}>
          <button className={`${styles.btn} ${styles.btnOutline}`}>
            <i className="fas fa-phone-alt"></i> Gọi ngay
          </button>
          <button className={`${styles.btn} ${styles.btnPrimary}`}>
            <i className="fas fa-paper-plane"></i> Liên hệ
          </button>
        </div>
      </div>

      {/* Gallery Modal */}
      {isModalOpen && (
        <div className={`${styles.galleryModal} ${styles.active}`}>
          <div className={styles.galleryModalContent}>
            <div className={styles.galleryModalClose} onClick={closeModal}>
              <i className="fas fa-times"></i>
            </div>
            <div className={styles.galleryModalImage}>
              <img
                src={galleryImages[currentImageIndex].large}
                alt={galleryImages[currentImageIndex].alt}
              />
            </div>
            <div
              className={`${styles.galleryModalNav} ${styles.galleryModalPrev}`}
              onClick={() => navigateGallery("prev")}
            >
              <i className="fas fa-chevron-left"></i>
            </div>
            <div
              className={`${styles.galleryModalNav} ${styles.galleryModalNext}`}
              onClick={() => navigateGallery("next")}
            >
              <i className="fas fa-chevron-right"></i>
            </div>
            <div className={styles.galleryModalCounter}>
              {currentImageIndex + 1} / {galleryImages.length}
            </div>
            <div className={styles.galleryModalThumbs}>
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  className={`${styles.galleryModalThumb} ${index === currentImageIndex ? styles.active : ""}`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img src={image.thumb} alt={image.alt} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
