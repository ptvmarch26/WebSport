import AxiosInstance from "./AxiosInstance";

// Thêm hoặc xóa sản phẩm khỏi danh sách yêu thích
export const updateFavourite = async (productId) => {
  try {
    const res = await AxiosInstance.patch("/favourite", { productId });
    return res.data;
  } catch (error) {
    return error.response?.data || "Lỗi kết nối đến server";
  }
};

// Lấy danh sách sản phẩm yêu thích của người dùng
export const getFavourite = async () => {
  try {
    const res = await AxiosInstance.get("/favourite");
    return res.data;
  } catch (error) {
    return error.response?.data || "Lỗi kết nối đến server";
  }
};

// Xóa toàn bộ danh sách sản phẩm yêu thích
export const clearFavourites = async () => {
  try {
    const res = await AxiosInstance.delete("/favourite");
    return res.data;
  } catch (error) {
    return error.response?.data || "Lỗi kết nối đến server";
  }
};
