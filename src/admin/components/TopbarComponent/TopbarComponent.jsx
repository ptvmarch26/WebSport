import { useLocation } from "react-router-dom";
import user_img from "../../../assets/images/user_img.jpg";

function TopbarComponent({ admin_name }) {
  const location = useLocation();

  const pageTitles = {
    "/admin/dashboard": "Dashboard",
    "/admin/orders": "Danh sách đơn hàng",
    "/admin/products": "Danh sách sản phẩm",
    "/admin/users": "Danh sách khách hàng",
    "/admin/discount": "Danh sách nhân viên",
  };

  const currentPage = pageTitles[location.pathname] || "Admin Panel";

  return (
    <div className="fixed top-0 left-[300px] z-10 bg-white right-0 h-16 flex items-center justify-between px-6 shadow-md transition-all duration-300">
      <h1 className="text-xl font-semibold">{currentPage}</h1>

      <div className="flex items-center gap-3">
        <span className="text-md">{admin_name ? admin_name : "Admin"}</span>
        <img
          src={user_img}
          alt="Admin Avatar"
          className="w-12 h-12 rounded-full"
        />
      </div>
    </div>
  );
}

export default TopbarComponent;
