// import React from "react";
import { IoIosStar, IoIosStarHalf } from "react-icons/io";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { getFavourite, updateFavourite } from "../../services/api/FavouriteApi"; // import API
const ProductComponent = ({ item, onClick }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = async () => {
    setIsFavorite(!isFavorite);
    const res = await updateFavourite(item._id); // Gọi API để cập nhật danh sách yêu thích
    console.log(res);
  };

  useEffect(() => {
    console.log("aaaaa", item._id);
    const fetchFavoriteStatus = async () => {
      const favouritesData = await getFavourite();

      if (favouritesData && favouritesData.result) {
        setIsFavorite(favouritesData.result.includes(item._id));
      }
    };

    fetchFavoriteStatus();
  }, [item._id]);

  return (
    <div className="relative group text-black overflow-hidden shadow-sm hover:shadow-xl transition-transform duration-300 transform cursor-pointer">
      <div
        onClick={onClick}
        className="relative w-full h-[250px] overflow-hidden"
      >
        <img
          src={item.product_img}
          alt={item.product_title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h4 className="text-base font-semibold line-clamp-2 min-h-[38.4px] md:min-h-[48px] mb-3">
          {item.product_title}
        </h4>
        <div className="flex items-center justify-between mb-2">
          <span className="text-base font-bold text-[#ba2b20]">
            {item.product_price.toLocaleString()} đ
          </span>
          {item.product_percent_discount > 0 && (
            <span className="text-sm line-through text-gray-400">
              {(
                item.product_price *
                (1 - item.product_percent_discount / 100)
              )?.toLocaleString()}{" "}
              đ
            </span>
          )}
        </div>

        {/* Hiển thị sao + yêu thích*/}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => {
              const fullStars = Math.floor(item.product_rate);
              const isHalfStar =
                item.product_rate % 1 !== 0 && index === fullStars;

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
          {item.product_percent_discount > 0 && (
            <span>{item.product_percent_discount}% Off</span>
          )}
        </div>

        <div className="absolute top-[20px] right-0 flex flex-col items-center gap-2 px-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
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
