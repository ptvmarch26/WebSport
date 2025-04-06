import axios from "axios";

const API_URL = "http://localhost:5000/cart"; 

const getToken = () => localStorage.getItem("accessToken");

export const getCart = async () => {
  try {
    const res = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return res.data;
  } catch (error) {
    console.error("Lỗi khi lấy giỏ hàng:", error);
    return null;
  }
};

export const addToCart = async (product_id, color_name, variant_name) => {
  try {
    const res = await axios.post(
      API_URL,
      { product_id , color_name, variant_name },
      {
        headers: { Authorization: `Bearer ${getToken()}` },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Lỗi khi thêm vào giỏ hàng:", error);
    return null;
  }
};

export const removeFromCart = async (productId, color_name, variant_name) => {
  console.log(productId, color_name, variant_name);
  try {
    const res = await axios.delete(`${API_URL}/${productId}`, {
      data: { color_name, variant_name },
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return res.data;
  } catch (error) {
    console.error("Lỗi khi xóa sản phẩm:", error);
    return null;
  }
};

export const clearCart = async () => {
  try {
    const res = await axios.delete(`${API_URL}/`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return res.data;
  } catch (error) {
    console.error("Lỗi khi xóa giỏ hàng:", error);
    return null;
  }
};

export const decreaseQuantity = async (productId, color_name, variant_name) => {
  try {
    const res = await axios.patch(
      `${API_URL}/decrease_quantity`,
      { productId, color_name, variant_name },
      {
        headers: { Authorization: `Bearer ${getToken()}` },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Lỗi khi giảm số lượng sản phẩm:", error);
    return null;
  }
};
