import React, { useState } from "react";
import styles from "./ContractManagement.module.css";

export default function ContractManagement() {
  const [activeTab, setActiveTab] = useState("Tất cả hợp đồng");
  const [showModal, setShowModal] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);

  const contracts = [
    {
      id: "HD-2026-001",
      status: "active",
      title: "Căn hộ cao cấp Vinhomes Central Park",
      address: "Tòa Park 5, 720A Điện Biên Phủ, Quận Bình Thạnh, TP.HCM",
      price: "8.5 triệu/tháng",
      startDate: "15/02/2026",
      endDate: "15/02/2027",
      duration: "12 tháng",
      deposit: "17 triệu đồng",
      tenant: {
        name: "Trần Quốc Bảo",
        phone: "0912 345 678",
        email: "baotq@gmail.com",
        id: "079201012345",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      progress: 17,
      image:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    },
    {
      id: "HD-2026-002",
      status: "expiring",
      title: "Căn hộ The Sun Avenue",
      address: "Tòa 5, 28 Mai Chí Thọ, Quận 2, TP.HCM",
      price: "7.2 triệu/tháng",
      startDate: "05/04/2025",
      endDate: "05/04/2026",
      duration: "12 tháng",
      deposit: "14.4 triệu đồng",
      tenant: {
        name: "Lê Minh Hiếu",
        phone: "0934 567 890",
        email: "hieulm@gmail.com",
        id: "079199012345",
        avatar: "https://randomuser.me/api/portraits/men/68.jpg",
      },
      progress: 92,
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    },
    {
      id: "HD-2026-003",
      status: "active",
      title: "Căn hộ Sunrise City",
      address: "Tòa W3, 23 Nguyễn Hữu Thọ, Quận 7, TP.HCM",
      price: "5.5 triệu/tháng",
      startDate: "10/01/2026",
      endDate: "10/07/2026",
      duration: "6 tháng",
      deposit: "11 triệu đồng",
      tenant: {
        name: "Nguyễn Minh Tâm",
        phone: "0987 654 321",
        email: "tamnm@gmail.com",
        id: "079202012345",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      },
      progress: 33,
      image:
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
    },
    {
      id: "HD-2025-045",
      status: "expired",
      title: "Căn hộ Masteri Thảo Điền",
      address: "Tòa T4, 159 Xa lộ Hà Nội, Quận 2, TP.HCM",
      price: "6.8 triệu/tháng",
      startDate: "01/02/2025",
      endDate: "01/02/2026",
      duration: "12 tháng",
      deposit: "13.6 triệu đồng",
      tenant: {
        name: "Võ Thị Hương",
        phone: "0945 123 789",
        email: "huongvt@gmail.com",
        id: "079198012345",
        avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      },
      progress: 100,
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    },
  ];

  const tabs = [
    "Tất cả hợp đồng",
    "Đang hoạt động",
    "Sắp hết hạn",
    "Đã hết hạn",
    "Chờ ký",
  ];

  const getStatusClass = (status) => {
    const statusMap = {
      active: styles.statusActive,
      expiring: styles.statusExpiring,
      expired: styles.statusExpired,
      pending: styles.statusPending,
    };
    return statusMap[status] || "";
  };

  const getStatusText = (status) => {
    const statusMap = {
      active: "Đang hoạt động",
      expiring: "Sắp hết hạn",
      expired: "Đã hết hạn",
      pending: "Chờ ký",
    };
    return statusMap[status] || "";
  };

  const getProgressClass = (progress) => {
    if (progress >= 90) return styles.progressDanger;
    if (progress >= 70) return styles.progressWarning;
    return "";
  };

  const openContractDetail = (contract) => {
    setSelectedContract(contract);
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeContractDetail = () => {
    setShowModal(false);
    setSelectedContract(null);
    document.body.style.overflow = "auto";
  };
  return (
    <>
      <div className={styles.contractManagement}>
        <div className={styles.navbar}>
          <div className={styles.navTitle}>Quản lý hợp đồng</div>
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
        </div>

        <div className={styles.dashboardContainer}>
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Hợp đồng thuê</h1>
            <p className={styles.pageSubtitle}>
              Quản lý và theo dõi các hợp đồng thuê bất động sản
            </p>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <div className={styles.statTitle}>Tổng hợp đồng</div>
                <div className={`${styles.statIcon} ${styles.primary}`}>
                  <i className="fas fa-file-contract"></i>
                </div>
              </div>
              <div className={styles.statValue}>18</div>
              <div className={styles.statDescription}>
                <span className={`${styles.statChange} ${styles.positive}`}>
                  +3
                </span>
                <span>so với tháng trước</span>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <div className={styles.statTitle}>Đang hoạt động</div>
                <div className={`${styles.statIcon} ${styles.success}`}>
                  <i className="fas fa-check-circle"></i>
                </div>
              </div>
              <div className={styles.statValue}>12</div>
              <div className={styles.statDescription}>
                <span>Hợp đồng còn hiệu lực</span>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <div className={styles.statTitle}>Sắp hết hạn</div>
                <div className={`${styles.statIcon} ${styles.warning}`}>
                  <i className="fas fa-clock"></i>
                </div>
              </div>
              <div className={styles.statValue}>4</div>
              <div className={styles.statDescription}>
                <span>Hết hạn trong 30 ngày</span>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <div className={styles.statTitle}>Doanh thu tháng này</div>
                <div className={`${styles.statIcon} ${styles.info}`}>
                  <i className="fas fa-dollar-sign"></i>
                </div>
              </div>
              <div className={styles.statValue}>86.4M</div>
              <div className={styles.statDescription}>
                <span className={`${styles.statChange} ${styles.positive}`}>
                  +12%
                </span>
                <span>so với tháng trước</span>
              </div>
            </div>
          </div>

          <div className={styles.filterBar}>
            <div className={styles.filterSection}>
              <div className={styles.filterSearch}>
                <i className="fas fa-search"></i>
                <input type="text" placeholder="Tìm kiếm hợp đồng..." />
              </div>

              <div className={styles.filterDropdown}>
                <select>
                  <option value="">Tất cả trạng thái</option>
                  <option value="active">Đang hoạt động</option>
                  <option value="expiring">Sắp hết hạn</option>
                  <option value="expired">Đã hết hạn</option>
                  <option value="pending">Chờ ký</option>
                </select>
              </div>
            </div>

            <div className={styles.filterSection}>
              <div className={styles.filterDate}>
                <input type="date" placeholder="Từ ngày" />
              </div>

              <div className={styles.filterDate}>
                <input type="date" placeholder="Đến ngày" />
              </div>

              <button
                className={`${styles.btn} ${styles.btnSm} ${styles.btnOutline}`}
              >
                <i className="fas fa-filter"></i> Lọc
              </button>

              <button
                className={`${styles.btn} ${styles.btnSm} ${styles.btnPrimary}`}
              >
                <i className="fas fa-plus"></i> Tạo hợp đồng mới
              </button>
            </div>
          </div>

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

          {contracts.map((contract) => (
            <div
              key={contract.id}
              className={styles.contractCard}
              onClick={() => openContractDetail(contract)}
            >
              <div className={styles.contractHeader}>
                <h3 className={styles.contractTitle}>
                  Hợp đồng #{contract.id}
                </h3>
                <span
                  className={`${styles.contractStatus} ${getStatusClass(contract.status)}`}
                >
                  {getStatusText(contract.status)}
                </span>
              </div>

              <div className={styles.contractProperty}>
                <div className={styles.contractImage}>
                  <img src={contract.image} alt="Property" />
                </div>
                <div className={styles.contractInfo}>
                  <div className={styles.contractPropertyTitle}>
                    {contract.title}
                  </div>
                  <div className={styles.contractAddress}>
                    {contract.address}
                  </div>
                  <div className={styles.contractPrice}>{contract.price}</div>
                </div>
              </div>

              <div className={styles.contractMeta}>
                <div className={styles.metaItem}>
                  <div className={styles.metaLabel}>Ngày bắt đầu</div>
                  <div className={styles.metaValue}>{contract.startDate}</div>
                </div>
                <div className={styles.metaItem}>
                  <div className={styles.metaLabel}>Ngày kết thúc</div>
                  <div className={styles.metaValue}>{contract.endDate}</div>
                </div>
                <div className={styles.metaItem}>
                  <div className={styles.metaLabel}>Thời hạn</div>
                  <div className={styles.metaValue}>{contract.duration}</div>
                </div>
                <div className={styles.metaItem}>
                  <div className={styles.metaLabel}>Tiền cọc</div>
                  <div className={styles.metaValue}>{contract.deposit}</div>
                </div>
              </div>

              <div className={styles.contractTenant}>
                <img
                  src={contract.tenant.avatar}
                  alt="Tenant"
                  className={styles.tenantAvatar}
                />
                <div className={styles.tenantInfo}>
                  <div className={styles.tenantName}>
                    {contract.tenant.name}
                  </div>
                  <div className={styles.tenantDetails}>
                    <div className={styles.tenantContact}>
                      <i className="fas fa-phone"></i> {contract.tenant.phone}
                    </div>
                    <div className={styles.tenantContact}>
                      <i className="fas fa-envelope"></i>{" "}
                      {contract.tenant.email}
                    </div>
                    <div className={styles.tenantContact}>
                      <i className="fas fa-id-card"></i> {contract.tenant.id}
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.contractProgress}>
                <div className={styles.progressHeader}>
                  <div className={styles.progressLabel}>Tiến độ hợp đồng</div>
                  <div className={styles.progressValue}>
                    {contract.status === "expired"
                      ? "12/12 tháng (100%)"
                      : contract.id === "HD-2026-002"
                        ? "11/12 tháng (92%)"
                        : contract.id === "HD-2026-003"
                          ? "2/6 tháng (33%)"
                          : "2/12 tháng (17%)"}
                  </div>
                </div>
                <div className={styles.progressBar}>
                  <div
                    className={`${styles.progressFill} ${getProgressClass(contract.progress)}`}
                    style={{ width: `${contract.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className={styles.contractActions}>
                {contract.status === "expiring" && (
                  <button
                    className={`${styles.btn} ${styles.btnOutlineSuccess} ${styles.btnSm}`}
                  >
                    <i className="fas fa-sync"></i> Gia hạn
                  </button>
                )}
                {contract.status === "expired" ? (
                  <button
                    className={`${styles.btn} ${styles.btnOutline} ${styles.btnSm}`}
                  >
                    <i className="fas fa-archive"></i> Lưu trữ
                  </button>
                ) : (
                  <button
                    className={`${styles.btn} ${styles.btnOutlinePrimary} ${styles.btnSm}`}
                  >
                    <i className="fas fa-file-invoice"></i> Hóa đơn
                  </button>
                )}
                <button
                  className={`${styles.btn} ${styles.btnOutlinePrimary} ${styles.btnSm}`}
                >
                  <i className="fas fa-file-pdf"></i> Xuất PDF
                </button>
                <button
                  className={`${styles.btn} ${styles.btnPrimary} ${styles.btnSm}`}
                >
                  <i className="fas fa-eye"></i> Xem chi tiết
                </button>
              </div>
            </div>
          ))}

          <div className={styles.pagination}>
            <div className={`${styles.pageItem} ${styles.disabled}`}>
              <i className="fas fa-angle-left"></i>
            </div>
            <div className={`${styles.pageItem} ${styles.active}`}>1</div>
            <div className={styles.pageItem}>2</div>
            <div className={styles.pageItem}>3</div>
            <div className={styles.pageItem}>...</div>
            <div className={styles.pageItem}>5</div>
            <div className={styles.pageItem}>
              <i className="fas fa-angle-right"></i>
            </div>
          </div>
        </div>

        {showModal && selectedContract && (
          <div className={styles.modalBackdrop} onClick={closeContractDetail}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h2 className={styles.modalTitle}>
                  Chi tiết hợp đồng #{selectedContract.id}
                </h2>
                <div
                  className={styles.modalClose}
                  onClick={closeContractDetail}
                >
                  <i className="fas fa-times"></i>
                </div>
              </div>
              <div className={styles.modalBody}>
                <div className={styles.modalInfo}>
                  <span
                    className={`${styles.badge} ${styles.badgeSuccess}`}
                    style={{ fontSize: "0.9rem", padding: "0.5rem 1rem" }}
                  >
                    {getStatusText(selectedContract.status)}
                  </span>
                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        fontSize: "0.875rem",
                        color: "var(--text-light)",
                      }}
                    >
                      Ngày tạo: 10/02/2026
                    </div>
                    <div
                      style={{
                        fontSize: "0.875rem",
                        color: "var(--text-light)",
                      }}
                    >
                      Cập nhật: 01/03/2026
                    </div>
                  </div>
                </div>

                <div className={styles.contractProperty}>
                  <div className={styles.contractImage}>
                    <img src={selectedContract.image} alt="Property" />
                  </div>
                  <div className={styles.contractInfo}>
                    <div className={styles.contractPropertyTitle}>
                      {selectedContract.title}
                    </div>
                    <div className={styles.contractAddress}>
                      {selectedContract.address}
                    </div>
                    <div className={styles.contractPrice}>
                      {selectedContract.price}
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: "2rem" }}>
                  <h3 style={{ marginBottom: "1rem", fontSize: "1.125rem" }}>
                    Thông tin hợp đồng
                  </h3>
                  <div className={styles.contractMeta}>
                    <div className={styles.metaItem}>
                      <div className={styles.metaLabel}>Mã hợp đồng</div>
                      <div className={styles.metaValue}>
                        #{selectedContract.id}
                      </div>
                    </div>
                    <div className={styles.metaItem}>
                      <div className={styles.metaLabel}>Ngày bắt đầu</div>
                      <div className={styles.metaValue}>
                        {selectedContract.startDate}
                      </div>
                    </div>
                    <div className={styles.metaItem}>
                      <div className={styles.metaLabel}>Ngày kết thúc</div>
                      <div className={styles.metaValue}>
                        {selectedContract.endDate}
                      </div>
                    </div>
                    <div className={styles.metaItem}>
                      <div className={styles.metaLabel}>Thời hạn thuê</div>
                      <div className={styles.metaValue}>
                        {selectedContract.duration}
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: "2rem" }}>
                  <h3 style={{ marginBottom: "1rem", fontSize: "1.125rem" }}>
                    Thông tin người thuê
                  </h3>
                  <div className={styles.contractTenant}>
                    <img
                      src={selectedContract.tenant.avatar}
                      alt="Tenant"
                      className={styles.tenantAvatar}
                    />
                    <div className={styles.tenantInfo}>
                      <div className={styles.tenantName}>
                        {selectedContract.tenant.name}
                      </div>
                      <div className={styles.tenantDetails}>
                        <div className={styles.tenantContact}>
                          <i className="fas fa-phone"></i>{" "}
                          {selectedContract.tenant.phone}
                        </div>
                        <div className={styles.tenantContact}>
                          <i className="fas fa-envelope"></i>{" "}
                          {selectedContract.tenant.email}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.modalFooter}>
                <button
                  className={`${styles.btn} ${styles.btnOutline}`}
                  onClick={closeContractDetail}
                >
                  <i className="fas fa-times"></i> Đóng
                </button>
                <button className={`${styles.btn} ${styles.btnOutlineDanger}`}>
                  <i className="fas fa-ban"></i> Hủy hợp đồng
                </button>
                <button className={`${styles.btn} ${styles.btnOutlinePrimary}`}>
                  <i className="fas fa-edit"></i> Chỉnh sửa
                </button>
                <button className={`${styles.btn} ${styles.btnPrimary}`}>
                  <i className="fas fa-file-pdf"></i> Xuất PDF
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
