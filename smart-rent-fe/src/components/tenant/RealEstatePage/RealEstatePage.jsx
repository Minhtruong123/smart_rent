import React, { useState } from "react";
import styles from "./RealEstatePage.module.css";

export default function RealEstatePage() {
  const [activeTab, setActiveTab] = useState(0);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [viewType, setViewType] = useState("grid");
  const [favorites, setFavorites] = useState(new Set());
  const [activePage, setActivePage] = useState(1);

  const searchTabs = [
    { icon: "fas fa-building", text: "Thuê nhà" },
    { icon: "fas fa-home", text: "Căn hộ" },
    { icon: "fas fa-door-open", text: "Phòng trọ" },
    { icon: "fas fa-warehouse", text: "Văn phòng" },
    { icon: "fas fa-store", text: "Mặt bằng" },
  ];
  const properties = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      badge: "Hot",
      price: "8.5 triệu/tháng",
      title: "Căn hộ cao cấp Vinhomes Central Park",
      location: "Quận Bình Thạnh, TP.HCM",
      bedrooms: 2,
      bathrooms: 2,
      area: "75m²",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
      badge: "Mới",
      price: "5.5 triệu/tháng",
      title: "Căn hộ Sunrise City",
      location: "Quận 7, TP.HCM",
      bedrooms: 1,
      bathrooms: 1,
      area: "55m²",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80",
      badge: "VIP",
      price: "15 triệu/tháng",
      title: "Biệt thự The Palm",
      location: "Quận 9, TP.HCM",
      bedrooms: 4,
      bathrooms: 3,
      area: "200m²",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      badge: null,
      price: "4.2 triệu/tháng",
      title: "Căn hộ Masteri Thảo Điền",
      location: "Quận 2, TP.HCM",
      bedrooms: 1,
      bathrooms: 1,
      area: "45m²",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=800&q=80",
      badge: null,
      price: "12 triệu/tháng",
      title: "Nhà phố Thảo Điền",
      location: "Quận 2, TP.HCM",
      bedrooms: 3,
      bathrooms: 2,
      area: "120m²",
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80",
      badge: "Tiết kiệm",
      price: "3.5 triệu/tháng",
      title: "Studio Lexington Residence",
      location: "Quận 2, TP.HCM",
      bedrooms: "Studio",
      bathrooms: 1,
      area: "35m²",
    },
    {
      id: 7,
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
      badge: null,
      price: "6.8 triệu/tháng",
      title: "Căn hộ Gateway Thảo Điền",
      location: "Quận 2, TP.HCM",
      bedrooms: 2,
      bathrooms: 2,
      area: "70m²",
    },
    {
      id: 8,
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      badge: "Hot",
      price: "18 triệu/tháng",
      title: "Villa Palm Heights",
      location: "Quận 2, TP.HCM",
      bedrooms: 5,
      bathrooms: 4,
      area: "250m²",
    },
    {
      id: 9,
      image:
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80",
      badge: null,
      price: "9.5 triệu/tháng",
      title: "Nhà phố Riviera Point",
      location: "Quận 7, TP.HCM",
      bedrooms: 3,
      bathrooms: 3,
      area: "110m²",
    },
  ];

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const clearFilters = () => {
    // Reset all form fields
  };
  return (
    <>
      <div className={styles.propertiesPage}>
        {/* Page Header */}
        <section className={styles.pageHeader}>
          <div className={styles.pageHeaderContent}>
            <h1>Khám Phá Bất Động Sản</h1>
            <p>
              Tìm kiếm căn nhà hoàn hảo từ hàng nghìn bất động sản chất lượng
              cao
            </p>
          </div>
        </section>

        {/* Search & Filter Section */}
        <section className={styles.searchFilterSection}>
          <div className={styles.searchFilterContainer}>
            <div className={styles.searchTabs}>
              {searchTabs.map((tab, index) => (
                <button
                  key={index}
                  className={`${styles.searchTab} ${activeTab === index ? styles.active : ""}`}
                  onClick={() => setActiveTab(index)}
                >
                  <i className={tab.icon}></i> {tab.text}
                </button>
              ))}
            </div>

            <form className={styles.searchForm}>
              <div className={styles.formGroup}>
                <label>
                  <i className="fas fa-map-marker-alt"></i> Khu vực
                </label>
                <input
                  type="text"
                  placeholder="Nhập địa điểm bạn muốn tìm..."
                />
              </div>
              <div className={styles.formGroup}>
                <label>
                  <i className="fas fa-dollar-sign"></i> Khoảng giá
                </label>
                <select>
                  <option>Tất cả</option>
                  <option>Dưới 3 triệu</option>
                  <option>3 - 5 triệu</option>
                  <option>5 - 10 triệu</option>
                  <option>Trên 10 triệu</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>
                  <i className="fas fa-bed"></i> Phòng ngủ
                </label>
                <select>
                  <option>Tất cả</option>
                  <option>1 phòng</option>
                  <option>2 phòng</option>
                  <option>3+ phòng</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <button
                  type="submit"
                  className={`${styles.btn} ${styles.btnPrimary}`}
                  style={{ width: "100%" }}
                >
                  <i className="fas fa-search"></i>
                  Tìm kiếm
                </button>
              </div>
            </form>

            <div className={styles.filterActions}>
              <button
                className={`${styles.btn} ${styles.btnOutline}`}
                onClick={() => setShowAdvanced(!showAdvanced)}
              >
                <i className="fas fa-sliders-h"></i>
                {showAdvanced ? "Đóng bộ lọc" : "Bộ lọc nâng cao"}
              </button>
            </div>

            {showAdvanced && (
              <div className={styles.advancedFilters}>
                <div className={styles.filterGrid}>
                  <div className={styles.formGroup}>
                    <label>
                      <i className="fas fa-vector-square"></i> Diện tích (m²)
                    </label>
                    <select>
                      <option>Tất cả</option>
                      <option>Dưới 30m²</option>
                      <option>30 - 50m²</option>
                      <option>50 - 80m²</option>
                      <option>80 - 100m²</option>
                      <option>Trên 100m²</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label>
                      <i className="fas fa-bath"></i> Số phòng tắm
                    </label>
                    <select>
                      <option>Tất cả</option>
                      <option>1 phòng</option>
                      <option>2 phòng</option>
                      <option>3+ phòng</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label>
                      <i className="fas fa-couch"></i> Nội thất
                    </label>
                    <select>
                      <option>Tất cả</option>
                      <option>Đầy đủ</option>
                      <option>Cơ bản</option>
                      <option>Không nội thất</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label>
                      <i className="fas fa-compass"></i> Hướng nhà
                    </label>
                    <select>
                      <option>Tất cả</option>
                      <option>Đông</option>
                      <option>Tây</option>
                      <option>Nam</option>
                      <option>Bắc</option>
                      <option>Đông Nam</option>
                      <option>Tây Nam</option>
                    </select>
                  </div>
                </div>
                <div className={styles.filterActions}>
                  <button
                    className={`${styles.btn} ${styles.btnClear}`}
                    onClick={clearFilters}
                  >
                    <i className="fas fa-times"></i>
                    Xóa bộ lọc
                  </button>
                  <button className={`${styles.btn} ${styles.btnPrimary}`}>
                    <i className="fas fa-check"></i>
                    Áp dụng
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Main Content */}
        <section className={styles.mainContent}>
          <div className={styles.contentHeader}>
            <div className={styles.resultsInfo}>
              <div className={styles.resultsCount}>
                Tìm thấy <span>{properties.length}</span> bất động sản
              </div>
            </div>
            <div className={styles.sortFilter}>
              <label>Sắp xếp:</label>
              <select>
                <option>Mới nhất</option>
                <option>Giá thấp đến cao</option>
                <option>Giá cao đến thấp</option>
                <option>Diện tích lớn nhất</option>
                <option>Diện tích nhỏ nhất</option>
              </select>
              <div className={styles.viewToggle}>
                <button
                  className={`${styles.viewBtn} ${viewType === "grid" ? styles.active : ""}`}
                  onClick={() => setViewType("grid")}
                >
                  <i className="fas fa-th"></i>
                </button>
                <button
                  className={`${styles.viewBtn} ${viewType === "list" ? styles.active : ""}`}
                  onClick={() => setViewType("list")}
                >
                  <i className="fas fa-list"></i>
                </button>
              </div>
            </div>
          </div>

          <div
            className={`${styles.propertiesGrid} ${viewType === "list" ? styles.listView : ""}`}
          >
            {properties.map((property) => (
              <div key={property.id} className={styles.propertyCard}>
                <div className={styles.propertyImage}>
                  <img src={property.image} alt={property.title} />
                  {property.badge && (
                    <div className={styles.propertyBadge}>{property.badge}</div>
                  )}
                  <div
                    className={`${styles.propertyFavorite} ${favorites.has(property.id) ? styles.active : ""}`}
                    onClick={() => toggleFavorite(property.id)}
                  >
                    <i
                      className={
                        favorites.has(property.id)
                          ? "fas fa-heart"
                          : "far fa-heart"
                      }
                    ></i>
                  </div>
                </div>
                <div className={styles.propertyInfo}>
                  <div className={styles.propertyPrice}>{property.price}</div>
                  <h3 className={styles.propertyTitle}>{property.title}</h3>
                  <div className={styles.propertyLocation}>
                    <i className="fas fa-map-marker-alt"></i>{" "}
                    {property.location}
                  </div>
                  <div className={styles.propertyFeatures}>
                    <div className={styles.propertyFeature}>
                      <i className="fas fa-bed"></i> {property.bedrooms}{" "}
                      {property.bedrooms === "Studio" ? "" : "Phòng ngủ"}
                    </div>
                    <div className={styles.propertyFeature}>
                      <i className="fas fa-bath"></i> {property.bathrooms} Phòng
                      tắm
                    </div>
                    <div className={styles.propertyFeature}>
                      <i className="fas fa-vector-square"></i> {property.area}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className={styles.pagination}>
            <button className={styles.paginationBtn} disabled>
              <i className="fas fa-chevron-left"></i>
            </button>
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                className={`${styles.paginationBtn} ${activePage === page ? styles.active : ""}`}
                onClick={() => setActivePage(page)}
              >
                {page}
              </button>
            ))}
            <button className={styles.paginationBtn}>
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
