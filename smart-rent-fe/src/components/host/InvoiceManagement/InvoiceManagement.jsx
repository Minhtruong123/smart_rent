import React, { useState } from "react";
import styles from "./InvoiceManagement.module.css";

export default function InvoiceManagement() {
  const [activeTab, setActiveTab] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [invoiceItems, setInvoiceItems] = useState([
    {
      id: 1,
      type: "rent",
      description: "Tiền thuê tháng 02/2026",
      price: 5500000,
      amount: 5500000,
    },
    {
      id: 2,
      type: "management",
      description: "Phí quản lý tòa nhà tháng 02/2026",
      price: 250000,
      amount: 250000,
    },
  ]);

  const tabs = [
    { key: "all", label: "Tất cả (24)" },
    { key: "paid", label: "Đã thanh toán (10)" },
    { key: "unpaid", label: "Chưa thanh toán (8)" },
    { key: "overdue", label: "Quá hạn (4)" },
    { key: "partial", label: "Thanh toán một phần (2)" },
  ];

  const invoices = [
    {
      id: "INV-2026-042",
      property: {
        name: "Căn hộ Sunrise City",
        address: "Tòa W3, 23 Nguyễn Hữu Thọ, Quận 7, TP.HCM",
        image:
          "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
        contractId: "HD-2026-001",
      },
      tenant: "Lê Thị Hồng",
      period: "Tháng 02/2026",
      createDate: "01/02/2026",
      dueDate: "10/02/2026",
      total: 6525000,
      paid: 0,
      remaining: 6525000,
      status: "unpaid",
      method: "Chuyển khoản",
    },
    {
      id: "INV-2026-041",
      property: {
        name: "Studio Lexington",
        address: "23 Mai Chí Thọ, Quận 2, TP.HCM",
        image:
          "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80",
        contractId: "HD-2025-045",
      },
      tenant: "Trần Quốc Bảo",
      period: "Tháng 02/2026",
      createDate: "01/02/2026",
      dueDate: "10/02/2026",
      total: 4200000,
      paid: 4200000,
      remaining: 0,
      status: "paid",
      method: "Chuyển khoản",
    },
    {
      id: "INV-2026-040",
      property: {
        name: "Nhà phố Thảo Điền",
        address: "Số 12, Đường 55, Thảo Điền, Quận 2, TP.HCM",
        image:
          "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=800&q=80",
        contractId: "HD-2025-032",
      },
      tenant: "Phạm Văn An",
      period: "Tháng 01/2026",
      createDate: "01/01/2026",
      dueDate: "10/01/2026 (Quá hạn)",
      total: 14300000,
      paid: 0,
      remaining: 14300000,
      status: "overdue",
      method: "Chuyển khoản",
    },
    {
      id: "INV-2026-039",
      property: {
        name: "Căn hộ Vinhomes Central Park",
        address: "Tòa Park 5, 720A Điện Biên Phủ, Quận Bình Thạnh, TP.HCM",
        image:
          "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
        contractId: "HD-2026-022",
      },
      tenant: "Nguyễn Văn Dũng",
      period: "Tháng 02/2026",
      createDate: "01/02/2026",
      dueDate: "10/02/2026",
      total: 9800000,
      paid: 5000000,
      remaining: 4800000,
      status: "partial",
      method: "Chuyển khoản",
    },
  ];

  const addInvoiceItem = () => {
    const newItem = {
      id: Date.now(),
      type: "rent",
      description: "",
      price: 0,
      amount: 0,
    };
    setInvoiceItems([...invoiceItems, newItem]);
  };

  const removeInvoiceItem = (id) => {
    setInvoiceItems(invoiceItems.filter((item) => item.id !== id));
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      paid: styles.statusPaid,
      unpaid: styles.statusUnpaid,
      partial: styles.statusPartial,
      overdue: styles.statusOverdue,
      pending: styles.statusPending,
    };

    const statusTexts = {
      paid: "Đã thanh toán",
      unpaid: "Chưa thanh toán",
      partial: "Thanh toán một phần",
      overdue: "Quá hạn",
      pending: "Đang xử lý",
    };

    return (
      <span className={`${styles.invoiceStatus} ${statusClasses[status]}`}>
        {statusTexts[status]}
      </span>
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN").format(amount) + " VND";
  };

  const totalAmount = invoiceItems.reduce((sum, item) => sum + item.amount, 0);

  return (
    <>
      <div className={styles.mainContent}>
        {/* Navbar */}
        <nav className={styles.navbar}>
          <div className={styles.navTitle}>Quản lý Hóa đơn</div>
          <div className={styles.navActions}>
            <div className={styles.navAction}>
              <i className="fas fa-search"></i>
            </div>
            <div className={styles.navAction}>
              <i className="fas fa-bell"></i>
              <span className={styles.navBadge}>3</span>
            </div>
            <div className={styles.navAction}>
              <i className="fas fa-envelope"></i>
              <span className={styles.navBadge}>5</span>
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
            <h1 className={styles.pageTitle}>Quản lý Hóa đơn</h1>
            <p className={styles.pageSubtitle}>
              Tạo và quản lý hóa đơn cho tất cả các bất động sản của bạn
            </p>
          </div>

          {/* Filter and Search Section */}
          <div className={styles.filterSection}>
            <div className={styles.filterGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Bất động sản</label>
                <select className={styles.formSelect}>
                  <option value="">Tất cả bất động sản</option>
                  <option value="1">Căn hộ Vinhomes Central Park</option>
                  <option value="2">Căn hộ Sunrise City</option>
                  <option value="3">Biệt thự The Palm</option>
                  <option value="4">Studio Lexington</option>
                  <option value="5">Nhà phố Thảo Điền</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Trạng thái</label>
                <select className={styles.formSelect}>
                  <option value="">Tất cả trạng thái</option>
                  <option value="paid">Đã thanh toán</option>
                  <option value="unpaid">Chưa thanh toán</option>
                  <option value="partial">Thanh toán một phần</option>
                  <option value="overdue">Quá hạn</option>
                  <option value="pending">Đang xử lý</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Tháng</label>
                <select className={styles.formSelect} defaultValue="02">
                  <option value="">Tất cả các tháng</option>
                  <option value="01">Tháng 1/2026</option>
                  <option value="02">Tháng 2/2026</option>
                  <option value="03">Tháng 3/2026</option>
                  <option value="04">Tháng 4/2026</option>
                  <option value="05">Tháng 5/2026</option>
                  <option value="06">Tháng 6/2026</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Khoảng thời gian</label>
                <div className={styles.dateRange}>
                  <input
                    type="date"
                    className={styles.formControl}
                    defaultValue="2026-01-01"
                  />
                  <input
                    type="date"
                    className={styles.formControl}
                    defaultValue="2026-02-29"
                  />
                </div>
              </div>
            </div>

            <div className={styles.searchRow}>
              <div className={styles.searchInputContainer}>
                <i className="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Tìm kiếm theo ID, người thuê, địa chỉ..."
                  className={styles.searchInput}
                />
              </div>

              <div className={styles.filterButtons}>
                <button className={`${styles.btn} ${styles.btnOutline}`}>
                  <i className="fas fa-filter"></i> Lọc
                </button>
                <button className={`${styles.btn} ${styles.btnOutlinePrimary}`}>
                  <i className="fas fa-sync-alt"></i> Đặt lại
                </button>
                <button
                  className={`${styles.btn} ${styles.btnPrimary}`}
                  onClick={() => setShowModal(true)}
                >
                  <i className="fas fa-plus"></i> Tạo hóa đơn mới
                </button>
              </div>
            </div>
          </div>

          {/* Invoice Tabs */}
          <div className={styles.invoiceTabs}>
            {tabs.map((tab) => (
              <div
                key={tab.key}
                className={`${styles.invoiceTab} ${activeTab === tab.key ? styles.active : ""}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </div>
            ))}
          </div>

          {/* Invoices List View */}
          <div className={styles.invoiceList}>
            {invoices.map((invoice) => (
              <div key={invoice.id} className={styles.invoiceCard}>
                <div className={styles.invoiceHeader}>
                  <h3 className={styles.invoiceTitle}>Hóa đơn #{invoice.id}</h3>
                  {getStatusBadge(invoice.status)}
                </div>

                <div className={styles.invoiceProperty}>
                  <div className={styles.invoiceImage}>
                    <img src={invoice.property.image} alt="Property" />
                  </div>
                  <div className={styles.invoiceInfo}>
                    <div className={styles.invoicePropertyTitle}>
                      {invoice.property.name}
                    </div>
                    <div className={styles.invoiceAddress}>
                      {invoice.property.address}
                    </div>
                    <div className={styles.invoiceId}>
                      Mã hợp đồng: {invoice.property.contractId}
                    </div>
                  </div>
                </div>

                <div className={styles.invoiceMeta}>
                  <div className={styles.metaItem}>
                    <div className={styles.metaLabel}>Người thuê</div>
                    <div className={styles.metaValue}>{invoice.tenant}</div>
                  </div>
                  <div className={styles.metaItem}>
                    <div className={styles.metaLabel}>Kỳ thanh toán</div>
                    <div className={styles.metaValue}>{invoice.period}</div>
                  </div>
                  <div className={styles.metaItem}>
                    <div className={styles.metaLabel}>Ngày tạo</div>
                    <div className={styles.metaValue}>{invoice.createDate}</div>
                  </div>
                  <div className={styles.metaItem}>
                    <div className={`${styles.metaLabel}`}>Hạn thanh toán</div>
                    <div
                      className={`${styles.metaValue} ${invoice.status === "overdue" ? styles.textDanger : ""}`}
                    >
                      {invoice.dueDate}
                    </div>
                  </div>
                  <div className={styles.metaItem}>
                    <div className={styles.metaLabel}>Tổng tiền</div>
                    <div
                      className={`${styles.metaValue} ${styles.textPrimary}`}
                    >
                      {formatCurrency(invoice.total)}
                    </div>
                  </div>
                  <div className={styles.metaItem}>
                    <div className={styles.metaLabel}>Đã thanh toán</div>
                    <div
                      className={`${styles.metaValue} ${invoice.paid > 0 ? styles.textSuccess : ""}`}
                    >
                      {formatCurrency(invoice.paid)}
                    </div>
                  </div>
                  <div className={styles.metaItem}>
                    <div className={styles.metaLabel}>Còn lại</div>
                    <div
                      className={`${styles.metaValue} ${invoice.remaining > 0 ? styles.textDanger : ""}`}
                    >
                      {formatCurrency(invoice.remaining)}
                    </div>
                  </div>
                  <div className={styles.metaItem}>
                    <div className={styles.metaLabel}>Phương thức</div>
                    <div className={styles.metaValue}>{invoice.method}</div>
                  </div>
                </div>

                <div className={styles.invoiceActions}>
                  {invoice.status === "unpaid" && (
                    <button
                      className={`${styles.btn} ${styles.btnOutlinePrimary}`}
                    >
                      <i className="fas fa-paper-plane"></i> Gửi nhắc nhở
                    </button>
                  )}
                  {invoice.status === "overdue" && (
                    <button className={`${styles.btn} ${styles.btnWarning}`}>
                      <i className="fas fa-exclamation-circle"></i> Gửi nhắc nhở
                      khẩn
                    </button>
                  )}
                  {invoice.status === "partial" && (
                    <button
                      className={`${styles.btn} ${styles.btnOutlinePrimary}`}
                    >
                      <i className="fas fa-paper-plane"></i> Gửi nhắc nhở
                    </button>
                  )}
                  <button className={`${styles.btn} ${styles.btnOutline}`}>
                    <i className="fas fa-print"></i> In hóa đơn
                  </button>
                  <button
                    className={`${styles.btn} ${styles.btnOutlinePrimary}`}
                  >
                    <i className="fas fa-download"></i> Tải PDF
                  </button>
                  {invoice.status === "paid" && (
                    <button className={`${styles.btn} ${styles.btnOutline}`}>
                      <i className="fas fa-file-invoice"></i> Xuất biên lai
                    </button>
                  )}
                  <button className={`${styles.btn} ${styles.btnPrimary}`}>
                    <i className="fas fa-eye"></i> Xem chi tiết
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className={styles.pagination}>
            <div className={`${styles.pageItem} ${styles.disabled}`}>
              <i className="fas fa-chevron-left"></i>
            </div>
            <div className={`${styles.pageItem} ${styles.active}`}>1</div>
            <div className={styles.pageItem}>2</div>
            <div className={styles.pageItem}>3</div>
            <div className={styles.pageItem}>4</div>
            <div className={styles.pageItem}>5</div>
            <div className={styles.pageItem}>
              <i className="fas fa-chevron-right"></i>
            </div>
          </div>
        </div>

        {/* Create Invoice Modal */}
        {showModal && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <h3 className={styles.modalTitle}>Tạo hóa đơn mới</h3>
                <div
                  className={styles.modalClose}
                  onClick={() => setShowModal(false)}
                >
                  <i className="fas fa-times"></i>
                </div>
              </div>
              <div className={styles.modalBody}>
                <form className={styles.modalForm}>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Bất động sản</label>
                      <select className={styles.formSelect} required>
                        <option value="">Chọn bất động sản</option>
                        <option value="1">Căn hộ Vinhomes Central Park</option>
                        <option value="2">Căn hộ Sunrise City</option>
                        <option value="3">Biệt thự The Palm</option>
                        <option value="4">Studio Lexington</option>
                        <option value="5">Nhà phố Thảo Điền</option>
                      </select>
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Người thuê</label>
                      <select className={styles.formSelect} required>
                        <option value="">Chọn người thuê</option>
                        <option value="1">Lê Thị Hồng</option>
                        <option value="2">Trần Quốc Bảo</option>
                        <option value="3">Phạm Văn An</option>
                        <option value="4">Nguyễn Văn Dũng</option>
                      </select>
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>
                        Ngày tạo hóa đơn
                      </label>
                      <input
                        type="date"
                        className={styles.formControl}
                        defaultValue="2026-02-01"
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Hạn thanh toán</label>
                      <input
                        type="date"
                        className={styles.formControl}
                        defaultValue="2026-02-10"
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Kỳ thanh toán</label>
                      <select className={styles.formSelect} required>
                        <option value="02-2026">Tháng 2/2026</option>
                        <option value="03-2026">Tháng 3/2026</option>
                        <option value="04-2026">Tháng 4/2026</option>
                      </select>
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Trạng thái</label>
                      <select className={styles.formSelect} required>
                        <option value="unpaid">Chưa thanh toán</option>
                        <option value="paid">Đã thanh toán</option>
                        <option value="partial">Thanh toán một phần</option>
                      </select>
                    </div>
                  </div>

                  <div className={styles.invoiceItemsSection}>
                    <div className={styles.invoiceItemsHeader}>
                      <div className={styles.invoiceItemsTitle}>
                        Chi tiết hóa đơn
                      </div>
                    </div>

                    <table className={styles.invoiceItemsTable}>
                      <thead>
                        <tr>
                          <th style={{ width: "35%" }}>Mục</th>
                          <th>Mô tả</th>
                          <th style={{ width: "15%" }}>Đơn giá</th>
                          <th style={{ width: "15%" }}>Thành tiền</th>
                          <th style={{ width: "5%" }}></th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoiceItems.map((item) => (
                          <tr key={item.id}>
                            <td>
                              <select
                                className={styles.formSelect}
                                defaultValue={item.type}
                              >
                                <option value="rent">Tiền thuê</option>
                                <option value="management">Phí quản lý</option>
                                <option value="electric">Điện</option>
                                <option value="water">Nước</option>
                                <option value="internet">Internet</option>
                                <option value="other">Khác</option>
                              </select>
                            </td>
                            <td>
                              <input
                                type="text"
                                className={styles.formControl}
                                defaultValue={item.description}
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                className={styles.formControl}
                                defaultValue={item.price}
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                className={styles.formControl}
                                defaultValue={item.amount}
                              />
                            </td>
                            <td
                              className={`${styles.removeItem} ${styles.textCenter}`}
                            >
                              <i
                                className="fas fa-times"
                                onClick={() => removeInvoiceItem(item.id)}
                              ></i>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div
                      className={`${styles.addItemBtn} ${styles.mt3}`}
                      onClick={addInvoiceItem}
                    >
                      <i className="fas fa-plus"></i> Thêm mục
                    </div>

                    <div className={`${styles.invoiceTotal} ${styles.mt4}`}>
                      <div>
                        <div className={`${styles.totalRow} ${styles.mb2}`}>
                          <div className={styles.totalLabel}>Tổng cộng:</div>
                          <div className={styles.grandTotal}>
                            {formatCurrency(totalAmount)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`${styles.formGroup} ${styles.mt3}`}>
                    <label className={styles.formLabel}>Ghi chú</label>
                    <textarea
                      className={`${styles.formControl} ${styles.formTextarea}`}
                      rows="3"
                      placeholder="Nhập ghi chú cho hóa đơn này..."
                    ></textarea>
                  </div>
                </form>
              </div>
              <div className={styles.modalFooter}>
                <button
                  className={`${styles.btn} ${styles.btnOutline}`}
                  onClick={() => setShowModal(false)}
                >
                  Hủy
                </button>
                <button className={`${styles.btn} ${styles.btnPrimary}`}>
                  Tạo hóa đơn
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
