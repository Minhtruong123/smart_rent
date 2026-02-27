import React, { useState, useEffect } from "react";
import usePropertyStore from "../../../stores/usePropertyStore";
import styles from "./RealEstatePage.module.css";

export default function RealEstatePage() {
  const [activeTab, setActiveTab] = useState(0);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [viewType, setViewType] = useState("grid");
  const [favorites, setFavorites] = useState(new Set());
  const [activePage, setActivePage] = useState(0);
  const { properties, totalPages, loading, fetchProperties } =
    usePropertyStore();

  useEffect(() => {
    fetchProperties(activePage, 9);
  }, [activePage, fetchProperties]);

  const searchTabs = [
    { icon: "fas fa-building", text: "Thuê nhà" },
    { icon: "fas fa-home", text: "Căn hộ" },
    { icon: "fas fa-door-open", text: "Phòng trọ" },
    { icon: "fas fa-warehouse", text: "Văn phòng" },
    { icon: "fas fa-store", text: "Mặt bằng" },
  ];

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
            {loading ? (
              <p>Đang tải dữ liệu...</p>
            ) : (
              properties.map((property) => (
                <div key={property.id} className={styles.propertyCard}>
                  <div className={styles.propertyImage}>
                    <img src={property.image} alt={property.title} />{" "}
                    {/* Dùng imageUrl */}
                    <div className={styles.propertyBadge}>{property.type}</div>
                  </div>
                  <div className={styles.propertyInfo}>
                    <div className={styles.propertyPrice}>{property.price}</div>
                    <h3 className={styles.propertyTitle}>{property.title}</h3>
                    <p>{property.location}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          {/* Pagination */}
          {totalPages > 1 && (
            <div className={styles.pagination}>
              {/* Prev */}
              <button
                disabled={activePage === 0}
                onClick={() => setActivePage((p) => p - 1)}
                title="Trang trước"
              >
                <i className="fas fa-chevron-left" />
              </button>

              {/* Page numbers with ellipsis */}
              {Array.from({ length: totalPages }, (_, i) => i)
                .reduce((acc, i) => {
                  const showPage =
                    i === 0 ||
                    i === totalPages - 1 ||
                    Math.abs(i - activePage) <= 1;

                  if (!showPage) {
                    const last = acc[acc.length - 1];
                    if (last?.type !== "ellipsis") {
                      acc.push({ type: "ellipsis", key: `ellipsis-${i}` });
                    }
                    return acc;
                  }

                  acc.push({ type: "page", index: i });
                  return acc;
                }, [])
                .map((item) =>
                  item.type === "ellipsis" ? (
                    <span key={item.key} className={styles.paginationEllipsis}>
                      ···
                    </span>
                  ) : (
                    <button
                      key={item.index}
                      className={activePage === item.index ? styles.active : ""}
                      onClick={() => setActivePage(item.index)}
                    >
                      {item.index + 1}
                    </button>
                  ),
                )}

              {/* Next */}
              <button
                disabled={activePage >= totalPages - 1}
                onClick={() => setActivePage((p) => p + 1)}
                title="Trang sau"
              >
                <i className="fas fa-chevron-right" />
              </button>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
