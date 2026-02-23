import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../stores/useAuthStore";
import styles from "./Header.module.css";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
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

  const handleLoginClick = (e) => {
    e.preventDefault();
    navigate("/login");
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate("/login");
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
              <a href="#home">Trang chủ</a>
            </li>
            <li>
              <a href="#properties">Bất động sản</a>
            </li>
            <li>
              <a href="#features">Tính năng</a>
            </li>
            <li>
              <a href="#about">Về chúng tôi</a>
            </li>
            <li>
              <a href="#contact">Liên hệ</a>
            </li>
            <li>
              {user ? (
                /* Hiển thị khi đã Đăng nhập */
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
                        onClick={() => navigate("/profile")}
                        className={styles.dropdownItem}
                      >
                        <i className="fas fa-user-circle"></i> Thông tin cá nhân
                      </button>
                      <button
                        onClick={handleLogout}
                        className={`${styles.dropdownItem} ${styles.logoutBtn}`}
                      >
                        <i className="fas fa-sign-out-alt"></i> Đăng xuất
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* Hiển thị khi chưa Đăng nhập */
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
    </>
  );
}
