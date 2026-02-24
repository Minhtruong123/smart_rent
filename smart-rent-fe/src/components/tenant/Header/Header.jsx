import React, { useState, useEffect, useRef } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuthStore } from "../../../stores/useAuthStore";
import styles from "./Header.module.css";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const navigate = useNavigate();
  const { user, signOut } = useAuthStore();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    await signOut();
    setIsDropdownOpen(false);
    navigate("/login");
  };

  const confirmLogout = () => {
    setShowLogoutConfirm(true);
    setIsDropdownOpen(false);
  };

  return (
    <>
      <header
        className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}
      >
        <nav className={styles.nav}>
          <div className={styles.logo}>
            <i className="fas fa-home"></i>
            SmartRent
          </div>
          <ul
            className={`${styles.navLinks} ${isMenuOpen ? styles.active : ""}`}
          >
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? styles.activeLink : ""
                }
              >
                Trang chủ
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/real-estate-page"
                className={({ isActive }) =>
                  isActive ? styles.activeLink : ""
                }
              >
                Bất động sản
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/feature-page"
                className={({ isActive }) =>
                  isActive ? styles.activeLink : ""
                }
              >
                Tính năng
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about-us-page"
                className={({ isActive }) =>
                  isActive ? styles.activeLink : ""
                }
              >
                Về chúng tôi
              </NavLink>
            </li>
            <li>
              {user ? (
                <div className={styles.userSection} ref={dropdownRef}>
                  <div
                    className={styles.userProfile}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <div className={styles.avatar}>
                      {user.fullName?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <span className={styles.userName}>{user.fullName}</span>
                    <i
                      className={`fas fa-chevron-down ${isDropdownOpen ? styles.rotate : ""}`}
                    ></i>
                  </div>

                  {isDropdownOpen && (
                    <div className={styles.dropdownMenu}>
                      <button
                        onClick={() => navigate("/dashboard-tenant-page")}
                        className={styles.dropdownItem}
                      >
                        <i className="fas fa-user-circle"></i> Thông tin cá nhân
                      </button>
                      <button
                        onClick={confirmLogout}
                        className={`${styles.dropdownItem} ${styles.logoutBtn}`}
                      >
                        <i className="fas fa-sign-out-alt"></i> Đăng xuất
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className={styles.btnPrimary}
                >
                  Đăng nhập
                </button>
              )}
            </li>
          </ul>
          <div className={styles.mobileToggle} onClick={toggleMenu}>
            <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"}`}></i>
          </div>
        </nav>
      </header>

      {showLogoutConfirm && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalIcon}>
              <i className="fas fa-exclamation-circle"></i>
            </div>
            <h3>Xác nhận đăng xuất</h3>
            <p>Bạn có chắc chắn muốn rời khỏi hệ thống SmartRent không?</p>
            <div className={styles.modalButtons}>
              <button
                className={styles.btnCancel}
                onClick={() => setShowLogoutConfirm(false)}
              >
                Hủy bỏ
              </button>
              <button
                className={styles.btnConfirmLogout}
                onClick={handleLogout}
              >
                Đăng xuất ngay
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
