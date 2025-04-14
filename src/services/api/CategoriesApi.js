import AxiosInstance from "./axiosInstance";

const createCategory = async (categoryData) => {
  return AxiosInstance.post("/discount/create", categoryData);
};

const getDetailCategory = async (id) => {
  return AxiosInstance.get(`/discount/get-detail/${id}`);
};

const getAllCategory = async (categoryLevel = 1) => {
  return AxiosInstance.get(`/discount/get-all?category_level=${categoryLevel}`);
};

const getSubCategory = async (id) => {
  return AxiosInstance.get(`/discount/get-sub/${id}`);
};

const updateCategory = async (id, updateData) => {
  return AxiosInstance.patch(`/discount/update/${id}`, updateData);
};

const deleteCategory = async (id) => {
  return AxiosInstance.delete(`/discount/delete/${id}`);
};

export {
  createCategory,
  getDetailCategory,
  getAllCategory,
  getSubCategory,
  updateCategory,
  deleteCategory,
};
