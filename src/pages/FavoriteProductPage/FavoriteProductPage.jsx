import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FavoriteItemComponent from "../../components/FavoriteItemComponent/FavoriteItemComponent";

const FavoriteProductPage = () => {
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
        "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/403542/01/sv01/fnd/PNA/fmt/png/ST-Miler-Camo-Sneakers",
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
        "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/402095/01/sv01/fnd/PNA/fmt/png/CA-Pro-Rain-Map-Camo-Sneakers",
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
        "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/402095/01/sv01/fnd/PNA/fmt/png/CA-Pro-Rain-Map-Camo-Sneakers",
      quantity: 1,
    },
  ];
  const [cart, setCart] = useState(mockData);
  const navigate = useNavigate();

  // Hàm xóa sản phẩm khỏi danh sách
  const handleRemove = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <div className="xl:max-w-[1200px] container mx-auto py-10 px-2">
      <div className="border rounded-lg p-10">
        <div className="flex justify-between gap-2 flex-wrap">
          <h2 className="uppercase text-xl font-semibold">
            Danh sách sản phẩm yêu thích
          </h2>
          <p>{cart.length} sản phẩm</p>
        </div>
        <div className="border-t-2 border-[rgba(0, 0, 0, 0.1)] w-full my-8"></div>
        {cart.length === 0 ? (
          <p className="text-center uppercase text-xl font-semibold text-gray-600">
            Hiện không có sản phẩm nào trong danh sách
          </p>
        ) : (
          cart.map((item) => (
            <FavoriteItemComponent
              key={item.id}
              item={item}
              onRemove={handleRemove} // Truyền hàm xóa vào component con
            />
          ))
        )}
      </div>
    </div>
  );
};

export default FavoriteProductPage;
