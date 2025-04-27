import AxiosInstance from "../api/AxiosInstance";

export const createNotificationForAll = async (notificationData) => {
  try {
    const response = await AxiosInstance.post(
      "/notification/create",
      notificationData
    );
    return response.data;
  } catch (error) {
    return error.response?.data || null;
  }
};

export const readNotification = async (notificationId) => {
  try {
    const response = await AxiosInstance.patch(
      `/notification/read/${notificationId}`
    );
    return response.data;
  } catch (error) {
    return error.response?.data || null;
  }
};

export const getUserNotifications = async () => {
  try {
    const response = await AxiosInstance.get(
      "/notification/get-user-notifications/"
    );
    return response.data;
  } catch (error) {
    return error.response?.data || null;
  }
};

export const deleteNotification = async (notificationId) => {
  try {
    const response = await AxiosInstance.delete(
      `/notification/${notificationId}`
    );
    return response.data;
  } catch (error) {
    return error.response?.data || null;
  }
};
