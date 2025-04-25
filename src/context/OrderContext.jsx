import { createContext, useContext, useState } from "react";
import {
  getAllOrders,
  getOrderByUser,
  getOrderDetail,
  createOrder,
  updateOrderStatus,
} from "../services/api/OrderApi";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState(null);

  const fetchOrders = async (orderStatus = "all") => {
    const res = await getAllOrders(orderStatus);
    if (res?.EC === 0) {
      setOrders(res.result);
      return res.result;
    }
  };

  const fetchOrdersByUser = async (userId, orderStatus = "all") => {
    const res = await getOrderByUser(userId, orderStatus);
    setOrders(res?.result);
    return res;
  };

  const fetchOrderDetail = async (orderId) => {
    const res = await getOrderDetail(orderId);
    if (res) setOrderDetails(res?.result);
    return res.result;
  };

  const handleCreateOrder = async (orderData) => {
    const res = await createOrder(orderData);
    return res;
  };

  const handleUpdateOrderStatus = async (orderId, status) => {
    return await updateOrderStatus(orderId, status);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        setOrders,
        orderDetails,
        fetchOrders,
        fetchOrdersByUser,
        fetchOrderDetail,
        handleCreateOrder,
        handleUpdateOrderStatus,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
