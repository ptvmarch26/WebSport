import AxiosInstance from "./AxiosInstance";

export const getCart = async () => {
  try {
    const res = await AxiosInstance.get("/cart");
    return res.data;
  } catch (error) {
    return error.response?.data || "Lỗi kết nối đến server";
  }
};

export const addToCart = async (
  product_id,
  color_name,
  variant_name,
  quantity
) => {
  try {
    const res = await AxiosInstance.post("/cart", {
      product_id,
      color_name,
      variant_name,
      quantity,
    });
    return res.data;
  } catch (error) {
    return error.response?.data || "Lỗi kết nối đến server";
  }
};

export const removeFromCart = async (productId, color_name, variant_name) => {
  try {
    const res = await AxiosInstance.delete(`/cart/${productId}`, {
      data: { color_name, variant_name },
    });
    return res.data;
  } catch (error) {
    return error.response?.data || "Lỗi kết nối đến server";
  }
};

export const clearCart = async () => {
  try {
    const res = await AxiosInstance.delete("/cart");
    return res.data;
  } catch (error) {
    return error.response?.data || "Lỗi kết nối đến server";
  }
};

export const decreaseQuantity = async (productId, color_name, variant_name) => {
  try {
    const res = await AxiosInstance.patch("/cart/decrease_quantity", {
      productId,
      color_name,
      variant_name,
    });
    return res.data;
  } catch (error) {
    return error.response?.data || "Lỗi kết nối đến server";
  }
};
