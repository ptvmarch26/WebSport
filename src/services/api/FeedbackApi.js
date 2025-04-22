import AxiosInstance from "./AxiosInstance";

// Tạo feedback mới
export const createFeedback = async (feedbackData) => {
  try {
    const res = await AxiosInstance.post("/feedback/create", feedbackData);
    return res.data;
  } catch (error) {
    return error.response?.data || "Lỗi kết nối đến server";
  }
};

// Cập nhật feedback
export const updateFeedback = async (feedbackId, updateData) => {
  try {
    const res = await AxiosInstance.patch(
      `/feedback/update/${feedbackId}`,
      updateData
    );
    return res.data;
  } catch (error) {
    return error.response?.data || "Lỗi kết nối đến server";
  }
};

// Xóa feedback
export const deleteFeedback = async (feedbackId) => {
  try {
    const res = await AxiosInstance.delete(`/feedback/delete/${feedbackId}`);
    return res.data;
  } catch (error) {
    return error.response?.data || "Lỗi kết nối đến server";
  }
};

// Lấy danh sách feedback theo productId
export const getAllFeedback = async (productId) => {
  try {
    const res = await AxiosInstance.get(`/feedback/get-all/${productId}`);
    return res.data;
  } catch (error) {
    return error.response?.data || "Lỗi kết nối đến server";
  }
};
