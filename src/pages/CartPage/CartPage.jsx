import React, { useState } from "react";
import CartItemComponent from "../../components/CartItemComponent/CartItemComponent";
import { useNavigate } from "react-router-dom";

const mockData = [
  {
    id: 1,
    name: "Nike Air Force 1 '07",
    category: "Men's Shoes",
    color: "Platinum Violet/Light Violet Ore/Team Gold/Dark Raisin",
    size: 39,
    oldPrice: 500000,
    newPrice: 400000,
    image:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/4898d109-2c6f-4aeb-a098-463f75926f76/AS+W+NSW+PHNX+FLC+FT+HR+PANT+W.png",
    quantity: 1,
  },
  {
    id: 2,
    name: "Nike Air Force 1 '07",
    category: "Men's Shoes",
    color: "White/Black",
    size: 42,
    oldPrice: 550000,
    newPrice: 420000,
    image:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/a6f2a1e0-ffdb-4e91-9eb4-5e7b3d4e82e1/AS+W+NSW+PHNX+FLC+FT+HR+PANT+W.png",
    quantity: 1,
  },
  {
    id: 3,
    name: "Nike Air Force 1 '07",
    category: "Men's Shoes",
    color: "Black/Red",
    size: 41,
    oldPrice: 480000,
    newPrice: 390000,
    image:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/c3a8e8a7-3a4e-4f9e-9d16-fdc9d2e9f2a3/AS+W+NSW+PHNX+FLC+FT+HR+PANT+W.png",
    quantity: 1,
  },
];

const CartPage = () => {
  const [cart, setCart] = useState(mockData);
  const navigate = useNavigate();

  const handleRemove = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handleQuantityChange = (id, quantity) => {
    setCart(
      cart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.newPrice * item.quantity,
    0
  );

  const handleNavigateCheckout = () => {
    navigate("/checkout", { state: { cart, subtotal } }); // Truyền cart qua state
  };

  return (
    <div className="res min-h-[500px]">
      <div className="p-5 grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <h1 className="text-2xl font-bold uppercase mb-4">Giỏ hàng</h1>
          {cart.length === 0 ? (
            <p className="text-center uppercase text-xl font-semibold text-gray-600">
              Hiện không có sản phẩm nào trong giỏ
            </p>
          ) : (
            cart.map((item) => (
              <CartItemComponent
                key={item.id}
                item={item}
                onRemove={handleRemove}
                onQuantityChange={handleQuantityChange}
              />
            ))
          )}
        </div>
        <div>
          <h2 className="text-xl font-semibold uppercase mb-4">Tổng kết</h2>
          <div className="flex justify-between text-lg">
            <span>Tạm tính</span>
            <span>{subtotal.toLocaleString()}₫</span>
          </div>
          <div className="flex justify-between text-lg mt-2">
            <span>Tiền vận chuyển</span>
            <span>Free</span>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between text-xl font-bold">
            <span>Tổng tiền</span>
            <span>{subtotal.toLocaleString()}₫</span>
          </div>
          <button
            className="mt-4 p-3 bg-black hover:opacity-80 text-white w-full rounded uppercase"
            onClick={handleNavigateCheckout}
          >
            Thanh toán
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
