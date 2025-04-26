import AxiosInstance from "./AxiosInstance";

export const getLoginHistory = async () => {
  try {
    const res = await AxiosInstance.get("/login_history");
    return res.data;
  } catch (error) {
    return error.response?.data || "Lỗi kết nối đến server";
  }
};

export const getLoginHistoryById = async (id) => {
  try {
    const res = await AxiosInstance.get(`/login_history/${id}`);
    return res.data;
  } catch (error) {
    return error.response?.data || "Lỗi kết nối đến server";
  }
};
