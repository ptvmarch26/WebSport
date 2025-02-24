import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

function Sidebar({ isOpen, setIsOpen }) {
  const sidebarRef = useRef(null);

  // Xử lý click ra ngoài sidebar
  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  return (
    <div>
      {/* Nút Toggle Sidebar (có margin-left khi mở sidebar) */}
      <button
        className={`p-2 bg-gray-800 text-white fixed top-4 transition-all duration-300 rounded-md z-50 ${
          isOpen ? "left-64" : "left-4"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`h-screen bg-gray-900 text-white fixed top-0 left-0 transition-all duration-300 shadow-lg ${
          isOpen ? "w-64" : "w-16"
        }`}
      >
        {/* Tiêu đề Sidebar */}
        <div className="flex items-center justify-between p-4">
          <h2
            className={`text-xl font-bold transition-opacity ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            Trang Admin
          </h2>
        </div>

        {/* Danh sách Menu */}
        <nav>
          <ul className="space-y-2">
            <li>
              <Link to="/admin/dashboard" className="block p-2 hover:bg-gray-700 rounded">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/admin/orders" className="block p-2 hover:bg-gray-700 rounded">
                Orders
              </Link>
            </li>
            <li>
              <Link to="/admin/products" className="block p-2 hover:bg-gray-700 rounded">
                Products
              </Link>
            </li>
            <li>
              <Link to="/admin/users" className="block p-2 hover:bg-gray-700 rounded">
                Users
              </Link>
            </li>
            <li>
              <Link to="/admin/discount" className="block p-2 hover:bg-gray-700 rounded">
                Discount
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
