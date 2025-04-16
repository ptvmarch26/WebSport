import AxiosInstance from "./axiosInstance";

const createCategory = async (categoryData) => {
  return AxiosInstance.post("/category/create", categoryData);
};

const getDetailCategory = async (id) => {
  return AxiosInstance.get(`/category/get-detail/${id}`);
};

const getAllCategory = async (categoryLevel = 1) => {
  return AxiosInstance.get(`/category/get-all?category_level=${categoryLevel}`);
};

const getSubCategory = async (id) => {
  return AxiosInstance.get(`/category/get-sub/${id}`);
};

const updateCategory = async (id, updateData) => {
  return AxiosInstance.patch(`/category/update/${id}`, updateData);
};

const deleteCategory = async (id) => {
  return AxiosInstance.delete(`/category/delete/${id}`);
};

export {
  createCategory,
  getDetailCategory,
  getAllCategory,
  getSubCategory,
  updateCategory,
  deleteCategory,
};
