import AxiosInstance from "./AxiosInstance";

// Lấy thông tin chi tiết mã giảm giá theo ID
export const getDetailDiscount = async (discountId) => {
  try {
    const response = await AxiosInstance.get(
      `/discount/get-detail/${discountId}`
    );
    return response.data;
  } catch (error) {
    return error.response?.data || "Lỗi kết nối đến server";
  }
};

// Lấy danh sách tất cả các mã giảm giá
export const getAllDiscounts = async () => {
  try {
    const response = await AxiosInstance.get(`/discount/get-all`);
    return response.data;
  } catch (error) {
    return error.response?.data || "Lỗi kết nối đến server";
  }
};

// Tạo mã giảm giá mới
export const createDiscount = async (discountData) => {
  try {
    const response = await AxiosInstance.post(`/discount/create`, discountData);
    return response.data;
  } catch (error) {
    return error.response?.data || "Lỗi kết nối đến server";
  }
};

// Cập nhật thông tin mã giảm giá
export const updateDiscount = async (discountId, discountData) => {
  try {
    const response = await AxiosInstance.patch(
      `/discount/update/${discountId}`,
      discountData
    );
    return response.data;
  } catch (error) {
    return error.response?.data || "Lỗi kết nối đến server";
  }
};

// Xóa mã giảm giá
export const deleteDiscount = async (discountId) => {
  try {
    const response = await AxiosInstance.delete(
      `/discount/delete/${discountId}`
    );
    return response.data;
  } catch (error) {
    return error.response?.data || "Lỗi kết nối đến server";
  }
};

export const getDiscountForOrder = async (productIds) => {
  try {
    const response = await AxiosInstance.post("/discount/get-for-order", {
      productIds,
    });
    return response.data;
  } catch (error) {
    return error.response?.data || "Lỗi kết nối đến server";
  }
};
