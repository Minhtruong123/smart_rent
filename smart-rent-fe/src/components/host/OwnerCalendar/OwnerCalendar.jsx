import React, { useState } from "react";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Clock,
  Plus,
  Search,
  Bell,
  Mail,
  LayoutGrid,
} from "lucide-react";
import styles from "./OwnerCalendar.module.css";

export default function OwnerCalendar() {
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(10);
  const [activeView, setActiveView] = useState("Tháng");
  const [selectedColor, setSelectedColor] = useState(0);

  const colorOptions = [
    { color: "#6366f1" }, // primary
    { color: "#3b82f6" }, // blue
    { color: "#10b981" }, // green
    { color: "#f59e0b" }, // yellow
    { color: "#ef4444" }, // red
    { color: "#ec4899" }, // pink
  ];

  const eventTypes = [
    { value: "viewing", label: "Lịch xem nhà" },
    { value: "maintenance", label: "Bảo trì" },
    { value: "meeting", label: "Họp" },
    { value: "payment", label: "Thu tiền" },
    { value: "other", label: "Khác" },
  ];

  const realEstateOptions = [
    { value: "bds001", label: "Vinhomes Central Park" },
    { value: "bds002", label: "Sunrise City" },
    { value: "bds003", label: "Biệt thự The Palm" },
    { value: "bds004", label: "Studio Lexington" },
    { value: "bds005", label: "Nhà phố Thảo Điền" },
  ];

  const reminderOptions = [
    { value: "none", label: "Không nhắc nhở" },
    { value: "15min", label: "15 phút trước" },
    { value: "30min", label: "30 phút trước" },
    { value: "1hour", label: "1 giờ trước" },
    { value: "1day", label: "1 ngày trước" },
  ];

  const upcomingEvents = [
    {
      type: "viewing",
      time: "10/02 - 09:00",
      title: "Lịch xem nhà - Vinhomes CP",
      description: "Khách hàng: Nguyễn Văn A - 0901234567",
    },
    {
      type: "maintenance",
      time: "12/02 - 14:00",
      title: "Bảo trì máy lạnh - Sunrise City",
      description: "Kiểm tra và vệ sinh máy lạnh định kỳ",
    },
    {
      type: "payment",
      time: "15/02 - 10:00",
      title: "Thu tiền thuê - The Palm",
      description: "Thu tiền thuê tháng 2/2026 - 12 triệu đồng",
    },
    {
      type: "viewing",
      time: "18/02 - 15:30",
      title: "Lịch xem nhà - Lexington",
      description: "Khách hàng: Trần Thị B - 0912345678",
    },
    {
      type: "meeting",
      time: "20/02 - 09:00",
      title: "Họp với môi giới",
      description: "Thảo luận chiến lược marketing Q1/2026",
    },
  ];

  const generateCalendarDays = () => {
    const days = [];
    // Header days
    const dayHeaders = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
    dayHeaders.forEach((day, index) => {
      days.push(
        <div key={`header-${index}`} className={styles.calendarDayHeader}>
          {day}
        </div>,
      );
    });

    // Previous month days
    const prevMonthDays = [26, 27, 28, 29, 30, 31];
    prevMonthDays.forEach((day) => {
      days.push(
        <div
          key={`prev-${day}`}
          className={`${styles.calendarDay} ${styles.otherMonth}`}
        >
          <span className={styles.dayNumber}>{day}</span>
        </div>,
      );
    });

    // Current month days
    const hasEventDays = [3, 6, 8, 10, 12, 15, 18, 20, 25, 28];
    const today = 5;

    for (let i = 1; i <= 28; i++) {
      let classes = styles.calendarDay;
      if (i === today) classes += ` ${styles.today}`;
      if (i === selectedDate) classes += ` ${styles.selected}`;
      if (hasEventDays.includes(i)) classes += ` ${styles.hasEvent}`;

      days.push(
        <div
          key={`curr-${i}`}
          className={classes}
          onClick={() => setSelectedDate(i)}
        >
          <span className={styles.dayNumber}>{i}</span>
        </div>,
      );
    }

    // Next month day
    days.push(
      <div
        key="next-1"
        className={`${styles.calendarDay} ${styles.otherMonth}`}
      >
        <span className={styles.dayNumber}>1</span>
      </div>,
    );

    return days;
  };

  const generateMiniCalendarDays = () => {
    const days = [];

    // Header days
    const dayHeaders = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
    dayHeaders.forEach((day, index) => {
      days.push(
        <div
          key={`mini-header-${index}`}
          className={styles.miniDay}
          style={{ fontWeight: 600, color: "var(--text-muted)" }}
        >
          {day}
        </div>,
      );
    });

    // Empty days
    for (let i = 0; i < 6; i++) {
      days.push(<div key={`mini-empty-${i}`} className={styles.miniDay}></div>);
    }

    // Month days
    const today = 5;
    for (let i = 1; i <= 28; i++) {
      let classes = styles.miniDay;
      if (i === today) classes += ` ${styles.today}`;

      days.push(
        <div key={`mini-day-${i}`} className={classes}>
          {i}
        </div>,
      );
    }

    return days;
  };
  return (
    <>
      <div className={styles.mainContent}>
        <nav className={styles.navbar}>
          <div className={styles.navTitle}>Lịch</div>
          <div className={styles.navActions}>
            <div className={styles.navAction}>
              <Search size={20} />
            </div>
            <div className={styles.navAction}>
              <Bell size={20} />
              <span className={styles.navBadge}>3</span>
            </div>
            <div className={styles.navAction}>
              <Mail size={20} />
              <span className={styles.navBadge}>5</span>
            </div>
            <div className={styles.navAction}>
              <LayoutGrid size={20} />
            </div>
          </div>
        </nav>

        <div className={styles.dashboardContainer}>
          <div className={styles.pageHeader}>
            <div>
              <h1 className={styles.pageTitle}>Lịch & Sự kiện</h1>
              <p className={styles.pageSubtitle}>
                Quản lý lịch hẹn xem nhà, bảo trì và các sự kiện quan trọng
              </p>
            </div>
            <button
              className={styles.btnPrimary}
              onClick={() => setShowEventForm(true)}
            >
              <Plus size={16} /> Thêm sự kiện mới
            </button>
          </div>

          {showEventForm && (
            <div className={styles.eventFormCard}>
              <div className={styles.formHeader}>
                <div className={styles.formTitle}>Thêm sự kiện mới</div>
                <div className={styles.formSubtitle}>
                  Điền thông tin chi tiết cho sự kiện hoặc lịch hẹn
                </div>
              </div>

              <form className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={`${styles.formLabel} ${styles.required}`}>
                    Tiêu đề sự kiện
                  </label>
                  <input
                    type="text"
                    className={styles.formControl}
                    placeholder="Nhập tiêu đề sự kiện"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={`${styles.formLabel} ${styles.required}`}>
                    Loại sự kiện
                  </label>
                  <select className={styles.formSelect}>
                    <option value="">Chọn loại sự kiện</option>
                    {eventTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={`${styles.formLabel} ${styles.required}`}>
                    Ngày bắt đầu
                  </label>
                  <input
                    type="date"
                    className={styles.formControl}
                    defaultValue="2026-02-10"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={`${styles.formLabel} ${styles.required}`}>
                    Giờ bắt đầu
                  </label>
                  <input
                    type="time"
                    className={styles.formControl}
                    defaultValue="09:00"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Ngày kết thúc</label>
                  <input
                    type="date"
                    className={styles.formControl}
                    defaultValue="2026-02-10"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Giờ kết thúc</label>
                  <input
                    type="time"
                    className={styles.formControl}
                    defaultValue="10:00"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Bất động sản</label>
                  <select className={styles.formSelect}>
                    <option value="">Chọn bất động sản</option>
                    {realEstateOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Địa điểm</label>
                  <input
                    type="text"
                    className={styles.formControl}
                    placeholder="Nhập địa điểm cụ thể"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Người liên hệ</label>
                  <input
                    type="text"
                    className={styles.formControl}
                    placeholder="Tên người liên hệ"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Số điện thoại</label>
                  <input
                    type="tel"
                    className={styles.formControl}
                    placeholder="Số điện thoại liên hệ"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Nhắc nhở</label>
                  <select className={styles.formSelect}>
                    {reminderOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Màu sắc</label>
                  <div className={styles.colorPicker}>
                    {colorOptions.map((option, index) => (
                      <div
                        key={index}
                        className={`${styles.colorOption} ${selectedColor === index ? styles.selected : ""}`}
                        style={{ background: option.color }}
                        onClick={() => setSelectedColor(index)}
                      ></div>
                    ))}
                  </div>
                </div>

                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label className={styles.formLabel}>Ghi chú</label>
                  <textarea
                    className={styles.formControl}
                    placeholder="Nhập ghi chú chi tiết về sự kiện..."
                  ></textarea>
                </div>

                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <div className={styles.formActions}>
                    <button
                      type="button"
                      className={styles.btnOutline}
                      onClick={() => setShowEventForm(false)}
                    >
                      <X size={16} /> Hủy
                    </button>
                    <button type="button" className={styles.btnSuccess}>
                      <Check size={16} /> Lưu sự kiện
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          <div className={styles.calendarLayout}>
            <div className={styles.calendarCard}>
              <div className={styles.calendarHeader}>
                <div className={styles.calendarTitle}>Tháng 2, 2026</div>
                <div className={styles.calendarNav}>
                  <button>
                    <ChevronLeft size={16} />
                  </button>
                  <div className={styles.calendarMonth}>Tháng 2, 2026</div>
                  <button>
                    <ChevronRight size={16} />
                  </button>
                </div>
                <div className={styles.calendarViewToggle}>
                  {["Tháng", "Tuần", "Ngày"].map((view) => (
                    <button
                      key={view}
                      className={`${styles.viewBtn} ${activeView === view ? styles.active : ""}`}
                      onClick={() => setActiveView(view)}
                    >
                      {view}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.calendarGrid}>
                {generateCalendarDays()}
              </div>
            </div>

            <div className={styles.eventSidebar}>
              <div className={styles.miniCalendar}>
                <div className={styles.miniCalendarHeader}>
                  <button
                    style={{
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                    }}
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <div className={styles.miniCalendarTitle}>Tháng 2, 2026</div>
                  <button
                    style={{
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                    }}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
                <div className={styles.miniCalendarGrid}>
                  {generateMiniCalendarDays()}
                </div>
              </div>

              <div className={styles.upcomingEvents}>
                <div className={styles.upcomingHeader}>
                  <div className={styles.upcomingTitle}>Sự kiện sắp tới</div>
                  <button
                    className={styles.btnOutline}
                    style={{ padding: "0.5rem 0.75rem", fontSize: "0.8rem" }}
                  >
                    Xem tất cả
                  </button>
                </div>

                <div className={styles.eventList}>
                  {upcomingEvents.map((event, index) => (
                    <div
                      key={index}
                      className={`${styles.eventItem} ${styles[event.type]}`}
                    >
                      <div className={styles.eventTime}>
                        <Clock size={14} /> {event.time}
                      </div>
                      <div className={styles.eventTitle}>{event.title}</div>
                      <div className={styles.eventDescription}>
                        {event.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
