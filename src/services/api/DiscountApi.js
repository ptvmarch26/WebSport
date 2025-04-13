import AxiosInstance from "./axiosInstance";

// Lấy thông tin chi tiết mã giảm giá theo ID
export const getDetailDiscount = async (discountId) => {
  try {
    const response = await AxiosInstance.get(
      `/discount/get-detail/${discountId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching discount details:", error);
    throw error;
  }
};

// Lấy danh sách tất cả các mã giảm giá
export const getAllDiscounts = async () => {
  try {
    const response = await AxiosInstance.get(`/discount/get-all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all discounts:", error);
    throw error;
  }
};

// Tạo mã giảm giá mới
export const createDiscount = async (discountData) => {
  try {
    const response = await AxiosInstance.post(`/discount/create`, discountData);
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
    const response = await AxiosInstance.patch(
      `/discount/update/${discountId}`,
      discountData
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
    const response = await AxiosInstance.delete(
      `/discount/delete/${discountId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting discount:", error);
    throw error;
  }
};

export const getDiscountForOrder = async (productIds) => {
  console.log(productIds);
  try {
    const response = await AxiosInstance.post("/discount/get-for-order", {
      productIds,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching discount for order:", error);
    throw error;
  }
};
