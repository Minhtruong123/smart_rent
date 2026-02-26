import React, { useState } from "react";
import styles from "./DashboardTenantPage.module.css";

export default function DashboardTenantPage() {
  const [activePage, setActivePage] = useState("dashboard");
  const [chatbotVisible, setChatbotVisible] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "bot",
      text: "Xin chào! Tôi là SmartBot, trợ lý AI của SmartRent. Tôi có thể giúp bạn tìm nhà, tư vấn thanh toán, hoặc giải đáp thắc mắc về hợp đồng. Bạn cần hỗ trợ gì?",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(0);

  const showPage = (pageId) => {
    setActivePage(pageId);
  };

  const toggleChatbot = () => {
    setChatbotVisible(!chatbotVisible);
  };

  const sendMessage = () => {
    if (chatInput.trim()) {
      setChatMessages([...chatMessages, { sender: "user", text: chatInput }]);
      setChatInput("");

      setTimeout(() => {
        const responses = [
          "Tôi đã hiểu câu hỏi của bạn. Để tìm được căn hộ phù hợp, bạn có thể sử dụng chức năng 'Tìm kiếm' và lọc theo khu vực, giá thuê mong muốn.",
          "Về thanh toán, SmartRent hỗ trợ nhiều phương thức như VNPay, MoMo, ZaloPay. Bạn có thể thanh toán trực tuyến một cách an toàn.",
          "Nếu có thắc mắc về hợp đồng, bạn có thể xem chi tiết trong mục 'Hợp đồng thuê' hoặc liên hệ trực tiếp với chủ nhà.",
        ];
        const randomResponse =
          responses[Math.floor(Math.random() * responses.length)];
        setChatMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: randomResponse },
        ]);
      }, 1000);
    }
  };

  const handleChatKeypress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const paymentMethods = [
    {
      id: 0,
      name: "VNPay",
      description: "Thanh toán qua VNPay QR",
      img: "https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-VNPAY-QR-1.png",
    },
    {
      id: 1,
      name: "MoMo",
      description: "Ví điện tử MoMo",
      img: "https://developers.momo.vn/v3/assets/images/logo.png",
    },
    {
      id: 2,
      name: "ZaloPay",
      description: "Ví điện tử ZaloPay",
      img: "https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-ZaloPay.png",
    },
    {
      id: 3,
      name: "Chuyển khoản",
      description: "Chuyển khoản ngân hàng",
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135706.png",
    },
  ];

  const menuItems = [
    { id: "dashboard", icon: "fas fa-tachometer-alt", label: "Dashboard" },
    { id: "search", icon: "fas fa-search", label: "Tìm kiếm nhà" },
    { id: "requests", icon: "fas fa-clipboard-list", label: "Yêu cầu thuê" },
    { id: "contracts", icon: "fas fa-file-contract", label: "Hợp đồng thuê" },
    { id: "bills", icon: "fas fa-receipt", label: "Hóa đơn & Chi phí" },
    {
      id: "payment-history",
      icon: "fas fa-history",
      label: "Lịch sử thanh toán",
    },
    { id: "payments", icon: "fas fa-credit-card", label: "Thanh toán" },
    { id: "profile", icon: "fas fa-user-edit", label: "Thông tin cá nhân" },
    { id: "notifications", icon: "fas fa-bell", label: "Thông báo" },
  ];

  return (
    <div className={styles.mainLayout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <ul className={styles.sidebarMenu}>
          {menuItems.map((item) => (
            <li key={item.id}>
              <a
                href="#"
                onClick={() => showPage(item.id)}
                className={`${styles.menuItem} ${activePage === item.id ? styles.active : ""}`}
              >
                <i className={item.icon}></i>
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </aside>

      {/* Content */}
      <main className={styles.content}>
        {/* Dashboard Page */}
        <div
          className={`${styles.page} ${activePage === "dashboard" ? styles.active : ""}`}
        >
          <div className={styles.pageHeader}>
            <div>
              <h1 className={styles.pageTitle}>Dashboard</h1>
              <p className={styles.breadcrumb}>
                <i className="fas fa-home"></i> Trang chủ / Dashboard
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className={styles.statsGrid}>
            <div className={`${styles.statCard} ${styles.statPurple}`}>
              <div className={styles.statContent}>
                <div className={styles.statLabel}>Yêu cầu thuê đang chờ</div>
                <div className={styles.statNumber}>3</div>
              </div>
              <div className={styles.statIcon}>
                <i className="fas fa-clipboard-list"></i>
              </div>
            </div>
            <div className={`${styles.statCard} ${styles.statBlue}`}>
              <div className={styles.statContent}>
                <div className={styles.statLabel}>Hợp đồng hiện tại</div>
                <div className={styles.statNumber}>2</div>
              </div>
              <div className={styles.statIcon}>
                <i className="fas fa-file-contract"></i>
              </div>
            </div>
            <div className={`${styles.statCard} ${styles.statOrange}`}>
              <div className={styles.statContent}>
                <div className={styles.statLabel}>Hóa đơn chưa thanh toán</div>
                <div className={styles.statNumber}>1</div>
              </div>
              <div className={styles.statIcon}>
                <i className="fas fa-receipt"></i>
              </div>
            </div>
            <div className={`${styles.statCard} ${styles.statGreen}`}>
              <div className={styles.statContent}>
                <div className={styles.statLabel}>Tổng chi phí tháng này</div>
                <div className={styles.statNumber}>8.5M</div>
              </div>
              <div className={styles.statIcon}>
                <i className="fas fa-dollar-sign"></i>
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>
                <i className="fas fa-chart-line"></i> Hoạt động gần đây
              </h3>
              <button className={styles.btnOutline}>
                <i className="fas fa-filter"></i> Lọc
              </button>
            </div>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Thời gian</th>
                    <th>Hoạt động</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className={styles.dateCell}>
                        <i className="fas fa-calendar"></i>
                        <span>10/01/2026</span>
                      </div>
                    </td>
                    <td>
                      <div className={styles.activityCell}>
                        <i className="fas fa-home"></i>
                        <span>Yêu cầu thuê căn hộ Vinhomes Central Park</span>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`${styles.badge} ${styles.badgeWarning}`}
                      >
                        <i className="fas fa-clock"></i> Đang chờ
                      </span>
                    </td>
                    <td>
                      <button className={styles.btnSmall}>
                        <i className="fas fa-eye"></i> Chi tiết
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className={styles.dateCell}>
                        <i className="fas fa-calendar"></i>
                        <span>08/01/2026</span>
                      </div>
                    </td>
                    <td>
                      <div className={styles.activityCell}>
                        <i className="fas fa-credit-card"></i>
                        <span>Thanh toán tiền thuê tháng 1</span>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`${styles.badge} ${styles.badgeSuccess}`}
                      >
                        <i className="fas fa-check"></i> Thành công
                      </span>
                    </td>
                    <td>
                      <button className={styles.btnSmall}>
                        <i className="fas fa-eye"></i> Xem
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className={styles.dateCell}>
                        <i className="fas fa-calendar"></i>
                        <span>05/01/2026</span>
                      </div>
                    </td>
                    <td>
                      <div className={styles.activityCell}>
                        <i className="fas fa-file-signature"></i>
                        <span>Ký hợp đồng thuê căn hộ Masteri Thảo Điền</span>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`${styles.badge} ${styles.badgeSuccess}`}
                      >
                        <i className="fas fa-check-double"></i> Hoàn thành
                      </span>
                    </td>
                    <td>
                      <button className={styles.btnSmall}>
                        <i className="fas fa-eye"></i> Xem
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Search Page */}
        <div
          className={`${styles.page} ${activePage === "search" ? styles.active : ""}`}
        >
          <div className={styles.pageHeader}>
            <div>
              <h1 className={styles.pageTitle}>Tìm kiếm nhà</h1>
              <p className={styles.breadcrumb}>
                <i className="fas fa-home"></i> Trang chủ / Tìm kiếm
              </p>
            </div>
          </div>

          {/* Search Form */}
          <div className={styles.searchCard}>
            <div className={styles.searchHeader}>
              <h3 className={styles.searchTitle}>
                <i className="fas fa-search"></i> Tìm ngôi nhà mơ ước của bạn
              </h3>
              <p className={styles.searchSubtitle}>
                Khám phá hàng ngàn căn hộ chất lượng cao
              </p>
            </div>
            <form className={styles.searchForm}>
              <div className={styles.formGroup}>
                <label>
                  <i className="fas fa-map-marker-alt"></i> Khu vực
                </label>
                <input type="text" placeholder="Nhập địa điểm..." />
              </div>
              <div className={styles.formGroup}>
                <label>
                  <i className="fas fa-dollar-sign"></i> Giá thuê
                </label>
                <select>
                  <option>Tất cả</option>
                  <option>Dưới 3 triệu</option>
                  <option>3-5 triệu</option>
                  <option>5-10 triệu</option>
                  <option>Trên 10 triệu</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>
                  <i className="fas fa-building"></i> Loại hình
                </label>
                <select>
                  <option>Tất cả</option>
                  <option>Căn hộ</option>
                  <option>Nhà phố</option>
                  <option>Studio</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <button type="submit" className={styles.btnPrimary}>
                  <i className="fas fa-search"></i>
                  Tìm kiếm
                </button>
              </div>
            </form>
          </div>

          {/* Search Results */}
          <div className={styles.resultsHeader}>
            <h3>
              <i className="fas fa-list"></i> Kết quả tìm kiếm (2)
            </h3>
            <div className={styles.viewToggle}>
              <button className={styles.active}>
                <i className="fas fa-th"></i>
              </button>
              <button>
                <i className="fas fa-list"></i>
              </button>
            </div>
          </div>

          <div className={styles.propertiesGrid}>
            <div className={styles.propertyCard}>
              <div className={styles.propertyImage}>
                <div className={styles.propertyBadge}>
                  <i className="fas fa-star"></i> Mới
                </div>
                <button className={styles.favoriteBtn}>
                  <i className="far fa-heart"></i>
                </button>
              </div>
              <div className={styles.propertyInfo}>
                <div className={styles.propertyPrice}>
                  <span className={styles.priceAmount}>8.5 triệu</span>
                  <span className={styles.pricePeriod}>/tháng</span>
                </div>
                <h4 className={styles.propertyTitle}>
                  Căn hộ cao cấp Vinhomes Central Park
                </h4>
                <div className={styles.propertyLocation}>
                  <i className="fas fa-map-marker-alt"></i>
                  Quận Bình Thạnh, TP.HCM
                </div>
                <div className={styles.propertyFeatures}>
                  <div className={styles.feature}>
                    <i className="fas fa-bed"></i>
                    <span>2 phòng</span>
                  </div>
                  <div className={styles.feature}>
                    <i className="fas fa-bath"></i>
                    <span>2 WC</span>
                  </div>
                  <div className={styles.feature}>
                    <i className="fas fa-expand"></i>
                    <span>75m²</span>
                  </div>
                </div>
                <div className={styles.propertyActions}>
                  <button className={styles.btnPrimary}>
                    <i className="fas fa-paper-plane"></i>
                    Gửi yêu cầu
                  </button>
                  <button className={styles.btnOutline}>
                    <i className="fas fa-eye"></i>
                    Chi tiết
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.propertyCard}>
              <div className={styles.propertyImage}>
                <div className={`${styles.propertyBadge} ${styles.badgeHot}`}>
                  <i className="fas fa-fire"></i> Hot
                </div>
                <button className={styles.favoriteBtn}>
                  <i className="far fa-heart"></i>
                </button>
              </div>
              <div className={styles.propertyInfo}>
                <div className={styles.propertyPrice}>
                  <span className={styles.priceAmount}>5.5 triệu</span>
                  <span className={styles.pricePeriod}>/tháng</span>
                </div>
                <h4 className={styles.propertyTitle}>Căn hộ Sunrise City</h4>
                <div className={styles.propertyLocation}>
                  <i className="fas fa-map-marker-alt"></i>
                  Quận 7, TP.HCM
                </div>
                <div className={styles.propertyFeatures}>
                  <div className={styles.feature}>
                    <i className="fas fa-bed"></i>
                    <span>1 phòng</span>
                  </div>
                  <div className={styles.feature}>
                    <i className="fas fa-bath"></i>
                    <span>1 WC</span>
                  </div>
                  <div className={styles.feature}>
                    <i className="fas fa-expand"></i>
                    <span>55m²</span>
                  </div>
                </div>
                <div className={styles.propertyActions}>
                  <button className={styles.btnPrimary}>
                    <i className="fas fa-paper-plane"></i>
                    Gửi yêu cầu
                  </button>
                  <button className={styles.btnOutline}>
                    <i className="fas fa-eye"></i>
                    Chi tiết
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Requests Page */}
        <div
          className={`${styles.page} ${activePage === "requests" ? styles.active : ""}`}
        >
          <div className={styles.pageHeader}>
            <div>
              <h1 className={styles.pageTitle}>Yêu cầu thuê</h1>
              <p className={styles.breadcrumb}>
                <i className="fas fa-home"></i> Trang chủ / Yêu cầu thuê
              </p>
            </div>
            <button className={styles.btnPrimary}>
              <i className="fas fa-plus"></i>
              Tạo yêu cầu mới
            </button>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>
                <i className="fas fa-clipboard-list"></i> Danh sách yêu cầu
              </h3>
              <div className={styles.filterGroup}>
                <select className={styles.filterSelect}>
                  <option>Tất cả trạng thái</option>
                  <option>Đang chờ</option>
                  <option>Chấp nhận</option>
                  <option>Từ chối</option>
                </select>
              </div>
            </div>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Ngày gửi</th>
                    <th>Bất động sản</th>
                    <th>Chủ nhà</th>
                    <th>Giá thuê</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>10/01/2026</td>
                    <td>Căn hộ Vinhomes Central Park</td>
                    <td>
                      <div className={styles.userCell}>
                        <div className={styles.userAvatar}>N</div>
                        <span>Nguyễn Văn A</span>
                      </div>
                    </td>
                    <td>
                      <strong>8.5 triệu/tháng</strong>
                    </td>
                    <td>
                      <span
                        className={`${styles.badge} ${styles.badgeWarning}`}
                      >
                        <i className="fas fa-clock"></i> Đang chờ
                      </span>
                    </td>
                    <td>
                      <div className={styles.actionGroup}>
                        <button className={styles.btnSmall}>
                          <i className="fas fa-eye"></i>
                        </button>
                        <button
                          className={`${styles.btnSmall} ${styles.btnDanger}`}
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>08/01/2026</td>
                    <td>Studio Lexington Residence</td>
                    <td>
                      <div className={styles.userCell}>
                        <div className={styles.userAvatar}>T</div>
                        <span>Trần Thị B</span>
                      </div>
                    </td>
                    <td>
                      <strong>3.5 triệu/tháng</strong>
                    </td>
                    <td>
                      <span
                        className={`${styles.badge} ${styles.badgeSuccess}`}
                      >
                        <i className="fas fa-check"></i> Chấp nhận
                      </span>
                    </td>
                    <td>
                      <div className={styles.actionGroup}>
                        <button
                          className={`${styles.btnSmall} ${styles.btnSuccess}`}
                        >
                          <i className="fas fa-file-signature"></i> Ký hợp đồng
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>05/01/2026</td>
                    <td>Căn hộ Masteri Thảo Điền</td>
                    <td>
                      <div className={styles.userCell}>
                        <div className={styles.userAvatar}>L</div>
                        <span>Lê Văn C</span>
                      </div>
                    </td>
                    <td>
                      <strong>4.2 triệu/tháng</strong>
                    </td>
                    <td>
                      <span className={`${styles.badge} ${styles.badgeDanger}`}>
                        <i className="fas fa-times"></i> Từ chối
                      </span>
                    </td>
                    <td>
                      <div className={styles.actionGroup}>
                        <button className={styles.btnSmall}>
                          <i className="fas fa-info-circle"></i> Lý do
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Contracts Page */}
        <div
          className={`${styles.page} ${activePage === "contracts" ? styles.active : ""}`}
        >
          <div className={styles.pageHeader}>
            <div>
              <h1 className={styles.pageTitle}>Hợp đồng thuê</h1>
              <p className={styles.breadcrumb}>
                <i className="fas fa-home"></i> Trang chủ / Hợp đồng
              </p>
            </div>
          </div>

          <div className={styles.contractCard}>
            <div className={styles.contractHeader}>
              <div className={styles.contractInfo}>
                <h3 className={styles.contractTitle}>
                  <i className="fas fa-file-contract"></i> Hợp đồng thuê căn hộ
                  Masteri Thảo Điền
                </h3>
                <p className={styles.contractCode}>Mã HĐ: #HD001234</p>
              </div>
              <span
                className={`${styles.badge} ${styles.badgeSuccess} ${styles.badgeLarge}`}
              >
                <i className="fas fa-check-circle"></i> Đang hiệu lực
              </span>
            </div>
            <div className={styles.contractBody}>
              <div className={styles.contractDetails}>
                <div className={styles.detailItem}>
                  <div className={styles.detailIcon}>
                    <i className="fas fa-calendar-alt"></i>
                  </div>
                  <div className={styles.detailContent}>
                    <span className={styles.detailLabel}>Thời hạn</span>
                    <span className={styles.detailValue}>
                      01/01/2026 - 31/12/2026
                    </span>
                  </div>
                </div>
                <div className={styles.detailItem}>
                  <div className={styles.detailIcon}>
                    <i className="fas fa-dollar-sign"></i>
                  </div>
                  <div className={styles.detailContent}>
                    <span className={styles.detailLabel}>Giá thuê</span>
                    <span className={styles.detailValue}>4.2 triệu/tháng</span>
                  </div>
                </div>
                <div className={styles.detailItem}>
                  <div className={styles.detailIcon}>
                    <i className="fas fa-user"></i>
                  </div>
                  <div className={styles.detailContent}>
                    <span className={styles.detailLabel}>Chủ nhà</span>
                    <span className={styles.detailValue}>Lê Văn C</span>
                  </div>
                </div>
                <div className={styles.detailItem}>
                  <div className={styles.detailIcon}>
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className={styles.detailContent}>
                    <span className={styles.detailLabel}>Địa chỉ</span>
                    <span className={styles.detailValue}>Quận 2, TP.HCM</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.contractActions}>
              <button className={styles.btnPrimary}>
                <i className="fas fa-download"></i>
                Tải hợp đồng
              </button>
              <button className={styles.btnOutline}>
                <i className="fas fa-eye"></i>
                Xem chi tiết
              </button>
              <button className={styles.btnOutline}>
                <i className="fas fa-print"></i>
                In hợp đồng
              </button>
            </div>
          </div>

          <div className={styles.contractCard}>
            <div className={styles.contractHeader}>
              <div className={styles.contractInfo}>
                <h3 className={styles.contractTitle}>
                  <i className="fas fa-file-contract"></i> Hợp đồng thuê Studio
                  Lexington
                </h3>
                <p className={styles.contractCode}>Mã HĐ: #HD001235</p>
              </div>
              <span
                className={`${styles.badge} ${styles.badgeWarning} ${styles.badgeLarge}`}
              >
                <i className="fas fa-exclamation-triangle"></i> Sắp hết hạn
              </span>
            </div>
            <div className={styles.contractBody}>
              <div className={styles.contractDetails}>
                <div className={styles.detailItem}>
                  <div className={styles.detailIcon}>
                    <i className="fas fa-calendar-alt"></i>
                  </div>
                  <div className={styles.detailContent}>
                    <span className={styles.detailLabel}>Thời hạn</span>
                    <span className={styles.detailValue}>
                      01/06/2025 - 31/05/2026
                    </span>
                  </div>
                </div>
                <div className={styles.detailItem}>
                  <div className={styles.detailIcon}>
                    <i className="fas fa-dollar-sign"></i>
                  </div>
                  <div className={styles.detailContent}>
                    <span className={styles.detailLabel}>Giá thuê</span>
                    <span className={styles.detailValue}>3.5 triệu/tháng</span>
                  </div>
                </div>
                <div className={styles.detailItem}>
                  <div className={styles.detailIcon}>
                    <i className="fas fa-user"></i>
                  </div>
                  <div className={styles.detailContent}>
                    <span className={styles.detailLabel}>Chủ nhà</span>
                    <span className={styles.detailValue}>Trần Thị B</span>
                  </div>
                </div>
                <div className={styles.detailItem}>
                  <div className={styles.detailIcon}>
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className={styles.detailContent}>
                    <span className={styles.detailLabel}>Địa chỉ</span>
                    <span className={styles.detailValue}>Quận 2, TP.HCM</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.contractActions}>
              <button className={`${styles.btnPrimary} ${styles.btnWarning}`}>
                <i className="fas fa-sync-alt"></i>
                Gia hạn hợp đồng
              </button>
              <button className={styles.btnOutline}>
                <i className="fas fa-eye"></i>
                Xem chi tiết
              </button>
            </div>
          </div>
        </div>

        {/* Bills Page */}
        <div
          className={`${styles.page} ${activePage === "bills" ? styles.active : ""}`}
        >
          <div className={styles.pageHeader}>
            <div>
              <h1 className={styles.pageTitle}>Hóa đơn & Chi phí</h1>
              <p className={styles.breadcrumb}>
                <i className="fas fa-home"></i> Trang chủ / Hóa đơn
              </p>
            </div>
          </div>

          <div className={styles.billCard}>
            <div className={styles.billHeader}>
              <div>
                <h3 className={styles.billTitle}>
                  <i className="fas fa-receipt"></i> Tổng chi phí tháng 1/2026
                </h3>
                <p className={styles.billSubtitle}>
                  Cần thanh toán trước ngày 15/01/2026
                </p>
              </div>
              <div className={styles.billAmount}>
                <span className={styles.amountLabel}>Tổng cộng</span>
                <span className={styles.amountValue}>8,560,000 VNĐ</span>
              </div>
            </div>

            <div className={styles.billItems}>
              <div className={styles.billItem}>
                <div className={styles.billItemInfo}>
                  <div className={styles.billItemIcon}>
                    <i className="fas fa-home"></i>
                  </div>
                  <span>Tiền thuê nhà</span>
                </div>
                <strong>4,200,000 VNĐ</strong>
              </div>
              <div className={styles.billItem}>
                <div className={styles.billItemInfo}>
                  <div className={styles.billItemIcon}>
                    <i className="fas fa-bolt"></i>
                  </div>
                  <span>Tiền điện (150 kWh × 3,500)</span>
                </div>
                <strong>525,000 VNĐ</strong>
              </div>
              <div className={styles.billItem}>
                <div className={styles.billItemInfo}>
                  <div className={styles.billItemIcon}>
                    <i className="fas fa-tint"></i>
                  </div>
                  <span>Tiền nước (25m³ × 28,000)</span>
                </div>
                <strong>700,000 VNĐ</strong>
              </div>
              <div className={styles.billItem}>
                <div className={styles.billItemInfo}>
                  <div className={styles.billItemIcon}>
                    <i className="fas fa-tools"></i>
                  </div>
                  <span>Phí quản lý</span>
                </div>
                <strong>150,000 VNĐ</strong>
              </div>
              <div className={styles.billItem}>
                <div className={styles.billItemInfo}>
                  <div className={styles.billItemIcon}>
                    <i className="fas fa-wifi"></i>
                  </div>
                  <span>Internet</span>
                </div>
                <strong>200,000 VNĐ</strong>
              </div>
              <div className={styles.billItem}>
                <div className={styles.billItemInfo}>
                  <div className={styles.billItemIcon}>
                    <i className="fas fa-ellipsis-h"></i>
                  </div>
                  <span>Phí dịch vụ khác</span>
                </div>
                <strong>85,000 VNĐ</strong>
              </div>
            </div>

            <div className={styles.billFooter}>
              <button
                className={styles.btnPrimary}
                onClick={() => showPage("payments")}
              >
                <i className="fas fa-credit-card"></i>
                Thanh toán ngay
              </button>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>
                <i className="fas fa-history"></i> Lịch sử hóa đơn
              </h3>
            </div>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Tháng</th>
                    <th>Tổng tiền</th>
                    <th>Ngày hết hạn</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>01/2026</strong>
                    </td>
                    <td>
                      <strong className={styles.textPrimary}>
                        8,560,000 VNĐ
                      </strong>
                    </td>
                    <td>15/01/2026</td>
                    <td>
                      <span
                        className={`${styles.badge} ${styles.badgeWarning}`}
                      >
                        <i className="fas fa-clock"></i> Chưa thanh toán
                      </span>
                    </td>
                    <td>
                      <div className={styles.actionGroup}>
                        <button
                          className={styles.btnPrimary}
                          onClick={() => showPage("payments")}
                        >
                          <i className="fas fa-credit-card"></i> Thanh toán
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>12/2025</strong>
                    </td>
                    <td>8,320,000 VNĐ</td>
                    <td>15/12/2025</td>
                    <td>
                      <span
                        className={`${styles.badge} ${styles.badgeSuccess}`}
                      >
                        <i className="fas fa-check"></i> Đã thanh toán
                      </span>
                    </td>
                    <td>
                      <div className={styles.actionGroup}>
                        <button className={styles.btnSmall}>
                          <i className="fas fa-file-invoice"></i> Xem hóa đơn
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>11/2025</strong>
                    </td>
                    <td>8,150,000 VNĐ</td>
                    <td>15/11/2025</td>
                    <td>
                      <span
                        className={`${styles.badge} ${styles.badgeSuccess}`}
                      >
                        <i className="fas fa-check"></i> Đã thanh toán
                      </span>
                    </td>
                    <td>
                      <div className={styles.actionGroup}>
                        <button className={styles.btnSmall}>
                          <i className="fas fa-file-invoice"></i> Xem hóa đơn
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Payment History Page */}
        <div
          className={`${styles.page} ${activePage === "payment-history" ? styles.active : ""}`}
        >
          <div className={styles.pageHeader}>
            <div>
              <h1 className={styles.pageTitle}>Lịch sử thanh toán</h1>
              <p className={styles.breadcrumb}>
                <i className="fas fa-home"></i> Trang chủ / Lịch sử thanh toán
              </p>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>
                <i className="fas fa-history"></i> Tất cả giao dịch
              </h3>
              <div className={styles.filterGroup}>
                <input
                  type="text"
                  placeholder="Tìm kiếm giao dịch..."
                  className={styles.searchInput}
                />
                <select className={styles.filterSelect}>
                  <option>Tất cả</option>
                  <option>VNPay</option>
                  <option>MoMo</option>
                  <option>ZaloPay</option>
                </select>
              </div>
            </div>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Ngày thanh toán</th>
                    <th>Mã giao dịch</th>
                    <th>Nội dung</th>
                    <th>Số tiền</th>
                    <th>Phương thức</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>15/12/2025</td>
                    <td>
                      <code>#TXN001234</code>
                    </td>
                    <td>Thanh toán tiền thuê tháng 12/2025</td>
                    <td>
                      <strong className={styles.textSuccess}>
                        8,320,000 VNĐ
                      </strong>
                    </td>
                    <td>
                      <div className={styles.paymentMethodBadge}>
                        <img
                          src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-VNPAY-QR-1.png"
                          alt="VNPay"
                        />
                        VNPay
                      </div>
                    </td>
                    <td>
                      <span
                        className={`${styles.badge} ${styles.badgeSuccess}`}
                      >
                        <i className="fas fa-check-circle"></i> Thành công
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>15/11/2025</td>
                    <td>
                      <code>#TXN001233</code>
                    </td>
                    <td>Thanh toán tiền thuê tháng 11/2025</td>
                    <td>
                      <strong className={styles.textSuccess}>
                        8,150,000 VNĐ
                      </strong>
                    </td>
                    <td>
                      <div className={styles.paymentMethodBadge}>
                        <img
                          src="https://developers.momo.vn/v3/assets/images/logo.png"
                          alt="MoMo"
                        />
                        MoMo
                      </div>
                    </td>
                    <td>
                      <span
                        className={`${styles.badge} ${styles.badgeSuccess}`}
                      >
                        <i className="fas fa-check-circle"></i> Thành công
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>01/06/2025</td>
                    <td>
                      <code>#TXN001200</code>
                    </td>
                    <td>Thanh toán tiền đặt cọc</td>
                    <td>
                      <strong className={styles.textSuccess}>
                        8,400,000 VNĐ
                      </strong>
                    </td>
                    <td>
                      <div className={styles.paymentMethodBadge}>
                        <i className="fas fa-university"></i>
                        Chuyển khoản
                      </div>
                    </td>
                    <td>
                      <span
                        className={`${styles.badge} ${styles.badgeSuccess}`}
                      >
                        <i className="fas fa-check-circle"></i> Thành công
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Payments Page */}
        <div
          className={`${styles.page} ${activePage === "payments" ? styles.active : ""}`}
        >
          <div className={styles.pageHeader}>
            <div>
              <h1 className={styles.pageTitle}>Thanh toán</h1>
              <p className={styles.breadcrumb}>
                <i className="fas fa-home"></i> Trang chủ / Thanh toán
              </p>
            </div>
          </div>

          <div className={styles.paymentLayout}>
            <div className={styles.paymentSummary}>
              <h3>
                <i className="fas fa-receipt"></i> Thông tin thanh toán
              </h3>
              <div className={styles.summaryCard}>
                <div className={styles.summaryHeader}>
                  <span>Hóa đơn tháng 01/2026</span>
                  <span className={`${styles.badge} ${styles.badgeWarning}`}>
                    Chưa thanh toán
                  </span>
                </div>
                <div className={styles.summaryBody}>
                  <div className={styles.summaryItem}>
                    <span>Tiền thuê nhà</span>
                    <strong>4,200,000 VNĐ</strong>
                  </div>
                  <div className={styles.summaryItem}>
                    <span>Tiền điện</span>
                    <strong>525,000 VNĐ</strong>
                  </div>
                  <div className={styles.summaryItem}>
                    <span>Tiền nước</span>
                    <strong>700,000 VNĐ</strong>
                  </div>
                  <div className={styles.summaryItem}>
                    <span>Phí dịch vụ</span>
                    <strong>435,000 VNĐ</strong>
                  </div>
                  <div
                    className={`${styles.summaryItem} ${styles.summaryTotal}`}
                  >
                    <span>Tổng cộng</span>
                    <strong>8,560,000 VNĐ</strong>
                  </div>
                </div>
                <div className={styles.summaryFooter}>
                  <i className="fas fa-clock"></i>
                  <span>Hạn thanh toán: 15/01/2026</span>
                </div>
              </div>
            </div>

            <div className={styles.paymentMethodSection}>
              <h3>
                <i className="fas fa-credit-card"></i> Chọn phương thức thanh
                toán
              </h3>
              <div className={styles.paymentMethods}>
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`${styles.paymentMethodCard} ${
                      selectedPaymentMethod === method.id ? styles.selected : ""
                    }`}
                    onClick={() => setSelectedPaymentMethod(method.id)}
                  >
                    <div className={styles.methodCheck}>
                      {selectedPaymentMethod === method.id && (
                        <i className="fas fa-check"></i>
                      )}
                    </div>
                    <div className={styles.methodIcon}>
                      <img src={method.img} alt={method.name} />
                    </div>
                    <div className={styles.methodInfo}>
                      <h4>{method.name}</h4>
                      <p>{method.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.paymentAction}>
                <button className={`${styles.btnPrimary} ${styles.btnLarge}`}>
                  <i className="fas fa-lock"></i>
                  Thanh toán an toàn
                  <span>8,560,000 VNĐ</span>
                </button>
                <p className={styles.securityNote}>
                  <i className="fas fa-shield-alt"></i>
                  Giao dịch được bảo mật và mã hóa 256-bit SSL
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Page */}
        <div
          className={`${styles.page} ${activePage === "profile" ? styles.active : ""}`}
        >
          <div className={styles.pageHeader}>
            <div>
              <h1 className={styles.pageTitle}>Thông tin cá nhân</h1>
              <p className={styles.breadcrumb}>
                <i className="fas fa-home"></i> Trang chủ / Thông tin cá nhân
              </p>
            </div>
          </div>

          <div className={styles.profileLayout}>
            <div className={styles.profileSidebar}>
              <div className={styles.profileCard}>
                <div className={styles.profileAvatarLarge}>
                  <span>NV</span>
                  <button className={styles.avatarUpload}>
                    <i className="fas fa-camera"></i>
                  </button>
                </div>
                <h3>Nguyễn Văn Nam</h3>
                <p className={styles.profileEmail}>nguyen.van.nam@email.com</p>
                <div className={styles.profileStats}>
                  <div className={styles.profileStatItem}>
                    <i className="fas fa-calendar-check"></i>
                    <span>Tham gia từ 01/06/2025</span>
                  </div>
                  <div className={styles.profileStatItem}>
                    <i className="fas fa-file-contract"></i>
                    <span>2 hợp đồng đang hiệu lực</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.profileMain}>
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>
                    <i className="fas fa-user-edit"></i> Thông tin cơ bản
                  </h3>
                </div>
                <form>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>
                        <i className="fas fa-user"></i> Họ và tên
                      </label>
                      <input type="text" defaultValue="Nguyễn Văn Nam" />
                    </div>
                    <div className={styles.formGroup}>
                      <label>
                        <i className="fas fa-envelope"></i> Email
                      </label>
                      <input
                        type="email"
                        defaultValue="nguyen.van.nam@email.com"
                      />
                    </div>
                  </div>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>
                        <i className="fas fa-phone"></i> Số điện thoại
                      </label>
                      <input type="tel" defaultValue="0901234567" />
                    </div>
                    <div className={styles.formGroup}>
                      <label>
                        <i className="fas fa-birthday-cake"></i> Ngày sinh
                      </label>
                      <input type="date" defaultValue="1990-01-01" />
                    </div>
                  </div>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>
                        <i className="fas fa-id-card"></i> CCCD/CMND
                      </label>
                      <input type="text" defaultValue="123456789" />
                    </div>
                    <div className={styles.formGroup}>
                      <label>
                        <i className="fas fa-briefcase"></i> Nghề nghiệp
                      </label>
                      <input type="text" defaultValue="Kỹ sư phần mềm" />
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label>
                      <i className="fas fa-map-marker-alt"></i> Địa chỉ
                    </label>
                    <textarea
                      rows={3}
                      defaultValue="123 Đường ABC, Quận 1, TP.HCM"
                    ></textarea>
                  </div>
                  <div className={styles.formActions}>
                    <button type="submit" className={styles.btnPrimary}>
                      <i className="fas fa-save"></i>
                      Cập nhật thông tin
                    </button>
                    <button type="button" className={styles.btnOutline}>
                      <i className="fas fa-times"></i>
                      Hủy
                    </button>
                  </div>
                </form>
              </div>

              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>
                    <i className="fas fa-lock"></i> Đổi mật khẩu
                  </h3>
                </div>
                <form>
                  <div className={styles.formGroup}>
                    <label>
                      <i className="fas fa-key"></i> Mật khẩu hiện tại
                    </label>
                    <input
                      type="password"
                      placeholder="Nhập mật khẩu hiện tại"
                    />
                  </div>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>
                        <i className="fas fa-lock"></i> Mật khẩu mới
                      </label>
                      <input type="password" placeholder="Nhập mật khẩu mới" />
                    </div>
                    <div className={styles.formGroup}>
                      <label>
                        <i className="fas fa-lock"></i> Xác nhận mật khẩu
                      </label>
                      <input
                        type="password"
                        placeholder="Nhập lại mật khẩu mới"
                      />
                    </div>
                  </div>
                  <div className={styles.formActions}>
                    <button type="submit" className={styles.btnPrimary}>
                      <i className="fas fa-key"></i>
                      Đổi mật khẩu
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications Page */}
        <div
          className={`${styles.page} ${activePage === "notifications" ? styles.active : ""}`}
        >
          <div className={styles.pageHeader}>
            <div>
              <h1 className={styles.pageTitle}>Thông báo</h1>
              <p className={styles.breadcrumb}>
                <i className="fas fa-home"></i> Trang chủ / Thông báo
              </p>
            </div>
            <button className={styles.btnOutline}>
              <i className="fas fa-check-double"></i>
              Đánh dấu tất cả đã đọc
            </button>
          </div>

          <div className={styles.notificationsContainer}>
            <div className={`${styles.notificationCard} ${styles.unread}`}>
              <div className={styles.notificationIcon}>
                <i className="fas fa-check-circle"></i>
              </div>
              <div className={styles.notificationContent}>
                <h4>Yêu cầu thuê được chấp nhận</h4>
                <p>
                  Yêu cầu thuê căn hộ Studio Lexington của bạn đã được chủ nhà
                  chấp nhận. Vui lòng tiến hành ký hợp đồng để hoàn tất thủ tục.
                </p>
                <div className={styles.notificationFooter}>
                  <span className={styles.notificationTime}>
                    <i className="fas fa-clock"></i> 2 giờ trước
                  </span>
                  <div className={styles.notificationActions}>
                    <button className={styles.btnSmall}>
                      <i className="fas fa-file-signature"></i> Ký hợp đồng
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${styles.notificationCard} ${styles.unread}`}>
              <div className={`${styles.notificationIcon} ${styles.warning}`}>
                <i className="fas fa-exclamation-triangle"></i>
              </div>
              <div className={styles.notificationContent}>
                <h4>Nhắc nhở thanh toán</h4>
                <p>
                  Hóa đơn tháng 01/2026 với tổng số tiền 8,560,000 VNĐ sẽ đến
                  hạn thanh toán vào ngày 15/01/2026. Vui lòng thanh toán đúng
                  hạn để tránh phát sinh phí trễ hạn.
                </p>
                <div className={styles.notificationFooter}>
                  <span className={styles.notificationTime}>
                    <i className="fas fa-clock"></i> 1 ngày trước
                  </span>
                  <div className={styles.notificationActions}>
                    <button
                      className={styles.btnSmall}
                      onClick={() => showPage("payments")}
                    >
                      <i className="fas fa-credit-card"></i> Thanh toán ngay
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.notificationCard}>
              <div className={`${styles.notificationIcon} ${styles.info}`}>
                <i className="fas fa-info-circle"></i>
              </div>
              <div className={styles.notificationContent}>
                <h4>Cập nhật hệ thống</h4>
                <p>
                  SmartRent đã cập nhật tính năng thanh toán mới với ZaloPay.
                  Trải nghiệm thanh toán nhanh chóng, tiện lợi và an toàn hơn.
                  Hãy thử ngay!
                </p>
                <div className={styles.notificationFooter}>
                  <span className={styles.notificationTime}>
                    <i className="fas fa-clock"></i> 3 ngày trước
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.notificationCard}>
              <div className={`${styles.notificationIcon} ${styles.success}`}>
                <i className="fas fa-check-double"></i>
              </div>
              <div className={styles.notificationContent}>
                <h4>Thanh toán thành công</h4>
                <p>
                  Bạn đã thanh toán thành công hóa đơn tháng 12/2025 với số tiền
                  8,320,000 VNĐ qua VNPay. Cảm ơn bạn đã thanh toán đúng hạn.
                </p>
                <div className={styles.notificationFooter}>
                  <span className={styles.notificationTime}>
                    <i className="fas fa-clock"></i> 1 tuần trước
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Chatbot */}
      <div className={styles.chatbotContainer}>
        <button className={styles.chatbotToggle} onClick={toggleChatbot}>
          <i className={chatbotVisible ? "fas fa-times" : "fas fa-robot"}></i>
        </button>
        <div
          className={`${styles.chatbotWindow} ${chatbotVisible ? styles.show : ""}`}
        >
          <div className={styles.chatbotHeader}>
            <div className={styles.chatAvatar}>
              <i className="fas fa-robot"></i>
            </div>
            <div className={styles.chatInfo}>
              <h4>SmartBot</h4>
              <small>
                <i className="fas fa-circle"></i> Trực tuyến
              </small>
            </div>
            <button className={styles.chatClose} onClick={toggleChatbot}>
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className={styles.chatbotMessages}>
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`${styles.message} ${styles[msg.sender]}`}
              >
                {msg.sender === "bot" && (
                  <div className={styles.messageAvatar}>
                    <i className="fas fa-robot"></i>
                  </div>
                )}
                <div className={styles.messageContent}>
                  <p>{msg.text}</p>
                  <span className={styles.messageTime}>
                    {new Date().toLocaleTimeString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                {msg.sender === "user" && (
                  <div className={styles.messageAvatar}>
                    <i className="fas fa-user"></i>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className={styles.chatbotQuickReplies}>
            <button onClick={() => setChatInput("Tìm nhà cho thuê")}>
              <i className="fas fa-search"></i> Tìm nhà
            </button>
            <button onClick={() => setChatInput("Hướng dẫn thanh toán")}>
              <i className="fas fa-credit-card"></i> Thanh toán
            </button>
            <button onClick={() => setChatInput("Xem hợp đồng")}>
              <i className="fas fa-file-contract"></i> Hợp đồng
            </button>
          </div>
          <div className={styles.chatbotInput}>
            <input
              type="text"
              placeholder="Nhập tin nhắn..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={handleChatKeypress}
            />
            <button onClick={sendMessage}>
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
