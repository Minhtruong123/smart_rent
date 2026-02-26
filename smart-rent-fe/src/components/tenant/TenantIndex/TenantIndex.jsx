import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import usePropertyStore from "../../../stores/usePropertyStore";
import "@fortawesome/fontawesome-free/css/all.min.css";
import styles from "./TenantIndex.module.css";

export default function TenantIndex() {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef(null);
  const { properties, loading, error, fetchProperties } = usePropertyStore();

  const navigate = useNavigate();

  const testimonials = [
    {
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      content:
        "SmartRent đã giúp tôi tìm được căn hộ ưng ý chỉ trong 2 ngày. Chatbot AI thực sự rất thông minh, hiểu rõ nhu cầu của tôi và đề xuất chính xác. Cảm ơn SmartRent!",
      author: "Nguyễn Minh Tâm",
      role: "Chuyên viên marketing",
      rating: 5,
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      content:
        "Là chủ nhà, tôi rất hài lòng với hệ thống quản lý của SmartRent. Việc ký hợp đồng và thanh toán trở nên dễ dàng hơn bao giờ hết. Đặc biệt là tính năng báo cáo tài chính rất hữu ích.",
      author: "Trần Quốc Bảo",
      role: "Nhà đầu tư BĐS",
      rating: 5,
    },
    {
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      content:
        "Ứng dụng thực sự tiết kiệm thời gian cho tôi. Không cần phải chạy đi xem nhiều nơi, tôi có thể lọc và chọn căn hộ phù hợp dựa trên đề xuất thông minh và hình ảnh thực tế rõ ràng.",
      author: "Lê Thị Hồng",
      role: "Giảng viên đại học",
      rating: 4,
    },
  ];

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  useEffect(() => {
    let ticking = false;
    const revealOnScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const reveals = document.querySelectorAll(`.${styles.reveal}`);
          reveals.forEach((element) => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 100;

            if (elementTop < windowHeight - elementVisible) {
              element.classList.add(styles.active);
            }
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleBackToTop = () => {
      setIsScrolling(true);

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);

      const backToTop = document.getElementById("backToTop");
      if (backToTop) {
        if (window.scrollY > 300) {
          backToTop.classList.add(styles.active);
        } else {
          backToTop.classList.remove(styles.active);
        }
      }
    };

    revealOnScroll();
    handleBackToTop();

    window.addEventListener("scroll", revealOnScroll, { passive: true });
    window.addEventListener("scroll", handleBackToTop, { passive: true });

    const interval = setInterval(() => {
      setCurrentTestimonialIndex(
        (prevIndex) => (prevIndex + 1) % testimonials.length,
      );
    }, 7000);

    return () => {
      window.removeEventListener("scroll", revealOnScroll);
      window.removeEventListener("scroll", handleBackToTop);
      clearInterval(interval);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [testimonials.length]);

  const handleBackToTopClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const prevTestimonial = () => {
    setCurrentTestimonialIndex(
      (prevIndex) =>
        (prevIndex - 1 + testimonials.length) % testimonials.length,
    );
  };

  const nextTestimonial = () => {
    setCurrentTestimonialIndex(
      (prevIndex) => (prevIndex + 1) % testimonials.length,
    );
  };

  const getBadgeClass = (type) => {
    switch (type) {
      case "ROOM":
        return styles.badgeRoom;
      case "APARTMENT":
        return styles.badgeApartment;
      case "HOUSE":
        return styles.badgeHouse;
      default:
        return styles.badgeDefault;
    }
  };

  const currentTestimonial = testimonials[currentTestimonialIndex];
  return (
    <>
      <main className={styles.main}>
        <div
          className={styles.backToTop}
          id="backToTop"
          onClick={handleBackToTopClick}
          role="button"
          aria-label="Quay lên đầu trang"
        >
          <i className="fas fa-arrow-up"></i>
        </div>

        <section className={styles.hero} id="home">
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <h1>
                Tìm Nhà Cho Thuê{" "}
                <span className={styles.highlight}>Thông Minh</span> Với AI
              </h1>
              <p>
                Hệ thống quản lý và cho thuê bất động sản hiện đại, tích hợp
                chatbot AI hỗ trợ tư vấn 24/7. Nhanh chóng - Tiện lợi - An toàn
              </p>
              <div className={styles.heroButtons}>
                <a href="#search" className={styles.btnPrimary}>
                  <i className="fas fa-search"></i>
                  Tìm nhà ngay
                </a>
                <a href="#features" className={styles.btnOutlineWhite}>
                  <i className="fas fa-play-circle"></i>
                  Xem demo
                </a>
              </div>
            </div>
            <div className={styles.heroImage}>
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
                alt="Modern House"
              />
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section className={styles.searchSection} id="search">
          <div className={styles.searchContainer}>
            <div className={styles.searchTabs}>
              <button className={`${styles.searchTab} ${styles.active}`}>
                <i className="fas fa-building"></i> Thuê nhà
              </button>
              <button className={styles.searchTab}>
                <i className="fas fa-home"></i> Căn hộ
              </button>
              <button className={styles.searchTab}>
                <i className="fas fa-door-open"></i> Phòng trọ
              </button>
              <button className={styles.searchTab}>
                <i className="fas fa-warehouse"></i> Văn phòng
              </button>
              <button className={styles.searchTab}>
                <i className="fas fa-store"></i> Mặt bằng
              </button>
            </div>
            <form className={styles.searchForm}>
              <div className={styles.formGroup}>
                <label>
                  <i className="fas fa-map-marker-alt"></i> Khu vực
                </label>
                <input
                  type="text"
                  placeholder="Nhập địa điểm bạn muốn tìm..."
                />
              </div>
              <div className={styles.formGroup}>
                <label>
                  <i className="fas fa-dollar-sign"></i> Khoảng giá
                </label>
                <select>
                  <option>Tất cả</option>
                  <option>Dưới 3 triệu</option>
                  <option>3 - 5 triệu</option>
                  <option>5 - 10 triệu</option>
                  <option>Trên 10 triệu</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>
                  <i className="fas fa-bed"></i> Phòng ngủ
                </label>
                <select>
                  <option>Tất cả</option>
                  <option>1 phòng</option>
                  <option>2 phòng</option>
                  <option>3+ phòng</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <button
                  type="submit"
                  className={`${styles.btnPrimary} ${styles.fullWidth}`}
                >
                  <i className="fas fa-search"></i>
                  Tìm kiếm
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Features Section */}
        <section
          className={`${styles.features} ${styles.reveal}`}
          id="features"
        >
          <div className={styles.sectionHeader}>
            <h2>
              Tại Sao Chọn <span className={styles.highlight}>SmartRent</span>?
            </h2>
            <p>
              Nền tảng quản lý cho thuê bất động sản thông minh với công nghệ AI
              tiên tiến
            </p>
          </div>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <i className="fas fa-robot"></i>
              </div>
              <h3>Chatbot AI 24/7</h3>
              <p>
                Trợ lý ảo thông minh hỗ trợ tư vấn, tìm kiếm và giải đáp mọi
                thắc mắc của bạn bất cứ lúc nào
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3>An Toàn & Bảo Mật</h3>
              <p>
                Hệ thống bảo mật đa lớp, xác thực 2 yếu tố, đảm bảo thông tin và
                giao dịch của bạn luôn an toàn
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <i className="fas fa-credit-card"></i>
              </div>
              <h3>Thanh Toán Online</h3>
              <p>
                Tích hợp đa dạng cổng thanh toán: VNPay, MoMo, ZaloPay. Nhanh
                chóng, tiện lợi, minh bạch
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <i className="fas fa-file-contract"></i>
              </div>
              <h3>Hợp Đồng Điện Tử</h3>
              <p>
                Ký kết hợp đồng trực tuyến với chữ ký số hợp pháp, tiết kiệm
                thời gian và chi phí
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <i className="fas fa-chart-line"></i>
              </div>
              <h3>Quản Lý Thông Minh</h3>
              <p>
                Dashboard trực quan, báo cáo chi tiết, thống kê doanh thu và
                quản lý hợp đồng dễ dàng
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <i className="fas fa-bell"></i>
              </div>
              <h3>Thông Báo Realtime</h3>
              <p>
                Nhận thông báo tức thời về giao dịch, hợp đồng sắp hết hạn và
                cập nhật mới từ chủ nhà
              </p>
            </div>
          </div>
        </section>

        {/* Properties Section */}
        <section
          className={`${styles.properties} ${styles.reveal}`}
          id="properties"
        >
          <div className={styles.sectionHeader}>
            <h2>
              Bất Động Sản <span className={styles.highlight}>Nổi Bật</span>
            </h2>
            <p>
              Khám phá những căn hộ, nhà ở chất lượng với đầy đủ tiện nghi hiện
              đại
            </p>
          </div>
          {loading ? (
            <div className={styles.loadingContainer}>
              <div className={styles.spinner}></div>
              <p>Đang tải danh sách bất động sản...</p>
            </div>
          ) : error ? (
            <div className={styles.errorContainer}>
              <p>{error}</p>
              <button
                onClick={() => fetchProperties()}
                className={styles.btnPrimary}
              >
                Thử lại
              </button>
            </div>
          ) : (
            <div className={styles.propertiesGrid}>
              {properties.slice(0, 6).map((property) => (
                <div key={property.id} className={styles.propertyCard}>
                  <div className={styles.propertyImage}>
                    <img
                      src={
                        property.image ||
                        "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80"
                      }
                      alt={property.title}
                    />
                    <div
                      className={`${styles.propertyBadge} ${getBadgeClass(property.type)}`}
                    >
                      {property.type}
                    </div>
                  </div>
                  <div className={styles.propertyInfo}>
                    <div className={styles.propertyPrice}>
                      {new Intl.NumberFormat("vi-VN").format(property.price)}{" "}
                      VNĐ/tháng
                    </div>
                    <h3 className={styles.propertyTitle}>{property.title}</h3>
                    <div className={styles.propertyLocation}>
                      <i className="fas fa-map-marker-alt"></i>{" "}
                      {property.district}, {property.city}
                    </div>
                    <div className={styles.propertyFeatures}>
                      <div className={styles.propertyFeature}>
                        <i className="fas fa-vector-square"></i> {property.area}
                      </div>
                      {property.bedrooms && (
                        <div className={styles.propertyFeature}>
                          <i className="fas fa-bed"></i> {property.bedrooms} PN
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className={styles.viewMoreContainer}>
            <a
              onClick={() => navigate("/real-estate-page")}
              className={styles.btnOutline}
            >
              Xem thêm bất động sản <i className="fas fa-arrow-right"></i>
            </a>
          </div>
        </section>

        {/* AI Chatbot Section */}
        <section className={`${styles.aiChatbot} ${styles.reveal}`} id="about">
          <div className={styles.aiContent}>
            <div className={styles.aiText}>
              <h2>
                Trợ Lý Ảo <span className={styles.highlight}>AI</span> Hỗ Trợ
                24/7
              </h2>
              <p>
                SmartRent tích hợp trợ lý ảo AI thông minh, giúp bạn tìm kiếm và
                tư vấn bất động sản phù hợp nhất với nhu cầu. Hỏi đáp mọi thắc
                mắc ngay tức thì, không cần chờ đợi.
              </p>
              <ul className={styles.aiFeatureslist}>
                <li>
                  <i className="fas fa-search"></i>
                  <span>
                    Tìm kiếm và lọc bất động sản theo yêu cầu cụ thể của bạn
                  </span>
                </li>
                <li>
                  <i className="fas fa-calculator"></i>
                  <span>Ước tính chi phí và tư vấn khoản vay tối ưu</span>
                </li>
                <li>
                  <i className="fas fa-map-marked-alt"></i>
                  <span>Phân tích khu vực và tiện ích xung quanh</span>
                </li>
                <li>
                  <i className="fas fa-calendar-alt"></i>
                  <span>Đặt lịch xem nhà và nhắc nhở tự động</span>
                </li>
              </ul>
              <a href="#" className={styles.btnOutlineWhite}>
                <i className="fas fa-headset"></i> Trải nghiệm ngay
              </a>
            </div>

            <div className={`${styles.chatbotDemo} ${styles.animateFloat}`}>
              <div className={styles.chatHeader}>
                <div className={styles.chatAvatar}>
                  <i className="fas fa-robot"></i>
                </div>
                <div>
                  <h3>SmartBot</h3>
                  <p className={styles.activeStatus}>Đang hoạt động</p>
                </div>
              </div>

              <div className={styles.chatMessages}>
                <div className={`${styles.message} ${styles.bot}`}>
                  <div className={styles.chatAvatarSmall}>
                    <i className="fas fa-robot"></i>
                  </div>
                  <div className={styles.messageContent}>
                    Xin chào! Tôi là SmartBot, trợ lý tìm nhà thông minh. Tôi có
                    thể giúp gì cho bạn hôm nay?
                  </div>
                </div>

                <div className={`${styles.message} ${styles.user}`}>
                  <div className={styles.messageContent}>
                    Tôi đang tìm căn hộ 2 phòng ngủ ở quận 2, giá dưới 10
                    triệu/tháng
                  </div>
                </div>

                <div className={`${styles.message} ${styles.bot}`}>
                  <div className={styles.chatAvatarSmall}>
                    <i className="fas fa-robot"></i>
                  </div>
                  <div className={styles.messageContent}>
                    Tôi đang tìm kiếm các căn hộ phù hợp cho bạn
                    <div className={styles.loadingDots}>
                      <div className={styles.loadingDot}></div>
                      <div className={styles.loadingDot}></div>
                      <div className={styles.loadingDot}></div>
                    </div>
                  </div>
                </div>

                <div className={`${styles.message} ${styles.bot}`}>
                  <div className={styles.chatAvatarSmall}>
                    <i className="fas fa-robot"></i>
                  </div>
                  <div className={styles.messageContent}>
                    Tôi đã tìm thấy 5 căn hộ phù hợp ở Quận 2 với giá dưới 10
                    triệu/tháng. Căn hộ đầu tiên là tại khu Masteri Thảo Điền,
                    65m², giá 8.5 triệu/tháng. Bạn có muốn xem thêm chi tiết
                    không?
                  </div>
                </div>

                <div className={`${styles.message} ${styles.user}`}>
                  <div className={styles.messageContent}>
                    Có, cho tôi xem thêm thông tin và hình ảnh căn hộ đó
                  </div>
                </div>
              </div>

              <div className={styles.chatInput}>
                <input type="text" placeholder="Nhập tin nhắn của bạn..." />
                <button>
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className={`${styles.stats} ${styles.reveal}`}>
          <div className={styles.statsContainer}>
            <div className={styles.statItem}>
              <div className={styles.statIcon}>
                <i className="fas fa-building"></i>
              </div>
              <div className={styles.statNumber}>5,000+</div>
              <div className={styles.statText}>Bất động sản</div>
            </div>

            <div className={styles.statItem}>
              <div className={styles.statIcon}>
                <i className="fas fa-users"></i>
              </div>
              <div className={styles.statNumber}>10,000+</div>
              <div className={styles.statText}>Khách hàng hài lòng</div>
            </div>

            <div className={styles.statItem}>
              <div className={styles.statIcon}>
                <i className="fas fa-city"></i>
              </div>
              <div className={styles.statNumber}>15+</div>
              <div className={styles.statText}>Tỉnh thành</div>
            </div>

            <div className={styles.statItem}>
              <div className={styles.statIcon}>
                <i className="fas fa-handshake"></i>
              </div>
              <div className={styles.statNumber}>8,000+</div>
              <div className={styles.statText}>Giao dịch thành công</div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className={`${styles.testimonials} ${styles.reveal}`}>
          <div className={styles.sectionHeader}>
            <h2>
              Khách Hàng Nói Gì{" "}
              <span className={styles.highlight}>Về Chúng Tôi</span>
            </h2>
            <p>
              Những trải nghiệm thực tế từ khách hàng đã sử dụng dịch vụ của
              SmartRent
            </p>
          </div>

          <div className={styles.testimonialContainer}>
            <div className={styles.testimonialTrack}>
              <div className={styles.testimonialCard}>
                <img
                  src={currentTestimonial.avatar}
                  alt="User Avatar"
                  className={styles.testimonialAvatar}
                />
                <p className={styles.testimonialContent}>
                  {currentTestimonial.content}
                </p>
                <div className={styles.testimonialRating}>
                  {Array(currentTestimonial.rating)
                    .fill()
                    .map((_, i) => (
                      <i key={i} className="fas fa-star"></i>
                    ))}
                  {Array(5 - currentTestimonial.rating)
                    .fill()
                    .map((_, i) => (
                      <i key={i} className="far fa-star"></i>
                    ))}
                </div>
                <div className={styles.testimonialAuthor}>
                  {currentTestimonial.author}
                </div>
                <div className={styles.testimonialRole}>
                  {currentTestimonial.role}
                </div>
              </div>
            </div>

            <div className={styles.testimonialControls}>
              <button
                className={styles.testimonialButton}
                onClick={prevTestimonial}
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              <button
                className={styles.testimonialButton}
                onClick={nextTestimonial}
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={`${styles.cta} ${styles.reveal}`}>
          <div className={styles.ctaContent}>
            <h2>Bắt Đầu Tìm Kiếm Ngôi Nhà Mơ Ước</h2>
            <p>
              Đăng ký tài khoản miễn phí ngay hôm nay và trải nghiệm nền tảng
              tìm nhà thông minh hàng đầu Việt Nam
            </p>
            <div className={styles.ctaButtons}>
              <a href="#" className={styles.btnPrimary}>
                <i className="fas fa-user-plus"></i> Đăng ký ngay
              </a>
              <a href="#" className={styles.btnOutlineWhite}>
                <i className="fas fa-info-circle"></i> Tìm hiểu thêm
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
