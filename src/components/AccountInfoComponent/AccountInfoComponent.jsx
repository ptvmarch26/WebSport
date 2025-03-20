import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaUser,
  FaShoppingBag,
  FaBell,
  FaTicketAlt,
  FaSignOutAlt,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaCog, 
} from "react-icons/fa";
import avt_false from "../../assets/images/avatar-false.jpg";
import { Button } from "@material-tailwind/react";
import { useAuth } from "../../context/AuthContext";

const AccountInfoComponent = ({ full_name, src_img, user_name }) => {
  const [selectedKey, setSelectedKey] = useState("/account/profile");
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const defaultAvatar = avt_false;
  const { handleLogout } = useAuth();

  useEffect(() => {
    setSelectedKey(location.pathname);
  }, [location.pathname]);

  const handleNavigate = (path) => {
    setSelectedKey(path);
    navigate(path);
    setIsMenuVisible(false);
  };
  
  const handleSubmitLogout = () => {
    handleLogout();
    navigate("/sign-in");
  };


  const toggleMenuVisibility = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const menuItems = [
    { icon: <FaUser />, text: "Hồ sơ", path: "/account/profile" },
    { icon: <FaEnvelope />, text: "Email", path: "/account/edit-email" },
    {
      icon: <FaPhone className="rotate-90" />,
      text: "Số điện thoại",
      path: "/account/edit-phone",
    },
    { icon: <FaLock />, text: "Mật khẩu", path: "/account/edit-password" },
    { icon: <FaShoppingBag />, text: "Đơn hàng", path: "/orders" },
    { icon: <FaBell />, text: "Thông báo", path: "/notifications" },
    { icon: <FaTicketAlt />, text: "Kho voucher", path: "/vouchers" },
  ];

  return (
    <div className="relative w-full lg:w-72 bg-white lg:bg-[#f6f7f8] shadow-none lg:shadow-md p-0 lg:p-6">
      <div className="flex flex-col items-center">
        <label className="cursor-pointer">
          <img
            className="w-20 h-20 rounded-full object-cover shadow-md"
            src={src_img || defaultAvatar}
            alt="avatar"
          />
        </label>
        <h2 className="text-lg font-semibold mt-3 text-gray-800">
          {full_name}
        </h2>
        <p className="text-gray-500 text-sm">{user_name}</p>
      </div>

      <div className="lg:hidden absolute -top-[30px] right-0">
        <Button
          onClick={toggleMenuVisibility}
          color="white"
          className="flex items-center !shadow-none rounded-md w-full text-left p-4"
        >
          <FaCog className="w-5 h-5 mr-2" /> Cài đặt
        </Button>
      </div>

      {isMenuVisible && (
        <ul className="mt-5 space-y-2">
          <li className="font-semibold text-gray-700 mb-2">
            Thông tin cá nhân
          </li>
          {menuItems.slice(0, 4).map((item) => (
            <MenuItem
              key={item.path}
              icon={item.icon}
              text={item.text}
              path={item.path}
              selectedKey={selectedKey}
              onClick={handleNavigate}
            />
          ))}

          <li className="font-semibold text-gray-700 mt-5 mb-2">Khác</li>
          {menuItems.slice(4).map((item) => (
            <MenuItem
              key={item.path}
              icon={item.icon}
              text={item.text}
              path={item.path}
              selectedKey={selectedKey}
              onClick={() => handleNavigate(item.path)}
            />
          ))}
          <li className="mt-5">
            <Button
              onClick={handleSubmitLogout}
              className="flex items-center bg-[#f6f7f8] shadow-none rounded-none w-full text-left p-4 text-red-600 hover:bg-red-100 transition duration-200 hover:shadow-none"
            >
              <FaSignOutAlt className="w-5 h-5 mr-2" /> Đăng xuất
            </Button>
          </li>
        </ul>
      )}

      <div className="hidden lg:block">
        <ul className="mt-5 space-y-2">
          <li className="font-semibold text-gray-700 mb-2">
            Thông tin cá nhân
          </li>
          {menuItems.slice(0, 4).map((item) => (
            <MenuItem
              key={item.path}
              icon={item.icon}
              text={item.text}
              path={item.path}
              selectedKey={selectedKey}
              onClick={handleNavigate}
            />
          ))}

          <li className="font-semibold text-gray-700 mt-5 mb-2">Khác</li>
          {menuItems.slice(4).map((item) => (
            <MenuItem
              key={item.path}
              icon={item.icon}
              text={item.text}
              path={item.path}
              selectedKey={selectedKey}
              onClick={handleNavigate}
            />
          ))}
          <li className="mt-5">
            <Button
              className="flex items-center bg-[#f6f7f8] shadow-none rounded-none w-full text-left p-4 text-red-600 hover:bg-red-100 transition duration-200 hover:shadow-none"
              onClick={handleLogout}
            >
              <FaSignOutAlt className="w-5 h-5 mr-2" /> Đăng xuất
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
};

const MenuItem = ({ icon, text, path, selectedKey, onClick }) => {
  const isSelected = selectedKey === path;

  return (
    <li
      className={`flex items-center p-4 cursor-pointer transition duration-200 ${
        isSelected
          ? "bg-white text-black border-l-2 border-black"
          : "hover:bg-gray-200 text-black"
      }`}
      onClick={() => onClick(path)}
    >
      {icon} <span className="ml-3">{text}</span>
    </li>
  );
};

export default AccountInfoComponent;
