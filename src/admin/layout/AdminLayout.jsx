import Sidebar from "../components/Sidebar";
import { useState } from "react";

function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Nội dung chính */}
      <div
        className={`transition-all duration-300 p-6 bg-gray-100 ${
          isSidebarOpen ? "ml-64" : "ml-16"
        } flex-1`}
      >
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;
