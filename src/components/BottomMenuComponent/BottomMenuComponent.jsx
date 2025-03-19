import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { IoHomeOutline } from "react-icons/io5";
import { IoHomeSharp } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoMdNotifications } from "react-icons/io";
import { HiOutlineClipboardList } from "react-icons/hi";
import { HiClipboardList } from "react-icons/hi";

const BottomMenuComponent = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const location = useLocation();

  const menuItems = [
    {
      path: "/",
      iconDefault: <IoHomeOutline />,
      iconActive: <IoHomeSharp />,
      label: "Trang chủ",
    },
    {
      path: "/notifications",
      iconDefault: <IoIosNotificationsOutline />,
      iconActive: <IoMdNotifications />,
      label: "Thông báo",
    },
    {
      path: "/favorite",
      iconDefault: <FaRegHeart />,
      iconActive: <FaHeart />,
      label: "Yêu thích",
    },
    {
      path: "/orders",
      iconDefault: <HiOutlineClipboardList />,
      iconActive: <HiClipboardList />,
      label: "Đơn hàng",
    },
  ];

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const isActive = (index, path) =>
    index === hoveredIndex || location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 bg-white shadow-[0_-4px_10px_0_rgba(0,0,0,0.2)] flex justify-around items-center py-2 lg:hidden">
      {menuItems.map((item, index) => (
        <Link
          key={index}
          to={item.path}
          className={`flex flex-col items-center text-black text-2xl md:text-xl hover:text-black ${
            isActive(index, item.path) ? "text-black" : ""
          }`}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          {isActive(index, item.path) ? item.iconActive : item.iconDefault}
          <span className="text-sm">{item.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default BottomMenuComponent;
