import axios from "axios";

const API_URL = "http://localhost:5000/favourite";

// Lấy token từ localStorage
const getToken = () => localStorage.getItem("accessToken");

// Thêm hoặc xóa sản phẩm khỏi danh sách yêu thích
export const updateFavourite = async (productId) => {
  try {
    const res = await axios.patch(
      API_URL,
      { productId },
      {
        headers: { Authorization: `Bearer ${getToken()}` },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật danh sách yêu thích:", error);
    return null;
  }
};

// Lấy danh sách sản phẩm yêu thích của người dùng
export const getFavourite = async () => {
  try {
    const res = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return res.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách yêu thích:", error);
    return error.response.data;
  }
};

// Xóa toàn bộ danh sách sản phẩm yêu thích
export const clearFavourites = async () => {
  try {
    const res = await axios.delete(API_URL, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return res.data;
  } catch (error) {
    console.error("Lỗi khi xóa danh sách yêu thích:", error);
    return null;
  }
};
