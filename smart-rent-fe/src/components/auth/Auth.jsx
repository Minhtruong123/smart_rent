import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";
import styles from "./Auth.module.css";

export default function Auth() {
  const navigate = useNavigate();
  const { signIn, signUp, loading } = useAuthStore();
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState({
    login: false,
    register: false,
    confirm: false,
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "MALE",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    createParticles();
  }, []);

  const createParticles = () => {
    const particleCount = 30;
    const particlesContainer = document.getElementById("particles");

    if (particlesContainer) {
      particlesContainer.innerHTML = "";

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.className = styles.particle;

        const size = Math.random() * 4 + 2;
        particle.style.width = size + "px";
        particle.style.height = size + "px";
        particle.style.left = Math.random() * 100 + "%";
        particle.style.animationDuration = Math.random() * 10 + 15 + "s";
        particle.style.animationDelay = Math.random() * 5 + "s";

        particlesContainer.appendChild(particle);
      }
    }
  };

  const switchToRegister = (e) => {
    e.preventDefault();
    setIsLoginForm(false);
  };

  const switchToLogin = (e) => {
    e.preventDefault();
    setIsLoginForm(true);
  };

  const togglePassword = (field) => {
    setPasswordVisible((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const success = await signIn(loginData.email, loginData.password);
    if (success) {
      navigate("/");
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }

    await signUp({
      fullName: registerData.fullName,
      email: registerData.email,
      phone: registerData.phone,
      gender: registerData.gender,
      password: registerData.password,
    });

    setIsLoginForm(true);
  };
  return (
    <>
      <div className={styles.app}>
        <div className={styles.bgAnimation}>
          <div className={`${styles.gradientOrb} ${styles.orb1}`}></div>
          <div className={`${styles.gradientOrb} ${styles.orb2}`}></div>
          <div className={`${styles.gradientOrb} ${styles.orb3}`}></div>
        </div>

        <div className={styles.particles} id="particles"></div>

        <a href="/" className={styles.backHome}>
          <span className={styles.btnBack}>
            <i className="fas fa-arrow-left"></i>
            Về trang chủ
          </span>
        </a>

        <div className={styles.pageWrapper}>
          <div className={styles.authContainer}>
            <div className={styles.authCard}>
              <div className={styles.logo}>
                <div className={styles.logoIcon}>
                  <i className="fas fa-home"></i>
                </div>
                <div className={styles.logoText}>SmartRent</div>
                <div className={styles.logoTagline}>
                  Tìm nhà thông minh với AI
                </div>
              </div>

              <div className={styles.formContainer}>
                <div className={styles.formWrapper}>
                  {/* Login Form */}
                  <form
                    className={`${styles.authForm} ${!isLoginForm ? styles.slideOutLeft : ""}`}
                    style={{ display: isLoginForm ? "block" : "none" }}
                    onSubmit={handleLoginSubmit}
                  >
                    <div className={styles.authHeader}>
                      <h1 className={styles.authTitle}>Chào mừng trở lại</h1>
                      <p className={styles.authSubtitle}>
                        Đăng nhập để tiếp tục tìm kiếm nhà
                      </p>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel} htmlFor="login-email">
                        Email
                      </label>
                      <div className={styles.inputWrapper}>
                        <input
                          type="email"
                          className={styles.formInput}
                          placeholder="example@email.com"
                          value={loginData.email}
                          onChange={(e) =>
                            setLoginData({
                              ...loginData,
                              email: e.target.value,
                            })
                          }
                          required
                        />
                        <i
                          className={`fas fa-envelope ${styles.inputIcon}`}
                        ></i>
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label
                        className={styles.formLabel}
                        htmlFor="login-password"
                      >
                        Mật khẩu
                      </label>
                      <div className={styles.inputWrapper}>
                        <input
                          type={passwordVisible.login ? "text" : "password"}
                          id="login-password"
                          className={styles.formInput}
                          placeholder="Nhập mật khẩu"
                          value={loginData.password}
                          onChange={(e) =>
                            setLoginData({
                              ...loginData,
                              password: e.target.value,
                            })
                          }
                          required
                        />
                        <i className={`fas fa-lock ${styles.inputIcon}`}></i>
                        <button
                          type="button"
                          className={styles.passwordToggle}
                          onClick={() => togglePassword("login")}
                        >
                          <i
                            className={`fas ${passwordVisible.login ? "fa-eye-slash" : "fa-eye"}`}
                          ></i>
                        </button>
                      </div>
                    </div>

                    <div className={styles.formFooter}>
                      <div className={styles.checkboxWrapper}>
                        <input type="checkbox" id="remember-me" />
                        <label htmlFor="remember-me">Ghi nhớ đăng nhập</label>
                      </div>
                      <a href="#" className={styles.forgotLink}>
                        Quên mật khẩu?
                      </a>
                    </div>

                    <button
                      type="submit"
                      className={`${styles.btn} ${styles.btnPrimary}`}
                    >
                      <i className="fas fa-sign-in-alt"></i>
                      Đăng nhập
                    </button>

                    <div className={styles.divider}>
                      <span>Hoặc đăng nhập với</span>
                    </div>

                    <div className={styles.socialLogin}>
                      <button
                        type="button"
                        className={`${styles.btnSocial} ${styles.btnGoogle}`}
                      >
                        <i className="fab fa-google"></i>
                        Google
                      </button>
                      <button
                        type="button"
                        className={`${styles.btnSocial} ${styles.btnFacebook}`}
                      >
                        <i className="fab fa-facebook-f"></i>
                        Facebook
                      </button>
                    </div>

                    <div className={styles.authSwitch}>
                      Chưa có tài khoản?
                      <a href="#" onClick={switchToRegister}>
                        {" "}
                        Đăng ký ngay
                      </a>
                    </div>
                  </form>

                  {/* Register Form */}
                  <form
                    className={`${styles.authForm} ${isLoginForm ? styles.slideOutRight : ""}`}
                    style={{ display: isLoginForm ? "none" : "block" }}
                    onSubmit={handleRegisterSubmit}
                  >
                    <div className={styles.authHeader}>
                      <h1 className={styles.authTitle}>Tạo tài khoản mới</h1>
                      <p className={styles.authSubtitle}>
                        Đăng ký để bắt đầu tìm kiếm nhà
                      </p>
                    </div>

                    <div className={styles.formGroup}>
                      <label
                        className={styles.formLabel}
                        htmlFor="register-name"
                      >
                        Họ và tên
                      </label>
                      <div className={styles.inputWrapper}>
                        <input
                          type="text"
                          className={styles.formInput}
                          placeholder="Nguyễn Văn A"
                          value={registerData.fullName}
                          onChange={(e) =>
                            setRegisterData({
                              ...registerData,
                              name: e.target.value,
                            })
                          }
                          required
                        />
                        <i className={`fas fa-user ${styles.inputIcon}`}></i>
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label
                        className={styles.formLabel}
                        htmlFor="register-email"
                      >
                        Email
                      </label>
                      <div className={styles.inputWrapper}>
                        <input
                          type="email"
                          className={styles.formInput}
                          placeholder="example@email.com"
                          value={registerData.email}
                          onChange={(e) =>
                            setRegisterData({
                              ...registerData,
                              email: e.target.value,
                            })
                          }
                          required
                        />
                        <i
                          className={`fas fa-envelope ${styles.inputIcon}`}
                        ></i>
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label
                        className={styles.formLabel}
                        htmlFor="register-phone"
                      >
                        Số điện thoại
                      </label>
                      <div className={styles.inputWrapper}>
                        <input
                          type="tel"
                          className={styles.formInput}
                          placeholder="0123 456 789"
                          value={registerData.phone}
                          onChange={(e) =>
                            setRegisterData({
                              ...registerData,
                              phone: e.target.value,
                            })
                          }
                          required
                        />
                        <i className={`fas fa-phone ${styles.inputIcon}`}></i>
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel} htmlFor="gender">
                        Giới tính
                      </label>
                      <div className={styles.inputWrapper}>
                        <select
                          className={styles.formInput}
                          value={registerData.gender}
                          onChange={(e) =>
                            setRegisterData({
                              ...registerData,
                              gender: e.target.value,
                            })
                          }
                          required
                        >
                          <option value="MALE">Nam</option>
                          <option value="FEMALE">Nữ</option>
                          <option value="OTHER">Khác</option>
                        </select>
                        <i
                          className={`fas fa-venus-mars ${styles.inputIcon}`}
                        ></i>
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label
                        className={styles.formLabel}
                        htmlFor="register-password"
                      >
                        Mật khẩu
                      </label>
                      <div className={styles.inputWrapper}>
                        <input
                          type={passwordVisible.register ? "text" : "password"}
                          id="register-password"
                          className={styles.formInput}
                          placeholder="Tối thiểu 8 ký tự"
                          value={registerData.password}
                          onChange={(e) =>
                            setRegisterData({
                              ...registerData,
                              password: e.target.value,
                            })
                          }
                          required
                        />
                        <i className={`fas fa-lock ${styles.inputIcon}`}></i>
                        <button
                          type="button"
                          className={styles.passwordToggle}
                          onClick={() => togglePassword("register")}
                        >
                          <i
                            className={`fas ${passwordVisible.register ? "fa-eye-slash" : "fa-eye"}`}
                          ></i>
                        </button>
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label
                        className={styles.formLabel}
                        htmlFor="register-confirm"
                      >
                        Xác nhận mật khẩu
                      </label>
                      <div className={styles.inputWrapper}>
                        <input
                          type={passwordVisible.confirm ? "text" : "password"}
                          id="register-confirm"
                          className={styles.formInput}
                          placeholder="Nhập lại mật khẩu"
                          value={registerData.confirmPassword}
                          onChange={(e) =>
                            setRegisterData({
                              ...registerData,
                              confirmPassword: e.target.value,
                            })
                          }
                          required
                        />
                        <i className={`fas fa-lock ${styles.inputIcon}`}></i>
                        <button
                          type="button"
                          className={styles.passwordToggle}
                          onClick={() => togglePassword("confirm")}
                        >
                          <i
                            className={`fas ${passwordVisible.confirm ? "fa-eye-slash" : "fa-eye"}`}
                          ></i>
                        </button>
                      </div>
                    </div>

                    <div className={styles.formFooter}>
                      <div className={styles.checkboxWrapper}>
                        <input type="checkbox" id="agree-terms" required />
                        <label htmlFor="agree-terms">
                          Tôi đồng ý với
                          <a href="#" className={styles.forgotLink}>
                            {" "}
                            Điều khoản
                          </a>{" "}
                          và
                          <a href="#" className={styles.forgotLink}>
                            {" "}
                            Chính sách
                          </a>
                        </label>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className={`${styles.btn} ${styles.btnPrimary}`}
                    >
                      <i className="fas fa-user-plus"></i>
                      Tạo tài khoản
                    </button>

                    <div className={styles.divider}>
                      <span>Hoặc đăng ký với</span>
                    </div>

                    <div className={styles.socialLogin}>
                      <button
                        type="button"
                        className={`${styles.btnSocial} ${styles.btnGoogle}`}
                      >
                        <i className="fab fa-google"></i>
                        Google
                      </button>
                      <button
                        type="button"
                        className={`${styles.btnSocial} ${styles.btnFacebook}`}
                      >
                        <i className="fab fa-facebook-f"></i>
                        Facebook
                      </button>
                    </div>

                    <div className={styles.authSwitch}>
                      Đã có tài khoản?
                      <a href="#" onClick={switchToLogin}>
                        {" "}
                        Đăng nhập ngay
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
