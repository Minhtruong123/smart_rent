import React, { useEffect, useState } from "react";
import styles from "./FeaturePage.module.css";

export default function FeaturePage() {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    if (activeFaq === index) {
      setActiveFaq(null);
    } else {
      setActiveFaq(index);
    }
  };

  useEffect(() => {
    const revealElements = document.querySelectorAll(`.${styles.reveal}`);

    const revealOnScroll = () => {
      revealElements.forEach((element) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
          element.classList.add(styles.active);
        }
      });
    };

    window.addEventListener("scroll", revealOnScroll);
    window.addEventListener("load", revealOnScroll);
    revealOnScroll();

    return () => {
      window.removeEventListener("scroll", revealOnScroll);
      window.removeEventListener("load", revealOnScroll);
    };
  }, []);

  // FAQ data
  const faqData = [
    {
      question: "Làm thế nào để ký hợp đồng điện tử trên SmartRent?",
      answer:
        'Để ký hợp đồng điện tử, bạn cần đăng nhập vào tài khoản SmartRent, chọn mục "Hợp đồng" và nhấn "Tạo hợp đồng mới". Hệ thống sẽ hướng dẫn bạn qua các bước: điền thông tin, tải lên tài liệu cần thiết, xác thực danh tính, và thực hiện ký số. Sau khi tất cả các bên hoàn tất ký kết, hợp đồng sẽ được lưu trữ trên hệ thống và gửi bản sao đến email của bạn.',
    },
    {
      question: "Hệ thống thanh toán tự động hoạt động như thế nào?",
      answer:
        "Hệ thống thanh toán tự động của SmartRent cho phép bạn thiết lập các khoản thanh toán định kỳ (như tiền thuê nhà hàng tháng) một lần duy nhất. Bạn cần liên kết phương thức thanh toán (thẻ ngân hàng, ví điện tử) với tài khoản và cài đặt lịch thanh toán. Hệ thống sẽ tự động trích tiền vào ngày đã chọn, tạo hóa đơn điện tử và gửi thông báo cho cả người thuê và chủ nhà. Bạn có thể theo dõi lịch sử giao dịch và xuất báo cáo chi tiết bất cứ lúc nào.",
    },
    {
      question: "Trợ lý AI có thể giúp tôi những gì?",
      answer:
        "Trợ lý AI của SmartRent có thể hỗ trợ bạn trong nhiều tác vụ: tìm kiếm bất động sản phù hợp với yêu cầu cụ thể (vị trí, diện tích, giá cả), giải đáp thắc mắc về các điều khoản trong hợp đồng, tư vấn về quy trình thuê nhà, cung cấp thông tin về khu vực (tiện ích, an ninh, giá cả thị trường), hỗ trợ lên lịch xem nhà, nhắc nhở các khoản thanh toán sắp đến hạn và giải quyết các vấn đề cơ bản trong quá trình sử dụng ứng dụng.",
    },
    {
      question: "Làm sao để xuất báo cáo thu chi cho thuê nhà?",
      answer:
        'Để xuất báo cáo thu chi cho thuê nhà, hãy truy cập vào mục "Báo cáo & Thống kê" trên trang tổng quan. Tại đây, bạn có thể lọc theo thời gian (tháng, quý, năm) và chọn loại báo cáo mong muốn (tổng quan, thu nhập, chi phí, lợi nhuận). Sau khi tùy chỉnh các thông số, nhấn "Tạo báo cáo" và hệ thống sẽ tổng hợp dữ liệu. Bạn có thể xem trực tiếp trên màn hình hoặc xuất ra định dạng PDF, Excel để lưu trữ và in ấn.',
    },
    {
      question: "Thông tin cá nhân của tôi có được bảo mật không?",
      answer:
        "SmartRent cam kết bảo vệ thông tin cá nhân của người dùng với hệ thống bảo mật đa lớp. Chúng tôi sử dụng công nghệ mã hóa đầu cuối cho dữ liệu nhạy cảm, xác thực hai yếu tố cho đăng nhập, và tuân thủ nghiêm ngặt các quy định về bảo vệ dữ liệu cá nhân. Thông tin của bạn chỉ được sử dụng trong phạm vi cần thiết để cung cấp dịch vụ và không bao giờ được chia sẻ với bên thứ ba mà không có sự đồng ý. Bạn có thể xem chi tiết về cách chúng tôi xử lý dữ liệu trong Chính sách Bảo mật.",
    },
  ];
  return (
    <>
      <div className={styles.featuresContainer}>
        {/* Page Header */}
        <section className={styles.pageHeader}>
          <div className={styles.pageHeaderContent}>
            <h1>Tính Năng Thông Minh</h1>
            <p>
              Khám phá các tính năng hiện đại giúp việc quản lý và thuê nhà trở
              nên đơn giản, an toàn và hiệu quả
            </p>
          </div>
        </section>

        {/* Features Overview */}
        <section className={styles.featuresOverview}>
          <h2 className={styles.sectionTitle}>
            Các Nhóm <span className={styles.highlight}>Tính Năng</span> Chính
          </h2>
          <p className={styles.sectionDescription}>
            SmartRent mang đến trải nghiệm toàn diện với hệ sinh thái các tính
            năng thông minh, từ tìm kiếm cho đến quản lý hợp đồng và thanh toán
          </p>

          {/* Feature Categories */}
          <div className={styles.featureCategories}>
            <div className={styles.featureCategory}>
              <div className={styles.featureCategoryHeader}>
                <div className={styles.featureCategoryIcon}>
                  <i className="fas fa-search"></i>
                </div>
                <h3 className={styles.featureCategoryTitle}>
                  Tìm Kiếm Thông Minh
                </h3>
                <p className={styles.featureCategoryDescription}>
                  Tìm bất động sản phù hợp nhanh chóng
                </p>
              </div>
              <div className={styles.featureCategoryContent}>
                <ul className={styles.featureList}>
                  <li className={styles.featureItem}>
                    <i className="fas fa-check-circle"></i>
                    <span className={styles.featureItemText}>
                      Tìm kiếm bằng AI theo mô tả tự nhiên
                    </span>
                  </li>
                  <li className={styles.featureItem}>
                    <i className="fas fa-check-circle"></i>
                    <span className={styles.featureItemText}>
                      Lọc đa tiêu chí nâng cao
                    </span>
                  </li>
                  <li className={styles.featureItem}>
                    <i className="fas fa-check-circle"></i>
                    <span className={styles.featureItemText}>
                      Gợi ý dựa trên lịch sử tìm kiếm
                    </span>
                  </li>
                  <li className={styles.featureItem}>
                    <i className="fas fa-check-circle"></i>
                    <span className={styles.featureItemText}>
                      Thông báo có BĐS mới phù hợp
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className={styles.featureCategory}>
              <div
                className={`${styles.featureCategoryHeader} ${styles.secondary}`}
              >
                <div className={styles.featureCategoryIcon}>
                  <i className="fas fa-file-contract"></i>
                </div>
                <h3 className={styles.featureCategoryTitle}>
                  Hợp Đồng Điện Tử
                </h3>
                <p className={styles.featureCategoryDescription}>
                  Ký kết và quản lý hợp đồng dễ dàng
                </p>
              </div>
              <div className={styles.featureCategoryContent}>
                <ul className={styles.featureList}>
                  <li className={styles.featureItem}>
                    <i className="fas fa-check-circle"></i>
                    <span className={styles.featureItemText}>
                      Ký kết hợp đồng điện tử có pháp lý
                    </span>
                  </li>
                  <li className={styles.featureItem}>
                    <i className="fas fa-check-circle"></i>
                    <span className={styles.featureItemText}>
                      Quản lý tất cả hợp đồng trong 1 nơi
                    </span>
                  </li>
                  <li className={styles.featureItem}>
                    <i className="fas fa-check-circle"></i>
                    <span className={styles.featureItemText}>
                      Thông báo nhắc hết hạn hợp đồng
                    </span>
                  </li>
                  <li className={styles.featureItem}>
                    <i className="fas fa-check-circle"></i>
                    <span className={styles.featureItemText}>
                      Lịch sử giao dịch chi tiết
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className={styles.featureCategory}>
              <div className={`${styles.featureCategoryHeader} ${styles.gold}`}>
                <div className={styles.featureCategoryIcon}>
                  <i className="fas fa-credit-card"></i>
                </div>
                <h3 className={styles.featureCategoryTitle}>
                  Thanh Toán An Toàn
                </h3>
                <p className={styles.featureCategoryDescription}>
                  Hỗ trợ nhiều phương thức thanh toán
                </p>
              </div>
              <div className={styles.featureCategoryContent}>
                <ul className={styles.featureList}>
                  <li className={styles.featureItem}>
                    <i className="fas fa-check-circle"></i>
                    <span className={styles.featureItemText}>
                      Thanh toán tiền thuê tự động
                    </span>
                  </li>
                  <li className={styles.featureItem}>
                    <i className="fas fa-check-circle"></i>
                    <span className={styles.featureItemText}>
                      Hỗ trợ nhiều cổng thanh toán
                    </span>
                  </li>
                  <li className={styles.featureItem}>
                    <i className="fas fa-check-circle"></i>
                    <span className={styles.featureItemText}>
                      Theo dõi hóa đơn điện nước
                    </span>
                  </li>
                  <li className={styles.featureItem}>
                    <i className="fas fa-check-circle"></i>
                    <span className={styles.featureItemText}>
                      Xuất hóa đơn điện tử VAT
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className={styles.featureCategory}>
              <div className={`${styles.featureCategoryHeader} ${styles.aqua}`}>
                <div className={styles.featureCategoryIcon}>
                  <i className="fas fa-shield-alt"></i>
                </div>
                <h3 className={styles.featureCategoryTitle}>
                  Bảo Mật & Xác Thực
                </h3>
                <p className={styles.featureCategoryDescription}>
                  Bảo vệ tối đa thông tin cá nhân
                </p>
              </div>
              <div className={styles.featureCategoryContent}>
                <ul className={styles.featureList}>
                  <li className={styles.featureItem}>
                    <i className="fas fa-check-circle"></i>
                    <span className={styles.featureItemText}>
                      Xác thực danh tính trực tuyến
                    </span>
                  </li>
                  <li className={styles.featureItem}>
                    <i className="fas fa-check-circle"></i>
                    <span className={styles.featureItemText}>
                      Mã hóa đầu cuối dữ liệu nhạy cảm
                    </span>
                  </li>
                  <li className={styles.featureItem}>
                    <i className="fas fa-check-circle"></i>
                    <span className={styles.featureItemText}>
                      Xác thực 2 lớp bảo mật
                    </span>
                  </li>
                  <li className={styles.featureItem}>
                    <i className="fas fa-check-circle"></i>
                    <span className={styles.featureItemText}>
                      Theo dõi hoạt động đáng ngờ
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className={styles.featureCategory}>
              <div
                className={`${styles.featureCategoryHeader} ${styles.sunset}`}
              >
                <div className={styles.featureCategoryIcon}>
                  <i className="fas fa-robot"></i>
                </div>
                <h3 className={styles.featureCategoryTitle}>Trợ Lý Ảo AI</h3>
                <p className={styles.featureCategoryDescription}>
                  Hỗ trợ tư vấn 24/7 không ngừng nghỉ
                </p>
              </div>
              <div className={styles.featureCategoryContent}>
                <ul className={styles.featureList}>
                  <li className={styles.featureItem}>
                    <i className="fas fa-check-circle"></i>
                    <span className={styles.featureItemText}>
                      Tư vấn tìm BĐS phù hợp nhu cầu
                    </span>
                  </li>
                  <li className={styles.featureItem}>
                    <i className="fas fa-check-circle"></i>
                    <span className={styles.featureItemText}>
                      Giải đáp thắc mắc về hợp đồng
                    </span>
                  </li>
                  <li className={styles.featureItem}>
                    <i className="fas fa-check-circle"></i>
                    <span className={styles.featureItemText}>
                      Hỗ trợ giải quyết sự cố 24/7
                    </span>
                  </li>
                  <li className={styles.featureItem}>
                    <i className="fas fa-check-circle"></i>
                    <span className={styles.featureItemText}>
                      Phân tích khu vực và giá cả
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className={styles.featureCategory}>
              <div
                className={`${styles.featureCategoryHeader} ${styles.green}`}
              >
                <div className={styles.featureCategoryIcon}>
                  <i className="fas fa-chart-bar"></i>
                </div>
                <h3 className={styles.featureCategoryTitle}>
                  Báo Cáo & Phân Tích
                </h3>
                <p className={styles.featureCategoryDescription}>
                  Nắm bắt thông tin tài chính chi tiết
                </p>
              </div>
              <div className={styles.featureCategoryContent}>
                <ul className={styles.featureList}>
                  <li className={styles.featureItem}>
                    <i className="fas fa-check-circle"></i>
                    <span className={styles.featureItemText}>
                      Dashboard tổng quan tài sản
                    </span>
                  </li>
                  <li className={styles.featureItem}>
                    <i className="fas fa-check-circle"></i>
                    <span className={styles.featureItemText}>
                      Báo cáo thu chi hàng tháng
                    </span>
                  </li>
                  <li className={styles.featureItem}>
                    <i className="fas fa-check-circle"></i>
                    <span className={styles.featureItemText}>
                      Phân tích hiệu suất đầu tư
                    </span>
                  </li>
                  <li className={styles.featureItem}>
                    <i className="fas fa-check-circle"></i>
                    <span className={styles.featureItemText}>
                      Xuất báo cáo PDF/Excel
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Detail Section */}
        <section className={styles.featureDetail}>
          <div className={styles.featureDetailContainer}>
            <div className={styles.featureShowcase}>
              <div className={styles.featureText}>
                <h3>
                  Hợp Đồng Điện Tử{" "}
                  <span className={styles.highlight}>Thông Minh</span>
                </h3>
                <p>
                  Ký kết và quản lý hợp đồng trở nên đơn giản với hệ thống hợp
                  đồng điện tử của SmartRent. Không cần gặp mặt trực tiếp, tiết
                  kiệm thời gian và chi phí, đồng thời đảm bảo tính pháp lý và
                  bảo mật.
                </p>
                <ul className={styles.featureBenefits}>
                  <li className={styles.featureBenefit}>
                    <div className={styles.featureBenefitIcon}>
                      <i className="fas fa-clock"></i>
                    </div>
                    <span className={styles.featureBenefitText}>
                      Ký kết hợp đồng chỉ trong vài phút
                    </span>
                  </li>
                  <li className={styles.featureBenefit}>
                    <div className={styles.featureBenefitIcon}>
                      <i className="fas fa-lock"></i>
                    </div>
                    <span className={styles.featureBenefitText}>
                      Bảo mật cao với chữ ký số có xác thực
                    </span>
                  </li>
                  <li className={styles.featureBenefit}>
                    <div className={styles.featureBenefitIcon}>
                      <i className="fas fa-bell"></i>
                    </div>
                    <span className={styles.featureBenefitText}>
                      Thông báo tự động khi hợp đồng gần hết hạn
                    </span>
                  </li>
                  <li className={styles.featureBenefit}>
                    <div className={styles.featureBenefitIcon}>
                      <i className="fas fa-history"></i>
                    </div>
                    <span className={styles.featureBenefitText}>
                      Lưu trữ lịch sử và truy cập mọi lúc mọi nơi
                    </span>
                  </li>
                </ul>
                <a href="#" className={styles.btnPrimary}>
                  Xem Demo <i className="fas fa-arrow-right"></i>
                </a>
              </div>
              <div className={styles.featureImage}>
                <img
                  src="https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec?w=800&q=80"
                  alt="Hợp đồng điện tử"
                />
                <div className={styles.featureImageOverlay}></div>
              </div>
            </div>

            <div className={styles.featureShowcase}>
              <div className={styles.featureText}>
                <h3>
                  Thanh Toán{" "}
                  <span className={styles.highlight}>Tự Động & Minh Bạch</span>
                </h3>
                <p>
                  Quản lý mọi khoản thanh toán chỉ trên một nền tảng duy nhất.
                  Hệ thống thanh toán của SmartRent hỗ trợ đa dạng phương thức,
                  tự động hóa các khoản định kỳ và cung cấp thông tin minh bạch
                  cho cả chủ nhà và người thuê.
                </p>
                <ul className={styles.featureBenefits}>
                  <li className={styles.featureBenefit}>
                    <div className={styles.featureBenefitIcon}>
                      <i className="fas fa-calendar-alt"></i>
                    </div>
                    <span className={styles.featureBenefitText}>
                      Thanh toán tự động theo lịch định kỳ
                    </span>
                  </li>
                  <li className={styles.featureBenefit}>
                    <div className={styles.featureBenefitIcon}>
                      <i className="fas fa-wallet"></i>
                    </div>
                    <span className={styles.featureBenefitText}>
                      Hỗ trợ đa dạng phương thức thanh toán
                    </span>
                  </li>
                  <li className={styles.featureBenefit}>
                    <div className={styles.featureBenefitIcon}>
                      <i className="fas fa-file-invoice"></i>
                    </div>
                    <span className={styles.featureBenefitText}>
                      Hóa đơn điện tử đầy đủ và chi tiết
                    </span>
                  </li>
                  <li className={styles.featureBenefit}>
                    <div className={styles.featureBenefitIcon}>
                      <i className="fas fa-chart-line"></i>
                    </div>
                    <span className={styles.featureBenefitText}>
                      Theo dõi lịch sử giao dịch trực quan
                    </span>
                  </li>
                </ul>
                <a href="#" className={styles.btnPrimary}>
                  Khám Phá <i className="fas fa-arrow-right"></i>
                </a>
              </div>
              <div className={styles.featureImage}>
                <img
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80"
                  alt="Thanh toán tự động"
                />
                <div className={styles.featureImageOverlay}></div>
              </div>
            </div>

            <div className={styles.featureShowcase}>
              <div className={styles.featureText}>
                <h3>
                  Trợ Lý <span className={styles.highlight}>AI Thông Minh</span>
                </h3>
                <p>
                  Trợ lý ảo AI của SmartRent luôn sẵn sàng hỗ trợ 24/7, giúp bạn
                  tìm kiếm bất động sản phù hợp, giải đáp thắc mắc về hợp đồng,
                  và tư vấn về các vấn đề liên quan đến nhà ở một cách nhanh
                  chóng và chính xác.
                </p>
                <ul className={styles.featureBenefits}>
                  <li className={styles.featureBenefit}>
                    <div className={styles.featureBenefitIcon}>
                      <i className="fas fa-search"></i>
                    </div>
                    <span className={styles.featureBenefitText}>
                      Tìm kiếm thông minh theo ngôn ngữ tự nhiên
                    </span>
                  </li>
                  <li className={styles.featureBenefit}>
                    <div className={styles.featureBenefitIcon}>
                      <i className="fas fa-comment-dots"></i>
                    </div>
                    <span className={styles.featureBenefitText}>
                      Trả lời tức thì mọi thắc mắc
                    </span>
                  </li>
                  <li className={styles.featureBenefit}>
                    <div className={styles.featureBenefitIcon}>
                      <i className="fas fa-map-marked-alt"></i>
                    </div>
                    <span className={styles.featureBenefitText}>
                      Phân tích khu vực và tiện ích xung quanh
                    </span>
                  </li>
                  <li className={styles.featureBenefit}>
                    <div className={styles.featureBenefitIcon}>
                      <i className="fas fa-brain"></i>
                    </div>
                    <span className={styles.featureBenefitText}>
                      Học hỏi từ thói quen để cá nhân hóa đề xuất
                    </span>
                  </li>
                </ul>
                <a href="#" className={styles.btnPrimary}>
                  Trò Chuyện Ngay <i className="fas fa-arrow-right"></i>
                </a>
              </div>
              <div className={styles.featureImage}>
                <img
                  src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80"
                  alt="AI Assistant"
                />
                <div className={styles.featureImageOverlay}></div>
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className={styles.formSection}>
          <div className={styles.formContainer}>
            <div className={styles.formHeader}>
              <h2>Đăng Ký Trải Nghiệm Tính Năng</h2>
              <p>
                Điền thông tin để nhận demo chi tiết về các tính năng của
                SmartRent
              </p>
            </div>
            <div className={styles.formBody}>
              <form>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Họ và tên</label>
                    <input
                      type="text"
                      className={styles.formControl}
                      placeholder="Nhập họ và tên của bạn"
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Số điện thoại</label>
                    <input
                      type="tel"
                      className={styles.formControl}
                      placeholder="Nhập số điện thoại"
                      required
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Email</label>
                    <input
                      type="email"
                      className={styles.formControl}
                      placeholder="Nhập địa chỉ email"
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Bạn là</label>
                    <select className={styles.formSelect}>
                      <option value="" selected disabled>
                        Chọn vai trò của bạn
                      </option>
                      <option value="tenant">Người thuê nhà</option>
                      <option value="landlord">Chủ nhà</option>
                      <option value="agent">Môi giới bất động sản</option>
                      <option value="other">Khác</option>
                    </select>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    Tính năng bạn quan tâm
                  </label>
                  <select className={styles.formSelect}>
                    <option value="" selected disabled>
                      Chọn tính năng
                    </option>
                    <option value="contract">Hợp đồng điện tử</option>
                    <option value="payment">Thanh toán tự động</option>
                    <option value="ai">Trợ lý AI</option>
                    <option value="security">Bảo mật & Xác thực</option>
                    <option value="reporting">Báo cáo & Phân tích</option>
                    <option value="all">Tất cả tính năng</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    Nội dung cần tư vấn
                  </label>
                  <textarea
                    className={`${styles.formControl} ${styles.formTextarea}`}
                    placeholder="Nhập nội dung bạn cần được tư vấn..."
                  ></textarea>
                </div>

                <div className={styles.formCheck}>
                  <input
                    type="checkbox"
                    className={styles.formCheckInput}
                    id="terms"
                  />
                  <label className={styles.formCheckLabel} htmlFor="terms">
                    Tôi đồng ý với
                    <a href="#" className={styles.linkPrimary}>
                      điều khoản sử dụng
                    </a>{" "}
                    và{" "}
                    <a href="#" className={styles.linkPrimary}>
                      chính sách bảo mật
                    </a>{" "}
                    của SmartRent
                  </label>
                </div>

                <div className={styles.formActions}>
                  <button type="submit" className={styles.btnPrimary}>
                    Gửi Yêu Cầu <i className="fas fa-paper-plane"></i>
                  </button>
                  <button type="reset" className={styles.btnOutline}>
                    Làm lại
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Plans Section */}
        <section className={styles.plansSection}>
          <div className={styles.plansContainer}>
            <h2 className={styles.sectionTitle}>
              Gói <span className={styles.highlight}>Dịch Vụ</span> Của Chúng
              Tôi
            </h2>
            <p className={styles.sectionDescription}>
              Chọn gói dịch vụ phù hợp với nhu cầu của bạn và trải nghiệm đầy đủ
              các tính năng thông minh của SmartRent
            </p>

            <div className={styles.planCards}>
              <div className={styles.planCard}>
                <div className={styles.planHeader}>
                  <h3 className={styles.planName}>Cơ Bản</h3>
                  <div className={styles.planPrice}>Miễn phí</div>
                  <div className={styles.planBilling}>
                    Không giới hạn thời gian
                  </div>
                  <p className={styles.planDescription}>
                    Phù hợp cho người mới tìm hiểu
                  </p>
                </div>
                <div className={styles.planFeatures}>
                  <div className={styles.planFeature}>
                    <i className="fas fa-check"></i>
                    <span>Tìm kiếm cơ bản</span>
                  </div>
                  <div className={styles.planFeature}>
                    <i className="fas fa-check"></i>
                    <span>Xem bất động sản giới hạn (10/ngày)</span>
                  </div>
                  <div className={styles.planFeature}>
                    <i className="fas fa-check"></i>
                    <span>Trợ lý AI (giới hạn 5 câu hỏi/ngày)</span>
                  </div>
                  <div className={`${styles.planFeature} ${styles.disabled}`}>
                    <i className="fas fa-times"></i>
                    <span>Ký hợp đồng điện tử</span>
                  </div>
                  <div className={`${styles.planFeature} ${styles.disabled}`}>
                    <i className="fas fa-times"></i>
                    <span>Thanh toán tự động</span>
                  </div>
                  <div className={`${styles.planFeature} ${styles.disabled}`}>
                    <i className="fas fa-times"></i>
                    <span>Báo cáo và phân tích</span>
                  </div>
                </div>
                <div className={styles.planCta}>
                  <a href="#" className={styles.btnOutline}>
                    Đăng Ký Ngay
                  </a>
                </div>
              </div>

              <div className={`${styles.planCard} ${styles.popular}`}>
                <div className={styles.planHeader}>
                  <h3 className={styles.planName}>Tiêu Chuẩn</h3>
                  <div className={styles.planPrice}>199.000đ</div>
                  <div className={styles.planBilling}>Theo tháng</div>
                  <p className={styles.planDescription}>
                    Dành cho người thuê nhà thông thường
                  </p>
                </div>
                <div className={styles.planFeatures}>
                  <div className={styles.planFeature}>
                    <i className="fas fa-check"></i>
                    <span>Tất cả tính năng Cơ Bản</span>
                  </div>
                  <div className={styles.planFeature}>
                    <i className="fas fa-check"></i>
                    <span>Xem bất động sản không giới hạn</span>
                  </div>
                  <div className={styles.planFeature}>
                    <i className="fas fa-check"></i>
                    <span>Trợ lý AI không giới hạn</span>
                  </div>
                  <div className={styles.planFeature}>
                    <i className="fas fa-check"></i>
                    <span>Ký hợp đồng điện tử (3/tháng)</span>
                  </div>
                  <div className={styles.planFeature}>
                    <i className="fas fa-check"></i>
                    <span>Thanh toán tự động</span>
                  </div>
                  <div className={`${styles.planFeature} ${styles.disabled}`}>
                    <i className="fas fa-times"></i>
                    <span>Báo cáo và phân tích nâng cao</span>
                  </div>
                </div>
                <div className={styles.planCta}>
                  <a href="#" className={styles.btnPrimary}>
                    Dùng Thử Miễn Phí
                  </a>
                </div>
              </div>

              <div className={styles.planCard}>
                <div className={styles.planHeader}>
                  <h3 className={styles.planName}>Cao Cấp</h3>
                  <div className={styles.planPrice}>499.000đ</div>
                  <div className={styles.planBilling}>Theo tháng</div>
                  <p className={styles.planDescription}>
                    Lý tưởng cho chủ nhà và nhà đầu tư
                  </p>
                </div>
                <div className={styles.planFeatures}>
                  <div className={styles.planFeature}>
                    <i className="fas fa-check"></i>
                    <span>Tất cả tính năng Tiêu Chuẩn</span>
                  </div>
                  <div className={styles.planFeature}>
                    <i className="fas fa-check"></i>
                    <span>Ký hợp đồng điện tử không giới hạn</span>
                  </div>
                  <div className={styles.planFeature}>
                    <i className="fas fa-check"></i>
                    <span>Quản lý bất động sản đa tài sản</span>
                  </div>
                  <div className={styles.planFeature}>
                    <i className="fas fa-check"></i>
                    <span>Báo cáo và phân tích chuyên sâu</span>
                  </div>
                  <div className={styles.planFeature}>
                    <i className="fas fa-check"></i>
                    <span>Hỗ trợ ưu tiên 24/7</span>
                  </div>
                  <div className={styles.planFeature}>
                    <i className="fas fa-check"></i>
                    <span>Tích hợp API cho doanh nghiệp</span>
                  </div>
                </div>
                <div className={styles.planCta}>
                  <a href="#" className={styles.btnOutline}>
                    Đăng Ký Ngay
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className={styles.faqSection}>
          <div className={styles.faqContainer}>
            <h2 className={styles.sectionTitle}>
              Câu Hỏi <span className={styles.highlight}>Thường Gặp</span>
            </h2>
            <p className={styles.sectionDescription}>
              Giải đáp những thắc mắc phổ biến về các tính năng của SmartRent
            </p>

            <div className={styles.faqList}>
              {faqData.map((faq, index) => (
                <div className={styles.faqItem} key={index}>
                  <div
                    className={`${styles.faqQuestion} ${activeFaq === index ? styles.active : ""}`}
                    onClick={() => toggleFaq(index)}
                  >
                    <span>{faq.question}</span>
                    <i
                      className={`fas fa-chevron-down ${activeFaq === index ? styles.rotate : ""}`}
                    ></i>
                  </div>
                  <div
                    className={`${styles.faqAnswer} ${activeFaq === index ? styles.active : ""}`}
                  >
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features CTA Section */}
        <section className={styles.featuresCta}>
          <div className={styles.featuresCtaContent}>
            <h2>Sẵn Sàng Trải Nghiệm Tất Cả Tính Năng?</h2>
            <p>
              Đăng ký ngay hôm nay để khám phá tất cả các tính năng thông minh
              của SmartRent và biến việc quản lý nhà thuê trở nên dễ dàng hơn
              bao giờ hết
            </p>
            <div className={styles.featuresCtaButtons}>
              <a href="#" className={`${styles.btnPrimary} ${styles.btnGold}`}>
                <i className="fas fa-user-plus"></i> Đăng Ký Miễn Phí
              </a>
              <a href="#" className={`${styles.btnOutline} ${styles.btnWhite}`}>
                <i className="fas fa-calendar"></i> Đặt Lịch Demo
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
