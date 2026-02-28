import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../stores/useAuthStore";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { user, signOut } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    setShowConfirm(false);
    navigate("/login");
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  return (
    <>
      <aside
        className={`${styles.sidebar} ${collapsed ? styles.sidebarCollapsed : ""}`}
      >
        <div className={styles.sidebarHeader}>
          <div className={styles.logo}>
            <i className="fas fa-home"></i>
            <span className={styles.logoText}>SmartRent</span>
          </div>
          <div className={styles.sidebarToggle} onClick={toggleSidebar}>
            <i className="fas fa-bars"></i>
          </div>
        </div>

        <div className={styles.sidebarMenu}>
          <div className={styles.menuLabel}>Tổng quan</div>
          <NavLink
            to="/owner/dashboard"
            className={({ isActive }) =>
              `${styles.menuItem} ${isActive ? styles.active : ""}`
            }
          >
            <i className="fas fa-tachometer-alt"></i>
            <span className={styles.menuText}>Dashboard</span>
          </NavLink>
          <NavLink
            to="/owner/statistical"
            className={({ isActive }) =>
              `${styles.menuItem} ${isActive ? styles.active : ""}`
            }
          >
            <i className="fas fa-chart-line"></i>
            <span className={styles.menuText}>Thống kê</span>
          </NavLink>
          <NavLink
            to="/owner/calendar"
            className={({ isActive }) =>
              `${styles.menuItem} ${isActive ? styles.active : ""}`
            }
          >
            <i className="fas fa-calendar-alt"></i>
            <span className={styles.menuText}>Lịch</span>
          </NavLink>
          <div className={styles.menuLabel}>Quản lý BĐS</div>
          <NavLink
            to="/owner/real-estate"
            className={({ isActive }) =>
              `${styles.menuItem} ${isActive ? styles.active : ""}`
            }
          >
            <i className="fas fa-building"></i>
            <span className={styles.menuText}>Bất động sản</span>
          </NavLink>
          <a href="#" className={styles.menuItem}>
            <i className="fas fa-plus-circle"></i>
            <span className={styles.menuText}>Thêm BĐS mới</span>
          </a>
          <a href="#" className={styles.menuItem}>
            <i className="fas fa-tools"></i>
            <span className={styles.menuText}>Bảo trì</span>
          </a>

          <div className={styles.menuLabel}>Khách thuê</div>
          <a href="#" className={styles.menuItem}>
            <i className="fas fa-user-check"></i>
            <span className={styles.menuText}>Yêu cầu thuê</span>
          </a>
          <a href="#" className={styles.menuItem}>
            <i className="fas fa-file-contract"></i>
            <span className={styles.menuText}>Hợp đồng</span>
          </a>
          <a href="#" className={styles.menuItem}>
            <i className="fas fa-users"></i>
            <span className={styles.menuText}>Người thuê</span>
          </a>

          <div className={styles.menuLabel}>Tài chính</div>
          <a href="#" className={styles.menuItem}>
            <i className="fas fa-file-invoice-dollar"></i>
            <span className={styles.menuText}>Hóa đơn</span>
          </a>
          <a href="#" className={styles.menuItem}>
            <i className="fas fa-money-bill-wave"></i>
            <span className={styles.menuText}>Giao dịch</span>
          </a>
          <a href="#" className={styles.menuItem}>
            <i className="fas fa-credit-card"></i>
            <span className={styles.menuText}>Phương thức thanh toán</span>
          </a>

          <div className={styles.menuLabel}>Cài đặt</div>
          <a href="#" className={styles.menuItem}>
            <i className="fas fa-user-circle"></i>
            <span className={styles.menuText}>Tài khoản</span>
          </a>
          <a
            href="#"
            className={styles.menuItem}
            onClick={() => setShowConfirm(true)}
          >
            <i className="fas fa-sign-out-alt"></i>
            <span className={styles.menuText}>Đăng xuất</span>
          </a>
        </div>

        <div className={styles.sidebarFooter}>
          <div className={styles.userInfo}>
            <div className={styles.userAvatar}>NT</div>
            <div>
              <div className={styles.userName}>Nguyễn Thành</div>
              <div className={styles.userRole}>Chủ nhà</div>
            </div>
          </div>
        </div>
      </aside>

      {showConfirm && (
        <div className={styles.overlay}>
          <div className={styles.confirmModal}>
            <div className={styles.modalIcon}>
              <i className="fas fa-exclamation-circle"></i>
            </div>
            <h3>Xác nhận đăng xuất</h3>
            <p>
              Bạn có chắc chắn muốn thoát khỏi phiên làm việc hiện tại không?
            </p>
            <div className={styles.modalActions}>
              <button
                className={styles.btnCancel}
                onClick={() => setShowConfirm(false)}
              >
                Hủy
              </button>
              <button className={styles.btnDanger} onClick={handleLogout}>
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
