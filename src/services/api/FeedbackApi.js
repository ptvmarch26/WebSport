import AxiosInstance from "../api/AxiosInstance";

// Tạo feedback mới
export const createFeedback = async (feedbackData) => {
  try {
    const res = await AxiosInstance.post("/feedback/create", feedbackData);
    return res.data;
  } catch (error) {
    console.error("Lỗi khi tạo feedback:", error);
    return null;
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
    console.error("Lỗi khi cập nhật feedback:", error);
    return null;
  }
};

// Xóa feedback
export const deleteFeedback = async (feedbackId) => {
  try {
    const res = await AxiosInstance.delete(`/feedback/delete/${feedbackId}`);
    return res.data;
  } catch (error) {
    console.error("Lỗi khi xóa feedback:", error);
    return null;
  }
};

// Lấy danh sách feedback theo productId
export const getAllFeedback = async (productId) => {
  try {
    const res = await AxiosInstance.get(`/feedback/get-all/${productId}`);
    return res.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách feedback:", error);
    return null;
  }
};
