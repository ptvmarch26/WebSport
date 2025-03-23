import axios from "axios";

const API_URL = "http://localhost:5000/product";

const getToken = () => localStorage.getItem("accessToken");

export const createProduct = async (productData) => {
  try {
    const response = await post(`${API_URL}/create`, productData, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
            'Content-Type': 'multipart/form-data'
        },
    });

    return response.data;
  } catch (error) {
    console.error("Lỗi khi tạo sản phẩm:", error);
    return null;
  }
};

export const updateProduct = async (productId, updatedData) => {
  try {
    const res = await axios.patch(`${API_URL}/update/${productId}`, updatedData, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return res.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật sản phẩm:", error);
    return null;
  }
};

export const getDetailsProduct = async (productId) => {
  try {
    const res = await axios.get(`${API_URL}/details/${productId}`);
    return res.data;
  } catch (error) {
    console.error("Lỗi khi lấy thông tin sản phẩm:", error);
    return null;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const res = await axios.delete(`${API_URL}/delete/${productId}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return res.data;
  } catch (error) {
    console.error("Lỗi khi xóa sản phẩm:", error);
    return null;
  }
};

export const getAllProducts = async (limit, page, filters) => {
  try {
    const response = await axios.get(`${API_URL}/get-all`, {
      params: { limit, page, ...filters },
    });
    return response.data;
  } catch (error) {
    return error.response?.data || { EC: 1, EM: "Lỗi khi lấy danh sách sản phẩm" };
  }
};