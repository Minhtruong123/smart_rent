import React, { useState, useEffect } from "react";
import usePropertyStore from "../../../stores/usePropertyStore";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./RealEstatePage.module.css";

export default function RealEstatePage() {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [viewType, setViewType] = useState("grid");
  const [searchParamsUrl, setSearchParamsUrl] = useSearchParams();
  const [activePage, setActivePage] = useState(0);
  const { properties, totalPages, loading, fetchProperties } =
    usePropertyStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProperties(activePage, 9);
  }, [activePage, fetchProperties]);

  const searchTabs = [
    { icon: "fas fa-building", text: "Thuê nhà" },
    { icon: "fas fa-home", text: "Căn hộ" },
    { icon: "fas fa-door-open", text: "Phòng trọ" },
  ];

  const getInitialPriceRange = () => {
    const min = searchParamsUrl.get("minPrice");
    const max = searchParamsUrl.get("maxPrice");
    if (max === "3000000") return "Dưới 3 triệu";
    if (min === "3000000" && max === "5000000") return "3 - 5 triệu";
    if (min === "5000000" && max === "10000000") return "5 - 10 triệu";
    if (min === "10000000") return "Trên 10 triệu";
    return "all";
  };

  const getInitialBedrooms = () => {
    const bed = searchParamsUrl.get("bedrooms");
    if (bed === "1") return "1 phòng";
    if (bed === "2") return "2 phòng";
    if (bed === "3") return "3+ phòng";
    return "all";
  };

  const [searchParams, setSearchParams] = useState({
    title: searchParamsUrl.get("title") || "",
    priceRange: getInitialPriceRange(),
    bedrooms: getInitialBedrooms(),
  });

  const typeToIndex = { HOUSE: 0, APARTMENT: 1, ROOM: 2 };
  const indexToType = { 0: "HOUSE", 1: "APARTMENT", 2: "ROOM" };
  const initialType = searchParamsUrl.get("type");
  const [activeTab, setActiveTab] = useState(
    initialType ? typeToIndex[initialType] : -1,
  );

  useEffect(() => {
    const filters = {
      title: searchParamsUrl.get("title"),
      type: searchParamsUrl.get("type"),
      minPrice: searchParamsUrl.get("minPrice"),
      maxPrice: searchParamsUrl.get("maxPrice"),
      bedrooms: searchParamsUrl.get("bedrooms"),
    };

    fetchProperties(activePage, 9, filters);
  }, [activePage, searchParamsUrl, fetchProperties]);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = new URLSearchParams();

    if (searchParams.title) query.append("title", searchParams.title);
    if (activeTab !== -1) query.append("type", indexToType[activeTab]);

    switch (searchParams.priceRange) {
      case "Dưới 3 triệu":
        query.append("maxPrice", 3000000);
        break;
      case "3 - 5 triệu":
        query.append("minPrice", 3000000);
        query.append("maxPrice", 5000000);
        break;
      case "5 - 10 triệu":
        query.append("minPrice", 5000000);
        query.append("maxPrice", 10000000);
        break;
      case "Trên 10 triệu":
        query.append("minPrice", 10000000);
        break;
      default:
        break;
    }

    if (searchParams.bedrooms !== "all") {
      const bedNum = searchParams.bedrooms.replace(/\D/g, "");
      if (bedNum) query.append("bedrooms", bedNum);
    }

    setActivePage(0);
    setSearchParamsUrl(query);
  };

  const clearFilters = () => {
    setSearchParams({ title: "", priceRange: "all", bedrooms: "all" });
    setActiveTab(-1);
    setSearchParamsUrl(new URLSearchParams());
    setActivePage(0);
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
                  onClick={() => setActiveTab(activeTab === index ? -1 : index)}
                >
                  <i className={tab.icon}></i> {tab.text}
                </button>
              ))}
            </div>

            <form className={styles.searchForm} onSubmit={handleSearch}>
              <div className={styles.formGroup}>
                <label>
                  <i className="fas fa-map-marker-alt"></i> Tìm kiếm
                </label>
                <input
                  type="text"
                  value={searchParams.title}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, title: e.target.value })
                  }
                  placeholder="Nhập địa điểm bạn muốn tìm..."
                />
              </div>
              <div className={styles.formGroup}>
                <label>
                  <i className="fas fa-dollar-sign"></i> Khoảng giá
                </label>
                <select
                  value={searchParams.priceRange}
                  onChange={(e) =>
                    setSearchParams({
                      ...searchParams,
                      priceRange: e.target.value,
                    })
                  }
                >
                  <option value="all">Tất cả</option>
                  <option value="Dưới 3 triệu">Dưới 3 triệu</option>
                  <option value="3 - 5 triệu">3 - 5 triệu</option>
                  <option value="5 - 10 triệu">5 - 10 triệu</option>
                  <option value="Trên 10 triệu">Trên 10 triệu</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>
                  <i className="fas fa-bed"></i> Phòng ngủ
                </label>
                <select
                  value={searchParams.bedrooms}
                  onChange={(e) =>
                    setSearchParams({
                      ...searchParams,
                      bedrooms: e.target.value,
                    })
                  }
                >
                  <option value="all">Tất cả</option>
                  <option value="1 phòng">1 phòng</option>
                  <option value="2 phòng">2 phòng</option>
                  <option value="3+ phòng">3+ phòng</option>
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
                <div
                  key={property.id}
                  className={styles.propertyCard}
                  onClick={() =>
                    navigate(`/detail-real-estate-page/${property.id}`)
                  }
                >
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
