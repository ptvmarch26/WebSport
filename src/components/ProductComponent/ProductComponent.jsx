// import React from "react";
import { IoIosStar, IoIosStarHalf } from "react-icons/io";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi";
import {
  getFavourite,
  updateFavourite,
} from "../../services/api/FavouriteApi"; // import API

const ProductComponent = ({
  src,
  productId,
  alt,
  name,
  oldPrice,
  newPrice,
  star,
  percent,
  onClick,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const toggleFavorite = async () => {
    setIsFavorite(!isFavorite);
    const res = await updateFavourite(productId); // Gọi API để cập nhật danh sách yêu thích
    console.log(res);
  };

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      const favouritesData = await getFavourite();

      if (favouritesData && favouritesData.result) {
        setIsFavorite(favouritesData.result.includes(productId));
      }
    };

    fetchFavoriteStatus();
  }, [productId]);

  return (
    <div className="relative group text-black overflow-hidden shadow-sm hover:shadow-xl transition-transform duration-300 transform cursor-pointer">
      <div
        onClick={onClick}
        className="relative w-full h-[250px] overflow-hidden"
      >
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <h4 className="text-base font-semibold line-clamp-2 min-h-[38.4px] md:min-h-[48px] mb-3">
          {name}
        </h4>
        <div className="flex items-center justify-between mb-2">
          <span className="text-base font-bold text-[#ba2b20]">
            {newPrice?.toLocaleString()} đ
          </span>
          {oldPrice > 0 && (
            <span className="text-sm line-through text-gray-400">
              {oldPrice?.toLocaleString()} đ
            </span>
          )}
        </div>

        {/* Hiển thị sao + yêu thích*/}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => {
              const fullStars = Math.floor(star);
              const isHalfStar = star % 1 !== 0 && index === fullStars;

              return isHalfStar ? (
                <IoIosStarHalf
                  key={index}
                  className="text-yellow-400 text-xl"
                />
              ) : (
                <IoIosStar
                  key={index}
                  className={`text-xl ${
                    index < fullStars ? "text-yellow-400" : "text-gray-400"
                  }`}
                />
              );
            })}
          </div>
        </div>

        <div className="text-sm text-[#158857] font-semibold">
          <span>{percent}% Off</span>
        </div>

        <div className="absolute top-[10px] left-0 flex flex-col items-center gap-2 px-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          {/* Button Thêm vào giỏ */}
          <button className="p-2 hover:scale-105 rounded-full bg-gray-200 transition cursor-pointer font-semibold shadow-md hover:shadow-lg">
            <HiOutlineShoppingCart className="text-xl" />
          </button>

          {/* Button Yêu thích */}
          <button
            className="p-2 hover:scale-105 rounded-full bg-gray-200 transition cursor-pointer shadow-md hover:shadow-lg"
            onClick={toggleFavorite}
          >
            {isFavorite ? (
              <FaHeart className="text-red-500 text-xl" />
            ) : (
              <FaRegHeart className="text-xl" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductComponent;
