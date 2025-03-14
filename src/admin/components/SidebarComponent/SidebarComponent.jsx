import { Link, useLocation } from "react-router-dom";
import { FiHome, FiShoppingCart, FiBox, FiUsers, FiTag } from "react-icons/fi";
import logo from "../../../assets/images/logo.png";

function SidebarComponent() {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <FiHome size={20} /> },
    {
      name: "Quản lý đơn hàng",
      path: "/admin/orders",
      icon: <FiShoppingCart size={20} />,
    },
    {
      name: "Quản lý sản phẩm",
      path: "/admin/products",
      icon: <FiBox size={20} />,
    },
    {
      name: "Quản lý mã giảm giá",
      path: "/admin/discounts",
      icon: <FiTag size={20} />,
    },
    {
      name: "Quản lý khách hàng",
      path: "/admin/customers",
      icon: <FiUsers size={20} />,
    },
    {
      name: "Quản lý nhân viên",
      path: "/admin/employees",
      icon: <FiUsers size={20} />,
    },
  ];

  return (
    <div>
      <div className="h-screen w-[300px] bg-gray-900 text-white fixed top-0 left-0 shadow-lg transition-all duration-300">
        <div className="flex items-center justify-center my-5">
          <img src={logo} alt="Logo WTM" className="w-48" />
        </div>

        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 p-4 mb-5 rounded transition-all duration-200 relative overflow-hidden ${
                    location.pathname === item.path
                      ? "bg-gray-700 text-white"
                      : "hover:bg-gray-800 hover:text-gray-200"
                  }`}
                >
                  <span
                    className={`absolute left-0 top-0 h-full w-1 bg-blue-500 transition-all duration-300 ${
                      location.pathname === item.path
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  />
                  {item.icon}
                  <span
                    className={`transition-all duration-300 ${
                      location.pathname === item.path
                        ? "translate-x-1"
                        : "translate-x-0"
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default SidebarComponent;
