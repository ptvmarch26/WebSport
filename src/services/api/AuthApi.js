import AxiosInstance from "./axiosInstance";
import { auth, provider, signInWithPopup } from "../../config/firebase";

export const signUp = async (user_name, email, password) => {
  try {
    const res = await AxiosInstance.post("/auth/sign_in", {
      user_name,
      email,
      password,
    });
    return res.data;
  } catch (error) {
    console.error("Lỗi khi đăng ký:", error);
    return error.response.data;
  }
};

// Đăng nhập
export const login = async (user_name, password) => {
  try {
    const res = await AxiosInstance.post("/auth/login", {
      user_name,
      password,
    });
    return res.data;
  } catch (error) {
    console.error("Lỗi khi đăng nhập:", error);
    return error.response.data;
  }
};

// Gửi mã OTP qua email
export const sendOTP = async (email) => {
  try {
    const res = await AxiosInstance.post("/auth/send_otp", { email });
    return res.data;
  } catch (error) {
    return error.response?.data || { EM: "Gửi OTP thất bại" };
  }
};

// Xác thực mã OTP
export const verifyOTP = async (email, otp) => {
  try {
    const res = await AxiosInstance.post("/auth/verify_otp", {
      email,
      otp,
    });
    return res.data;
  } catch (error) {
    return error.response?.data || { EM: "Xác thực OTP thất bại" };
  }
};

// Đặt lại mật khẩu
export const resetPassword = async (email, newPassword) => {
  try {
    const res = await AxiosInstance.patch("/auth/reset_password", {
      email,
      newPassword,
    });
    return res.data;
  } catch (error) {
    console.error("Lỗi khi đặt lại mật khẩu:", error);
    return error.response.data;
  }
};

export const changePassword = async (oldPassword, newPassword) => {
  try {
    const res = await AxiosInstance.patch("/auth/change_password", {
      oldPassword,
      newPassword,
    });
    return res.data;
  } catch (error) {
    if (error.response) {
      const { data } = error.response;
      console.error("Lỗi khi đổi mật khẩu:", data?.EM || "Lỗi không xác định");
    }
    return error.response.data;
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
    const res = await AxiosInstance.post("/auth/login_with_google", {
      email: user.email,
      user_name: user.email,
      uid: user.uid,
    });
    return res.data;
  } catch (error) {
    console.error("Lỗi khi đăng nhập với Google:", error);
  }
};

export const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    throw new Error("Không có refresh token, user chưa đăng nhập.");
  }

  try {
    const res = await AxiosInstance.post("/auth/refresh_token", {
      refreshToken,
    });
    return res.data;
  } catch (error) {
    console.error("Lỗi khi làm mới token:", error);
    throw error;
  }
};