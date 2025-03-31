import axios from "axios";

const API_URL = "http://localhost:5000/feedback";

// Lấy token từ localStorage
const getToken = () => localStorage.getItem("accessToken");

// Tạo feedback mới
export const createFeedback = async (feedbackData) => {
  try {
    const res = await axios.post(`${API_URL}/create`, feedbackData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Lỗi khi tạo feedback:", error);
    return null;
  }
};

// Cập nhật feedback
export const updateFeedback = async (feedbackId, updateData) => {
  try {
    const res = await axios.patch(`${API_URL}/update/${feedbackId}`, updateData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật feedback:", error);
    return null;
  }
};

// Xóa feedback
export const deleteFeedback = async (feedbackId) => {
  try {
    const res = await axios.delete(`${API_URL}/delete/${feedbackId}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return res.data;
  } catch (error) {
    console.error("Lỗi khi xóa feedback:", error);
    return null;
  }
};

// Lấy danh sách feedback theo productId
export const getAllFeedback = async (productId) => {
  try {
    const res = await axios.get(`${API_URL}/get-all/${productId}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return res.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách feedback:", error);
    return null;
  }
};
