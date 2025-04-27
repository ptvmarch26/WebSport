import { createContext, useContext, useState } from "react";
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

  const handleAddToCart = async (
    productId,
    color_name,
    variant_name,
    quantity
  ) => {
    return await addToCart(productId, color_name, variant_name, quantity);
  };

  const handleRemoveFromCart = async (productId, color_name, variant_name) => {
    return await removeFromCart(productId, color_name, variant_name);
  };

  const handleClearCart = async () => {
    return await clearCart();
  };

  const handleDecreaseQuantity = async (
    productId,
    color_name,
    variant_name
  ) => {
    return await decreaseQuantity(productId, color_name, variant_name);
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
