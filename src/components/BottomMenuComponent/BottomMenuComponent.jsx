import { FaHome, FaBell, FaHeart, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";

const BottomMenuComponent = () => {
  // Trạng thái yêu thích để thay đổi biểu tượng
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white text-black shadow-lg z-50">
      <div className="flex justify-around items-center py-3">
        <Link
          to="/"
          className="menu-item flex flex-col items-center text-xl text-gray-600 hover:text-gray-800 active:text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#8a7350] transition-all duration-300"
        >
          <FaHome className="text-2xl" />
          <span className="text-sm mt-1">Trang chủ</span>
        </Link>
        <Link
          to="/notifications"
          className="menu-item flex flex-col items-center text-xl text-gray-600 hover:text-gray-800 active:text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#8a7350] transition-all duration-300"
        >
          <FaBell className="text-2xl" />
          <span className="text-sm mt-1">Thông báo</span>
        </Link>
        <Link
          to="/favorite"
          onClick={toggleFavorite}
          className="menu-item flex flex-col items-center text-xl text-gray-600 hover:text-gray-800 active:text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#8a7350] transition-all duration-300"
        >
          {isFavorite ? (
            <FaHeart className="text-2xl text-red-500" /> // Biểu tượng trái tim đặc
          ) : (
            <FaHeart className="text-2xl text-gray-400" /> // Biểu tượng trái tim rỗng
          )}
          <span className="text-sm mt-1">Yêu thích</span>
        </Link>
        <Link
          to="/profile"
          className="menu-item flex flex-col items-center text-xl text-gray-600 hover:text-gray-800 active:text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#8a7350] transition-all duration-300"
        >
          <FaUser className="text-2xl" />
          <span className="text-sm mt-1">Cá nhân</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomMenuComponent;
