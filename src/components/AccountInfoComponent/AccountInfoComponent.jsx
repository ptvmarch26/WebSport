import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaUser, FaShoppingBag, FaBell, FaTicketAlt, FaSignOutAlt, FaEnvelope, FaPhone, FaLock} from "react-icons/fa";

const AccountInfoComponent = ({ full_name, src_img, user_name }) => {
  const [selectedKey, setSelectedKey] = useState("/account/profile");
  const navigate = useNavigate();
  const location = useLocation();

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
    <div className="w-72 shadow-md rounded-xl p-6">
      <div className="flex flex-col items-center">
        <label className="cursor-pointer">
          <img
            className="w-20 h-20 rounded-full object-cover border-2 border-gray-300 shadow-md"
            src={src_img}
            alt="avatar"
          />
        </label>
        <h2 className="text-lg font-semibold mt-3 text-gray-800">{full_name}</h2>
        <p className="text-gray-500 text-sm">{user_name}</p>
      </div>

      <ul className="mt-5 space-y-2">
        <li className="font-semibold text-gray-700 mb-2">Thông tin cá nhân</li>
        <MenuItem icon={<FaUser />} text="Hồ sơ" path="/account/profile" selectedKey={selectedKey} onClick={handleNavigate} />
        <MenuItem icon={<FaEnvelope />} text="Email" path="/account/edit-email" selectedKey={selectedKey} onClick={handleNavigate} />
        <MenuItem icon={<FaPhone />} text="Số điện thoại" path="/account/edit-phone" selectedKey={selectedKey} onClick={handleNavigate} />
        <MenuItem icon={<FaLock />} text="Mật khẩu" path="/account/edit-password" selectedKey={selectedKey} onClick={handleNavigate} />

        <li className="font-semibold text-gray-700 mt-5 mb-2">Khác</li>
        <MenuItem icon={<FaShoppingBag />} text="Đơn hàng" path="/my-order" selectedKey={selectedKey} onClick={handleNavigate} />
        <MenuItem icon={<FaBell />} text="Thông báo" path="/notifications" selectedKey={selectedKey} onClick={handleNavigate} />
        <MenuItem icon={<FaTicketAlt />} text="Kho voucher" path="/voucher" selectedKey={selectedKey} onClick={handleNavigate} />

        <li className="mt-5">
          <button
            className="flex items-center w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 rounded-lg transition duration-200"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="w-5 h-5 mr-2" /> Đăng xuất
          </button>
        </li>
      </ul>
    </div>
  );
};

const MenuItem = ({ icon, text, path, selectedKey, onClick }) => {
  return (
    <li
      className={`flex items-center px-4 py-2 rounded-lg cursor-pointer transition duration-200 ${
        selectedKey === path ? "bg-orange-100 text-orange-600 font-semibold" : "hover:bg-gray-100 text-gray-700"
      }`}
      onClick={() => onClick(path)}
    >
      {icon} <span className="ml-3">{text}</span>
    </li>
  );
};

export default AccountInfoComponent;
