import axios from "axios";

const API_URL = "http://localhost:5000/auth";

// Lấy token từ localStorage
const getToken = () => localStorage.getItem("token");

// Đăng ký tài khoản mới
export const signUp = async (user_name, email, password) => {
  try {
    const res = await axios.post(`${API_URL}/sign_in`, {
      user_name,
      email,
      password,
    });
    return res.data;
  } catch (error) {
    console.error("Lỗi khi đăng ký:", error);
    return null;
  }
};

// Đăng nhập
export const login = async (user_name, password) => {
  try {
    const res = await axios.post(`${API_URL}/login`, {
      user_name,
      password,
    });
    return res.data;
  } catch (error) {
    console.error("Lỗi khi đăng nhập:", error);
    return null;
  }
};

// Gửi mã OTP qua email
export const sendOTP = async (email) => {
  try {
    const res = await axios.post(`${API_URL}/send_otp`, { email });
    return res.data;
  } catch (error) {
    console.error("Lỗi khi gửi OTP:", error);
    return null;
  }
};

// Xác thực mã OTP
export const verifyOTP = async (email, otp) => {
  try {
    const res = await axios.post(`${API_URL}/verify_otp`, { email, otp });
    return res.data;
  } catch (error) {
    console.error("Lỗi khi xác thực OTP:", error);
    return null;
  }
};

// Đặt lại mật khẩu
export const resetPassword = async (email, newPassword) => {
  try {
    const res = await axios.patch(`${API_URL}/reset_password`, {
      email,
      newPassword,
    });
    return res.data;
  } catch (error) {
    console.error("Lỗi khi đặt lại mật khẩu:", error);
    return null;
  }
};

// Đổi mật khẩu (cần token)
export const changePassword = async (oldPassword, newPassword) => {
  try {
    const res = await axios.patch(
      `${API_URL}/change_password`,
      { oldPassword, newPassword },
      {
        headers: { Authorization: `Bearer ${getToken()}` },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Lỗi khi đổi mật khẩu:", error);
    return null;
  }
};
