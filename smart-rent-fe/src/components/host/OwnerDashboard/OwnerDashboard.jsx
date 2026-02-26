import React, { useState } from "react";
import styles from "./OwnerDashboard.module.css";

export default function OwnerDashboard() {
  const [activeTab, setActiveTab] = useState("Bất động sản của tôi");
  const [activeIncomeChart, setActiveIncomeChart] = useState("Tháng");
  const [activePropertyChart, setActivePropertyChart] = useState("Tổng quan");

  const tabs = [
    "Bất động sản của tôi",
    "Yêu cầu thuê mới",
    "Hợp đồng đang hoạt động",
    "Hóa đơn gần đây",
  ];
  return (
    <>
      <div className={styles.mainContent}>
        {/* Navbar */}
        <nav className={styles.navbar}>
          <div className={styles.navTitle}>Dashboard</div>
          <div className={styles.navActions}>
            <div className={styles.navAction}>
              <i className="fas fa-search"></i>
            </div>
            <div className={styles.navAction}>
              <i className="fas fa-bell"></i>
              <span className={styles.navBadge}>3</span>
            </div>
            <div className={styles.navAction}>
              <i className="fas fa-envelope"></i>
              <span className={styles.navBadge}>5</span>
            </div>
            <div className={styles.navAction}>
              <i className="fas fa-th-large"></i>
            </div>
          </div>
        </nav>

        {/* Dashboard Container */}
        <div className={styles.dashboardContainer}>
          {/* Page Header */}
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Xin chào, Nguyễn Thành!</h1>
            <p className={styles.pageSubtitle}>
              Đây là tổng quan hoạt động của bạn trong tháng 02/2026
            </p>
          </div>

          {/* Stats Cards */}
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <div className={styles.statTitle}>Tổng thu nhập</div>
                <div className={`${styles.statIcon} ${styles.primary}`}>
                  <i className="fas fa-dollar-sign"></i>
                </div>
              </div>
              <div className={styles.statValue}>45.2 triệu</div>
              <div className={styles.statDescription}>
                <span className={`${styles.statChange} ${styles.positive}`}>
                  +12.5%
                </span>
                <span>so với tháng trước</span>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <div className={styles.statTitle}>Tỷ lệ lấp đầy</div>
                <div className={`${styles.statIcon} ${styles.success}`}>
                  <i className="fas fa-chart-pie"></i>
                </div>
              </div>
              <div className={styles.statValue}>85%</div>
              <div className={styles.statDescription}>
                <span className={`${styles.statChange} ${styles.positive}`}>
                  +5%
                </span>
                <span>so với tháng trước</span>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <div className={styles.statTitle}>Đang chờ duyệt</div>
                <div className={`${styles.statIcon} ${styles.warning}`}>
                  <i className="fas fa-clock"></i>
                </div>
              </div>
              <div className={styles.statValue}>8</div>
              <div className={styles.statDescription}>
                <span>Yêu cầu thuê mới</span>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <div className={styles.statTitle}>Thanh toán đến hạn</div>
                <div className={`${styles.statIcon} ${styles.danger}`}>
                  <i className="fas fa-calendar-day"></i>
                </div>
              </div>
              <div className={styles.statValue}>12</div>
              <div className={styles.statDescription}>
                <span>trong 7 ngày tới</span>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className={styles.chartsRow}>
            <div className={styles.chartCard}>
              <div className={styles.chartHeader}>
                <div className={styles.chartTitle}>Thu nhập</div>
                <div className={styles.chartActions}>
                  {["Tuần", "Tháng", "Năm"].map((period) => (
                    <div
                      key={period}
                      className={`${styles.chartPeriod} ${activeIncomeChart === period ? styles.active : ""}`}
                      onClick={() => setActiveIncomeChart(period)}
                    >
                      {period}
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.chartContainer}>
                <div className={styles.chartPlaceholder}>
                  <i
                    className="fas fa-chart-line"
                    style={{ fontSize: "3rem", color: "#818cf8" }}
                  ></i>
                  <p style={{ marginTop: "1rem", color: "#64748b" }}>
                    Biểu đồ thu nhập theo tháng
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.chartCard}>
              <div className={styles.chartHeader}>
                <div className={styles.chartTitle}>Phân bổ bất động sản</div>
                <div className={styles.chartActions}>
                  {["Chi tiết", "Tổng quan"].map((period) => (
                    <div
                      key={period}
                      className={`${styles.chartPeriod} ${activePropertyChart === period ? styles.active : ""}`}
                      onClick={() => setActivePropertyChart(period)}
                    >
                      {period}
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.chartContainer}>
                <div className={styles.chartPlaceholder}>
                  <i
                    className="fas fa-chart-pie"
                    style={{ fontSize: "3rem", color: "#818cf8" }}
                  ></i>
                  <p style={{ marginTop: "1rem", color: "#64748b" }}>
                    Biểu đồ phân bổ bất động sản
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className={styles.contentTabs}>
            {tabs.map((tab) => (
              <div
                key={tab}
                className={`${styles.contentTab} ${activeTab === tab ? styles.active : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </div>
            ))}
          </div>

          {/* Properties Grid */}
          <div className={styles.propertiesGrid}>
            <div className={styles.propertyCard}>
              <div className={styles.propertyImage}>
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
                  alt="Property"
                />
                <div
                  className={`${styles.propertyStatus} ${styles.statusAvailable}`}
                >
                  Còn trống
                </div>
              </div>
              <div className={styles.propertyContent}>
                <div className={styles.propertyMeta}>
                  <div className={styles.propertyPrice}>8.5 triệu/tháng</div>
                  <div className={styles.propertyId}>BĐS-001</div>
                </div>
                <h3 className={styles.propertyTitle}>
                  Căn hộ cao cấp Vinhomes Central Park
                </h3>
                <div className={styles.propertyAddress}>
                  <i className="fas fa-map-marker-alt"></i>
                  <span>
                    Tòa Park 5, 720A Điện Biên Phủ, Quận Bình Thạnh, TP.HCM
                  </span>
                </div>
                <div className={styles.propertyFeatures}>
                  <div className={styles.propertyFeature}>
                    <i className="fas fa-bed"></i> 2 Phòng ngủ
                  </div>
                  <div className={styles.propertyFeature}>
                    <i className="fas fa-bath"></i> 2 Phòng tắm
                  </div>
                  <div className={styles.propertyFeature}>
                    <i className="fas fa-vector-square"></i> 75m²
                  </div>
                </div>
                <div className={styles.propertyActions}>
                  <button
                    className={`${styles.btn} ${styles.btnSm} ${styles.btnOutlinePrimary}`}
                  >
                    <i className="fas fa-edit"></i> Chỉnh sửa
                  </button>
                  <button
                    className={`${styles.btn} ${styles.btnSm} ${styles.btnPrimary}`}
                  >
                    <i className="fas fa-eye"></i> Xem chi tiết
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.propertyCard}>
              <div className={styles.propertyImage}>
                <img
                  src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80"
                  alt="Property"
                />
                <div
                  className={`${styles.propertyStatus} ${styles.statusRented}`}
                >
                  Đã thuê
                </div>
              </div>
              <div className={styles.propertyContent}>
                <div className={styles.propertyMeta}>
                  <div className={styles.propertyPrice}>5.5 triệu/tháng</div>
                  <div className={styles.propertyId}>BĐS-002</div>
                </div>
                <h3 className={styles.propertyTitle}>Căn hộ Sunrise City</h3>
                <div className={styles.propertyAddress}>
                  <i className="fas fa-map-marker-alt"></i>
                  <span>Tòa W3, 23 Nguyễn Hữu Thọ, Quận 7, TP.HCM</span>
                </div>
                <div className={styles.propertyFeatures}>
                  <div className={styles.propertyFeature}>
                    <i className="fas fa-bed"></i> 1 Phòng ngủ
                  </div>
                  <div className={styles.propertyFeature}>
                    <i className="fas fa-bath"></i> 1 Phòng tắm
                  </div>
                  <div className={styles.propertyFeature}>
                    <i className="fas fa-vector-square"></i> 55m²
                  </div>
                </div>
                <div className={styles.propertyActions}>
                  <button
                    className={`${styles.btn} ${styles.btnSm} ${styles.btnOutlinePrimary}`}
                  >
                    <i className="fas fa-edit"></i> Chỉnh sửa
                  </button>
                  <button
                    className={`${styles.btn} ${styles.btnSm} ${styles.btnPrimary}`}
                  >
                    <i className="fas fa-eye"></i> Xem chi tiết
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.propertyCard}>
              <div className={styles.propertyImage}>
                <img
                  src="https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80"
                  alt="Property"
                />
                <div
                  className={`${styles.propertyStatus} ${styles.statusMaintenance}`}
                >
                  Bảo trì
                </div>
              </div>
              <div className={styles.propertyContent}>
                <div className={styles.propertyMeta}>
                  <div className={styles.propertyPrice}>15 triệu/tháng</div>
                  <div className={styles.propertyId}>BĐS-003</div>
                </div>
                <h3 className={styles.propertyTitle}>Biệt thự The Palm</h3>
                <div className={styles.propertyAddress}>
                  <i className="fas fa-map-marker-alt"></i>
                  <span>Khu biệt thự Palm Residence, Quận 9, TP.HCM</span>
                </div>
                <div className={styles.propertyFeatures}>
                  <div className={styles.propertyFeature}>
                    <i className="fas fa-bed"></i> 4 Phòng ngủ
                  </div>
                  <div className={styles.propertyFeature}>
                    <i className="fas fa-bath"></i> 3 Phòng tắm
                  </div>
                  <div className={styles.propertyFeature}>
                    <i className="fas fa-vector-square"></i> 200m²
                  </div>
                </div>
                <div className={styles.propertyActions}>
                  <button
                    className={`${styles.btn} ${styles.btnSm} ${styles.btnOutlinePrimary}`}
                  >
                    <i className="fas fa-edit"></i> Chỉnh sửa
                  </button>
                  <button
                    className={`${styles.btn} ${styles.btnSm} ${styles.btnPrimary}`}
                  >
                    <i className="fas fa-eye"></i> Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Request Cards */}
          <h2 className={styles.sectionTitle}>Yêu cầu thuê mới nhất</h2>

          <div className={styles.requestCard}>
            <div className={styles.requestHeader}>
              <h3 className={styles.requestTitle}>Yêu cầu thuê #YC-124</h3>
              <span
                className={`${styles.requestStatus} ${styles.statusPending}`}
              >
                Chờ duyệt
              </span>
            </div>

            <div className={styles.requestProperty}>
              <div className={styles.requestImage}>
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
                  alt="Property"
                />
              </div>
              <div className={styles.requestInfo}>
                <div className={styles.requestPropertyTitle}>
                  Căn hộ cao cấp Vinhomes Central Park
                </div>
                <div className={styles.requestAddress}>
                  Tòa Park 5, 720A Điện Biên Phủ, Quận Bình Thạnh, TP.HCM
                </div>
                <div className={styles.requestPrice}>8.5 triệu/tháng</div>
              </div>
            </div>

            <div className={styles.requestMeta}>
              <div className={styles.metaItem}>
                <div className={styles.metaLabel}>Ngày nhận phòng</div>
                <div className={styles.metaValue}>15/02/2026</div>
              </div>
              <div className={styles.metaItem}>
                <div className={styles.metaLabel}>Thời hạn thuê</div>
                <div className={styles.metaValue}>12 tháng</div>
              </div>
              <div className={styles.metaItem}>
                <div className={styles.metaLabel}>Đặt cọc</div>
                <div className={styles.metaValue}>17 triệu đồng</div>
              </div>
              <div className={styles.metaItem}>
                <div className={styles.metaLabel}>Ngày yêu cầu</div>
                <div className={styles.metaValue}>01/02/2026</div>
              </div>
            </div>

            <div className={styles.requestTenant}>
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Tenant"
                className={styles.tenantAvatar}
              />
              <div className={styles.tenantInfo}>
                <div className={styles.tenantName}>Trần Quốc Bảo</div>
                <div className={styles.tenantDetails}>
                  <div className={styles.tenantContact}>
                    <i className="fas fa-phone"></i> 0912 345 678
                  </div>
                  <div className={styles.tenantContact}>
                    <i className="fas fa-envelope"></i> baotq@gmail.com
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.requestMessage}>
              <p>
                Tôi rất thích căn hộ này và muốn thuê dài hạn. Tôi làm việc tại
                khu vực Bình Thạnh nên vị trí này rất thuận tiện. Tôi có thể đến
                xem nhà vào cuối tuần này không?
              </p>
            </div>

            <div className={styles.requestActions}>
              <button className={`${styles.btn} ${styles.btnOutlineDanger}`}>
                <i className="fas fa-times"></i> Từ chối
              </button>
              <button className={`${styles.btn} ${styles.btnOutlinePrimary}`}>
                <i className="fas fa-comments"></i> Liên hệ
              </button>
              <button className={`${styles.btn} ${styles.btnSuccess}`}>
                <i className="fas fa-check"></i> Chấp nhận
              </button>
            </div>
          </div>

          {/* Transaction History */}
          <h2 className={`${styles.sectionTitle} ${styles.mt5}`}>
            Lịch sử giao dịch gần đây
          </h2>

          <div className={styles.transactionCard}>
            <div className={styles.transactionHeader}>
              <div className={styles.transactionTitle}>Lịch sử thanh toán</div>
              <button
                className={`${styles.btn} ${styles.btnSm} ${styles.btnOutline}`}
              >
                Xem tất cả
              </button>
            </div>

            <div className={styles.transactionList}>
              <div className={styles.transactionItem}>
                <div className={`${styles.transactionIcon} ${styles.income}`}>
                  <i className="fas fa-arrow-down"></i>
                </div>
                <div className={styles.transactionInfo}>
                  <div className={styles.transactionName}>
                    Tiền thuê từ Lê Thị Hồng
                  </div>
                  <div className={styles.transactionDate}>
                    01/01/2026 - Hợp đồng HD-2026-001
                  </div>
                </div>
                <div className={`${styles.transactionAmount} ${styles.income}`}>
                  + 5,500,000 ₫
                </div>
              </div>

              <div className={styles.transactionItem}>
                <div className={`${styles.transactionIcon} ${styles.income}`}>
                  <i className="fas fa-arrow-down"></i>
                </div>
                <div className={styles.transactionInfo}>
                  <div className={styles.transactionName}>
                    Tiền thuê từ Trần Quốc Bảo
                  </div>
                  <div className={styles.transactionDate}>
                    15/01/2026 - Hợp đồng HD-2025-045
                  </div>
                </div>
                <div className={`${styles.transactionAmount} ${styles.income}`}>
                  + 3,500,000 ₫
                </div>
              </div>

              <div className={styles.transactionItem}>
                <div className={`${styles.transactionIcon} ${styles.expense}`}>
                  <i className="fas fa-arrow-up"></i>
                </div>
                <div className={styles.transactionInfo}>
                  <div className={styles.transactionName}>
                    Chi phí sửa chữa máy lạnh
                  </div>
                  <div className={styles.transactionDate}>
                    10/01/2026 - Căn hộ Sunrise City
                  </div>
                </div>
                <div
                  className={`${styles.transactionAmount} ${styles.expense}`}
                >
                  - 1,200,000 ₫
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
