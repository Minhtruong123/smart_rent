import React, { useState, useEffect, useRef } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";
import {
  Download,
  Filter,
  RefreshCw,
  Search,
  DollarSign,
  PieChart as PieChartIcon,
  Coins,
  TrendingUp,
  FileText,
  Clock,
} from "lucide-react";
import styles from "./OwnerStatistical.module.css";

export default function OwnerStatistical() {
  const [activeChartPeriod, setActiveChartPeriod] = useState("Tháng");
  const [activePropertyMetric, setActivePropertyMetric] = useState("Doanh thu");

  const revenueData = [
    { month: "T8/25", revenue: 38, cost: 10 },
    { month: "T9/25", revenue: 40, cost: 9.5 },
    { month: "T10/25", revenue: 42, cost: 11 },
    { month: "T11/25", revenue: 39, cost: 9 },
    { month: "T12/25", revenue: 43, cost: 10.5 },
    { month: "T1/26", revenue: 41, cost: 9.2 },
    { month: "T2/26", revenue: 45.2, cost: 8.7 },
  ];

  const revenueDistData = [
    { name: "Căn hộ", value: 45 },
    { name: "Studio", value: 20 },
    { name: "Nhà phố", value: 18 },
    { name: "Biệt thự", value: 12 },
    { name: "Phòng trọ", value: 5 },
  ];

  const occupancyData = [
    { month: "T8/25", occupancy: 75 },
    { month: "T9/25", occupancy: 78 },
    { month: "T10/25", occupancy: 82 },
    { month: "T11/25", occupancy: 80 },
    { month: "T12/25", occupancy: 85 },
    { month: "T1/26", occupancy: 83 },
    { month: "T2/26", occupancy: 85 },
  ];

  const expenseData = [
    { name: "Bảo trì", value: 35 },
    { name: "Điện nước", value: 25 },
    { name: "Quản lý", value: 20 },
    { name: "Thuế", value: 15 },
    { name: "Khác", value: 5 },
  ];

  const propertyCompData = [
    { name: "Vinhomes CP", revenue: 8.5, cost: 1.2, profit: 7.3 },
    { name: "Sunrise City", revenue: 5.5, cost: 0.8, profit: 4.7 },
    { name: "The Palm", revenue: 0, cost: 1.5, profit: -1.5 },
    { name: "Lexington", revenue: 3.5, cost: 0.6, profit: 2.9 },
    { name: "Thảo Điền", revenue: 12, cost: 2.1, profit: 9.9 },
  ];

  const propertyData = [
    {
      id: 1,
      name: "Vinhomes Central Park",
      image:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
      revenue: "8.5 triệu",
      expense: "1.2 triệu",
      profit: "7.3 triệu",
      occupancy: "100%",
      performance: { status: "Xuất sắc", type: "success" },
    },
    {
      id: 2,
      name: "Sunrise City",
      image:
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
      revenue: "5.5 triệu",
      expense: "800 nghìn",
      profit: "4.7 triệu",
      occupancy: "100%",
      performance: { status: "Tốt", type: "success" },
    },
    {
      id: 3,
      name: "Biệt thự The Palm",
      image:
        "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80",
      revenue: "0 đồng",
      expense: "1.5 triệu",
      profit: "-1.5 triệu",
      occupancy: "0%",
      performance: { status: "Bảo trì", type: "warning" },
    },
    {
      id: 4,
      name: "Studio Lexington",
      image:
        "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80",
      revenue: "3.5 triệu",
      expense: "600 nghìn",
      profit: "2.9 triệu",
      occupancy: "100%",
      performance: { status: "Tốt", type: "success" },
    },
    {
      id: 5,
      name: "Nhà phố Thảo Điền",
      image:
        "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=800&q=80",
      revenue: "12 triệu",
      expense: "2.1 triệu",
      profit: "9.9 triệu",
      occupancy: "100%",
      performance: { status: "Xuất sắc", type: "success" },
    },
  ];

  const COLORS = ["#6366f1", "#3b82f6", "#10b981", "#f59e0b", "#ef4444"];
  return (
    <>
      <div className={styles.mainContent}>
        {/* Navbar */}
        <nav className={styles.navbar}>
          <div className={styles.navTitle}>Thống kê</div>
          <div className={styles.navActions}>
            <div className={styles.navAction}>
              <Search size={20} />
            </div>
            <div className={styles.navAction}>
              <div className={styles.navBadge}>3</div>
              <i className="fas fa-bell"></i>
            </div>
            <div className={styles.navAction}>
              <div className={styles.navBadge}>5</div>
              <i className="fas fa-envelope"></i>
            </div>
            <div className={styles.navAction}>
              <i className="fas fa-th-large"></i>
            </div>
          </div>
        </nav>

        {/* Dashboard Container */}
        <div className={styles.dashboardContainer}>
          {/* Page Header */}
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Báo cáo & Thống kê</h1>
            <p className={styles.pageSubtitle}>
              Phân tích chi tiết hoạt động kinh doanh và tài chính
            </p>
          </div>

          {/* Filter Card */}
          <div className={styles.filterCard}>
            <div className={styles.filterHeader}>
              <div className={styles.filterTitle}>
                <Filter size={20} />
                Bộ lọc thống kê
              </div>
            </div>
            <form className={styles.filterForm}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Khoảng thời gian</label>
                <select className={styles.formSelect} id="periodFilter">
                  <option value="7days">7 ngày qua</option>
                  <option value="30days" selected>
                    30 ngày qua
                  </option>
                  <option value="90days">90 ngày qua</option>
                  <option value="6months">6 tháng qua</option>
                  <option value="1year">1 năm qua</option>
                  <option value="custom">Tùy chỉnh</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Từ ngày</label>
                <input
                  type="date"
                  className={styles.formControl}
                  defaultValue="2026-01-05"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Đến ngày</label>
                <input
                  type="date"
                  className={styles.formControl}
                  defaultValue="2026-02-05"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Bất động sản</label>
                <select className={styles.formSelect}>
                  <option value="all">Tất cả BĐS</option>
                  <option value="bds001">Vinhomes Central Park</option>
                  <option value="bds002">Sunrise City</option>
                  <option value="bds003">Biệt thự The Palm</option>
                  <option value="bds004">Studio Lexington</option>
                  <option value="bds005">Nhà phố Thảo Điền</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Loại báo cáo</label>
                <select className={styles.formSelect}>
                  <option value="overview">Tổng quan</option>
                  <option value="revenue">Doanh thu</option>
                  <option value="occupancy">Công suất</option>
                  <option value="tenant">Người thuê</option>
                  <option value="maintenance">Bảo trì</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>So sánh với</label>
                <select className={styles.formSelect}>
                  <option value="none">Không so sánh</option>
                  <option value="previous">Kỳ trước</option>
                  <option value="lastyear">Cùng kỳ năm trước</option>
                  <option value="average">Trung bình</option>
                </select>
              </div>

              <div className={styles.filterActions}>
                <button
                  type="button"
                  className={`${styles.btn} ${styles.btnOutline}`}
                >
                  <RefreshCw size={16} /> Đặt lại
                </button>
                <button
                  type="submit"
                  className={`${styles.btn} ${styles.btnPrimary}`}
                >
                  <Search size={16} /> Áp dụng bộ lọc
                </button>
                <button
                  type="button"
                  className={`${styles.btn} ${styles.btnOutlinePrimary}`}
                >
                  <Download size={16} /> Xuất báo cáo
                </button>
              </div>
            </form>
          </div>

          {/* Stats Cards */}
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <div className={styles.statTitle}>Tổng doanh thu</div>
                <div className={`${styles.statIcon} ${styles.primary}`}>
                  <DollarSign size={20} />
                </div>
              </div>
              <div className={styles.statValue}>45.2 triệu</div>
              <div className={styles.statDescription}>
                <span className={`${styles.statChange} ${styles.positive}`}>
                  <i className="fas fa-arrow-up"></i> +12.5%
                </span>
                <span>so với tháng trước</span>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <div className={styles.statTitle}>Tỷ lệ lấp đầy</div>
                <div className={`${styles.statIcon} ${styles.success}`}>
                  <PieChartIcon size={20} />
                </div>
              </div>
              <div className={styles.statValue}>85%</div>
              <div className={styles.statDescription}>
                <span className={`${styles.statChange} ${styles.positive}`}>
                  <i className="fas fa-arrow-up"></i> +5%
                </span>
                <span>so với tháng trước</span>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <div className={styles.statTitle}>Chi phí vận hành</div>
                <div className={`${styles.statIcon} ${styles.warning}`}>
                  <Coins size={20} />
                </div>
              </div>
              <div className={styles.statValue}>8.7 triệu</div>
              <div className={styles.statDescription}>
                <span className={`${styles.statChange} ${styles.negative}`}>
                  <i className="fas fa-arrow-down"></i> -3.2%
                </span>
                <span>so với tháng trước</span>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <div className={styles.statTitle}>Lợi nhuận ròng</div>
                <div className={`${styles.statIcon} ${styles.success}`}>
                  <TrendingUp size={20} />
                </div>
              </div>
              <div className={styles.statValue}>36.5 triệu</div>
              <div className={styles.statDescription}>
                <span className={`${styles.statChange} ${styles.positive}`}>
                  <i className="fas fa-arrow-up"></i> +15.8%
                </span>
                <span>so với tháng trước</span>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <div className={styles.statTitle}>Số hợp đồng mới</div>
                <div className={`${styles.statIcon} ${styles.info}`}>
                  <FileText size={20} />
                </div>
              </div>
              <div className={styles.statValue}>8</div>
              <div className={styles.statDescription}>
                <span className={`${styles.statChange} ${styles.positive}`}>
                  <i className="fas fa-arrow-up"></i> +2
                </span>
                <span>so với tháng trước</span>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <div className={styles.statTitle}>
                  Thời gian trống trung bình
                </div>
                <div className={`${styles.statIcon} ${styles.danger}`}>
                  <Clock size={20} />
                </div>
              </div>
              <div className={styles.statValue}>15 ngày</div>
              <div className={styles.statDescription}>
                <span className={`${styles.statChange} ${styles.positive}`}>
                  <i className="fas fa-arrow-down"></i> -5 ngày
                </span>
                <span>so với tháng trước</span>
              </div>
            </div>
          </div>

          {/* Main Charts */}
          <div className={styles.chartRow}>
            <div className={styles.chartCard}>
              <div className={styles.chartHeader}>
                <div>
                  <div className={styles.chartTitle}>
                    Doanh thu theo thời gian
                  </div>
                  <div className={styles.chartSubtitle}>
                    Biểu đồ theo dõi doanh thu hàng tháng
                  </div>
                </div>
                <div className={styles.chartActions}>
                  <button
                    className={`${styles.chartPeriod} ${activeChartPeriod === "Tuần" ? styles.active : ""}`}
                    onClick={() => setActiveChartPeriod("Tuần")}
                  >
                    Tuần
                  </button>
                  <button
                    className={`${styles.chartPeriod} ${activeChartPeriod === "Tháng" ? styles.active : ""}`}
                    onClick={() => setActiveChartPeriod("Tháng")}
                  >
                    Tháng
                  </button>
                  <button
                    className={`${styles.chartPeriod} ${activeChartPeriod === "Năm" ? styles.active : ""}`}
                    onClick={() => setActiveChartPeriod("Năm")}
                  >
                    Năm
                  </button>
                </div>
              </div>
              <div className={styles.chartContainer}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={revenueData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      name="Doanh thu"
                      stroke="#6366f1"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="cost"
                      name="Chi phí"
                      stroke="#f59e0b"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className={styles.chartCard}>
              <div className={styles.chartHeader}>
                <div>
                  <div className={styles.chartTitle}>Phân bổ doanh thu</div>
                  <div className={styles.chartSubtitle}>
                    Theo loại bất động sản
                  </div>
                </div>
              </div>
              <div className={styles.chartContainer}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={revenueDistData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {revenueDistData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Secondary Charts */}
          <div className={styles.chartRow}>
            <div className={styles.chartCard}>
              <div className={styles.chartHeader}>
                <div>
                  <div className={styles.chartTitle}>
                    Tỷ lệ lấp đầy theo tháng
                  </div>
                  <div className={styles.chartSubtitle}>
                    Theo dõi tỷ lệ công suất sử dụng
                  </div>
                </div>
              </div>
              <div className={styles.chartContainer}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={occupancyData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="occupancy"
                      name="Tỷ lệ lấp đầy (%)"
                      fill="#10b981"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className={styles.chartCard}>
              <div className={styles.chartHeader}>
                <div>
                  <div className={styles.chartTitle}>Chi phí hoạt động</div>
                  <div className={styles.chartSubtitle}>
                    Phân tích chi phí vận hành
                  </div>
                </div>
              </div>
              <div className={styles.chartContainer}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={expenseData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {expenseData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Full Width Chart */}
          <div className={`${styles.chartCard} ${styles.fullWidth}`}>
            <div className={styles.chartHeader}>
              <div>
                <div className={styles.chartTitle}>
                  So sánh hiệu suất bất động sản
                </div>
                <div className={styles.chartSubtitle}>
                  Doanh thu và chi phí theo từng BĐS
                </div>
              </div>
              <div className={styles.chartActions}>
                <button
                  className={`${styles.chartPeriod} ${activePropertyMetric === "Doanh thu" ? styles.active : ""}`}
                  onClick={() => setActivePropertyMetric("Doanh thu")}
                >
                  Doanh thu
                </button>
                <button
                  className={`${styles.chartPeriod} ${activePropertyMetric === "Chi phí" ? styles.active : ""}`}
                  onClick={() => setActivePropertyMetric("Chi phí")}
                >
                  Chi phí
                </button>
                <button
                  className={`${styles.chartPeriod} ${activePropertyMetric === "Lợi nhuận" ? styles.active : ""}`}
                  onClick={() => setActivePropertyMetric("Lợi nhuận")}
                >
                  Lợi nhuận
                </button>
              </div>
            </div>
            <div className={styles.chartContainer}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={propertyCompData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="revenue"
                    name="Doanh thu (triệu)"
                    fill="#6366f1"
                  />
                  <Bar dataKey="cost" name="Chi phí (triệu)" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Property Performance Table */}
          <div className={styles.comparisonTable}>
            <div className={styles.chartHeader}>
              <div>
                <div className={styles.chartTitle}>
                  Hiệu suất chi tiết từng BĐS
                </div>
                <div className={styles.chartSubtitle}>
                  Bảng so sánh các chỉ số quan trọng
                </div>
              </div>
              <button
                className={`${styles.btn} ${styles.btnSm} ${styles.btnOutlinePrimary}`}
              >
                <Download size={16} /> Xuất Excel
              </button>
            </div>

            <div className={styles.tableResponsive}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Bất động sản</th>
                    <th>Doanh thu</th>
                    <th>Chi phí</th>
                    <th>Lợi nhuận</th>
                    <th>Tỷ lệ lấp đầy</th>
                    <th>Hiệu suất</th>
                  </tr>
                </thead>
                <tbody>
                  {propertyData.map((property) => (
                    <tr key={property.id}>
                      <td>
                        <div className={styles.tableProperty}>
                          <div className={styles.tablePropertyImage}>
                            <img src={property.image} alt={property.name} />
                          </div>
                          <div className={styles.tablePropertyTitle}>
                            {property.name}
                          </div>
                        </div>
                      </td>
                      <td className={styles.tableAmount}>{property.revenue}</td>
                      <td>{property.expense}</td>
                      <td className={styles.tableAmount}>{property.profit}</td>
                      <td>{property.occupancy}</td>
                      <td>
                        <span
                          className={`${styles.tableBadge} ${styles[`badge${property.performance.type.charAt(0).toUpperCase() + property.performance.type.slice(1)}`]}`}
                        >
                          {property.performance.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
