import AxiosInstance from "./axiosInstance";

// Thêm hoặc xóa sản phẩm khỏi danh sách yêu thích
export const updateFavourite = async (productId) => {
  try {
    const res = await AxiosInstance.patch("/favourite", { productId });
    return res.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật danh sách yêu thích:", error);
    return null;
  }
};

// Lấy danh sách sản phẩm yêu thích của người dùng
export const getFavourite = async () => {
  try {
    const res = await AxiosInstance.get("/favourite");
    return res.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách yêu thích:", error);
    return error.response.data;
  }
};

// Xóa toàn bộ danh sách sản phẩm yêu thích
export const clearFavourites = async () => {
  try {
    const res = await AxiosInstance.delete("/favourite");
    return res.data;
  } catch (error) {
    console.error("Lỗi khi xóa danh sách yêu thích:", error);
    return null;
  }
};
