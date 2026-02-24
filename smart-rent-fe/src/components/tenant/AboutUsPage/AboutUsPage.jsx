import React, { useEffect, useRef } from "react";
import styles from "./AboutUsPage.module.css";
import {
  FaHome,
  FaShieldAlt,
  FaBolt,
  FaLightbulb,
  FaUsers,
  FaBullseye,
  FaEye,
  FaTrophy,
  FaMedal,
  FaStar,
  FaAward,
  FaBuilding,
  FaUniversity,
  FaLandmark,
  FaCreditCard,
  FaCity,
  FaLaptopCode,
  FaChevronRight,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaPaperPlane,
  FaUserPlus,
  FaHandshake,
} from "react-icons/fa";

export default function AboutUsPage() {
  const revealRefs = useRef([]);
  const addToRefs = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  useEffect(() => {
    const revealOnScroll = () => {
      revealRefs.current.forEach((element) => {
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
  return (
    <>
      <main className={styles.aboutContent}>
        {/* Page Header */}
        <section className={styles.pageHeader}>
          <div className={styles.pageHeaderContent}>
            <h1>Về Chúng Tôi</h1>
            <p>
              Khám phá câu chuyện, tầm nhìn và sứ mệnh của SmartRent - nơi công
              nghệ và bất động sản kết hợp để mang đến trải nghiệm thuê nhà
              thông minh
            </p>
          </div>
        </section>

        {/* About Story Section */}
        <section className={styles.aboutStory}>
          <div className={styles.storyContainer}>
            <div className={styles.storyImage}>
              <img
                className={styles.storyImageMain}
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
                alt="Văn phòng SmartRent"
              />
              <img
                className={styles.storyImageAccent}
                src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=400&q=80"
                alt="Đội ngũ SmartRent"
              />
            </div>
            <div
              className={`${styles.storyContent} ${styles.reveal}`}
              ref={addToRefs}
            >
              <h2>
                Câu Chuyện <span className={styles.highlight}>SmartRent</span>
              </h2>
              <p>
                SmartRent được thành lập vào năm 2022 bởi một nhóm các chuyên
                gia công nghệ và bất động sản với sứ mệnh biến đổi trải nghiệm
                thuê nhà tại Việt Nam. Chúng tôi nhận ra rằng thị trường bất
                động sản cho thuê còn gặp nhiều khó khăn: từ việc tìm kiếm căn
                hộ phù hợp, đến ký kết hợp đồng phức tạp và quản lý thanh toán
                không hiệu quả.
              </p>
              <p>
                Với kinh nghiệm từ những khó khăn bản thân đã trải qua, chúng
                tôi quyết định xây dựng một nền tảng toàn diện ứng dụng công
                nghệ AI và blockchain để cách mạng hóa quy trình thuê nhà. Hiện
                nay, SmartRent đã trở thành nền tảng hàng đầu kết nối người thuê
                và chủ nhà, đồng thời cung cấp các công cụ quản lý bất động sản
                thông minh.
              </p>
              <div className={styles.storyValues}>
                <div className={styles.valueItem}>
                  <div className={styles.valueIcon}>
                    <FaShieldAlt />
                  </div>
                  <div className={styles.valueContent}>
                    <h4>Minh Bạch</h4>
                    <p>
                      Chúng tôi đề cao sự trung thực và minh bạch trong mọi giao
                      dịch
                    </p>
                  </div>
                </div>
                <div className={styles.valueItem}>
                  <div className={styles.valueIcon}>
                    <FaBolt />
                  </div>
                  <div className={styles.valueContent}>
                    <h4>Hiệu Quả</h4>
                    <p>Tối ưu hóa quy trình, tiết kiệm thời gian và chi phí</p>
                  </div>
                </div>
                <div className={styles.valueItem}>
                  <div className={styles.valueIcon}>
                    <FaLightbulb />
                  </div>
                  <div className={styles.valueContent}>
                    <h4>Đổi Mới</h4>
                    <p>Liên tục cải tiến để mang đến trải nghiệm tốt nhất</p>
                  </div>
                </div>
                <div className={styles.valueItem}>
                  <div className={styles.valueIcon}>
                    <FaUsers />
                  </div>
                  <div className={styles.valueContent}>
                    <h4>Cộng Đồng</h4>
                    <p>Xây dựng cộng đồng người thuê và chủ nhà bền vững</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Vision Section */}
        <section className={styles.missionVision}>
          <div className={styles.missionVisionContainer}>
            <h2 className={styles.sectionTitle}>
              Sứ Mệnh & <span className={styles.highlight}>Tầm Nhìn</span>
            </h2>
            <p className={styles.sectionDescription}>
              Chúng tôi tin rằng công nghệ có thể giải quyết những thách thức
              lớn nhất trong ngành bất động sản
            </p>

            <div className={styles.missionVisionCards}>
              <div
                className={`${styles.missionCard} ${styles.reveal}`}
                ref={addToRefs}
              >
                <h3>Sứ Mệnh</h3>
                <p>
                  SmartRent ra đời với sứ mệnh đơn giản hóa và cách mạng hóa quy
                  trình thuê nhà tại Việt Nam. Chúng tôi cam kết xây dựng một
                  nền tảng công nghệ toàn diện giúp kết nối người thuê và chủ
                  nhà một cách hiệu quả, minh bạch và an toàn.
                </p>
                <p>
                  Chúng tôi nỗ lực giải quyết những vấn đề cốt lõi trong thị
                  trường bất động sản cho thuê như: thông tin không đồng nhất,
                  quy trình hợp đồng phức tạp, và quản lý tài sản không hiệu quả
                  thông qua các giải pháp công nghệ tiên tiến.
                </p>
                <div className={styles.quote}>
                  "Mỗi người đều xứng đáng có một ngôi nhà an toàn, phù hợp với
                  nhu cầu và khả năng tài chính của mình."
                </div>
                <FaBullseye className={styles.icon} />
              </div>

              <div
                className={`${styles.visionCard} ${styles.reveal}`}
                ref={addToRefs}
              >
                <h3>Tầm Nhìn</h3>
                <p>
                  SmartRent hướng tới trở thành nền tảng quản lý và cho thuê bất
                  động sản hàng đầu Đông Nam Á, tiên phong trong việc ứng dụng
                  công nghệ AI, blockchain và dữ liệu lớn để biến đổi ngành bất
                  động sản truyền thống.
                </p>
                <p>
                  Chúng tôi mơ ước về một thị trường bất động sản cho thuê không
                  chỉ hiệu quả mà còn công bằng, minh bạch, nơi chủ nhà và người
                  thuê có thể giao dịch với niềm tin hoàn toàn, và mọi người đều
                  có thể tìm được ngôi nhà phù hợp một cách dễ dàng.
                </p>
                <div className={styles.quote}>
                  "Xây dựng một hệ sinh thái bất động sản thông minh, nơi công
                  nghệ đáp ứng nhu cầu của con người."
                </div>
                <FaEye className={styles.icon} />
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className={styles.teamSection}>
          <div className={styles.teamContainer}>
            <h2 className={styles.sectionTitle}>
              Đội Ngũ <span className={styles.highlight}>Lãnh Đạo</span>
            </h2>
            <p className={styles.sectionDescription}>
              Gặp gỡ những người đứng sau SmartRent - đội ngũ chuyên gia đam mê
              về công nghệ và bất động sản
            </p>

            <div className={styles.leadershipTeam}>
              <div className={styles.teamGrid}>
                <div
                  className={`${styles.teamMember} ${styles.reveal}`}
                  ref={addToRefs}
                >
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80"
                    alt="Nguyễn Minh Quân"
                    className={styles.teamMemberImg}
                  />
                  <div className={styles.teamMemberInfo}>
                    <h3 className={styles.teamMemberName}>Nguyễn Minh Quân</h3>
                    <p className={styles.teamMemberPosition}>
                      Đồng sáng lập & CEO
                    </p>
                    <p className={styles.teamMemberBio}>
                      Với hơn 15 năm kinh nghiệm trong ngành bất động sản và
                      công nghệ, Minh Quân đã xây dựng tầm nhìn và chiến lược
                      phát triển của SmartRent từ những ngày đầu.
                    </p>
                    <div className={styles.teamSocial}>
                      <a href="#">
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                      <a href="#">
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a href="#">
                        <i className="fas fa-envelope"></i>
                      </a>
                    </div>
                  </div>
                </div>

                <div
                  className={`${styles.teamMember} ${styles.reveal}`}
                  ref={addToRefs}
                >
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80"
                    alt="Trần Thanh Mai"
                    className={styles.teamMemberImg}
                  />
                  <div className={styles.teamMemberInfo}>
                    <h3 className={styles.teamMemberName}>Trần Thanh Mai</h3>
                    <p className={styles.teamMemberPosition}>
                      Đồng sáng lập & CTO
                    </p>
                    <p className={styles.teamMemberBio}>
                      Thanh Mai là chuyên gia AI với bằng Tiến sĩ từ Đại học
                      Stanford. Cô chịu trách nhiệm phát triển các thuật toán AI
                      và cơ sở hạ tầng công nghệ của SmartRent.
                    </p>
                    <div className={styles.teamSocial}>
                      <a href="#">
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                      <a href="#">
                        <i className="fab fa-github"></i>
                      </a>
                      <a href="#">
                        <i className="fas fa-envelope"></i>
                      </a>
                    </div>
                  </div>
                </div>

                <div
                  className={`${styles.teamMember} ${styles.reveal}`}
                  ref={addToRefs}
                >
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80"
                    alt="Lê Văn Tùng"
                    className={styles.teamMemberImg}
                  />
                  <div className={styles.teamMemberInfo}>
                    <h3 className={styles.teamMemberName}>Lê Văn Tùng</h3>
                    <p className={styles.teamMemberPosition}>COO</p>
                    <p className={styles.teamMemberBio}>
                      Với kinh nghiệm điều hành tại nhiều công ty bất động sản
                      lớn, Văn Tùng đảm bảo các hoạt động hàng ngày của
                      SmartRent luôn trôi chảy và hiệu quả.
                    </p>
                    <div className={styles.teamSocial}>
                      <a href="#">
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                      <a href="#">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a href="#">
                        <i className="fas fa-envelope"></i>
                      </a>
                    </div>
                  </div>
                </div>

                <div
                  className={`${styles.teamMember} ${styles.reveal}`}
                  ref={addToRefs}
                >
                  <img
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80"
                    alt="Phạm Thị Hương"
                    className={styles.teamMemberImg}
                  />
                  <div className={styles.teamMemberInfo}>
                    <h3 className={styles.teamMemberName}>Phạm Thị Hương</h3>
                    <p className={styles.teamMemberPosition}>CFO</p>
                    <p className={styles.teamMemberBio}>
                      Thị Hương là chuyên gia tài chính với hơn 10 năm kinh
                      nghiệm tại các ngân hàng đầu tư quốc tế, phụ trách quản lý
                      tài chính và chiến lược đầu tư của SmartRent.
                    </p>
                    <div className={styles.teamSocial}>
                      <a href="#">
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                      <a href="#">
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a href="#">
                        <i className="fas fa-envelope"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className={styles.statsSection}>
          <div className={styles.statsContainer}>
            <h2 className={`${styles.sectionTitle} ${styles.statsTitle}`}>
              Con Số <span className={styles.statsHighlight}>Ấn Tượng</span>
            </h2>
            <p
              className={`${styles.sectionDescription} ${styles.statsDescription}`}
            >
              Những thành tựu mà SmartRent đã đạt được trên hành trình chuyển
              đổi thị trường bất động sản
            </p>

            <div className={styles.statsGrid}>
              <div
                className={`${styles.statItem} ${styles.reveal}`}
                ref={addToRefs}
              >
                <div className={styles.statValue}>100K+</div>
                <div className={styles.statLabel}>Người dùng</div>
              </div>

              <div
                className={`${styles.statItem} ${styles.reveal}`}
                ref={addToRefs}
              >
                <div className={styles.statValue}>50K+</div>
                <div className={styles.statLabel}>Bất động sản</div>
              </div>

              <div
                className={`${styles.statItem} ${styles.reveal}`}
                ref={addToRefs}
              >
                <div className={styles.statValue}>30K+</div>
                <div className={styles.statLabel}>Hợp đồng đã ký</div>
              </div>

              <div
                className={`${styles.statItem} ${styles.reveal}`}
                ref={addToRefs}
              >
                <div className={styles.statValue}>15+</div>
                <div className={styles.statLabel}>Tỉnh thành</div>
              </div>

              <div
                className={`${styles.statItem} ${styles.reveal}`}
                ref={addToRefs}
              >
                <div className={styles.statValue}>98%</div>
                <div className={styles.statLabel}>Đánh giá tích cực</div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className={styles.timelineSection}>
          <div className={styles.timelineContainer}>
            <h2 className={styles.sectionTitle}>
              Hành Trình <span className={styles.highlight}>Phát Triển</span>
            </h2>
            <p className={styles.sectionDescription}>
              Nhìn lại quá trình phát triển và những cột mốc quan trọng của
              SmartRent
            </p>

            <div className={styles.timeline}>
              <div
                className={`${styles.timelineItem} ${styles.reveal}`}
                ref={addToRefs}
              >
                <div className={styles.timelineDate}>Q1 2022</div>
                <div className={styles.timelineIcon}></div>
                <div className={styles.timelineContent}>
                  <h3 className={styles.timelineTitle}>Khởi đầu hành trình</h3>
                  <p className={styles.timelineDescription}>
                    SmartRent được thành lập với vốn đầu tư ban đầu từ các nhà
                    sáng lập và quỹ đầu tư mạo hiểm. Phiên bản đầu tiên của nền
                    tảng ra mắt với các tính năng cơ bản.
                  </p>
                </div>
              </div>

              <div
                className={`${styles.timelineItem} ${styles.reveal}`}
                ref={addToRefs}
              >
                <div className={styles.timelineDate}>Q3 2022</div>
                <div className={styles.timelineIcon}></div>
                <div className={styles.timelineContent}>
                  <h3 className={styles.timelineTitle}>Mở rộng thị trường</h3>
                  <p className={styles.timelineDescription}>
                    SmartRent mở rộng hoạt động từ TP.HCM đến Hà Nội và Đà Nẵng.
                    Số lượng bất động sản trên nền tảng vượt 10,000 căn.
                  </p>
                </div>
              </div>

              <div
                className={`${styles.timelineItem} ${styles.reveal}`}
                ref={addToRefs}
              >
                <div className={styles.timelineDate}>Q2 2023</div>
                <div className={styles.timelineIcon}></div>
                <div className={styles.timelineContent}>
                  <h3 className={styles.timelineTitle}>
                    Ra mắt hợp đồng điện tử
                  </h3>
                  <p className={styles.timelineDescription}>
                    Triển khai tính năng ký hợp đồng điện tử tích hợp công nghệ
                    blockchain, giúp quá trình ký kết trở nên an toàn và tiết
                    kiệm thời gian.
                  </p>
                </div>
              </div>

              <div
                className={`${styles.timelineItem} ${styles.reveal}`}
                ref={addToRefs}
              >
                <div className={styles.timelineDate}>Q4 2023</div>
                <div className={styles.timelineIcon}></div>
                <div className={styles.timelineContent}>
                  <h3 className={styles.timelineTitle}>Gọi vốn thành công</h3>
                  <p className={styles.timelineDescription}>
                    SmartRent huy động thành công 5 triệu USD trong vòng gọi vốn
                    Series A do Sequoia Capital dẫn đầu, định giá công ty đạt 30
                    triệu USD.
                  </p>
                </div>
              </div>

              <div
                className={`${styles.timelineItem} ${styles.reveal}`}
                ref={addToRefs}
              >
                <div className={styles.timelineDate}>Q3 2024</div>
                <div className={styles.timelineIcon}></div>
                <div className={styles.timelineContent}>
                  <h3 className={styles.timelineTitle}>Ra mắt AI Assistant</h3>
                  <p className={styles.timelineDescription}>
                    SmartRent ra mắt trợ lý ảo AI thông minh, giúp người dùng
                    tìm kiếm bất động sản và giải đáp thắc mắc 24/7.
                  </p>
                </div>
              </div>

              <div
                className={`${styles.timelineItem} ${styles.reveal}`}
                ref={addToRefs}
              >
                <div className={styles.timelineDate}>Q1 2025</div>
                <div className={styles.timelineIcon}></div>
                <div className={styles.timelineContent}>
                  <h3 className={styles.timelineTitle}>Mở rộng khu vực</h3>
                  <p className={styles.timelineDescription}>
                    SmartRent bắt đầu mở rộng sang các thị trường Đông Nam Á với
                    việc ra mắt tại Singapore và Thái Lan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Awards Section */}
        <section className={styles.awardsSection}>
          <div className={styles.awardsContainer}>
            <h2 className={styles.sectionTitle}>
              Giải Thưởng & <span className={styles.highlight}>Ghi Nhận</span>
            </h2>
            <p className={styles.sectionDescription}>
              Những thành tựu và sự công nhận mà SmartRent đã đạt được từ cộng
              đồng và các tổ chức uy tín
            </p>

            <div className={styles.awardsGrid}>
              <div
                className={`${styles.awardItem} ${styles.reveal}`}
                ref={addToRefs}
              >
                <div
                  className={`${styles.awardIcon} ${styles.awardIconPrimary}`}
                >
                  <FaTrophy />
                </div>
                <h3 className={styles.awardTitle}>Startup Xuất Sắc Nhất</h3>
                <div className={styles.awardOrg}>
                  Tech in Asia - Startup Arena
                </div>
                <div className={styles.awardYear}>2023</div>
                <p className={styles.awardDescription}>
                  SmartRent được vinh danh là startup công nghệ bất động sản
                  xuất sắc nhất tại sự kiện Tech in Asia, vượt qua hơn 100 đối
                  thủ đến từ khắp Châu Á.
                </p>
              </div>

              <div
                className={`${styles.awardItem} ${styles.reveal}`}
                ref={addToRefs}
              >
                <div
                  className={`${styles.awardIcon} ${styles.awardIconSecondary}`}
                >
                  <FaMedal />
                </div>
                <h3 className={styles.awardTitle}>Ứng Dụng AI Tiêu Biểu</h3>
                <div className={styles.awardOrg}>Vietnam AI Summit</div>
                <div className={styles.awardYear}>2024</div>
                <p className={styles.awardDescription}>
                  Giải thưởng ghi nhận các giải pháp AI tiên tiến mà SmartRent
                  đã phát triển trong lĩnh vực bất động sản, đặc biệt là hệ
                  thống tìm kiếm thông minh và trợ lý ảo.
                </p>
              </div>

              <div
                className={`${styles.awardItem} ${styles.reveal}`}
                ref={addToRefs}
              >
                <div className={`${styles.awardIcon} ${styles.awardIconGold}`}>
                  <FaStar />
                </div>
                <h3 className={styles.awardTitle}>Top 10 PropTech Đổi Mới</h3>
                <div className={styles.awardOrg}>Forbes Vietnam</div>
                <div className={styles.awardYear}>2023</div>
                <p className={styles.awardDescription}>
                  Forbes Vietnam xếp hạng SmartRent trong Top 10 công ty
                  PropTech (Property Technology) đổi mới nhất Việt Nam, ghi nhận
                  tác động tích cực đến thị trường BĐS.
                </p>
              </div>

              <div
                className={`${styles.awardItem} ${styles.reveal}`}
                ref={addToRefs}
              >
                <div
                  className={`${styles.awardIcon} ${styles.awardIconSunset}`}
                >
                  <FaAward />
                </div>
                <h3 className={styles.awardTitle}>Nền Tảng BĐS Tốt Nhất</h3>
                <div className={styles.awardOrg}>Vietnam Property Awards</div>
                <div className={styles.awardYear}>2024</div>
                <p className={styles.awardDescription}>
                  SmartRent được bình chọn là nền tảng bất động sản tốt nhất tại
                  Việt Nam, với trải nghiệm người dùng xuất sắc và các tính năng
                  đổi mới sáng tạo.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section className={styles.partnersSection}>
          <div className={styles.partnersContainer}>
            <h2 className={styles.sectionTitle}>
              Đối Tác <span className={styles.highlight}>Chiến Lược</span>
            </h2>
            <p className={styles.sectionDescription}>
              SmartRent tự hào hợp tác với các đơn vị hàng đầu trong nhiều lĩnh
              vực
            </p>

            <div className={styles.partnersLogos}>
              <div
                className={`${styles.partnerLogo} ${styles.reveal}`}
                ref={addToRefs}
              >
                <FaBuilding />
                <span className={styles.partnerLogoName}>VinHomes</span>
              </div>

              <div
                className={`${styles.partnerLogo} ${styles.reveal}`}
                ref={addToRefs}
              >
                <FaUniversity />
                <span className={styles.partnerLogoName}>TPBank</span>
              </div>

              <div
                className={`${styles.partnerLogo} ${styles.reveal}`}
                ref={addToRefs}
              >
                <FaLandmark />
                <span className={styles.partnerLogoName}>Novaland</span>
              </div>

              <div
                className={`${styles.partnerLogo} ${styles.reveal}`}
                ref={addToRefs}
              >
                <FaCreditCard />
                <span className={styles.partnerLogoName}>VNPay</span>
              </div>

              <div
                className={`${styles.partnerLogo} ${styles.reveal}`}
                ref={addToRefs}
              >
                <FaShieldAlt />
                <span className={styles.partnerLogoName}>Bảo Việt</span>
              </div>

              <div
                className={`${styles.partnerLogo} ${styles.reveal}`}
                ref={addToRefs}
              >
                <FaCity />
                <span className={styles.partnerLogoName}>Masteri</span>
              </div>

              <div
                className={`${styles.partnerLogo} ${styles.reveal}`}
                ref={addToRefs}
              >
                <FaHome />
                <span className={styles.partnerLogoName}>CenLand</span>
              </div>

              <div
                className={`${styles.partnerLogo} ${styles.reveal}`}
                ref={addToRefs}
              >
                <FaLaptopCode />
                <span className={styles.partnerLogoName}>FPT</span>
              </div>
            </div>
          </div>
        </section>

        {/* About CTA Section */}
        <section className={styles.aboutCta}>
          <div className={styles.aboutCtaContent}>
            <h2>Hãy Tham Gia Cùng SmartRent</h2>
            <p>
              Trở thành một phần của hành trình biến đổi thị trường bất động sản
              Việt Nam với các giải pháp công nghệ tiên tiến
            </p>
            <div className={styles.aboutCtaButtons}>
              <a href="#" className={`${styles.btn} ${styles.btnPrimaryGold}`}>
                <FaUserPlus /> Đăng Ký Ngay
              </a>
              <a href="#" className={`${styles.btn} ${styles.btnOutlineWhite}`}>
                <FaHandshake /> Hợp Tác Cùng Chúng Tôi
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
