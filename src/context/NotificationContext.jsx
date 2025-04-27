import { createContext, useEffect, useState, useContext } from "react";
import { getUserNotifications } from "../services/api/NotificationApi";
import { useAuth } from "./AuthContext";
// NotificationContext.jsx
const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const { token } = useAuth();

  const fetchNotifications = async () => {
    const res = await getUserNotifications();
    if (res.EC === 0) {
      setNotifications(res.result);
    } else return;
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  useEffect(() => {
    if (!token) return;
    // Gọi API ngay lần đầu
    fetchNotifications();
    // Gọi API mỗi 30 giây
    const interval = setInterval(() => {
      fetchNotifications();
    }, 30000);
    // Cleanup khi unmount hoặc token đổi
    return () => clearInterval(interval);
  }, [token]);

  return (
    <NotificationContext.Provider
      value={{ notifications, setNotifications, unreadCount }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
