import axios from "axios";

const API_URL = "http://localhost:5000/user";

const getToken = () => localStorage.getItem("accessToken");

export const getUser = async () => {
    try {
      const response = await axios.get(API_URL,{
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      return { EC: 1, EM: "Lỗi khi lấy thông tin người dùng" };
    }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/get_all_user`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy thông tin users:", error);
    throw error;
  }
};

export const changePassword = async (oldPassword, newPassword) => {
  try {
    const response = await axios.patch(
      `${API_URL}/change_password`,
      { oldPassword, newPassword },
      { headers: { Authorization: `Bearer ${getToken()}` } }
    );
    return response.data;
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
};

export const updateUser = async (userData) => {
  console.log("userData", userData);
  
  try {
    const response = await axios.put(API_URL, userData, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const addAddress = async (addressData) => {
  console.log("addressData", addressData);
  try {
    const response = await axios.post(`${API_URL}/address`, addressData, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding address:", error);
    throw error;
  }
};

export const updateAddress = async (index, updateData) => {
  try {
    const response = await axios.patch(`${API_URL}/address/${index}`, updateData, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating address:", error);
    throw error;
  }
};

export const deleteAddress = async (index) => {
  try {
    const response = await axios.delete(`${API_URL}/address/${index}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting address:", error);
    throw error;
  }
};
