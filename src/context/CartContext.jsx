import { createContext, useContext, useEffect, useState } from "react";
import {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
  decreaseQuantity,
} from "../services/api/CartApi";

// Tạo Context
const CartContext = createContext();


export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);


  const fetchCart = async () => {
    const data = await getCart();
    setCart(data?.result || []);
    return data;
  };

  const handleAddToCart = async (productId) => {
    return await addToCart(productId);
  };

  const handleRemoveFromCart = async (productId) => {
    return await removeFromCart(productId);
    
  };

  const handleClearCart = async () => {
    return await clearCart();
  };

  const handleDecreaseQuantity = async (productId) => {
    return await decreaseQuantity(productId);
  };

  

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        fetchCart,
        handleAddToCart,
        handleRemoveFromCart,
        handleClearCart,
        handleDecreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
