import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import usePropertyStore from "../../../stores/usePropertyStore";
import styles from "./DetailRealEstatePage.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DetailRealEstatePage() {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isActionBarVisible, setIsActionBarVisible] = useState(false);
  const [isBackToTopVisible, setIsBackToTopVisible] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const {
    currentProperty,
    loading,
    error,
    fetchDetail,
    ownerInfo,
    fetchOwnerInfo,
    clearOwnerInfo,
    sendRentalRequest,
    isSubmitting,
    requestStatus,
    checkRentalStatus,
  } = usePropertyStore();

  useEffect(() => {
    fetchDetail(id);
    fetchOwnerInfo(id);
    checkRentalStatus(id);
  }, [id, fetchDetail, fetchOwnerInfo, clearOwnerInfo, checkRentalStatus]);

  const defaultImages = [
    {
      url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80",
      alt: "Tổng quan bất động sản",
    },
    {
      url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80",
      alt: "Phòng khách",
    },
    {
      url: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=80",
      alt: "Phòng bếp",
    },
    {
      url: "https://images.unsplash.com/photo-1560185007-5f0bb1866cab?w=1200&q=80",
      alt: "Phòng ngủ",
    },
    {
      url: "https://images.unsplash.com/photo-1564540583246-934409427776?w=1200&q=80",
      alt: "Phòng tắm",
    },
  ];

  // Xử lý images từ API
  const galleryImages =
    currentProperty?.images?.length > 0
      ? currentProperty.images.map((img, index) => ({
          large: img.url,
          thumb: img.url + "?w=200&q=80",
          alt: `Hình ảnh ${index + 1}`,
        }))
      : defaultImages.map((img) => ({
          large: img.url,
          thumb: img.url.replace("w=1200", "w=200"),
          alt: img.alt,
        }));

  // Similar properties mẫu
  const similarProperties = [
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
      price: "5.500.000₫/tháng",
      title: "Căn hộ Sunrise City",
      location: "Quận 7, TP.HCM",
      bedrooms: 1,
      bathrooms: 1,
      area: "55m²",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      price: "7.200.000₫/tháng",
      title: "Căn hộ Masteri Thảo Điền",
      location: "Quận 2, TP.HCM",
      bedrooms: 2,
      bathrooms: 2,
      area: "70m²",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80",
      price: "3.500.000₫/tháng",
      title: "Studio Lexington Residence",
      location: "Quận 2, TP.HCM",
      bedrooms: "Studio",
      bathrooms: 1,
      area: "35m²",
    },
  ];

  // Amenity icons mapping
  const getAmenityIcon = (name) => {
    const iconMap = {
      wifi: "fas fa-wifi",
      "wi-fi": "fas fa-wifi",
      internet: "fas fa-wifi",
      "chỗ để xe": "fas fa-parking",
      "bãi đỗ xe": "fas fa-parking",
      "thang máy": "fas fa-elevator",
      "máy lạnh": "fas fa-snowflake",
      "điều hòa": "fas fa-snowflake",
      tivi: "fas fa-tv",
      "smart tv": "fas fa-tv",
      "hồ bơi": "fas fa-swimming-pool",
      gym: "fas fa-dumbbell",
      "phòng gym": "fas fa-dumbbell",
      "an ninh": "fas fa-shield-alt",
      "bảo vệ": "fas fa-shield-alt",
      bếp: "fas fa-utensils",
      "nhà bếp": "fas fa-utensils",
      "ban công": "fas fa-wind",
      "máy giặt": "fas fa-tshirt",
      "tủ lạnh": "fas fa-snowman",
      "nóng lạnh": "fas fa-shower",
    };

    const lowerName = name.toLowerCase();
    return iconMap[lowerName] || "fas fa-check-circle";
  };

  const nearbyPlaces = [
    { icon: "fas fa-store", text: "Vincom Center", distance: "500m" },
    {
      icon: "fas fa-utensils",
      text: "Nhà hàng The Coffee House",
      distance: "200m",
    },
    { icon: "fas fa-hospital", text: "Bệnh viện Đa khoa", distance: "1km" },
    { icon: "fas fa-school", text: "Trường Đại học", distance: "800m" },
    { icon: "fas fa-bus", text: "Trạm xe buýt", distance: "150m" },
    { icon: "fas fa-tree", text: "Công viên", distance: "300m" },
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Đã sao chép số điện thoại: " + text);
      })
      .catch((err) => {
        toast.error("Không thể sao chép số điện thoại!");
        console.error("Không thể sao chép: ", err);
      });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsActionBarVisible(scrollY > 600);
      setIsBackToTopVisible(scrollY > 300);
    };

    const handleKeyDown = (e) => {
      if (!isModalOpen) return;

      if (e.key === "Escape") {
        closeModal();
      } else if (e.key === "ArrowLeft") {
        navigateGallery("prev");
      } else if (e.key === "ArrowRight") {
        navigateGallery("next");
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  const openModal = (index = 0) => {
    setCurrentImageIndex(index);
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleContactFormChange = (e) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id: id,
      message: contactForm.message,
    };

    const result = await sendRentalRequest(payload);

    if (result.success) {
      toast.success("Yêu cầu thuê nhà của bạn đã được gửi thành công!");
      setContactForm({ name: "", email: "", phone: "", message: "" });
    } else {
      toast.error("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  const formatPrice = (price) => {
    if (!price) return "Liên hệ";
    return price;
  };

  const getPropertyType = (type) => {
    const typeMap = {
      ROOM: "Phòng trọ",
      APARTMENT: "Căn hộ",
      HOUSE: "Nhà nguyên căn",
      STUDIO: "Studio",
    };
    return typeMap[type] || type;
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}>
          <div className={styles.spinner}></div>
          <p>Đang tải thông tin bất động sản...</p>
        </div>
      </div>
    );
  }

  if (error || !currentProperty) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorContent}>
          <i className="fas fa-exclamation-triangle"></i>
          <h3>Không tìm thấy thông tin</h3>
          <p>Bất động sản này có thể đã được gỡ bỏ hoặc không tồn tại.</p>
          <Link
            to="/properties"
            className={`${styles.btn} ${styles.btnPrimary}`}
          >
            <i className="fas fa-arrow-left"></i>
            Quay lại danh sách
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.propertyDetails}>
        <div className={styles.propertyContainer}>
          {/* Breadcrumbs */}
          <nav className={styles.breadcrumbs}>
            <Link to="/">Trang chủ</Link>
            <span className={styles.separator}>
              <i className="fas fa-chevron-right"></i>
            </span>
            <Link to="/properties">Bất động sản</Link>
            <span className={styles.separator}>
              <i className="fas fa-chevron-right"></i>
            </span>
            <span>{getPropertyType(currentProperty.type)}</span>
          </nav>

          {/* Property Gallery */}
          <div className={styles.propertyGallery}>
            <div className={styles.galleryMain} onClick={() => openModal(0)}>
              <img
                src={galleryImages[0]?.large || currentProperty.image}
                alt={currentProperty.title}
                loading="lazy"
              />
              <button className={styles.viewAllPhotos}>
                <i className="fas fa-images"></i>
                Xem tất cả ({galleryImages.length} ảnh)
              </button>
            </div>

            {galleryImages.length > 1 && (
              <div className={styles.galleryThumbnails}>
                {galleryImages.slice(1, 3).map((image, index) => (
                  <div
                    key={index + 1}
                    className={styles.galleryThumbnail}
                    onClick={() => openModal(index + 1)}
                  >
                    <img src={image.thumb} alt={image.alt} loading="lazy" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Property Content */}
          <div className={styles.propertyContent}>
            <div className={styles.propertyMain}>
              {/* Property Info */}
              <div className={styles.propertyInfo}>
                <div className={styles.propertyHeader}>
                  {currentProperty.badge && (
                    <div className={styles.propertyBadge}>
                      {currentProperty.badge}
                    </div>
                  )}
                  <h1 className={styles.propertyTitle}>
                    {currentProperty.title}
                  </h1>
                  <div className={styles.propertyLocation}>
                    <i className="fas fa-map-marker-alt"></i>
                    {currentProperty.location}
                  </div>
                  <div className={styles.propertyPrice}>
                    {formatPrice(currentProperty.price)}
                  </div>
                  <div className={styles.propertyPriceNote}>
                    {currentProperty.type === "ROOM"
                      ? "Đã bao gồm điện nước, internet"
                      : "Chưa bao gồm phí điện nước"}
                  </div>
                </div>

                <div className={styles.propertyFeatures}>
                  <div className={styles.propertyFeature}>
                    <div className={styles.featureIcon}>
                      <i className="fas fa-bed"></i>
                    </div>
                    <div className={styles.featureText}>Phòng ngủ</div>
                    <div className={styles.featureValue}>
                      {currentProperty.bedrooms}
                      {currentProperty.bedrooms === "Studio" ? "" : " phòng"}
                    </div>
                  </div>

                  <div className={styles.propertyFeature}>
                    <div className={styles.featureIcon}>
                      <i className="fas fa-bath"></i>
                    </div>
                    <div className={styles.featureText}>Phòng tắm</div>
                    <div className={styles.featureValue}>
                      {currentProperty.bathrooms} phòng
                    </div>
                  </div>

                  <div className={styles.propertyFeature}>
                    <div className={styles.featureIcon}>
                      <i className="fas fa-expand-arrows-alt"></i>
                    </div>
                    <div className={styles.featureText}>Diện tích</div>
                    <div className={styles.featureValue}>
                      {currentProperty.area}
                    </div>
                  </div>

                  <div className={styles.propertyFeature}>
                    <div className={styles.featureIcon}>
                      <i className="fas fa-home"></i>
                    </div>
                    <div className={styles.featureText}>Loại hình</div>
                    <div className={styles.featureValue}>
                      {getPropertyType(currentProperty.type)}
                    </div>
                  </div>

                  {currentProperty.totalRooms &&
                    currentProperty.totalRooms !== "0" && (
                      <div className={styles.propertyFeature}>
                        <div className={styles.featureIcon}>
                          <i className="fas fa-door-open"></i>
                        </div>
                        <div className={styles.featureText}>Tổng số phòng</div>
                        <div className={styles.featureValue}>
                          {currentProperty.totalRooms} phòng
                        </div>
                      </div>
                    )}
                </div>

                <div className={styles.propertyDescription}>
                  <h3>Mô tả chi tiết</h3>
                  <div className={styles.descriptionContent}>
                    <p>
                      {currentProperty.type === "ROOM"
                        ? `Phòng trọ ${currentProperty.title} tại ${currentProperty.location} với diện tích ${currentProperty.area}. Phòng được thiết kế tối ưu, đầy đủ tiện nghi cơ bản phục vụ cho sinh hoạt hàng ngày.`
                        : `${getPropertyType(currentProperty.type)} ${currentProperty.title} tọa lạc tại vị trí thuận lợi ${currentProperty.location}. Với diện tích ${currentProperty.area}, có ${currentProperty.bedrooms} phòng ngủ và ${currentProperty.bathrooms} phòng tắm.`}
                    </p>

                    {isDescriptionExpanded && (
                      <>
                        <p>
                          Bất động sản này được xây dựng với chất lượng cao, đảm
                          bảo an toàn và tiện nghi cho người thuê. Vị trí giao
                          thông thuận lợi, gần các trung tâm thương mại, trường
                          học, bệnh viện và các tiện ích công cộng.
                        </p>
                        <p>
                          Đặc biệt, khu vực này có hạ tầng hoàn thiện, an ninh
                          tốt, môi trường sống trong lành, rất phù hợp cho các
                          gia đình trẻ, sinh viên và người lao động.
                        </p>
                      </>
                    )}

                    {!isDescriptionExpanded && (
                      <button
                        className={styles.readMore}
                        onClick={() => setIsDescriptionExpanded(true)}
                      >
                        Xem thêm
                        <i className="fas fa-chevron-down"></i>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Amenities Section */}
              {currentProperty.amenities &&
                currentProperty.amenities.length > 0 && (
                  <div className={styles.propertyAmenities}>
                    <h3>Tiện ích</h3>
                    <div className={styles.amenitiesGrid}>
                      {currentProperty.amenities.map((amenity, index) => (
                        <div key={index} className={styles.amenityItem}>
                          <div className={styles.amenityIcon}>
                            <i
                              className={
                                amenity.icon || getAmenityIcon(amenity.name)
                              }
                            ></i>
                          </div>
                          <div className={styles.amenityText}>
                            {amenity.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* Location Section */}
              <div className={styles.propertyLocationInfo}>
                <h3>Vị trí & Tiện ích xung quanh</h3>
                <div className={styles.mapContainer}>
                  <div className={styles.mapPlaceholder}>
                    <i className="fas fa-map-marked-alt"></i>
                    <p>Vị trí: {currentProperty.location}</p>
                    <small>Bản đồ chi tiết sẽ được cập nhật sớm</small>
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
                    <Link
                      key={property.id}
                      to={`/properties/${property.id}`}
                      className={styles.similarPropertyCard}
                    >
                      <div className={styles.similarPropertyImage}>
                        <img
                          src={property.image}
                          alt={property.title}
                          loading="lazy"
                        />
                      </div>
                      <div className={styles.similarPropertyInfo}>
                        <div className={styles.similarPropertyPrice}>
                          {property.price}
                        </div>
                        <h4 className={styles.similarPropertyTitle}>
                          {property.title}
                        </h4>
                        <div className={styles.similarPropertyLocation}>
                          <i className="fas fa-map-marker-alt"></i>
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
                            <i className="fas fa-vector-square"></i>
                            {property.area}
                          </div>
                        </div>
                      </div>
                    </Link>
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
                    src={
                      ownerInfo?.avatar_url ||
                      "https://randomuser.me/api/portraits/men/32.jpg"
                    }
                    alt="Chủ nhà"
                    className={styles.contactAvatar}
                  />
                  <div>
                    <div className={styles.contactName}>
                      {ownerInfo?.fullName || "Đang tải..."}
                    </div>
                    <div className={styles.contactRole}>Chủ nhà</div>
                    <div className={styles.contactRating}>
                      {[...Array(4)].map((_, i) => (
                        <i key={i} className="fas fa-star"></i>
                      ))}
                      <i className="fas fa-star-half-alt"></i>
                      <span className={styles.contactRatingScore}>
                        4.5 (28 đánh giá)
                      </span>
                    </div>
                  </div>
                </div>

                <form
                  className={styles.contactForm}
                  onSubmit={handleContactSubmit}
                >
                  {requestStatus?.hasHistory &&
                    requestStatus?.latestStatus === "REJECTED" && (
                      <div
                        style={{
                          padding: "10px",
                          backgroundColor: "#fee2e2",
                          color: "#ef4444",
                          borderRadius: "8px",
                          marginBottom: "15px",
                          fontSize: "0.9rem",
                        }}
                      >
                        <i className="fas fa-info-circle"></i> Yêu cầu trước đó
                        bị từ chối. Bạn có thể gửi lại yêu cầu mới.
                      </div>
                    )}

                  {(requestStatus?.canRequest ?? true) && (
                    <div className={styles.formGroup}>
                      <label htmlFor="message">Lời nhắn</label>
                      <textarea
                        id="message"
                        name="message"
                        value={contactForm.message}
                        onChange={handleContactFormChange}
                        placeholder={`Tôi quan tâm đến ${currentProperty.title}. Xin vui lòng liên hệ với tôi.`}
                        rows="4"
                        required
                      ></textarea>
                    </div>
                  )}

                  <div className={styles.contactActions}>
                    {requestStatus?.canRequest === false ? (
                      <button
                        type="button"
                        disabled
                        className={`${styles.btn} ${styles.btnSuccess}`}
                        style={{
                          width: "100%",
                          cursor: "not-allowed",
                          backgroundColor: "#10b981",
                          color: "white",
                          borderColor: "#10b981",
                        }}
                      >
                        <i
                          className={
                            requestStatus?.latestStatus === "PENDING"
                              ? "fas fa-clock"
                              : "fas fa-check-circle"
                          }
                        ></i>
                        {requestStatus?.latestStatus === "PENDING"
                          ? " Đang chờ chủ nhà duyệt"
                          : " Đã được phê duyệt"}
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className={`${styles.btn} ${styles.btnPrimary}`}
                        disabled={isSubmitting} 
                        style={{ width: "100%" }}
                      >
                        {isSubmitting ? (
                          <>
                            <i className="fas fa-spinner fa-spin"></i> Đang
                            gửi...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-paper-plane"></i> Gửi yêu cầu
                            thuê nhà
                          </>
                        )}
                      </button>
                    )}

                    <button
                      type="button"
                      className={`${styles.btn} ${styles.btnOutline}`}
                      onClick={() => {
                        if (ownerInfo?.phone) {
                          copyToClipboard(ownerInfo.phone);
                          window.location.href = `tel:${ownerInfo.phone}`;
                        } else {
                          toast.warning("Chưa có số điện thoại của chủ nhà.");
                        }
                      }}
                      style={{ width: "100%", marginTop: "10px" }}
                    >
                      <i className="fas fa-phone-alt"></i> Gọi trực tiếp
                    </button>
                  </div>
                </form>

                <div className={styles.contactInfo}>
                  <div className={styles.contactInfoItem}>
                    <i className="fas fa-phone-alt"></i>
                    <a href="tel:+84901234567">
                      {ownerInfo?.phone || "Đang tải..."}
                    </a>
                  </div>
                  <div className={styles.contactInfoItem}>
                    <i className="fas fa-envelope"></i>
                    <a href="mailto:contact@example.com">
                      {ownerInfo?.email || "Đang tải..."}
                    </a>
                  </div>
                  <div className={styles.contactInfoItem}>
                    <i className="fas fa-clock"></i>
                    Phản hồi trong vòng 2 giờ
                  </div>
                </div>
              </div>

              {/* Quick Info Card */}
              <div className={styles.quickInfoCard}>
                <h3>Thông tin nhanh</h3>
                <div className={styles.quickInfoList}>
                  <div className={styles.quickInfoItem}>
                    <span className={styles.quickInfoLabel}>Giá thuê:</span>
                    <span className={styles.quickInfoValue}>
                      {formatPrice(currentProperty.price)}
                    </span>
                  </div>

                  <div className={styles.quickInfoItem}>
                    <span className={styles.quickInfoLabel}>Loại hình:</span>
                    <span className={styles.quickInfoValue}>
                      {getPropertyType(currentProperty.type)}
                    </span>
                  </div>

                  <div className={styles.quickInfoItem}>
                    <span className={styles.quickInfoLabel}>Diện tích:</span>
                    <span className={styles.quickInfoValue}>
                      {currentProperty.area}
                    </span>
                  </div>

                  <div className={styles.quickInfoItem}>
                    <span className={styles.quickInfoLabel}>Phòng ngủ:</span>
                    <span className={styles.quickInfoValue}>
                      {currentProperty.bedrooms}
                    </span>
                  </div>

                  <div className={styles.quickInfoItem}>
                    <span className={styles.quickInfoLabel}>Phòng tắm:</span>
                    <span className={styles.quickInfoValue}>
                      {currentProperty.bathrooms}
                    </span>
                  </div>

                  <div className={styles.quickInfoItem}>
                    <span className={styles.quickInfoLabel}>Tình trạng:</span>
                    <span
                      className={`${styles.quickInfoValue} ${styles.available}`}
                    >
                      Còn trống
                    </span>
                  </div>
                </div>

                <div className={styles.quickActions}>
                  <button
                    className={`${styles.btn} ${styles.btnPrimary} ${styles.btnBlock}`}
                  >
                    <i className="fas fa-calendar-check"></i>
                    Đặt lịch xem nhà
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top */}
      <button
        className={`${styles.backToTop} ${isBackToTopVisible ? styles.active : ""}`}
        onClick={scrollToTop}
        aria-label="Về đầu trang"
      >
        <i className="fas fa-arrow-up"></i>
      </button>

      {/* Gallery Modal */}
      {isModalOpen && (
        <div className={`${styles.galleryModal} ${styles.active}`}>
          <div className={styles.galleryModalContent}>
            <button
              className={styles.galleryModalClose}
              onClick={closeModal}
              aria-label="Đóng"
            >
              <i className="fas fa-times"></i>
            </button>

            <div className={styles.galleryModalImage}>
              <img
                src={galleryImages[currentImageIndex]?.large}
                alt={galleryImages[currentImageIndex]?.alt}
              />
            </div>

            {galleryImages.length > 1 && (
              <>
                <button
                  className={`${styles.galleryModalNav} ${styles.galleryModalPrev}`}
                  onClick={() => navigateGallery("prev")}
                  aria-label="Ảnh trước"
                >
                  <i className="fas fa-chevron-left"></i>
                </button>

                <button
                  className={`${styles.galleryModalNav} ${styles.galleryModalNext}`}
                  onClick={() => navigateGallery("next")}
                  aria-label="Ảnh tiếp theo"
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </>
            )}

            <div className={styles.galleryModalCounter}>
              {currentImageIndex + 1} / {galleryImages.length}
            </div>

            <div className={styles.galleryModalThumbs}>
              {galleryImages.map((image, index) => (
                <button
                  key={index}
                  className={`${styles.galleryModalThumb} ${
                    index === currentImageIndex ? styles.active : ""
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img src={image.thumb} alt={image.alt} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
