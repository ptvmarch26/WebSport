import AxiosInstance from "./axiosInstance";

export const getUser = async () => {
  try {
    const response = await AxiosInstance.get("/user");
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy thông tin người dùng:", error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await AxiosInstance.get("/user/get_all_user");
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy thông tin users:", error);
    throw error;
  }
};

export const changePassword = async (oldPassword, newPassword) => {
  try {
    const response = await AxiosInstance.patch("/user/change_password", {
      oldPassword,
      newPassword,
    });
    return response.data;
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
};

export const updateUser = async (userData) => {
  console.log("userData", userData);

  try {
    const response = await AxiosInstance.put("/user", userData);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const addAddress = async (addressData) => {
  console.log("addressData", addressData);
  try {
    const response = await AxiosInstance.post(
      "/user/address",
      addressData
    );
    return response.data;
  } catch (error) {
    console.error("Error adding address:", error);
    throw error;
  }
};

export const updateAddress = async (index, updateData) => {
  try {
    const response = await AxiosInstance.patch(
      `/user/address/${index}`,
      updateData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating address:", error);
    throw error;
  }
};

export const deleteAddress = async (index) => {
  try {
    const response = await AxiosInstance.delete(`/user/address/${index}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting address:", error);
    throw error;
  }
};

export const getDiscount = async () => {
  try {
    const response = await AxiosInstance.get("/user/get-discount");
    return response.data;
  } catch (error) {
    console.error("Error fetching discount:", error);
    throw error;
  }
};
