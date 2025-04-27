import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaUser,
  FaShoppingBag,
  FaBell,
  FaSignOutAlt,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaCog,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import avt_false from "../../assets/images/avatar-false.jpg";
import { Button } from "@material-tailwind/react";
import { useAuth } from "../../context/AuthContext";
import { useUser } from "../../context/UserContext";
import { useNotifications } from "../../context/NotificationContext";
import { IoTicketSharp } from "react-icons/io5";

const AccountInfoComponent = () => {
  const [selectedKey, setSelectedKey] = useState("/account/profile");
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const defaultAvatar = avt_false;
  const { handleLogout } = useAuth();
  const { selectedUser, fetchUser, setSelectedUser } = useUser();

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    setSelectedKey(location.pathname);
  }, [location.pathname]);

  const handleNavigate = (path) => {
    setSelectedKey(path);
    navigate(path);
    setIsMenuVisible(false);
  };

  const handleSubmitLogout = async () => {
    await handleLogout();
    localStorage.removeItem("compareList");
    window.dispatchEvent(new CustomEvent("compareListUpdated"));
    // // navigate("/sign-in", { replace: true });
    // window.location.href = "/";
    setSelectedUser(null);
    navigate("/", { replace: true });
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
    {
      icon: <FaLocationDot />,
      text: "Địa chỉ",
      path: "/account/my-address",
    },
    { icon: <FaLock />, text: "Mật khẩu", path: "/account/edit-password" },
    { icon: <FaShoppingBag />, text: "Đơn hàng", path: "/orders" },
    {
      icon: <FaBell />,
      text: "Thông báo",
      path: "/notifications",
      showNotificationDot: true,
    },
    { icon: <IoTicketSharp />, text: "Kho voucher", path: "/vouchers" },
  ];

  return (
    <div className="relative w-full lg:w-72 bg-white lg:bg-[#f6f7f8] shadow-none lg:shadow-md p-0 lg:p-6">
      <div className="hidden lg:flex flex-col items-center">
        <label>
          <img
            className="w-20 h-20 rounded-full object-cover shadow-md"
            src={selectedUser?.avt_img || defaultAvatar}
            alt="avatar"
          />
        </label>
        <h2 className="text-lg font-semibold mt-3 text-gray-800 truncate overflow-hidden whitespace-nowrap w-full text-center">
          {selectedUser?.full_name || "Chưa cập nhật"}
        </h2>
        <p className="text-gray-500 text-sm truncate overflow-hidden whitespace-nowrap w-full text-center">
          {selectedUser?.user_name || "Chưa cập nhật"}
        </p>
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
          {menuItems.slice(0, 5).map((item) => (
            <MenuItem
              key={item.path}
              icon={item.icon}
              text={item.text}
              path={item.path}
              selectedKey={selectedKey}
              onClick={handleNavigate}
              showNotificationDot={item.showNotificationDot}
            />
          ))}

          <li className="font-semibold text-gray-700 mt-5 mb-2">Khác</li>
          {menuItems.slice(5).map((item) => (
            <MenuItem
              key={item.path}
              icon={item.icon}
              text={item.text}
              path={item.path}
              selectedKey={selectedKey}
              onClick={() => handleNavigate(item.path)}
              showNotificationDot={item.showNotificationDot}
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
          {menuItems.slice(0, 5).map((item) => (
            <MenuItem
              key={item.path}
              icon={item.icon}
              text={item.text}
              path={item.path}
              selectedKey={selectedKey}
              onClick={handleNavigate}
              showNotificationDot={item.showNotificationDot}
            />
          ))}

          <li className="font-semibold text-gray-700 mt-5 mb-2">Khác</li>
          {menuItems.slice(5).map((item) => (
            <MenuItem
              key={item.path}
              icon={item.icon}
              text={item.text}
              path={item.path}
              selectedKey={selectedKey}
              onClick={handleNavigate}
              showNotificationDot={item.showNotificationDot}
            />
          ))}
          <li className="mt-5">
            <Button
              className="flex items-center bg-[#f6f7f8] shadow-none rounded-none w-full text-left p-4 text-red-600 hover:bg-red-100 transition duration-200 hover:shadow-none"
              onClick={handleSubmitLogout}
            >
              <FaSignOutAlt className="w-5 h-5 mr-2" /> Đăng xuất
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
};
const MenuItem = ({
  icon,
  text,
  path,
  selectedKey,
  onClick,
  showNotificationDot,
}) => {
  const isSelected = selectedKey === path;
  const { unreadCount } = useNotifications();
  const Dot = unreadCount;

  return (
    <li
      className={`flex items-center p-4 cursor-pointer transition duration-200 relative ${
        isSelected
          ? "bg-white text-black border-l-2 border-black"
          : "hover:bg-gray-200 text-black"
      }`}
      onClick={() => onClick(path)}
    >
      {icon}
      <span className="ml-3">{text}</span>

      {showNotificationDot && Dot > 0 && (
        <span className="absolute left-6 top-3 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
          {Dot}
        </span>
      )}
    </li>
  );
};

export default AccountInfoComponent;
