import axios from "axios";

const API_URL = "http://localhost:5000/discount"; 

const getToken = () => localStorage.getItem("accessToken");

// Lấy thông tin chi tiết mã giảm giá theo ID
export const getDetailDiscount = async (discountId) => {
  try {
    const response = await axios.get(`${API_URL}/get-detail/${discountId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`, // Gửi token trong header nếu cần xác thực
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching discount details:", error);
    throw error;
  }
};

// Lấy danh sách tất cả các mã giảm giá
export const getAllDiscounts = async () => {
  try {
    const response = await axios.get(`${API_URL}/get-all`, {
      headers: {
        Authorization: `Bearer ${getToken()}`, // Gửi token trong header nếu cần xác thực
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching all discounts:", error);
    throw error;
  }
};

// Tạo mã giảm giá mới
export const createDiscount = async (discountData) => {
  try {
    const response = await axios.post(
      `${API_URL}/create`,
      discountData,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`, // Gửi token trong header nếu cần xác thực
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error creating discount:", error);
    throw error;
  }
};

// Cập nhật thông tin mã giảm giá
export const updateDiscount = async (discountId, discountData) => {
  try {
    const response = await axios.patch(
      `${API_URL}/update/${discountId}`,
      discountData,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`, // Gửi token trong header nếu cần xác thực
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating discount:", error);
    throw error;
  }
};

// Xóa mã giảm giá
export const deleteDiscount = async (discountId) => {
  try {
    const response = await axios.delete(`${API_URL}/delete/${discountId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`, // Gửi token trong header nếu cần xác thực
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting discount:", error);
    throw error;
  }
};
