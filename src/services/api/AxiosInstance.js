import axios from "axios";
import { refreshToken } from "./AuthApi";
const API_URL = import.meta.env.VITE_API_URL;

const AxiosInstance = axios.create({
  baseURL: API_URL,
});

AxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

AxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      try {
        // Gọi refreshToken để lấy lại accessToken mới
        const res = await refreshToken();
        if (res.EC === 0) {
            // Cập nhật lại accessToken trong localStorage
            localStorage.setItem("accessToken", res.result.accessToken);
          // Cập nhật lại token mới trong headers và retry request
          error.config.headers["Authorization"] = `Bearer ${res.accessToken}`;
          return AxiosInstance(error.config);  // Thực hiện lại request với token mới
        }
      } catch {
        return;
      }
    }
    return Promise.reject(error);
  }
);

export default AxiosInstance;
