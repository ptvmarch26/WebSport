import AxiosInstance from "./axiosInstance";

export const createOrder = async (orderData) => {
  console.log("orderData", orderData);
  try {
    const response = await AxiosInstance.post("/order/create", orderData);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tạo đơn hàng:", error);
    return error.response?.data || null;
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
    if (error.response.status === 403) {
      window.location.href = "/sign-in";
    } else return error.response?.data || null;
  }
};

export const getOrderByUser = async (userId, orderStatus = "all") => {
  try {
    const response = await AxiosInstance.get("/order/get-by-user", {
      params: { userId, orderStatus },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy đơn hàng theo user:", error);
    return null;
  }
};

export const getOrderDetail = async (orderId) => {
  try {
    const response = await AxiosInstance.get(`/order/get-detail/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết đơn hàng:", error);
    return null;
  }
};

export const updateOrderStatus = async (orderId, status) => {
  console.log(orderId, status);
  try {
    const response = await AxiosInstance.patch(
      `/order/update-status/${orderId}`,
      { status }
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật trạng thái đơn hàng:", error);
    return null;
  }
};

export const handleCancelPayment = async (orderCode) => {
  try {
    const response = await AxiosInstance.patch(
      `/order/handle-cancel-payment/${orderCode}`
    );
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi hủy thanh toán:", error);
    return null;
  }
};
