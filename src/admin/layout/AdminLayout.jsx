import { useState } from "react";
import { ConfigProvider } from "antd";
import SidebarComponent from "../components/SidebarComponent/SidebarComponent";
import TopbarComponent from "../components/TopbarComponent/TopbarComponent";

function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          borderRadius: 0,
          Button: { borderRadius: 0 },
          Card: { borderRadius: 0 },
          Modal: { borderRadius: 0 },
        },
      }}
    >
      <div className="bg-[#f5f5f5] min-h-screen">
        <SidebarComponent
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <div className="flex-1">
          <TopbarComponent toggleSidebar={toggleSidebar} />
          {children}
        </div>
      </div>
    </ConfigProvider>
  );
}

export default AdminLayout;
