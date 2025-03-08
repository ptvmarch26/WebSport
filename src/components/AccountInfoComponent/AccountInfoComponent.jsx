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
} from "react-icons/fa";
import avt_false from "../../assets/images/avatar-false.jpg";
import { Button } from "@material-tailwind/react";

const AccountInfoComponent = ({ full_name, src_img, user_name }) => {
  const [selectedKey, setSelectedKey] = useState("/account/profile");
  const navigate = useNavigate();
  const location = useLocation();
  const defaultAvatar = avt_false;

  useEffect(() => {
    setSelectedKey(location.pathname);
  }, [location.pathname]);

  const handleNavigate = (path) => {
    setSelectedKey(path);
    navigate(path);
  };

  const handleLogout = () => {
    navigate("/logout");
    window.location.reload();
  };

  return (
    <div className="w-72 bg-[#f6f7f8] shadow-md p-6">
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

      <ul className="mt-5 space-y-2">
        <li className="font-semibold text-gray-700 mb-2">Thông tin cá nhân</li>
        <MenuItem
          icon={<FaUser />}
          text="Hồ sơ"
          path="/account/profile"
          selectedKey={selectedKey}
          onClick={handleNavigate}
        />
        <MenuItem
          icon={<FaEnvelope />}
          text="Email"
          path="/account/edit-email"
          selectedKey={selectedKey}
          onClick={handleNavigate}
        />
        <MenuItem
          icon={<FaPhone className="rotate-90" />}
          text="Số điện thoại"
          path="/account/edit-phone"
          selectedKey={selectedKey}
          onClick={handleNavigate}
        />
        <MenuItem
          icon={<FaLock />}
          text="Mật khẩu"
          path="/account/edit-password"
          selectedKey={selectedKey}
          onClick={handleNavigate}
        />

        <li className="font-semibold text-gray-700 mt-5 mb-2">Khác</li>
        <MenuItem
          icon={<FaShoppingBag />}
          text="Đơn hàng"
          path="/orders"
          selectedKey={selectedKey}
          onClick={handleNavigate}
        />
        <MenuItem
          icon={<FaBell />}
          text="Thông báo"
          path="/notifications"
          selectedKey={selectedKey}
          onClick={handleNavigate}
        />
        <MenuItem
          icon={<FaTicketAlt />}
          text="Kho voucher"
          path="/voucher"
          selectedKey={selectedKey}
          onClick={handleNavigate}
        />
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
