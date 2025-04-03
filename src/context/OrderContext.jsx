import { createContext, useContext, useState, useEffect } from "react";
import {getAllOrders, getOrderByUser, getOrderDetail, createOrder, previewOrder, updateOrderStatus} from "../services/api/OrderApi";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState(null);

  const fetchOrders = async (orderStatus = "all") => {
    const res = await getAllOrders(orderStatus);
    
    if (res?.EC === 0) {
        setOrders(res.result);
    }
  };

  const fetchOrdersByUser = async (userId, orderStatus = "all") => {
    const res = await getOrderByUser(userId, orderStatus);
    if (res) setOrders(res);

  };

  const fetchOrderDetail = async (orderId) => {
    const res = await getOrderDetail(orderId);
    if (res) setOrderDetails(res);

  };

  const handleCreateOrder = async (orderData) => {
    const res = await createOrder(orderData);
    if (res) fetchOrders(); 

  };

  const handlePreviewOrder = async (orderData) => {
    const res = await previewOrder(orderData);
    return res; 
  };

  const handleUpdateOrderStatus = async (orderId, status) => {
    const res = await updateOrderStatus(orderId, status);
    if (res) fetchOrders(); 

  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        orderDetails,
        fetchOrders,
        fetchOrdersByUser,
        fetchOrderDetail,
        handleCreateOrder,
        handlePreviewOrder,
        handleUpdateOrderStatus,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
