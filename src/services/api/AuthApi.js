import axios from "axios";
import { auth, provider, signInWithPopup } from "../../config/firebase";
const API_URL = "http://localhost:5000/auth";

// Lấy token từ localStorage
const getToken = () => localStorage.getItem("accessToken");

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
    return error.response?.data || { EM: "Gửi OTP thất bại" };
  }
};

// Xác thực mã OTP
export const verifyOTP = async (email, otp) => {
  try {
    const res = await axios.post(`${API_URL}/verify_otp`, { email, otp });
    return res.data;
  } catch (error) {
    return error.response?.data || { EM: "Xác thực OTP thất bại" };
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
    if (error.response) {
      const { data } = error.response;
      console.error("Lỗi khi đổi mật khẩu:", data?.EM || "Lỗi không xác định");
    }
    return null;
  }
};

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("🔥 Firebase User:", {
      email: user.email,
      user_name: user.email,  
      uid: user.uid,
    });
    const res = await axios.post(`${API_URL}/login_with_google`, {
      email: user.email,
      user_name: user.email,
      uid: user.uid,
    });
    return res.data;
  } catch (error) {
    console.error("L��i khi đăng nhập với Google:", error);
  }
};
