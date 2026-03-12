import React, { useState, useEffect } from "react";
import styles from "./RentRequestManagement.module.css";
import { useRentalRequestStore } from "../../../stores/useRentalRequestStore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RentRequestManagement() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    actionType: null,
    requestId: null,
  });

  const {
    ownerRequests,
    loadingOwnerRequests,
    fetchOwnerRequests,
    approveRequest,
    rejectRequest,
  } = useRentalRequestStore();

  useEffect(() => {
    fetchOwnerRequests();
  }, [fetchOwnerRequests]);

  const filteredRequests = ownerRequests.filter((req) => {
    if (activeTab === "all") return true;
    return req.status.toLowerCase() === activeTab.toLowerCase();
  });

  const totalCount = ownerRequests.length;
  const pendingCount = ownerRequests.filter(
    (r) => r.status === "PENDING",
  ).length;
  const approvedCount = ownerRequests.filter(
    (r) => r.status === "APPROVED",
  ).length;
  const rejectedCount = ownerRequests.filter(
    (r) => r.status === "REJECTED",
  ).length;

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

  const formatCurrency = (amount) => {
    if (!amount) return "0 VNĐ";
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString || dateString === "Đang cập nhật") return "Chưa cập nhật";
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "PENDING":
        return styles.statusPending;
      case "APPROVED":
        return styles.statusApproved;
      case "REJECTED":
        return styles.statusRejected;
      default:
        return "";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "PENDING":
        return "Chờ duyệt";
      case "APPROVED":
        return "Đã chấp nhận";
      case "REJECTED":
        return "Đã từ chối";
      default:
        return status;
    }
  };

  const triggerConfirm = (id, type, e) => {
    if (e) e.stopPropagation();
    setConfirmDialog({
      isOpen: true,
      actionType: type,
      requestId: id,
    });
  };

  const closeConfirmDialog = () => {
    setConfirmDialog({ isOpen: false, actionType: null, requestId: null });
  };

  const executeAction = async () => {
    const { actionType, requestId } = confirmDialog;

    closeConfirmDialog();

    if (actionType === "approve") {
      const res = await approveRequest(requestId);
      if (res.success) {
        toast.success("Đã duyệt yêu cầu và tạo hợp đồng thành công!");
        closeRequestDetail();
      } else {
        toast.error(res.message);
      }
    } else if (actionType === "reject") {
      const res = await rejectRequest(requestId);
      if (res.success) {
        toast.success("Đã từ chối yêu cầu!");
        closeRequestDetail();
      } else {
        toast.error(res.message);
      }
    }
  };

  return (
    <>
      <div className={styles.mainContent}>
        {/* Navbar */}
        <nav className={styles.navbar}>
          <div className={styles.navTitle}>Yêu cầu thuê</div>
          <div className={styles.navActions}>
            <div className={styles.navAction}>
              <i className="fas fa-search"></i>
            </div>
            <div className={styles.navAction}>
              <i className="fas fa-bell"></i>
              <span className={styles.navBadge}>{pendingCount}</span>
            </div>
            <div className={styles.navAction}>
              <i className="fas fa-envelope"></i>
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

          {/* Thống kê động */}
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <div className={styles.statTitle}>Tổng yêu cầu thuê</div>
                <div className={`${styles.statIcon} ${styles.primary}`}>
                  <i className="fas fa-user-check"></i>
                </div>
              </div>
              <div className={styles.statValue}>{totalCount}</div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <div className={styles.statTitle}>Đang chờ duyệt</div>
                <div className={`${styles.statIcon} ${styles.warning}`}>
                  <i className="fas fa-clock"></i>
                </div>
              </div>
              <div className={styles.statValue}>{pendingCount}</div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <div className={styles.statTitle}>Đã chấp nhận</div>
                <div className={`${styles.statIcon} ${styles.success}`}>
                  <i className="fas fa-check-circle"></i>
                </div>
              </div>
              <div className={styles.statValue}>{approvedCount}</div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <div className={styles.statTitle}>Đã từ chối</div>
                <div className={`${styles.statIcon} ${styles.danger}`}>
                  <i className="fas fa-times-circle"></i>
                </div>
              </div>
              <div className={styles.statValue}>{rejectedCount}</div>
            </div>
          </div>

          <div className={styles.filterBar}>
            {/* Bộ lọc giữ nguyên giao diện */}
            <div className={styles.filterSection}>
              <div className={styles.filterSearch}>
                <i className="fas fa-search"></i>
                <input type="text" placeholder="Tìm kiếm yêu cầu thuê..." />
              </div>
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

          {loadingOwnerRequests ? (
            <div style={{ textAlign: "center", padding: "50px" }}>
              <i className="fas fa-spinner fa-spin fa-2x"></i>
              <p>Đang tải dữ liệu...</p>
            </div>
          ) : filteredRequests.length === 0 ? (
            <div
              style={{ textAlign: "center", padding: "50px", color: "#666" }}
            >
              Không có yêu cầu thuê nào trong mục này.
            </div>
          ) : (
            filteredRequests.map((request) => (
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
                    <img
                      src={
                        request.property.image ||
                        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
                      }
                      alt="Property"
                    />
                  </div>
                  <div className={styles.requestInfo}>
                    <div className={styles.requestPropertyTitle}>
                      {request.property.title}
                    </div>
                    <div className={styles.requestAddress}>
                      {request.property.address}
                    </div>
                    <div className={styles.requestPrice}>
                      {formatCurrency(request.property.price)}/tháng
                    </div>
                  </div>
                </div>

                <div className={styles.requestMeta}>
                  <div className={styles.metaItem}>
                    <div className={styles.metaLabel}>Ngày yêu cầu</div>
                    <div className={styles.metaValue}>
                      {formatDate(request.requestDate)}
                    </div>
                  </div>
                </div>

                <div className={styles.requestTenant}>
                  <img
                    src={
                      request.tenant.avatar ||
                      "https://randomuser.me/api/portraits/lego/1.jpg"
                    }
                    alt="Tenant"
                    className={styles.tenantAvatar}
                  />
                  <div className={styles.tenantInfo}>
                    <div className={styles.tenantName}>
                      {request.tenant.name}
                    </div>
                    <div className={styles.tenantDetails}>
                      <div className={styles.tenantContact}>
                        <i className="fas fa-phone"></i>{" "}
                        {request.tenant.phone || "Đang cập nhật"}
                      </div>
                      <div className={styles.tenantContact}>
                        <i className="fas fa-envelope"></i>{" "}
                        {request.tenant.email}
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.requestMessage}>
                  <p>
                    {request.message || "Khách hàng không để lại lời nhắn."}
                  </p>
                </div>

                <div className={styles.requestActions}>
                  {request.status === "PENDING" && (
                    <>
                      <button
                        className={`${styles.btn} ${styles.btnOutlineDanger}`}
                        onClick={(e) => triggerConfirm(request.id, "reject", e)}
                      >
                        <i className="fas fa-times"></i> Từ chối
                      </button>
                      <button
                        className={`${styles.btn} ${styles.btnSuccess}`}
                        onClick={(e) =>
                          triggerConfirm(request.id, "approve", e)
                        }
                      >
                        <i className="fas fa-check"></i> Chấp nhận
                      </button>
                    </>
                  )}
                  {request.status === "APPROVED" && (
                    <>
                      <button
                        className={`${styles.btn} ${styles.btnOutlinePrimary}`}
                      >
                        <i className="fas fa-file-contract"></i> Xem hợp đồng
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}

          <div className={styles.pagination}>
            <div className={`${styles.pageItem} ${styles.disabled}`}>
              <i className="fas fa-angle-left"></i>
            </div>
            <div className={`${styles.pageItem} ${styles.active}`}>1</div>
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
                    <img
                      src={
                        selectedRequest.property.image ||
                        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
                      }
                      alt="Property"
                    />
                  </div>
                  <div className={styles.requestInfo}>
                    <div className={styles.requestPropertyTitle}>
                      {selectedRequest.property.title}
                    </div>
                    <div className={styles.requestAddress}>
                      {selectedRequest.property.address}
                    </div>
                    <div className={styles.requestPrice}>
                      {formatCurrency(selectedRequest.property.price)}/tháng
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
                      {formatDate(selectedRequest.requestDate)}
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: "1.5rem" }}>
                  <h3 style={{ marginBottom: "1rem" }}>Thông tin người thuê</h3>
                  <div className={styles.requestTenant}>
                    <img
                      src={
                        selectedRequest.tenant.avatar ||
                        "https://randomuser.me/api/portraits/lego/1.jpg"
                      }
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
                          {selectedRequest.tenant.phone || "Đang cập nhật"}
                        </div>
                        <div className={styles.tenantContact}>
                          <i className="fas fa-envelope"></i>{" "}
                          {selectedRequest.tenant.email}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: "1.5rem" }}>
                  <h3 style={{ marginBottom: "1rem" }}>Tin nhắn</h3>
                  <div className={styles.requestMessage}>
                    <p>{selectedRequest.message || "Không có lời nhắn."}</p>
                  </div>
                </div>
              </div>
              <div className={styles.modalFooter}>
                <button
                  className={`${styles.btn} ${styles.btnOutline}`}
                  onClick={closeRequestDetail}
                >
                  <i className="fas fa-times"></i> Đóng
                </button>
                {selectedRequest.status === "PENDING" && (
                  <>
                    <button
                      className={`${styles.btn} ${styles.btnOutlineDanger}`}
                      onClick={() =>
                        triggerConfirm(selectedRequest.id, "reject")
                      }
                    >
                      <i className="fas fa-times-circle"></i> Từ chối
                    </button>
                    <button
                      className={`${styles.btn} ${styles.btnSuccess}`}
                      onClick={() =>
                        triggerConfirm(selectedRequest.id, "approve")
                      }
                    >
                      <i className="fas fa-check-circle"></i> Chấp nhận
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* MODAL 2: ALERT CUSTOM XÁC NHẬN */}
        {confirmDialog.isOpen && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.6)",
              zIndex: 9999,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "12px",
                width: "400px",
                maxWidth: "90%",
                padding: "30px 24px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                textAlign: "center",
              }}
            >
              {/* Icon và màu sắc thay đổi tùy theo hành động Approve hay Reject */}
              <div
                style={{
                  fontSize: "45px",
                  color:
                    confirmDialog.actionType === "approve"
                      ? "#10b981"
                      : "#ef4444",
                  marginBottom: "15px",
                }}
              >
                <i
                  className={
                    confirmDialog.actionType === "approve"
                      ? "fas fa-check-circle"
                      : "fas fa-exclamation-circle"
                  }
                ></i>
              </div>

              <h3
                style={{
                  margin: "0 0 10px 0",
                  color: "#333",
                  fontSize: "1.25rem",
                }}
              >
                {confirmDialog.actionType === "approve"
                  ? "Xác nhận chấp nhận"
                  : "Xác nhận từ chối"}
              </h3>

              <p
                style={{
                  color: "#666",
                  marginBottom: "25px",
                  lineHeight: "1.5",
                }}
              >
                {confirmDialog.actionType === "approve"
                  ? "Bạn có chắc chắn muốn chấp nhận yêu cầu này? Hệ thống sẽ tự động tạo Hợp đồng cho người thuê."
                  : "Bạn có chắc chắn muốn từ chối yêu cầu này? Người thuê sẽ nhận được thông báo từ chối."}
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "15px",
                }}
              >
                <button
                  className={styles.btnOutline}
                  onClick={closeConfirmDialog}
                  style={{ padding: "10px 20px", fontWeight: "600" }}
                >
                  Hủy bỏ
                </button>
                <button
                  onClick={executeAction}
                  style={{
                    padding: "10px 20px",
                    borderRadius: "8px",
                    fontWeight: "600",
                    border: "none",
                    cursor: "pointer",
                    color: "white",
                    backgroundColor:
                      confirmDialog.actionType === "approve"
                        ? "#10b981"
                        : "#ef4444",
                  }}
                >
                  {confirmDialog.actionType === "approve"
                    ? "Có, chấp nhận ngay"
                    : "Có, từ chối ngay"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        style={{ zIndex: 99999 }}
      />
    </>
  );
}
