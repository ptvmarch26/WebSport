import AxiosInstance from "../api/AxiosInstance";

export const getCart = async () => {
  try {
    const res = await AxiosInstance.get("/cart");
    return res.data;
  } catch (error) {
    console.error("Lỗi khi lấy giỏ hàng:", error);
    return null;
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
    console.error("Lỗi khi thêm vào giỏ hàng:", error);
    return null;
  }
};

export const removeFromCart = async (productId, color_name, variant_name) => {
  console.log(productId, color_name, variant_name);
  try {
    const res = await AxiosInstance.delete(`/cart/${productId}`, {
      data: { color_name, variant_name },
    });
    return res.data;
  } catch (error) {
    console.error("Lỗi khi xóa sản phẩm:", error);
    return null;
  }
};

export const clearCart = async () => {
  try {
    const res = await AxiosInstance.delete("/cart");
    return res.data;
  } catch (error) {
    console.error("Lỗi khi xóa giỏ hàng:", error);
    return null;
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
    console.error("Lỗi khi giảm số lượng sản phẩm:", error);
    return null;
  }
};
