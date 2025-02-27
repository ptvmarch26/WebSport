// import React from "react";
import { IoIosStar, IoIosStarHalf } from "react-icons/io";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";

const ProductComponent = ({
  src,
  alt,
  name,
  oldPrice,
  newPrice,
  star,
  percent,
}) => {
  
  const [isFavorite, setIsFavorite] = useState(false);
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <Link to={"/"}>
       <div className="relative group text-black overflow-hidden shadow-sm hover:shadow-xl transition-transform duration-300 hover:scale-105 transform rounded-lg">
          <div className="relative">
            <img src={src} alt={alt} className="w-full h-full object-cover" />
          </div>
          <div className="p-4">
            <h4 className="text-base font-semibold line-clamp-2 min-h-[48px] mb-3">
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
                  <IoIosStarHalf key={index} className="text-yellow-400 text-xl" />
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

            <div className="cursor-pointer hover:scale-105" onClick={toggleFavorite}>
              {isFavorite ? (
                <FaHeart className="text-red-500 text-xl" />
              ) : (
                <FaRegHeart className="text-gray-500 text-xl" />
              )}
            </div>
          </div>

          <div className="text-sm text-[#158857] font-semibold">
            <span>{percent}% Off</span>
          </div>
          
          {/* Nút "Mua ngay" và "Thêm vào giỏ hàng" */}
          <div className="absolute bottom-44 left-0 right-0 flex justify-between px-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            {/* Button Thêm vào giỏ */}
            <button className="bg-gradient-to-r from-green-400 to-green-600 text-black px-5 py-2 rounded-lg text-sm font-semibold hover:from-green-500 hover:to-green-700 transition-all duration-300 flex items-center space-x-2 shadow-md hover:scale-105">
              Thêm vào giỏ
            </button>

            {/* Button Mua ngay */}
            <button className="bg-gradient-to-r from-red-400 to-red-600 text-gray-200 px-5 py-2 rounded-lg text-sm font-semibold hover:from-red-500 hover:to-red-700 transition-all duration-300 flex items-center space-x-2 shadow-md hover:scale-105">
              Mua ngay
            </button>
          </div>


        </div>
      </div>
    </Link>
  );
};

export default ProductComponent;
