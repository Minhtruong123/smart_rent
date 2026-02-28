import React, { useState } from "react";
import {
  X,
  Search,
  Bell,
  Mail,
  Grid,
  Plus,
  Edit,
  Eye,
  Trash2,
  Save,
  Upload,
  Star,
  Info,
  Home,
  DollarSign,
  AlignLeft,
  Image,
  ToggleRight,
  MapPin,
  Bed,
  Bath,
  Square,
  CheckCircle,
  Home as HomeIcon,
  Wrench,
  Building,
} from "lucide-react";
import styles from "./RealEstateManagement.module.css";

export default function RealEstateManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (!files) return;

    const newImages = [...uploadedImages];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = (e) => {
        newImages.push(e.target.result);
        setUploadedImages([...newImages]);
      };

      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index) => {
    const newImages = [...uploadedImages];
    newImages.splice(index, 1);
    setUploadedImages(newImages);
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const files = e.dataTransfer.files;
    const newImages = [...uploadedImages];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();

        reader.onload = (e) => {
          newImages.push(e.target.result);
          setUploadedImages([...newImages]);
        };

        reader.readAsDataURL(file);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className={styles.mainContent}>
        {/* Navbar */}
        <nav className={styles.navbar}>
          <div className={styles.navTitle}>Quản lý Bất động sản</div>
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
              <Grid size={20} />
            </div>
          </div>
        </nav>

        {/* Dashboard Container */}
        <div className={styles.dashboardContainer}>
          {/* Page Header */}
          <div className={styles.pageHeader}>
            <div>
              <h1 className={styles.pageTitle}>Quản lý Bất động sản</h1>
              <p className={styles.pageSubtitle}>
                Quản lý tất cả bất động sản cho thuê của bạn
              </p>
            </div>
            <button
              className={styles.btnPrimary}
              onClick={() => setIsModalOpen(true)}
            >
              <Plus size={18} /> Thêm BĐS mới
            </button>
          </div>

          {/* Stats Cards */}
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <div className={styles.statTitle}>Tổng bất động sản</div>
                <div className={`${styles.statIcon} ${styles.primary}`}>
                  <Building size={20} />
                </div>
              </div>
              <div className={styles.statValue}>24</div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <div className={styles.statTitle}>Đang cho thuê</div>
                <div className={`${styles.statIcon} ${styles.info}`}>
                  <HomeIcon size={20} />
                </div>
              </div>
              <div className={styles.statValue}>18</div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <div className={styles.statTitle}>Còn trống</div>
                <div className={`${styles.statIcon} ${styles.success}`}>
                  <CheckCircle size={20} />
                </div>
              </div>
              <div className={styles.statValue}>5</div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <div className={styles.statTitle}>Đang bảo trì</div>
                <div className={`${styles.statIcon} ${styles.warning}`}>
                  <Wrench size={20} />
                </div>
              </div>
              <div className={styles.statValue}>1</div>
            </div>
          </div>

          {/* Filter Bar */}
          <div className={styles.filterBar}>
            <div className={styles.searchBox}>
              <Search className={styles.searchIcon} size={18} />
              <input
                type="text"
                placeholder="Tìm kiếm theo tên, địa chỉ, mã BĐS..."
                className={styles.searchInput}
              />
            </div>

            <div className={styles.filterGroup}>
              <select className={styles.formSelect}>
                <option value="">Tất cả trạng thái</option>
                <option value="available">Còn trống</option>
                <option value="rented">Đã thuê</option>
                <option value="maintenance">Bảo trì</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <select className={styles.formSelect}>
                <option value="">Tất cả loại hình</option>
                <option value="apartment">Căn hộ</option>
                <option value="house">Nhà phố</option>
                <option value="villa">Biệt thự</option>
                <option value="studio">Studio</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <select className={styles.formSelect}>
                <option value="">Sắp xếp theo</option>
                <option value="price-asc">Giá tăng dần</option>
                <option value="price-desc">Giá giảm dần</option>
                <option value="date-new">Mới nhất</option>
                <option value="date-old">Cũ nhất</option>
              </select>
            </div>

            <button className={styles.btnOutline}>
              <span>Lọc nâng cao</span>
            </button>
          </div>

          {/* Properties Grid */}
          <div className={styles.propertiesGrid}>
            {/* Property Card 1 */}
            <div className={styles.propertyCard}>
              <div className={styles.propertyImage}>
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
                  alt="Property"
                />
                <div className={styles.propertyBadge}>
                  <Star size={14} /> Nổi bật
                </div>
                <div
                  className={`${styles.propertyStatus} ${styles.statusAvailable}`}
                >
                  Còn trống
                </div>
              </div>
              <div className={styles.propertyContent}>
                <div className={styles.propertyMeta}>
                  <div className={styles.propertyPrice}>8.5 triệu/tháng</div>
                  <div className={styles.propertyId}>BĐS-001</div>
                </div>
                <h3 className={styles.propertyTitle}>
                  Căn hộ cao cấp Vinhomes Central Park
                </h3>
                <div className={styles.propertyAddress}>
                  <MapPin size={16} className={styles.addressIcon} />
                  <span>
                    Tòa Park 5, 720A Điện Biên Phủ, Quận Bình Thạnh, TP.HCM
                  </span>
                </div>
                <div className={styles.propertyFeatures}>
                  <div className={styles.propertyFeature}>
                    <Bed size={16} /> 2 PN
                  </div>
                  <div className={styles.propertyFeature}>
                    <Bath size={16} /> 2 WC
                  </div>
                  <div className={styles.propertyFeature}>
                    <Square size={16} /> 75m²
                  </div>
                </div>
                <div className={styles.propertyActions}>
                  <button
                    className={`${styles.btnSm} ${styles.btnOutlinePrimary}`}
                  >
                    <Edit size={14} /> Sửa
                  </button>
                  <button className={`${styles.btnSm} ${styles.btnOutline}`}>
                    <Eye size={14} /> Xem
                  </button>
                  <button
                    className={`${styles.btnSm} ${styles.btnOutlineDanger}`}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Property Card 2 */}
            <div className={styles.propertyCard}>
              <div className={styles.propertyImage}>
                <img
                  src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80"
                  alt="Property"
                />
                <div
                  className={`${styles.propertyStatus} ${styles.statusRented}`}
                >
                  Đã thuê
                </div>
              </div>
              <div className={styles.propertyContent}>
                <div className={styles.propertyMeta}>
                  <div className={styles.propertyPrice}>5.5 triệu/tháng</div>
                  <div className={styles.propertyId}>BĐS-002</div>
                </div>
                <h3 className={styles.propertyTitle}>Căn hộ Sunrise City</h3>
                <div className={styles.propertyAddress}>
                  <MapPin size={16} className={styles.addressIcon} />
                  <span>Tòa W3, 23 Nguyễn Hữu Thọ, Quận 7, TP.HCM</span>
                </div>
                <div className={styles.propertyFeatures}>
                  <div className={styles.propertyFeature}>
                    <Bed size={16} /> 1 PN
                  </div>
                  <div className={styles.propertyFeature}>
                    <Bath size={16} /> 1 WC
                  </div>
                  <div className={styles.propertyFeature}>
                    <Square size={16} /> 55m²
                  </div>
                </div>
                <div className={styles.propertyActions}>
                  <button
                    className={`${styles.btnSm} ${styles.btnOutlinePrimary}`}
                  >
                    <Edit size={14} /> Sửa
                  </button>
                  <button className={`${styles.btnSm} ${styles.btnOutline}`}>
                    <Eye size={14} /> Xem
                  </button>
                  <button
                    className={`${styles.btnSm} ${styles.btnOutlineDanger}`}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Property Card 3 */}
            <div className={styles.propertyCard}>
              <div className={styles.propertyImage}>
                <img
                  src="https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80"
                  alt="Property"
                />
                <div
                  className={`${styles.propertyStatus} ${styles.statusMaintenance}`}
                >
                  Bảo trì
                </div>
              </div>
              <div className={styles.propertyContent}>
                <div className={styles.propertyMeta}>
                  <div className={styles.propertyPrice}>15 triệu/tháng</div>
                  <div className={styles.propertyId}>BĐS-003</div>
                </div>
                <h3 className={styles.propertyTitle}>Biệt thự The Palm</h3>
                <div className={styles.propertyAddress}>
                  <MapPin size={16} className={styles.addressIcon} />
                  <span>Khu biệt thự Palm Residence, Quận 9, TP.HCM</span>
                </div>
                <div className={styles.propertyFeatures}>
                  <div className={styles.propertyFeature}>
                    <Bed size={16} /> 4 PN
                  </div>
                  <div className={styles.propertyFeature}>
                    <Bath size={16} /> 3 WC
                  </div>
                  <div className={styles.propertyFeature}>
                    <Square size={16} /> 200m²
                  </div>
                </div>
                <div className={styles.propertyActions}>
                  <button
                    className={`${styles.btnSm} ${styles.btnOutlinePrimary}`}
                  >
                    <Edit size={14} /> Sửa
                  </button>
                  <button className={`${styles.btnSm} ${styles.btnOutline}`}>
                    <Eye size={14} /> Xem
                  </button>
                  <button
                    className={`${styles.btnSm} ${styles.btnOutlineDanger}`}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Property Card 4 */}
            <div className={styles.propertyCard}>
              <div className={styles.propertyImage}>
                <img
                  src="https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80"
                  alt="Property"
                />
                <div
                  className={`${styles.propertyStatus} ${styles.statusAvailable}`}
                >
                  Còn trống
                </div>
              </div>
              <div className={styles.propertyContent}>
                <div className={styles.propertyMeta}>
                  <div className={styles.propertyPrice}>3.5 triệu/tháng</div>
                  <div className={styles.propertyId}>BĐS-004</div>
                </div>
                <h3 className={styles.propertyTitle}>Studio Lexington</h3>
                <div className={styles.propertyAddress}>
                  <MapPin size={16} className={styles.addressIcon} />
                  <span>67 Mai Chí Thọ, An Phú, Quận 2, TP.HCM</span>
                </div>
                <div className={styles.propertyFeatures}>
                  <div className={styles.propertyFeature}>
                    <Bed size={16} /> Studio
                  </div>
                  <div className={styles.propertyFeature}>
                    <Bath size={16} /> 1 WC
                  </div>
                  <div className={styles.propertyFeature}>
                    <Square size={16} /> 35m²
                  </div>
                </div>
                <div className={styles.propertyActions}>
                  <button
                    className={`${styles.btnSm} ${styles.btnOutlinePrimary}`}
                  >
                    <Edit size={14} /> Sửa
                  </button>
                  <button className={`${styles.btnSm} ${styles.btnOutline}`}>
                    <Eye size={14} /> Xem
                  </button>
                  <button
                    className={`${styles.btnSm} ${styles.btnOutlineDanger}`}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Property Card 5 */}
            <div className={styles.propertyCard}>
              <div className={styles.propertyImage}>
                <img
                  src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=800&q=80"
                  alt="Property"
                />
                <div className={styles.propertyBadge}>
                  <Star size={14} /> Hot
                </div>
                <div
                  className={`${styles.propertyStatus} ${styles.statusRented}`}
                >
                  Đã thuê
                </div>
              </div>
              <div className={styles.propertyContent}>
                <div className={styles.propertyMeta}>
                  <div className={styles.propertyPrice}>12 triệu/tháng</div>
                  <div className={styles.propertyId}>BĐS-005</div>
                </div>
                <h3 className={styles.propertyTitle}>Nhà phố Thảo Điền</h3>
                <div className={styles.propertyAddress}>
                  <MapPin size={16} className={styles.addressIcon} />
                  <span>Đường 64, Thảo Điền, Quận 2, TP.HCM</span>
                </div>
                <div className={styles.propertyFeatures}>
                  <div className={styles.propertyFeature}>
                    <Bed size={16} /> 3 PN
                  </div>
                  <div className={styles.propertyFeature}>
                    <Bath size={16} /> 3 WC
                  </div>
                  <div className={styles.propertyFeature}>
                    <Square size={16} /> 150m²
                  </div>
                </div>
                <div className={styles.propertyActions}>
                  <button
                    className={`${styles.btnSm} ${styles.btnOutlinePrimary}`}
                  >
                    <Edit size={14} /> Sửa
                  </button>
                  <button className={`${styles.btnSm} ${styles.btnOutline}`}>
                    <Eye size={14} /> Xem
                  </button>
                  <button
                    className={`${styles.btnSm} ${styles.btnOutlineDanger}`}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Property Card 6 */}
            <div className={styles.propertyCard}>
              <div className={styles.propertyImage}>
                <img
                  src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80"
                  alt="Property"
                />
                <div
                  className={`${styles.propertyStatus} ${styles.statusAvailable}`}
                >
                  Còn trống
                </div>
              </div>
              <div className={styles.propertyContent}>
                <div className={styles.propertyMeta}>
                  <div className={styles.propertyPrice}>6.8 triệu/tháng</div>
                  <div className={styles.propertyId}>BĐS-006</div>
                </div>
                <h3 className={styles.propertyTitle}>
                  Căn hộ Masteri Thảo Điền
                </h3>
                <div className={styles.propertyAddress}>
                  <MapPin size={16} className={styles.addressIcon} />
                  <span>159 Xa Lộ Hà Nội, Thảo Điền, Quận 2, TP.HCM</span>
                </div>
                <div className={styles.propertyFeatures}>
                  <div className={styles.propertyFeature}>
                    <Bed size={16} /> 2 PN
                  </div>
                  <div className={styles.propertyFeature}>
                    <Bath size={16} /> 2 WC
                  </div>
                  <div className={styles.propertyFeature}>
                    <Square size={16} /> 68m²
                  </div>
                </div>
                <div className={styles.propertyActions}>
                  <button
                    className={`${styles.btnSm} ${styles.btnOutlinePrimary}`}
                  >
                    <Edit size={14} /> Sửa
                  </button>
                  <button className={`${styles.btnSm} ${styles.btnOutline}`}>
                    <Eye size={14} /> Xem
                  </button>
                  <button
                    className={`${styles.btnSm} ${styles.btnOutlineDanger}`}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add/Edit Property Modal */}
        {isModalOpen && (
          <div
            className={styles.modalOverlay}
            onClick={() => setIsModalOpen(false)}
          >
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h2 className={styles.modalTitle}>Thêm Bất động sản mới</h2>
                <div
                  className={styles.modalClose}
                  onClick={() => setIsModalOpen(false)}
                >
                  <X size={24} />
                </div>
              </div>

              <div className={styles.modalBody}>
                <form>
                  {/* Thông tin cơ bản */}
                  <h3 className={styles.sectionTitle}>
                    <Info size={18} /> Thông tin cơ bản
                  </h3>

                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>
                        Tiêu đề<span className={styles.required}>*</span>
                      </label>
                      <input
                        type="text"
                        className={styles.formControl}
                        placeholder="Ví dụ: Căn hộ 2PN Vinhomes Central Park"
                        required
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>
                        Loại hình<span className={styles.required}>*</span>
                      </label>
                      <select className={styles.formSelect} required>
                        <option value="">Chọn loại hình</option>
                        <option value="apartment">Căn hộ</option>
                        <option value="house">Nhà phố</option>
                        <option value="villa">Biệt thự</option>
                        <option value="studio">Studio</option>
                        <option value="duplex">Duplex</option>
                        <option value="penthouse">Penthouse</option>
                      </select>
                    </div>

                    <div
                      className={`${styles.formGroup} ${styles.formGridFull}`}
                    >
                      <label className={styles.formLabel}>
                        Địa chỉ<span className={styles.required}>*</span>
                      </label>
                      <input
                        type="text"
                        className={styles.formControl}
                        placeholder="Số nhà, tên đường, phường/xã"
                        required
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>
                        Quận/Huyện<span className={styles.required}>*</span>
                      </label>
                      <select className={styles.formSelect} required>
                        <option value="">Chọn quận/huyện</option>
                        <option value="q1">Quận 1</option>
                        <option value="q2">Quận 2</option>
                        <option value="q3">Quận 3</option>
                        <option value="q7">Quận 7</option>
                        <option value="bt">Bình Thạnh</option>
                        <option value="pn">Phú Nhuận</option>
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>
                        Thành phố<span className={styles.required}>*</span>
                      </label>
                      <select className={styles.formSelect} required>
                        <option value="hcm">TP. Hồ Chí Minh</option>
                        <option value="hn">Hà Nội</option>
                        <option value="dn">Đà Nẵng</option>
                      </select>
                    </div>
                  </div>

                  {/* Chi tiết bất động sản */}
                  <h3 className={styles.sectionTitle}>
                    <Home size={18} /> Chi tiết bất động sản
                  </h3>

                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>
                        Diện tích (m²)<span className={styles.required}>*</span>
                      </label>
                      <input
                        type="number"
                        className={styles.formControl}
                        placeholder="Ví dụ: 75"
                        required
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>
                        Số phòng ngủ<span className={styles.required}>*</span>
                      </label>
                      <input
                        type="number"
                        className={styles.formControl}
                        placeholder="Ví dụ: 2"
                        required
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>
                        Số phòng tắm<span className={styles.required}>*</span>
                      </label>
                      <input
                        type="number"
                        className={styles.formControl}
                        placeholder="Ví dụ: 2"
                        required
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Số tầng</label>
                      <input
                        type="number"
                        className={styles.formControl}
                        placeholder="Ví dụ: 15"
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Hướng nhà</label>
                      <select className={styles.formSelect}>
                        <option value="">Chọn hướng</option>
                        <option value="dong">Đông</option>
                        <option value="tay">Tây</option>
                        <option value="nam">Nam</option>
                        <option value="bac">Bắc</option>
                        <option value="dongbac">Đông Bắc</option>
                        <option value="dongnam">Đông Nam</option>
                        <option value="taybac">Tây Bắc</option>
                        <option value="taynam">Tây Nam</option>
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>
                        Tình trạng nội thất
                      </label>
                      <select className={styles.formSelect}>
                        <option value="">Chọn tình trạng</option>
                        <option value="full">Đầy đủ nội thất</option>
                        <option value="basic">Nội thất cơ bản</option>
                        <option value="empty">Không nội thất</option>
                      </select>
                    </div>
                  </div>

                  {/* Giá cả */}
                  <h3 className={styles.sectionTitle}>
                    <DollarSign size={18} /> Thông tin giá cả
                  </h3>

                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>
                        Giá thuê/tháng (VNĐ)
                        <span className={styles.required}>*</span>
                      </label>
                      <input
                        type="number"
                        className={styles.formControl}
                        placeholder="Ví dụ: 8500000"
                        required
                      />
                      <div className={styles.formHint}>
                        Nhập số tiền không dấu phẩy
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>
                        Tiền cọc<span className={styles.required}>*</span>
                      </label>
                      <input
                        type="number"
                        className={styles.formControl}
                        placeholder="Ví dụ: 17000000"
                        required
                      />
                      <div className={styles.formHint}>
                        Thường bằng 2 tháng tiền thuê
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>
                        Phí quản lý (VNĐ/tháng)
                      </label>
                      <input
                        type="number"
                        className={styles.formControl}
                        placeholder="Ví dụ: 250000"
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>
                        Phí dịch vụ khác
                      </label>
                      <input
                        type="number"
                        className={styles.formControl}
                        placeholder="Ví dụ: 0"
                      />
                    </div>
                  </div>

                  {/* Tiện ích */}
                  <h3 className={styles.sectionTitle}>
                    <Star size={18} /> Tiện ích
                  </h3>

                  <div className={styles.formGrid}>
                    <div
                      className={`${styles.formGroup} ${styles.formGridFull}`}
                    >
                      <div className={styles.amenitiesGrid}>
                        <label className={styles.amenityLabel}>
                          <input type="checkbox" />
                          <span>Điều hòa</span>
                        </label>
                        <label className={styles.amenityLabel}>
                          <input type="checkbox" />
                          <span>Nóng lạnh</span>
                        </label>
                        <label className={styles.amenityLabel}>
                          <input type="checkbox" />
                          <span>Tủ lạnh</span>
                        </label>
                        <label className={styles.amenityLabel}>
                          <input type="checkbox" />
                          <span>Máy giặt</span>
                        </label>
                        <label className={styles.amenityLabel}>
                          <input type="checkbox" />
                          <span>Internet</span>
                        </label>
                        <label className={styles.amenityLabel}>
                          <input type="checkbox" />
                          <span>Truyền hình cáp</span>
                        </label>
                        <label className={styles.amenityLabel}>
                          <input type="checkbox" />
                          <span>Bảo vệ 24/7</span>
                        </label>
                        <label className={styles.amenityLabel}>
                          <input type="checkbox" />
                          <span>Thang máy</span>
                        </label>
                        <label className={styles.amenityLabel}>
                          <input type="checkbox" />
                          <span>Bãi đỗ xe</span>
                        </label>
                        <label className={styles.amenityLabel}>
                          <input type="checkbox" />
                          <span>Hồ bơi</span>
                        </label>
                        <label className={styles.amenityLabel}>
                          <input type="checkbox" />
                          <span>Phòng gym</span>
                        </label>
                        <label className={styles.amenityLabel}>
                          <input type="checkbox" />
                          <span>Sân vườn</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Mô tả */}
                  <h3 className={styles.sectionTitle}>
                    <AlignLeft size={18} /> Mô tả chi tiết
                  </h3>

                  <div className={styles.formGrid}>
                    <div
                      className={`${styles.formGroup} ${styles.formGridFull}`}
                    >
                      <label className={styles.formLabel}>Mô tả</label>
                      <textarea
                        className={`${styles.formControl} ${styles.formTextarea}`}
                        placeholder="Nhập mô tả chi tiết về bất động sản..."
                        rows="5"
                      />
                    </div>
                  </div>

                  {/* Hình ảnh */}
                  <h3 className={styles.sectionTitle}>
                    <Image size={18} /> Hình ảnh
                  </h3>

                  <div className={styles.formGroup}>
                    <div
                      className={styles.imageUploadArea}
                      onClick={() =>
                        document.getElementById("imageInput").click()
                      }
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                    >
                      <div className={styles.imageUploadIcon}>
                        <Upload size={48} />
                      </div>
                      <div className={styles.imageUploadText}>
                        Kéo thả hoặc nhấp để tải ảnh lên
                      </div>
                      <div className={styles.imageUploadHint}>
                        Hỗ trợ: JPG, PNG, WEBP (Tối đa 10MB mỗi ảnh)
                      </div>
                      <input
                        type="file"
                        id="imageInput"
                        multiple
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleImageUpload}
                      />
                    </div>

                    {uploadedImages.length > 0 && (
                      <div className={styles.uploadedImages}>
                        {uploadedImages.map((image, index) => (
                          <div className={styles.uploadedImage} key={index}>
                            <img src={image} alt="Uploaded" />
                            <div
                              className={styles.removeImage}
                              onClick={() => removeImage(index)}
                            >
                              <X size={12} />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Trạng thái */}
                  <h3 className={styles.sectionTitle}>
                    <ToggleRight size={18} /> Trạng thái
                  </h3>

                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>
                        Trạng thái<span className={styles.required}>*</span>
                      </label>
                      <select className={styles.formSelect} required>
                        <option value="available">Còn trống</option>
                        <option value="rented">Đã thuê</option>
                        <option value="maintenance">Đang bảo trì</option>
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Ngày có sẵn</label>
                      <input type="date" className={styles.formControl} />
                    </div>
                  </div>
                </form>
              </div>

              <div className={styles.modalFooter}>
                <button
                  className={styles.btnOutline}
                  onClick={() => setIsModalOpen(false)}
                >
                  Hủy
                </button>
                <button className={styles.btnPrimary}>
                  <Save size={16} /> Lưu bất động sản
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
