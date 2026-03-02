import React, { useState } from "react";
import styles from "./RentRequestManagement.module.css";

export default function RentRequestManagement() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const requests = [
    {
      id: "YC-124",
      status: "pending",
      property: {
        title: "Căn hộ cao cấp Vinhomes Central Park",
        address: "Tòa Park 5, 720A Điện Biên Phủ, Quận Bình Thạnh, TP.HCM",
        price: "8.5 triệu/tháng",
        image:
          "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
      },
      moveInDate: "15/02/2026",
      duration: "12 tháng",
      deposit: "17 triệu đồng",
      requestDate: "01/02/2026",
      tenant: {
        name: "Trần Quốc Bảo",
        phone: "0912 345 678",
        email: "baotq@gmail.com",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        idNumber: "079201012345",
        idIssueDate: "15/06/2021",
        idIssuePlace: "Cục Cảnh sát",
        occupation: "Kỹ sư phần mềm",
      },
      message:
        "Tôi rất thích căn hộ này và muốn thuê dài hạn. Tôi làm việc tại khu vực Bình Thạnh nên vị trí này rất thuận tiện. Tôi có thể đến xem nhà vào cuối tuần này không?",
      numberOfPeople: "2 người",
      managementFee: "250,000 đồng/tháng",
      paymentMethod: "3 tháng/lần",
      endDate: "15/02/2027",
    },
    {
      id: "YC-123",
      status: "pending",
      property: {
        title: "Căn hộ Sunrise City",
        address: "Tòa W3, 23 Nguyễn Hữu Thọ, Quận 7, TP.HCM",
        price: "5.5 triệu/tháng",
        image:
          "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
      },
      moveInDate: "10/02/2026",
      duration: "6 tháng",
      deposit: "11 triệu đồng",
      requestDate: "30/01/2026",
      tenant: {
        name: "Nguyễn Minh Tâm",
        phone: "0987 654 321",
        email: "tamnm@gmail.com",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      },
      message:
        "Tôi là nhân viên văn phòng làm việc tại Phú Mỹ Hưng. Tôi cần một căn hộ 1 phòng ngủ, sạch sẽ và thoáng mát. Tôi sẽ ở một mình và cam kết giữ gìn căn hộ cẩn thận.",
    },
    {
      id: "YC-122",
      status: "approved",
      property: {
        title: "Căn hộ The Sun Avenue",
        address: "Tòa 5, 28 Mai Chí Thọ, Quận 2, TP.HCM",
        price: "7.2 triệu/tháng",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      },
      moveInDate: "05/02/2026",
      duration: "12 tháng",
      deposit: "14.4 triệu đồng",
      requestDate: "25/01/2026",
      tenant: {
        name: "Lê Minh Hiếu",
        phone: "0934 567 890",
        email: "hieulm@gmail.com",
        avatar: "https://randomuser.me/api/portraits/men/68.jpg",
      },
      message:
        "Tôi và vợ muốn thuê căn hộ của anh/chị. Chúng tôi cả hai đều làm việc tại khu vực Thủ Thiêm và đang tìm một nơi ở dài hạn. Chúng tôi không nuôi thú cưng và không hút thuốc.",
    },
    {
      id: "YC-121",
      status: "rejected",
      property: {
        title: "Căn hộ cao cấp Vinhomes Central Park",
        address: "Tòa Park 5, 720A Điện Biên Phủ, Quận Bình Thạnh, TP.HCM",
        price: "8.5 triệu/tháng",
        image:
          "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
      },
      moveInDate: "20/01/2026",
      duration: "3 tháng",
      deposit: "8.5 triệu đồng",
      requestDate: "15/01/2026",
      tenant: {
        name: "Phạm Thị Lan Anh",
        phone: "0978 123 456",
        email: "anhptl@gmail.com",
        avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      },
      message:
        "Tôi đang cần thuê ngắn hạn trong thời gian đi công tác tại TP.HCM. Tôi có thể thanh toán trước toàn bộ tiền thuê. Hy vọng anh/chị xem xét.",
    },
  ];

  const openRequestDetail = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeRequestDetail = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
    document.body.style.overflow = "auto";
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return styles.statusPending;
      case "approved":
        return styles.statusApproved;
      case "rejected":
        return styles.statusRejected;
      default:
        return "";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "Chờ duyệt";
      case "approved":
        return "Đã chấp nhận";
      case "rejected":
        return "Đã từ chối";
      default:
        return "";
    }
  };
  return (
    <>
      <div className={styles.mainContent}>
        <nav className={styles.navbar}>
          <div className={styles.navTitle}>Quản lý yêu cầu thuê</div>
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

        <div className={styles.dashboardContainer}>
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Yêu cầu thuê</h1>
            <p className={styles.pageSubtitle}>
              Quản lý và xử lý các yêu cầu thuê bất động sản từ khách hàng
            </p>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <div className={styles.statTitle}>Tổng yêu cầu thuê</div>
                <div className={`${styles.statIcon} ${styles.primary}`}>
                  <i className="fas fa-user-check"></i>
                </div>
              </div>
              <div className={styles.statValue}>24</div>
              <div className={styles.statDescription}>
                <span className={`${styles.statChange} ${styles.positive}`}>
                  +8
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
                <span>Cần xử lý trong 48 giờ</span>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <div className={styles.statTitle}>Đã chấp nhận</div>
                <div className={`${styles.statIcon} ${styles.success}`}>
                  <i className="fas fa-check-circle"></i>
                </div>
              </div>
              <div className={styles.statValue}>12</div>
              <div className={styles.statDescription}>
                <span className={`${styles.statChange} ${styles.positive}`}>
                  +4
                </span>
                <span>so với tháng trước</span>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <div className={styles.statTitle}>Đã từ chối</div>
                <div className={`${styles.statIcon} ${styles.danger}`}>
                  <i className="fas fa-times-circle"></i>
                </div>
              </div>
              <div className={styles.statValue}>4</div>
              <div className={styles.statDescription}>
                <span className={`${styles.statChange} ${styles.negative}`}>
                  -2
                </span>
                <span>so với tháng trước</span>
              </div>
            </div>
          </div>

          <div className={styles.filterBar}>
            <div className={styles.filterSection}>
              <div className={styles.filterSearch}>
                <i className="fas fa-search"></i>
                <input type="text" placeholder="Tìm kiếm yêu cầu thuê..." />
              </div>

              <div className={styles.filterDropdown}>
                <select>
                  <option value="">Tất cả trạng thái</option>
                  <option value="pending">Chờ duyệt</option>
                  <option value="approved">Đã chấp nhận</option>
                  <option value="rejected">Đã từ chối</option>
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
                className={`${styles.btn} ${styles.btnSm} ${styles.btnOutline}`}
              >
                <i className="fas fa-redo"></i> Đặt lại
              </button>
            </div>
          </div>

          <div className={styles.contentTabs}>
            <div
              className={`${styles.contentTab} ${activeTab === "all" ? styles.active : ""}`}
              onClick={() => setActiveTab("all")}
            >
              Tất cả yêu cầu
            </div>
            <div
              className={`${styles.contentTab} ${activeTab === "pending" ? styles.active : ""}`}
              onClick={() => setActiveTab("pending")}
            >
              Chờ duyệt
            </div>
            <div
              className={`${styles.contentTab} ${activeTab === "approved" ? styles.active : ""}`}
              onClick={() => setActiveTab("approved")}
            >
              Đã chấp nhận
            </div>
            <div
              className={`${styles.contentTab} ${activeTab === "rejected" ? styles.active : ""}`}
              onClick={() => setActiveTab("rejected")}
            >
              Đã từ chối
            </div>
          </div>

          {requests.map((request) => (
            <div
              key={request.id}
              className={styles.requestCard}
              onClick={() => openRequestDetail(request)}
            >
              <div className={styles.requestHeader}>
                <h3 className={styles.requestTitle}>
                  Yêu cầu thuê #{request.id}
                </h3>
                <span
                  className={`${styles.requestStatus} ${getStatusClass(request.status)}`}
                >
                  {getStatusText(request.status)}
                </span>
              </div>

              <div className={styles.requestProperty}>
                <div className={styles.requestImage}>
                  <img src={request.property.image} alt="Property" />
                </div>
                <div className={styles.requestInfo}>
                  <div className={styles.requestPropertyTitle}>
                    {request.property.title}
                  </div>
                  <div className={styles.requestAddress}>
                    {request.property.address}
                  </div>
                  <div className={styles.requestPrice}>
                    {request.property.price}
                  </div>
                </div>
              </div>

              <div className={styles.requestMeta}>
                <div className={styles.metaItem}>
                  <div className={styles.metaLabel}>Ngày nhận phòng</div>
                  <div className={styles.metaValue}>{request.moveInDate}</div>
                </div>
                <div className={styles.metaItem}>
                  <div className={styles.metaLabel}>Thời hạn thuê</div>
                  <div className={styles.metaValue}>{request.duration}</div>
                </div>
                <div className={styles.metaItem}>
                  <div className={styles.metaLabel}>Đặt cọc</div>
                  <div className={styles.metaValue}>{request.deposit}</div>
                </div>
                <div className={styles.metaItem}>
                  <div className={styles.metaLabel}>Ngày yêu cầu</div>
                  <div className={styles.metaValue}>{request.requestDate}</div>
                </div>
              </div>

              <div className={styles.requestTenant}>
                <img
                  src={request.tenant.avatar}
                  alt="Tenant"
                  className={styles.tenantAvatar}
                />
                <div className={styles.tenantInfo}>
                  <div className={styles.tenantName}>{request.tenant.name}</div>
                  <div className={styles.tenantDetails}>
                    <div className={styles.tenantContact}>
                      <i className="fas fa-phone"></i> {request.tenant.phone}
                    </div>
                    <div className={styles.tenantContact}>
                      <i className="fas fa-envelope"></i> {request.tenant.email}
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.requestMessage}>
                <p>{request.message}</p>
              </div>

              <div className={styles.requestActions}>
                {request.status === "pending" && (
                  <>
                    <button
                      className={`${styles.btn} ${styles.btnOutlineDanger}`}
                    >
                      <i className="fas fa-times"></i> Từ chối
                    </button>
                    <button
                      className={`${styles.btn} ${styles.btnOutlinePrimary}`}
                    >
                      <i className="fas fa-comments"></i> Liên hệ
                    </button>
                    <button className={`${styles.btn} ${styles.btnSuccess}`}>
                      <i className="fas fa-check"></i> Chấp nhận
                    </button>
                  </>
                )}
                {request.status === "approved" && (
                  <>
                    <button
                      className={`${styles.btn} ${styles.btnOutlinePrimary}`}
                    >
                      <i className="fas fa-file-contract"></i> Xem hợp đồng
                    </button>
                    <button className={`${styles.btn} ${styles.btnPrimary}`}>
                      <i className="fas fa-eye"></i> Xem chi tiết
                    </button>
                  </>
                )}
                {request.status === "rejected" && (
                  <>
                    <button className={`${styles.btn} ${styles.btnOutline}`}>
                      <i className="fas fa-history"></i> Lý do từ chối
                    </button>
                    <button className={`${styles.btn} ${styles.btnPrimary}`}>
                      <i className="fas fa-eye"></i> Xem chi tiết
                    </button>
                  </>
                )}
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
            <div className={styles.pageItem}>8</div>
            <div className={styles.pageItem}>
              <i className="fas fa-angle-right"></i>
            </div>
          </div>
        </div>

        {isModalOpen && selectedRequest && (
          <div className={styles.modalBackdrop} onClick={closeRequestDetail}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h2 className={styles.modalTitle}>
                  Chi tiết yêu cầu thuê #{selectedRequest.id}
                </h2>
                <div className={styles.modalClose} onClick={closeRequestDetail}>
                  <i className="fas fa-times"></i>
                </div>
              </div>
              <div className={styles.modalBody}>
                <div className={styles.requestProperty}>
                  <div className={styles.requestImage}>
                    <img src={selectedRequest.property.image} alt="Property" />
                  </div>
                  <div className={styles.requestInfo}>
                    <div className={styles.requestPropertyTitle}>
                      {selectedRequest.property.title}
                    </div>
                    <div className={styles.requestAddress}>
                      {selectedRequest.property.address}
                    </div>
                    <div className={styles.requestPrice}>
                      {selectedRequest.property.price}
                    </div>
                  </div>
                </div>

                <div
                  className={styles.requestMeta}
                  style={{ marginTop: "1.5rem" }}
                >
                  <div className={styles.metaItem}>
                    <div className={styles.metaLabel}>Mã yêu cầu</div>
                    <div className={styles.metaValue}>
                      #{selectedRequest.id}
                    </div>
                  </div>
                  <div className={styles.metaItem}>
                    <div className={styles.metaLabel}>Trạng thái</div>
                    <div className={styles.metaValue}>
                      <span
                        className={`${styles.badge} ${getStatusClass(selectedRequest.status)}`}
                      >
                        {getStatusText(selectedRequest.status)}
                      </span>
                    </div>
                  </div>
                  <div className={styles.metaItem}>
                    <div className={styles.metaLabel}>Ngày yêu cầu</div>
                    <div className={styles.metaValue}>
                      {selectedRequest.requestDate}
                    </div>
                  </div>
                  <div className={styles.metaItem}>
                    <div className={styles.metaLabel}>Ngày cập nhật</div>
                    <div className={styles.metaValue}>
                      {selectedRequest.requestDate}
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: "1.5rem" }}>
                  <h3 style={{ marginBottom: "1rem" }}>Thông tin thuê</h3>
                  <div className={styles.requestMeta}>
                    <div className={styles.metaItem}>
                      <div className={styles.metaLabel}>Ngày bắt đầu</div>
                      <div className={styles.metaValue}>
                        {selectedRequest.moveInDate}
                      </div>
                    </div>
                    <div className={styles.metaItem}>
                      <div className={styles.metaLabel}>Thời hạn thuê</div>
                      <div className={styles.metaValue}>
                        {selectedRequest.duration}
                      </div>
                    </div>
                    <div className={styles.metaItem}>
                      <div className={styles.metaLabel}>Ngày kết thúc</div>
                      <div className={styles.metaValue}>
                        {selectedRequest.endDate || "N/A"}
                      </div>
                    </div>
                    <div className={styles.metaItem}>
                      <div className={styles.metaLabel}>Số người ở</div>
                      <div className={styles.metaValue}>
                        {selectedRequest.numberOfPeople || "N/A"}
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: "1.5rem" }}>
                  <h3 style={{ marginBottom: "1rem" }}>Thông tin tài chính</h3>
                  <div className={styles.requestMeta}>
                    <div className={styles.metaItem}>
                      <div className={styles.metaLabel}>Giá thuê</div>
                      <div className={styles.metaValue}>
                        {selectedRequest.property.price}
                      </div>
                    </div>
                    <div className={styles.metaItem}>
                      <div className={styles.metaLabel}>Tiền cọc</div>
                      <div className={styles.metaValue}>
                        {selectedRequest.deposit}
                      </div>
                    </div>
                    <div className={styles.metaItem}>
                      <div className={styles.metaLabel}>Phí quản lý</div>
                      <div className={styles.metaValue}>
                        {selectedRequest.managementFee || "N/A"}
                      </div>
                    </div>
                    <div className={styles.metaItem}>
                      <div className={styles.metaLabel}>
                        Phương thức thanh toán
                      </div>
                      <div className={styles.metaValue}>
                        {selectedRequest.paymentMethod || "N/A"}
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: "1.5rem" }}>
                  <h3 style={{ marginBottom: "1rem" }}>Thông tin người thuê</h3>
                  <div className={styles.requestTenant}>
                    <img
                      src={selectedRequest.tenant.avatar}
                      alt="Tenant"
                      className={styles.tenantAvatar}
                    />
                    <div
                      className={styles.tenantInfo}
                      style={{ marginBottom: 0 }}
                    >
                      <div className={styles.tenantName}>
                        {selectedRequest.tenant.name}
                      </div>
                      <div className={styles.tenantDetails}>
                        <div className={styles.tenantContact}>
                          <i className="fas fa-phone"></i>{" "}
                          {selectedRequest.tenant.phone}
                        </div>
                        <div className={styles.tenantContact}>
                          <i className="fas fa-envelope"></i>{" "}
                          {selectedRequest.tenant.email}
                        </div>
                      </div>
                    </div>
                  </div>

                  {selectedRequest.tenant.idNumber && (
                    <div style={{ marginTop: "1rem" }}>
                      <div className={styles.requestMeta}>
                        <div className={styles.metaItem}>
                          <div className={styles.metaLabel}>CCCD/CMND</div>
                          <div className={styles.metaValue}>
                            {selectedRequest.tenant.idNumber}
                          </div>
                        </div>
                        <div className={styles.metaItem}>
                          <div className={styles.metaLabel}>Ngày cấp</div>
                          <div className={styles.metaValue}>
                            {selectedRequest.tenant.idIssueDate}
                          </div>
                        </div>
                        <div className={styles.metaItem}>
                          <div className={styles.metaLabel}>Nơi cấp</div>
                          <div className={styles.metaValue}>
                            {selectedRequest.tenant.idIssuePlace}
                          </div>
                        </div>
                        <div className={styles.metaItem}>
                          <div className={styles.metaLabel}>Nghề nghiệp</div>
                          <div className={styles.metaValue}>
                            {selectedRequest.tenant.occupation}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div style={{ marginTop: "1.5rem" }}>
                  <h3 style={{ marginBottom: "1rem" }}>Tin nhắn</h3>
                  <div className={styles.requestMessage}>
                    <p>{selectedRequest.message}</p>
                  </div>
                </div>

                <div className={styles.responseForm}>
                  <h3 style={{ marginBottom: "1rem" }}>Phản hồi yêu cầu</h3>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Quyết định</label>
                    <select className={styles.formSelect}>
                      <option value="">-- Chọn quyết định --</option>
                      <option value="approve">Chấp nhận yêu cầu</option>
                      <option value="schedule">Hẹn xem nhà</option>
                      <option value="reject">Từ chối yêu cầu</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      Tin nhắn phản hồi
                    </label>
                    <textarea
                      className={`${styles.formControl} ${styles.formTextarea}`}
                      placeholder="Nhập nội dung phản hồi..."
                    ></textarea>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      Đặt lịch (nếu cần)
                    </label>
                    <div style={{ display: "flex", gap: "1rem" }}>
                      <input
                        type="date"
                        className={styles.formControl}
                        style={{ width: "50%" }}
                      />
                      <input
                        type="time"
                        className={styles.formControl}
                        style={{ width: "50%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.modalFooter}>
                <button
                  className={`${styles.btn} ${styles.btnOutline}`}
                  onClick={closeRequestDetail}
                >
                  <i className="fas fa-times"></i> Hủy bỏ
                </button>
                <button className={`${styles.btn} ${styles.btnOutlineDanger}`}>
                  <i className="fas fa-times-circle"></i> Từ chối
                </button>
                <button className={`${styles.btn} ${styles.btnOutlinePrimary}`}>
                  <i className="fas fa-calendar-alt"></i> Hẹn xem nhà
                </button>
                <button className={`${styles.btn} ${styles.btnSuccess}`}>
                  <i className="fas fa-check-circle"></i> Chấp nhận
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
