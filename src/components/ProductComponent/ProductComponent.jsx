// import React from "react";
import { IoIosStar, IoIosStarHalf } from "react-icons/io";
import { Link } from "react-router-dom";

const ProductComponent = ({
  src,
  alt,
  name,
  oldPrice,
  newPrice,
  start,
  percent,
}) => {
  return (
    <Link to={"/"}>
      <div className="text-black overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
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
            <span className="text-sm line-through text-gray-400">
              {oldPrice?.toLocaleString()} đ
            </span>
          </div>

          {/* Hiển thị sao */}
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, index) => {
              if (index < Math.floor(start)) {
                return (
                  <IoIosStar key={index} className="text-yellow-400 text-xl" />
                );
              } else if (index === Math.floor(start) && start % 1 !== 0) {
                return (
                  <IoIosStarHalf
                    key={index}
                    className="text-yellow-400 text-xl"
                  />
                );
              } else {
                return (
                  <IoIosStar key={index} className="text-gray-400 text-xl" />
                );
              }
            })}
            {/* <span className="ml-2 text-sm">{start.toFixed(1)}</span> */}
          </div>
          <div className="text-sm text-[#158857] font-semibold">
            <span>{percent}% Off</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductComponent;
