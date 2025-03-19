import axios from "axios";

const API_URL = "http://localhost:5000/order";

export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(`${API_URL}/create`, orderData);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tạo đơn hàng:", error);
    return null;
  }
};

export const getAllOrders = async (orderStatus = "all") => {
  try {
    const response = await axios.get(`${API_URL}/get-all`, {
      params: { orderStatus },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy các đơn hàng:", error);
    return null;
  }
};

export const getOrderByUser = async (userId, orderStatus = "all") => {
  try {
    const response = await axios.get(`${API_URL}/get-by-user`, {
      params: { userId, orderStatus },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy đơn hàng theo user:", error);
    return null;
  }
};

export const getOrderDetail = async (orderId) => {
  try {
    const response = await axios.get(`${API_URL}/get-detail/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết đơn hàng:", error);
    return null;
  }
};

export const previewOrder = async (orderData) => {
  try {
    const response = await axios.post(`${API_URL}/preview`, orderData);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi xem trước đơn hàng:", error);
    return null;
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await axios.put(`${API_URL}/update-status/${orderId}`, { status });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật trạng thái đơn hàng:", error);
    return null;
  }
};
