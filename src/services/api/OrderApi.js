import AxiosInstance from "./AxiosInstance";

export const createOrder = async (orderData) => {
  try {
    const response = await AxiosInstance.post("/order/create", orderData);
    return response.data;
  } catch (error) {
    return error.response?.data || "Lỗi kết nối đến server";
  }
};

export const getAllOrders = async (orderStatus = "all") => {
  try {
    const response = await AxiosInstance.get("/order/get-all", {
      params: { orderStatus },
    });
    return response.data;
  } catch (error) {
    // nếu lỗi 401 thì redrect về trang login
    if (error.response.status === 403 || error.response.status === 401) {
      window.location.href = "/sign-in";
    } else return error.response?.data || "Lỗi kết nối đến server";
  }
};

export const getOrderByUser = async (userId, orderStatus = "all") => {
  try {
    const response = await AxiosInstance.get("/order/get-by-user", {
      params: { userId, orderStatus },
    });
    return response.data;
  } catch (error) {
    return error.response?.data || "Lỗi kết nối đến server";
  }
};

export const getOrderDetail = async (orderId) => {
  try {
    const response = await AxiosInstance.get(`/order/get-detail/${orderId}`);
    return response.data;
  } catch (error) {
    return error.response?.data || "Lỗi kết nối đến server";
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await AxiosInstance.patch(
      `/order/update-status/${orderId}`,
      { status }
    );
    return response.data;
  } catch (error) {
    return error.response?.data || "Lỗi kết nối đến server";
  }
};

export const handleCancelPayment = async (orderCode) => {
  try {
    const response = await AxiosInstance.patch(
      `/order/handle-cancel-payment/${orderCode}`
    );
    return response.data;
  } catch (error) {
    return error.response?.data || "Lỗi kết nối đến server";
  }
};

export const getRevenue = async (year) => {
  try {
    const response = await AxiosInstance.get(
      `/order/get-revenue/?year=${year}`
    );
    return response.data;
  } catch (error) {
    return error.response?.data || "Lỗi kết nối đến server";
  }
};
