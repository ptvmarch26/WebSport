import AxiosInstance from "./AxiosInstance";

const createCategory = async (categoryData) => {
  try {
    return AxiosInstance.post("/category/create", categoryData);
  } catch (error) {
    return error.response?.data || "Lỗi kết nối đến server";
  }
};

const getDetailCategory = async (id) => {
  try {
    return AxiosInstance.get(`/category/get-detail/${id}`);
  } catch (error) {
    return error.response?.data || "Lỗi kết nối đến server";
  }
};

const getAllCategory = async (categoryLevel = 1) => {
  try {
    return AxiosInstance.get(
      `/category/get-all?category_level=${categoryLevel}`
    );
  } catch (error) {
    return error.response?.data || "Lỗi kết nối đến server";
  }
};

const getSubCategory = async (id) => {
  try {
    return AxiosInstance.get(`/category/get-sub/${id}`);
  } catch (error) {
    return error.response?.data || "Lỗi kết nối đến server";
  }
};

const updateCategory = async (id, updateData) => {
  try {
    return AxiosInstance.patch(`/category/update/${id}`, updateData);
  } catch (error) {
    return error.response?.data || "Lỗi kết nối đến server";
  }
};

const deleteCategory = async (id) => {
  try {
    return AxiosInstance.delete(`/category/delete/${id}`);
  } catch (error) {
    return error.response?.data || "Lỗi kết nối đến server";
  }
};

export {
  createCategory,
  getDetailCategory,
  getAllCategory,
  getSubCategory,
  updateCategory,
  deleteCategory,
};
