import AxiosInstance from "./AxiosInstance";

export const getPaymentInfoByOrderCode = async (orderCode) => {
    try {
      const response = await AxiosInstance.get(`/payment/info-of-payment/${orderCode}`);
      return response.data;
    } catch (error) {
      return error.response?.data || "Lỗi kết nối đến server";
    }
  };