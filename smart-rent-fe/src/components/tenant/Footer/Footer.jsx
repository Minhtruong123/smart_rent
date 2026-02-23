import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <>
      <footer id="contact" className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <div className={styles.footerLogo}>
              <i className="fas fa-home"></i> SmartRent
            </div>
            <p className={styles.footerAbout}>
              SmartRent là nền tảng quản lý và cho thuê bất động sản thông minh
              hàng đầu, ứng dụng công nghệ AI giúp kết nối chủ nhà và người thuê
              hiệu quả.
            </p>
            <div className={styles.socialLinks}>
              <a href="#">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          <div className={styles.footerSection}>
            <h3>Liên kết nhanh</h3>
            <ul>
              <li>
                <a href="#home">
                  <i className="fas fa-chevron-right"></i> Trang chủ
                </a>
              </li>
              <li>
                <a href="#properties">
                  <i className="fas fa-chevron-right"></i> Bất động sản
                </a>
              </li>
              <li>
                <a href="#features">
                  <i className="fas fa-chevron-right"></i> Tính năng
                </a>
              </li>
              <li>
                <a href="#about">
                  <i className="fas fa-chevron-right"></i> Về chúng tôi
                </a>
              </li>
              <li>
                <a href="#contact">
                  <i className="fas fa-chevron-right"></i> Liên hệ
                </a>
              </li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h3>Dịch vụ</h3>
            <ul>
              <li>
                <a href="#">
                  <i className="fas fa-chevron-right"></i> Thuê nhà
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-chevron-right"></i> Cho thuê
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-chevron-right"></i> Quản lý tài sản
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-chevron-right"></i> Tư vấn đầu tư
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-chevron-right"></i> Ký hợp đồng điện tử
                </a>
              </li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h3>Liên hệ</h3>
            <ul>
              <li>
                <a href="#">
                  <i className="fas fa-map-marker-alt"></i> 123 Nguyễn Huệ, Quận
                  1, TP.HCM
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-phone-alt"></i> (028) 3822 8888
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-envelope"></i> info@smartrent.vn
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-clock"></i> 8:00 - 17:30, Thứ 2 - Thứ 7
                </a>
              </li>
            </ul>

            <div className={styles.newsletter}>
              <p>Đăng ký nhận tin mới nhất</p>
              <form className={styles.newsletterForm}>
                <input type="email" placeholder="Email của bạn" required />
                <button type="submit">
                  <i className="fas fa-paper-plane"></i>
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>&copy; 2026 SmartRent. Tất cả quyền được bảo lưu.</p>
        </div>
      </footer>
    </>
  );
}
