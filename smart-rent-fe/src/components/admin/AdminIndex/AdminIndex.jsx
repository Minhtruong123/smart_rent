import React, { useState, useEffect, useRef } from "react";
import styles from "./AdminIndex.module.css";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Home,
  Users,
  Database,
  PieChart,
  Shield,
  Settings,
  Bell,
  LogOut,
  ArrowUp,
  ArrowDown,
  UserPlus,
  CreditCard,
  Star,
  AlertTriangle,
  Coins,
} from "lucide-react";

export default function AdminIndex() {
  const [currentDate, setCurrentDate] = useState("");

  const revenueData = [
    { name: "Tháng 8", value: 1.8 },
    { name: "Tháng 9", value: 2.1 },
    { name: "Tháng 10", value: 2.3 },
    { name: "Tháng 11", value: 2.0 },
    { name: "Tháng 12", value: 2.5 },
    { name: "Tháng 1", value: 2.2 },
    { name: "Tháng 2", value: 2.4 },
  ];

  const userGrowthData = [
    { name: "Tháng 8", value: 45 },
    { name: "Tháng 9", value: 52 },
    { name: "Tháng 10", value: 48 },
    { name: "Tháng 11", value: 61 },
    { name: "Tháng 12", value: 55 },
    { name: "Tháng 1", value: 67 },
    { name: "Tháng 2", value: 73 },
  ];

  useEffect(() => {
    const today = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    setCurrentDate(today.toLocaleDateString("vi-VN", options));

    const progressBars = document.querySelectorAll(`.${styles.progressBar}`);
    setTimeout(() => {
      progressBars.forEach((bar) => {
        const width = bar.getAttribute("data-width");
        bar.style.width = "0%";
        setTimeout(() => {
          bar.style.width = width;
        }, 500);
      });
    }, 1000);
  }, []);
  return (
    <>
      <main className={styles.mainContent}>
        <div className={styles.container}>
          {/* Page Header */}
          <div className={styles.pageHeaderWrapper}>
            <div
              className={`${styles.glassEffect} ${styles.cardModern} ${styles.pageHeader}`}
            >
              <div className={styles.pageHeaderContent}>
                <div>
                  <h1 className={styles.pageTitle}>Trang chủ Dashboard</h1>
                  <p className={styles.pageSubtitle}>
                    Tổng quan hệ thống SmartRent - Chào mừng trở lại, Lê Văn
                    Cường!
                  </p>
                </div>
                <div className={styles.pageHeaderActions}>
                  <div className={styles.dateDisplay}>
                    <p className={styles.dateLabel}>Hôm nay</p>
                    <p className={styles.dateValue}>{currentDate}</p>
                  </div>
                  <div className={styles.notificationWrapper}>
                    <Bell className={styles.notificationIcon} />
                    <div className={styles.notificationBadge}>3</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className={styles.statsGrid}>
            {/* Total Users */}
            <div
              className={`${styles.glassEffect} ${styles.cardModern} ${styles.statCard} ${styles.statCardBlue}`}
            >
              <div className={styles.statCardContent}>
                <div>
                  <p className={styles.statLabel}>Tổng người dùng</p>
                  <p className={styles.statValue}>1,234</p>
                  <div className={styles.statTrend}>
                    <ArrowUp className={styles.trendIconUp} />
                    <span className={styles.trendValueUp}>+12%</span>
                    <span className={styles.trendDescription}>
                      so với tháng trước
                    </span>
                  </div>
                </div>
                <div className={`${styles.statIcon} ${styles.blueGradient}`}>
                  <Users className={styles.iconInner} />
                </div>
              </div>
            </div>

            {/* Active Properties */}
            <div
              className={`${styles.glassEffect} ${styles.cardModern} ${styles.statCard} ${styles.statCardGreen}`}
            >
              <div className={styles.statCardContent}>
                <div>
                  <p className={styles.statLabel}>BĐS đang hoạt động</p>
                  <p className={styles.statValue}>856</p>
                  <div className={styles.statTrend}>
                    <ArrowUp className={styles.trendIconUp} />
                    <span className={styles.trendValueUp}>+8%</span>
                    <span className={styles.trendDescription}>
                      so với tháng trước
                    </span>
                  </div>
                </div>
                <div className={`${styles.statIcon} ${styles.greenGradient}`}>
                  <Home className={styles.iconInner} />
                </div>
              </div>
            </div>

            {/* Monthly Revenue */}
            <div
              className={`${styles.glassEffect} ${styles.cardModern} ${styles.statCard} ${styles.statCardOrange}`}
            >
              <div className={styles.statCardContent}>
                <div>
                  <p className={styles.statLabel}>Doanh thu tháng</p>
                  <p className={styles.statValue}>₫2.4M</p>
                  <div className={styles.statTrend}>
                    <ArrowUp className={styles.trendIconUp} />
                    <span className={styles.trendValueUp}>+15%</span>
                    <span className={styles.trendDescription}>
                      so với tháng trước
                    </span>
                  </div>
                </div>
                <div className={`${styles.statIcon} ${styles.orangeGradient}`}>
                  <Coins className={styles.iconInner} />
                </div>
              </div>
            </div>

            {/* Active Issues */}
            <div
              className={`${styles.glassEffect} ${styles.cardModern} ${styles.statCard} ${styles.statCardRed}`}
            >
              <div className={styles.statCardContent}>
                <div>
                  <p className={styles.statLabel}>Sự cố đang xử lý</p>
                  <p className={styles.statValue}>23</p>
                  <div className={styles.statTrend}>
                    <ArrowDown className={styles.trendIconDown} />
                    <span className={styles.trendValueDown}>-5%</span>
                    <span className={styles.trendDescription}>
                      so với tháng trước
                    </span>
                  </div>
                </div>
                <div className={`${styles.statIcon} ${styles.redGradient}`}>
                  <AlertTriangle className={styles.iconInner} />
                </div>
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className={styles.chartsGrid}>
            {/* Revenue Chart */}
            <div
              className={`${styles.glassEffect} ${styles.cardModern} ${styles.chartCard}`}
            >
              <div className={styles.chartHeader}>
                <h3 className={styles.chartTitle}>Doanh thu theo tháng</h3>
                <select className={styles.chartFilter}>
                  <option>2026</option>
                  <option>2025</option>
                </select>
              </div>
              <div className={styles.chartContainer}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="rgba(102, 126, 234, 1)"
                      strokeWidth={3}
                      dot={{
                        r: 6,
                        strokeWidth: 2,
                        stroke: "#fff",
                        fill: "rgba(102, 126, 234, 1)",
                      }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* User Growth Chart */}
            <div
              className={`${styles.glassEffect} ${styles.cardModern} ${styles.chartCard}`}
            >
              <div className={styles.chartHeader}>
                <h3 className={styles.chartTitle}>Tăng trưởng người dùng</h3>
                <select className={styles.chartFilter}>
                  <option>6 tháng</option>
                  <option>1 năm</option>
                </select>
              </div>
              <div className={styles.chartContainer}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="value"
                      fill="rgba(16, 185, 129, 0.8)"
                      stroke="rgba(16, 185, 129, 1)"
                      strokeWidth={2}
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className={styles.bottomGrid}>
            {/* Recent Activities */}
            <div
              className={`${styles.glassEffect} ${styles.cardModern} ${styles.activitiesCard}`}
            >
              <div className={styles.activitiesHeader}>
                <h3 className={styles.activitiesTitle}>Hoạt động gần đây</h3>
                <a href="#" className={styles.activitiesLink}>
                  Xem tất cả
                </a>
              </div>
              <div className={styles.activitiesList}>
                <div className={styles.activityItem}>
                  <div className={styles.activityContent}>
                    <div
                      className={`${styles.activityIconContainer} ${styles.greenActivity}`}
                    >
                      <UserPlus className={styles.activityIcon} />
                    </div>
                    <div className={styles.activityDetails}>
                      <p className={styles.activityTitle}>
                        Người dùng mới đăng ký
                      </p>
                      <p className={styles.activityDescription}>
                        Nguyễn Văn An đã đăng ký tài khoản chủ nhà
                      </p>
                      <p className={styles.activityTime}>2 phút trước</p>
                    </div>
                  </div>
                </div>

                <div className={styles.activityItem}>
                  <div className={styles.activityContent}>
                    <div
                      className={`${styles.activityIconContainer} ${styles.blueActivity}`}
                    >
                      <Home className={styles.activityIcon} />
                    </div>
                    <div className={styles.activityDetails}>
                      <p className={styles.activityTitle}>BĐS mới được đăng</p>
                      <p className={styles.activityDescription}>
                        Căn hộ Vinhomes Central Park - 2PN
                      </p>
                      <p className={styles.activityTime}>15 phút trước</p>
                    </div>
                  </div>
                </div>

                <div className={styles.activityItem}>
                  <div className={styles.activityContent}>
                    <div
                      className={`${styles.activityIconContainer} ${styles.redActivity}`}
                    >
                      <AlertTriangle className={styles.activityIcon} />
                    </div>
                    <div className={styles.activityDetails}>
                      <p className={styles.activityTitle}>Báo cáo sự cố</p>
                      <p className={styles.activityDescription}>
                        Sự cố điện nước tại căn hộ A-1205
                      </p>
                      <p className={styles.activityTime}>30 phút trước</p>
                    </div>
                  </div>
                </div>

                <div className={styles.activityItem}>
                  <div className={styles.activityContent}>
                    <div
                      className={`${styles.activityIconContainer} ${styles.yellowActivity}`}
                    >
                      <CreditCard className={styles.activityIcon} />
                    </div>
                    <div className={styles.activityDetails}>
                      <p className={styles.activityTitle}>
                        Thanh toán thành công
                      </p>
                      <p className={styles.activityDescription}>
                        Trần Thị Bình đã thanh toán tiền thuê tháng 2
                      </p>
                      <p className={styles.activityTime}>1 giờ trước</p>
                    </div>
                  </div>
                </div>

                <div className={styles.activityItem}>
                  <div className={styles.activityContent}>
                    <div
                      className={`${styles.activityIconContainer} ${styles.purpleActivity}`}
                    >
                      <Star className={styles.activityIcon} />
                    </div>
                    <div className={styles.activityDetails}>
                      <p className={styles.activityTitle}>Đánh giá mới</p>
                      <p className={styles.activityDescription}>
                        Căn hộ Landmark 81 nhận được đánh giá 5 sao
                      </p>
                      <p className={styles.activityTime}>2 giờ trước</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats & Actions */}
            <div className={styles.sidebarGrid}>
              {/* System Status */}
              <div
                className={`${styles.glassEffect} ${styles.cardModern} ${styles.systemStatusCard}`}
              >
                <h3 className={styles.sidebarCardTitle}>Trạng thái hệ thống</h3>
                <div className={styles.progressList}>
                  <div className={styles.progressItem}>
                    <div className={styles.progressHeader}>
                      <span className={styles.progressLabel}>CPU Usage</span>
                      <span className={styles.progressValue}>45%</span>
                    </div>
                    <div className={styles.progressBarContainer}>
                      <div
                        className={styles.progressBar}
                        data-width="45%"
                      ></div>
                    </div>
                  </div>
                  <div className={styles.progressItem}>
                    <div className={styles.progressHeader}>
                      <span className={styles.progressLabel}>Memory</span>
                      <span className={styles.progressValue}>67%</span>
                    </div>
                    <div className={styles.progressBarContainer}>
                      <div
                        className={styles.progressBar}
                        data-width="67%"
                      ></div>
                    </div>
                  </div>
                  <div className={styles.progressItem}>
                    <div className={styles.progressHeader}>
                      <span className={styles.progressLabel}>Storage</span>
                      <span className={styles.progressValue}>23%</span>
                    </div>
                    <div className={styles.progressBarContainer}>
                      <div
                        className={styles.progressBar}
                        data-width="23%"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div
                className={`${styles.glassEffect} ${styles.cardModern} ${styles.quickActionsCard}`}
              >
                <h3 className={styles.sidebarCardTitle}>Thao tác nhanh</h3>
                <div className={styles.actionButtons}>
                  <button
                    className={`${styles.actionButton} ${styles.indigoBg}`}
                  >
                    <UserPlus className={styles.actionIcon} />
                    <span>Thêm người dùng</span>
                  </button>
                  <button
                    className={`${styles.actionButton} ${styles.greenBg}`}
                  >
                    <Home className={styles.actionIcon} />
                    <span>Đăng BĐS mới</span>
                  </button>
                  <button className={`${styles.actionButton} ${styles.redBg}`}>
                    <PieChart className={styles.actionIcon} />
                    <span>Xem báo cáo</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
