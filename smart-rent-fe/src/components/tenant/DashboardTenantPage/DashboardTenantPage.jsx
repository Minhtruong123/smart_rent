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

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(0);

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
  return (
    <>
      <div className={styles.mainLayout}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <ul className={styles.sidebarMenu}>
            <li>
              <a
                href="#"
                onClick={() => showPage("dashboard")}
                className={activePage === "dashboard" ? styles.active : ""}
              >
                <i className="fas fa-tachometer-alt"></i>
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => showPage("search")}
                className={activePage === "search" ? styles.active : ""}
              >
                <i className="fas fa-search"></i>
                Tìm kiếm nhà
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => showPage("requests")}
                className={activePage === "requests" ? styles.active : ""}
              >
                <i className="fas fa-clipboard-list"></i>
                Yêu cầu thuê
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => showPage("contracts")}
                className={activePage === "contracts" ? styles.active : ""}
              >
                <i className="fas fa-file-contract"></i>
                Hợp đồng thuê
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => showPage("bills")}
                className={activePage === "bills" ? styles.active : ""}
              >
                <i className="fas fa-receipt"></i>
                Hóa đơn & Chi phí
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => showPage("payment-history")}
                className={
                  activePage === "payment-history" ? styles.active : ""
                }
              >
                <i className="fas fa-history"></i>
                Lịch sử thanh toán
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => showPage("payments")}
                className={activePage === "payments" ? styles.active : ""}
              >
                <i className="fas fa-credit-card"></i>
                Thanh toán
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => showPage("profile")}
                className={activePage === "profile" ? styles.active : ""}
              >
                <i className="fas fa-user-edit"></i>
                Thông tin cá nhân
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => showPage("notifications")}
                className={activePage === "notifications" ? styles.active : ""}
              >
                <i className="fas fa-bell"></i>
                Thông báo
              </a>
            </li>
          </ul>
        </aside>

        {/* Content */}
        <main className={styles.content}>
          {/* Dashboard Page */}
          <div
            id="dashboard"
            className={`${styles.page} ${activePage === "dashboard" ? styles.active : ""}`}
          >
            <div className={styles.pageHeader}>
              <h1 className={styles.pageTitle}>Dashboard</h1>
              <p className={styles.breadcrumb}>Trang chủ &gt; Dashboard</p>
            </div>

            {/* Stats */}
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <i className="fas fa-clipboard-list"></i>
                </div>
                <div className={styles.statNumber}>3</div>
                <div className={styles.statLabel}>Yêu cầu thuê đang chờ</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <i className="fas fa-file-contract"></i>
                </div>
                <div className={styles.statNumber}>2</div>
                <div className={styles.statLabel}>Hợp đồng hiện tại</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <i className="fas fa-receipt"></i>
                </div>
                <div className={styles.statNumber}>1</div>
                <div className={styles.statLabel}>Hóa đơn chưa thanh toán</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <i className="fas fa-dollar-sign"></i>
                </div>
                <div className={styles.statNumber}>8.5M</div>
                <div className={styles.statLabel}>Tổng chi phí tháng này</div>
              </div>
            </div>

            {/* Recent Activities */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Hoạt động gần đây</h3>
              </div>
              <div className={styles.tableResponsive}>
                <table>
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
                      <td>10/01/2026</td>
                      <td>Yêu cầu thuê căn hộ Vinhomes Central Park</td>
                      <td>
                        <span
                          className={`${styles.status} ${styles.statusPending}`}
                        >
                          Đang chờ
                        </span>
                      </td>
                      <td>
                        <button className={styles.btnOutline}>Chi tiết</button>
                      </td>
                    </tr>
                    <tr>
                      <td>08/01/2026</td>
                      <td>Thanh toán tiền thuê tháng 1</td>
                      <td>
                        <span
                          className={`${styles.status} ${styles.statusApproved}`}
                        >
                          Thành công
                        </span>
                      </td>
                      <td>
                        <button className={styles.btnOutline}>Xem</button>
                      </td>
                    </tr>
                    <tr>
                      <td>05/01/2026</td>
                      <td>Ký hợp đồng thuê căn hộ Masteri Thảo Điền</td>
                      <td>
                        <span
                          className={`${styles.status} ${styles.statusApproved}`}
                        >
                          Hoàn thành
                        </span>
                      </td>
                      <td>
                        <button className={styles.btnOutline}>Xem</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Search Page */}
          <div
            id="search"
            className={`${styles.page} ${activePage === "search" ? styles.active : ""}`}
          >
            <div className={styles.pageHeader}>
              <h1 className={styles.pageTitle}>Tìm kiếm nhà</h1>
              <p className={styles.breadcrumb}>Trang chủ &gt; Tìm kiếm</p>
            </div>

            {/* Search Form */}
            <div className={styles.searchCard}>
              <h3 className={styles.searchTitle}>
                Tìm ngôi nhà mơ ước của bạn
              </h3>
              <form className={styles.searchForm}>
                <div className={styles.formGroup}>
                  <label>Khu vực</label>
                  <input type="text" placeholder="Nhập địa điểm..." />
                </div>
                <div className={styles.formGroup}>
                  <label>Giá thuê</label>
                  <select>
                    <option>Tất cả</option>
                    <option>Dưới 3 triệu</option>
                    <option>3-5 triệu</option>
                    <option>5-10 triệu</option>
                    <option>Trên 10 triệu</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Loại hình</label>
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
            <div className={styles.propertiesGrid}>
              <div className={styles.propertyCard}>
                <div className={styles.propertyImage}>
                  <div className={styles.propertyBadge}>Mới</div>
                </div>
                <div className={styles.propertyInfo}>
                  <div className={styles.propertyPrice}>8.5 triệu/tháng</div>
                  <h4 className={styles.propertyTitle}>
                    Căn hộ cao cấp Vinhomes Central Park
                  </h4>
                  <div className={styles.propertyLocation}>
                    <i className="fas fa-map-marker-alt"></i>
                    Quận Bình Thạnh, TP.HCM
                  </div>
                  <div className={styles.propertyFeatures}>
                    <div className={styles.feature}>
                      <i className="fas fa-bed"></i> 2 phòng
                    </div>
                    <div className={styles.feature}>
                      <i className="fas fa-bath"></i> 2 WC
                    </div>
                    <div className={styles.feature}>
                      <i className="fas fa-expand"></i> 75m²
                    </div>
                  </div>
                  <div className={styles.propertyActions}>
                    <button className={styles.btnPrimary}>
                      <i className="fas fa-paper-plane"></i>
                      Gửi yêu cầu
                    </button>
                    <button className={styles.btnOutline}>
                      <i className="fas fa-eye"></i>
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              </div>

              <div className={styles.propertyCard}>
                <div className={styles.propertyImage}>
                  <div className={styles.propertyBadge}>Hot</div>
                </div>
                <div className={styles.propertyInfo}>
                  <div className={styles.propertyPrice}>5.5 triệu/tháng</div>
                  <h4 className={styles.propertyTitle}>Căn hộ Sunrise City</h4>
                  <div className={styles.propertyLocation}>
                    <i className="fas fa-map-marker-alt"></i>
                    Quận 7, TP.HCM
                  </div>
                  <div className={styles.propertyFeatures}>
                    <div className={styles.feature}>
                      <i className="fas fa-bed"></i> 1 phòng
                    </div>
                    <div className={styles.feature}>
                      <i className="fas fa-bath"></i> 1 WC
                    </div>
                    <div className={styles.feature}>
                      <i className="fas fa-expand"></i> 55m²
                    </div>
                  </div>
                  <div className={styles.propertyActions}>
                    <button className={styles.btnPrimary}>
                      <i className="fas fa-paper-plane"></i>
                      Gửi yêu cầu
                    </button>
                    <button className={styles.btnOutline}>
                      <i className="fas fa-eye"></i>
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Requests Page */}
          <div
            id="requests"
            className={`${styles.page} ${activePage === "requests" ? styles.active : ""}`}
          >
            <div className={styles.pageHeader}>
              <h1 className={styles.pageTitle}>Yêu cầu thuê</h1>
              <p className={styles.breadcrumb}>Trang chủ &gt; Yêu cầu thuê</p>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Danh sách yêu cầu</h3>
                <button className={styles.btnPrimary}>
                  <i className="fas fa-plus"></i>
                  Tạo yêu cầu mới
                </button>
              </div>
              <div className={styles.tableResponsive}>
                <table>
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
                      <td>Nguyễn Văn A</td>
                      <td>8.5 triệu/tháng</td>
                      <td>
                        <span
                          className={`${styles.status} ${styles.statusPending}`}
                        >
                          Đang chờ
                        </span>
                      </td>
                      <td>
                        <button className={styles.btnOutline}>Chi tiết</button>
                        <button className={styles.btnDanger}>Hủy</button>
                      </td>
                    </tr>
                    <tr>
                      <td>08/01/2026</td>
                      <td>Studio Lexington Residence</td>
                      <td>Trần Thị B</td>
                      <td>3.5 triệu/tháng</td>
                      <td>
                        <span
                          className={`${styles.status} ${styles.statusApproved}`}
                        >
                          Chấp nhận
                        </span>
                      </td>
                      <td>
                        <button className={styles.btnSuccess}>
                          Ký hợp đồng
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>05/01/2026</td>
                      <td>Căn hộ Masteri Thảo Điền</td>
                      <td>Lê Văn C</td>
                      <td>4.2 triệu/tháng</td>
                      <td>
                        <span
                          className={`${styles.status} ${styles.statusRejected}`}
                        >
                          Từ chối
                        </span>
                      </td>
                      <td>
                        <button className={styles.btnOutline}>Xem lý do</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Contracts Page */}
          <div
            id="contracts"
            className={`${styles.page} ${activePage === "contracts" ? styles.active : ""}`}
          >
            <div className={styles.pageHeader}>
              <h1 className={styles.pageTitle}>Hợp đồng thuê</h1>
              <p className={styles.breadcrumb}>Trang chủ &gt; Hợp đồng</p>
            </div>

            <div className={styles.contractCard}>
              <div className={styles.contractHeader}>
                <div className={styles.contractTitle}>
                  Hợp đồng thuê căn hộ Masteri Thảo Điền
                </div>
                <span className={`${styles.status} ${styles.statusApproved}`}>
                  Đang hiệu lực
                </span>
              </div>
              <div className={styles.contractDetails}>
                <div className={styles.detailItem}>
                  <i className="fas fa-calendar-alt"></i>
                  <span>Từ: 01/01/2026 - 31/12/2026</span>
                </div>
                <div className={styles.detailItem}>
                  <i className="fas fa-dollar-sign"></i>
                  <span>4.2 triệu/tháng</span>
                </div>
                <div className={styles.detailItem}>
                  <i className="fas fa-user"></i>
                  <span>Chủ nhà: Lê Văn C</span>
                </div>
                <div className={styles.detailItem}>
                  <i className="fas fa-map-marker-alt"></i>
                  <span>Quận 2, TP.HCM</span>
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
              </div>
            </div>

            <div className={styles.contractCard}>
              <div className={styles.contractHeader}>
                <div className={styles.contractTitle}>
                  Hợp đồng thuê Studio Lexington
                </div>
                <span className={`${styles.status} ${styles.statusWarning}`}>
                  Sắp hết hạn
                </span>
              </div>
              <div className={styles.contractDetails}>
                <div className={styles.detailItem}>
                  <i className="fas fa-calendar-alt"></i>
                  <span>Từ: 01/06/2025 - 31/05/2026</span>
                </div>
                <div className={styles.detailItem}>
                  <i className="fas fa-dollar-sign"></i>
                  <span>3.5 triệu/tháng</span>
                </div>
                <div className={styles.detailItem}>
                  <i className="fas fa-user"></i>
                  <span>Chủ nhà: Trần Thị B</span>
                </div>
                <div className={styles.detailItem}>
                  <i className="fas fa-map-marker-alt"></i>
                  <span>Quận 2, TP.HCM</span>
                </div>
              </div>
              <div className={styles.contractActions}>
                <button className={styles.btnWarning}>
                  <i className="fas fa-sync-alt"></i>
                  Gia hạn
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
            id="bills"
            className={`${styles.page} ${activePage === "bills" ? styles.active : ""}`}
          >
            <div className={styles.pageHeader}>
              <h1 className={styles.pageTitle}>Hóa đơn & Chi phí</h1>
              <p className={styles.breadcrumb}>Trang chủ &gt; Hóa đơn</p>
            </div>

            <div className={styles.billSummary}>
              <h3>Tổng chi phí tháng 1/2026</h3>
              <div className={styles.billAmount}>8,560,000 VNĐ</div>
              <p>Cần thanh toán trước ngày 15/01/2026</p>

              <div className={styles.billItems}>
                <div className={styles.billItem}>
                  <span>Tiền thuê nhà</span>
                  <strong>4,200,000 VNĐ</strong>
                </div>
                <div className={styles.billItem}>
                  <span>Tiền điện (150 kWh × 3,500)</span>
                  <strong>525,000 VNĐ</strong>
                </div>
                <div className={styles.billItem}>
                  <span>Tiền nước (25m³ × 28,000)</span>
                  <strong>700,000 VNĐ</strong>
                </div>
                <div className={styles.billItem}>
                  <span>Phí quản lý</span>
                  <strong>150,000 VNĐ</strong>
                </div>
                <div className={styles.billItem}>
                  <span>Internet</span>
                  <strong>200,000 VNĐ</strong>
                </div>
                <div className={styles.billItem}>
                  <span>Phí dịch vụ khác</span>
                  <strong>85,000 VNĐ</strong>
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Lịch sử hóa đơn</h3>
              </div>
              <div className={styles.tableResponsive}>
                <table>
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
                      <td>01/2026</td>
                      <td>8,560,000 VNĐ</td>
                      <td>15/01/2026</td>
                      <td>
                        <span
                          className={`${styles.status} ${styles.statusPending}`}
                        >
                          Chưa thanh toán
                        </span>
                      </td>
                      <td>
                        <button
                          className={styles.btnPrimary}
                          onClick={() => showPage("payments")}
                        >
                          Thanh toán
                        </button>
                        <button className={styles.btnOutline}>Chi tiết</button>
                      </td>
                    </tr>
                    <tr>
                      <td>12/2025</td>
                      <td>8,320,000 VNĐ</td>
                      <td>15/12/2025</td>
                      <td>
                        <span
                          className={`${styles.status} ${styles.statusApproved}`}
                        >
                          Đã thanh toán
                        </span>
                      </td>
                      <td>
                        <button className={styles.btnOutline}>
                          Xem hóa đơn
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>11/2025</td>
                      <td>8,150,000 VNĐ</td>
                      <td>15/11/2025</td>
                      <td>
                        <span
                          className={`${styles.status} ${styles.statusApproved}`}
                        >
                          Đã thanh toán
                        </span>
                      </td>
                      <td>
                        <button className={styles.btnOutline}>
                          Xem hóa đơn
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Payment History Page */}
          <div
            id="payment-history"
            className={`${styles.page} ${activePage === "payment-history" ? styles.active : ""}`}
          >
            <div className={styles.pageHeader}>
              <h1 className={styles.pageTitle}>Lịch sử thanh toán</h1>
              <p className={styles.breadcrumb}>
                Trang chủ &gt; Lịch sử thanh toán
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.tableResponsive}>
                <table>
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
                      <td>TXN001234</td>
                      <td>Thanh toán tiền thuê tháng 12/2025</td>
                      <td>8,320,000 VNĐ</td>
                      <td>VNPay</td>
                      <td>
                        <span
                          className={`${styles.status} ${styles.statusApproved}`}
                        >
                          Thành công
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>15/11/2025</td>
                      <td>TXN001233</td>
                      <td>Thanh toán tiền thuê tháng 11/2025</td>
                      <td>8,150,000 VNĐ</td>
                      <td>MoMo</td>
                      <td>
                        <span
                          className={`${styles.status} ${styles.statusApproved}`}
                        >
                          Thành công
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>01/06/2025</td>
                      <td>TXN001200</td>
                      <td>Thanh toán tiền đặt cọc</td>
                      <td>8,400,000 VNĐ</td>
                      <td>Chuyển khoản</td>
                      <td>
                        <span
                          className={`${styles.status} ${styles.statusApproved}`}
                        >
                          Thành công
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
            id="payments"
            className={`${styles.page} ${activePage === "payments" ? styles.active : ""}`}
          >
            <div className={styles.pageHeader}>
              <h1 className={styles.pageTitle}>Thanh toán</h1>
              <p className={styles.breadcrumb}>Trang chủ &gt; Thanh toán</p>
            </div>

            <div className={styles.paymentSection}>
              <h3>Thanh toán hóa đơn tháng 01/2026</h3>
              <div className={styles.billSummary}>
                <div className={styles.billAmount}>8,560,000 VNĐ</div>
                <p>Hạn thanh toán: 15/01/2026</p>
              </div>

              <h4 className={styles.paymentMethodTitle}>
                Chọn phương thức thanh toán:
              </h4>
              <div className={styles.paymentMethods}>
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`${styles.paymentMethod} ${selectedPaymentMethod === method.id ? styles.selected : ""}`}
                    onClick={() => setSelectedPaymentMethod(method.id)}
                  >
                    <img src={method.img} alt={method.name} />
                    <h4>{method.name}</h4>
                    <p>{method.description}</p>
                  </div>
                ))}
              </div>

              <div className={styles.paymentAction}>
                <button className={styles.btnPrimary}>
                  <i className="fas fa-credit-card"></i>
                  Thanh toán ngay
                </button>
              </div>
            </div>
          </div>

          {/* Profile Page */}
          <div
            id="profile"
            className={`${styles.page} ${activePage === "profile" ? styles.active : ""}`}
          >
            <div className={styles.pageHeader}>
              <h1 className={styles.pageTitle}>Thông tin cá nhân</h1>
              <p className={styles.breadcrumb}>
                Trang chủ &gt; Thông tin cá nhân
              </p>
            </div>

            <div className={styles.profileHeader}>
              <div className={styles.profileAvatar}>NV</div>
              <div className={styles.profileInfo}>
                <h2>Nguyễn Văn Nam</h2>
                <p>
                  <i className="fas fa-envelope"></i> nguyen.van.nam@email.com
                </p>
                <p>
                  <i className="fas fa-phone"></i> 0901234567
                </p>
                <p>
                  <i className="fas fa-calendar-alt"></i> Tham gia từ 01/06/2025
                </p>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Cập nhật thông tin</h3>
              </div>
              <form>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Họ và tên</label>
                    <input type="text" defaultValue="Nguyễn Văn Nam" />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Email</label>
                    <input
                      type="email"
                      defaultValue="nguyen.van.nam@email.com"
                    />
                  </div>
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Số điện thoại</label>
                    <input type="tel" defaultValue="0901234567" />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Ngày sinh</label>
                    <input type="date" defaultValue="1990-01-01" />
                  </div>
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>CCCD/CMND</label>
                    <input type="text" defaultValue="123456789" />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Nghề nghiệp</label>
                    <input type="text" defaultValue="Kỹ sư phần mềm" />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label>Địa chỉ</label>
                  <textarea
                    rows={3}
                    defaultValue="123 Đường ABC, Quận 1, TP.HCM"
                  ></textarea>
                </div>
                <div className={styles.profileActions}>
                  <button type="submit" className={styles.btnPrimary}>
                    <i className="fas fa-save"></i>
                    Cập nhật thông tin
                  </button>
                  <button type="button" className={styles.btnOutline}>
                    <i className="fas fa-key"></i>
                    Đổi mật khẩu
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Notifications Page */}
          <div
            id="notifications"
            className={`${styles.page} ${activePage === "notifications" ? styles.active : ""}`}
          >
            <div className={styles.pageHeader}>
              <h1 className={styles.pageTitle}>Thông báo</h1>
              <p className={styles.breadcrumb}>Trang chủ &gt; Thông báo</p>
            </div>

            <div className={styles.card}>
              <div className={styles.notificationItem}>
                <div className={styles.notificationWrapper}>
                  <div
                    className={`${styles.notificationIcon} ${styles.notificationSuccess}`}
                  >
                    <i className="fas fa-check"></i>
                  </div>
                  <div className={styles.notificationContent}>
                    <h4>Yêu cầu thuê được chấp nhận</h4>
                    <p>
                      Yêu cầu thuê căn hộ Studio Lexington của bạn đã được chủ
                      nhà chấp nhận. Vui lòng tiến hành ký hợp đồng.
                    </p>
                    <small>2 giờ trước</small>
                  </div>
                </div>
              </div>

              <div className={styles.notificationItem}>
                <div className={styles.notificationWrapper}>
                  <div
                    className={`${styles.notificationIcon} ${styles.notificationWarning}`}
                  >
                    <i className="fas fa-exclamation"></i>
                  </div>
                  <div className={styles.notificationContent}>
                    <h4>Nhắc nhở thanh toán</h4>
                    <p>
                      Hóa đơn tháng 01/2026 sẽ đến hạn thanh toán vào ngày
                      15/01/2026. Vui lòng thanh toán đúng hạn.
                    </p>
                    <small>1 ngày trước</small>
                  </div>
                </div>
              </div>

              <div className={styles.notificationItem}>
                <div className={styles.notificationWrapper}>
                  <div
                    className={`${styles.notificationIcon} ${styles.notificationPrimary}`}
                  >
                    <i className="fas fa-info"></i>
                  </div>
                  <div className={styles.notificationContent}>
                    <h4>Cập nhật hệ thống</h4>
                    <p>
                      SmartRent đã cập nhật tính năng thanh toán mới với
                      ZaloPay. Trải nghiệm thanh toán nhanh chóng và tiện lợi
                      hơn.
                    </p>
                    <small>3 ngày trước</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Chatbot */}
        <div className={styles.chatbotContainer}>
          <button className={styles.chatbotToggle} onClick={toggleChatbot}>
            <i className="fas fa-robot"></i>
          </button>
          <div
            className={`${styles.chatbotWindow} ${chatbotVisible ? styles.show : ""}`}
          >
            <div className={styles.chatbotHeader}>
              <div className={styles.chatAvatar}>
                <i className="fas fa-robot"></i>
              </div>
              <div>
                <h4>SmartBot</h4>
                <small>Trợ lý AI</small>
              </div>
            </div>
            <div className={styles.chatbotMessages}>
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`${styles.message} ${styles[msg.sender]}`}
                >
                  <div className={styles.messageContent}>{msg.text}</div>
                </div>
              ))}
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
    </>
  );
}
