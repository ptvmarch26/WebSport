import AxiosInstance from "./AxiosInstance";

export const getUser = async () => {
  try {
    const response = await AxiosInstance.get("/user");
    return response.data;
  } catch (error) {
    return error.response?.data || "Lỗi kết nối đến server";
  }
};

export const getAllUsers = async () => {
  try {
    const response = await AxiosInstance.get("/user/get_all_user");
    return response.data;
  } catch (error) {
    return error.response?.data || "Lỗi kết nối đến server";
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
    return error.response?.data || "Lỗi kết nối đến server";
  }
};

export const updateUser = async (userData) => {
  try {
    const response = await AxiosInstance.put("/user", userData);
    return response.data;
  } catch (error) {
    return error.response?.data || "Lỗi kết nối đến server";
  }
};

export const addAddress = async (addressData) => {
  try {
    const response = await AxiosInstance.post(
      "/user/address",
      addressData
    );
    return response.data;
  } catch (error) {
    return error.response?.data || "Lỗi kết nối đến server";
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
    return error.response?.data || "Lỗi kết nối đến server";
  }
};

export const deleteAddress = async (index) => {
  try {
    const response = await AxiosInstance.delete(`/user/address/${index}`);
    return response.data;
  } catch (error) {
    return error.response?.data || "Lỗi kết nối đến server";
  }
};

export const getDiscount = async () => {
  try {
    const response = await AxiosInstance.get("/user/get-discount");
    return response.data;
  } catch (error) {
    return error.response?.data || "Lỗi kết nối đến server";
  }
};

export const deleteSearch = async (index) => {
  try {
    const response = await AxiosInstance.delete(`/user/delete-search-history/${index}`);
    return response.data;
  } catch (error) {
    return error.response?.data || "Lỗi kết nối đến server";
  }
}

export const getChatHistory = async () => {
  try {
    const response = await AxiosInstance.get("/user/get-chat-history");
    return response.data;
  } catch (error) {
    return error.response?.data || "Lỗi kết nối đến server";
  }
}

export const deleteChatHistory = async () => {
  try {
    const response = await AxiosInstance.delete("/user/delete-chat-history");
    return response.data;
  } catch (error) {
    return error.response?.data || "Lỗi kết nối đến server";
  }
}

export const getChatBotSearch = async (query) => {
  try {
      const response = await AxiosInstance.get("/chat", {
          params: { message: query },
      });

      return response.data;
  } catch (error) {
      return error.response?.data || null;
  }
};