import axios from "axios";

const API_URL = "http://localhost:5000/category"; // Điều chỉnh URL backend nếu cần

const getToken = () => localStorage.getItem("accessToken");


const createCategory = async (categoryData) => {
  return axios.post(`${API_URL}/create`, categoryData, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
};

const getDetailCategory = async (id) => {
  return axios.get(`${API_URL}/get-detail/${id}`);
};

const getAllCategory = async (categoryLevel=1) => {
  return axios.get(`${API_URL}/get-all?category_level=${categoryLevel}`);
};

const getSubCategory = async (id) => {
  return axios.get(`${API_URL}/get-sub/${id}`);
};

const updateCategory = async (id, updateData) => {
  return axios.patch(`${API_URL}/update/${id}`, updateData, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
};

const deleteCategory = async (id) => {
  return axios.delete(`${API_URL}/delete/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
};

export {
  createCategory,
  getDetailCategory,
  getAllCategory,
  getSubCategory,
  updateCategory,
  deleteCategory,
};
