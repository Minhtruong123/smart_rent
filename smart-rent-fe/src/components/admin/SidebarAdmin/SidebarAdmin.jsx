import React, { useState } from "react";
import styles from "./SidebarAdmin.module.css";
import {
  Home,
  Users,
  Database,
  PieChart,
  ShieldAlert,
  Settings,
  BellRing,
  LogOut,
  BarChart3,
  UserPlus,
  CreditCard,
  Star,
  AlertTriangle,
} from "lucide-react";

export default function SidebarAdmin() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileOpen(!mobileOpen);
  };

  const closeMobileSidebar = () => {
    setMobileOpen(false);
  };
  return (
    <>
      <div className={styles.desktopSidebar}>
        <div className={styles.logoContainer}>
          <div className={styles.logoIcon}>
            <Home className={styles.logoSvg} />
          </div>
          <span className={styles.logoText}>SmartRent</span>
        </div>

        <div className={styles.navContainer}>
          <nav className={styles.navLinks}>
            <a href="#" className={`${styles.sidebarLink} ${styles.active}`}>
              <Home className={styles.navIcon} />
              <span>Trang chủ</span>
            </a>

            <a href="#" className={styles.sidebarLink}>
              <Users className={styles.navIcon} />
              <span>Quản lý người dùng</span>
            </a>

            <a href="#" className={styles.sidebarLink}>
              <Database className={styles.navIcon} />
              <span>Quản lý bất động sản</span>
            </a>

            <a href="#" className={styles.sidebarLink}>
              <PieChart className={styles.navIcon} />
              <span>Thống kê báo cáo</span>
            </a>

            <a href="#" className={styles.sidebarLink}>
              <ShieldAlert className={styles.navIcon} />
              <span>Giám sát & Sự cố</span>
            </a>

            <a href="#" className={styles.sidebarLink}>
              <Settings className={styles.navIcon} />
              <span>Cài đặt</span>
            </a>
          </nav>
        </div>

        <div className={styles.userProfileContainer}>
          <div className={styles.userProfile}>
            <img
              src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=40&h=40&fit=crop&crop=faces"
              alt="Admin"
              className={styles.avatar}
            />
            <div className={styles.userInfo}>
              <p className={styles.userName}>Lê Văn Cường</p>
              <p className={styles.userRole}>Administrator</p>
            </div>

            <button className={styles.logoutButton}>
              <LogOut className={styles.logoutIcon} />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.mobileHeader}>
        <div className={styles.mobileHeaderInner}>
          <div className={styles.mobileLogoContainer}>
            <div className={styles.mobileLogoIcon}>
              <Home className={styles.mobileLogoSvg} />
            </div>
            <span className={styles.mobileLogoText}>SmartRent</span>
          </div>
          <button
            className={styles.mobileMenuButton}
            onClick={toggleMobileMenu}
            aria-label="Open menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.barsIcon}
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={styles.mobileSidebarWrapper}
        style={{ display: mobileOpen ? "block" : "none" }}
      >
        <div
          className={styles.mobileSidebarBackdrop}
          onClick={closeMobileSidebar}
        ></div>

        <div
          className={`${styles.mobileSidebar} ${mobileOpen ? styles.show : ""}`}
        >
          <div className={styles.mobileSidebarHeader}>
            <div className={styles.mobileLogoContainer}>
              <div className={styles.mobileLogoIcon}>
                <Home className={styles.mobileLogoSvg} />
              </div>
              <span className={styles.mobileLogoText}>SmartRent</span>
            </div>
            <button
              className={styles.closeMobileButton}
              onClick={closeMobileSidebar}
              aria-label="Close menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.closeIcon}
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <nav className={styles.mobileNavLinks}>
            <a href="#" className={`${styles.sidebarLink} ${styles.active}`}>
              <Home className={styles.navIcon} />
              <span>Trang chủ</span>
            </a>

            <a href="#" className={styles.sidebarLink}>
              <Users className={styles.navIcon} />
              <span>Quản lý người dùng</span>
            </a>

            <a href="#" className={styles.sidebarLink}>
              <Database className={styles.navIcon} />
              <span>Quản lý bất động sản</span>
            </a>

            <a href="#" className={styles.sidebarLink}>
              <PieChart className={styles.navIcon} />
              <span>Thống kê báo cáo</span>
            </a>

            <a href="#" className={styles.sidebarLink}>
              <ShieldAlert className={styles.navIcon} />
              <span>Giám sát & Sự cố</span>
            </a>

            <a href="#" className={styles.sidebarLink}>
              <Settings className={styles.navIcon} />
              <span>Cài đặt</span>
            </a>
          </nav>
        </div>
      </div>
    </>
  );
}
