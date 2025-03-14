import { ConfigProvider } from "antd";
import Sidebar from "../components/SidebarComponent/SidebarComponent";
import TopbarComponent from "../components/TopbarComponent/TopbarComponent";

function AdminLayout({ children }) {
  return (
    // Bỏ border radius cho tất cả để đẹp
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 0,
        },
      }}
    >
    <div className="bg-[#f5f5f5]">
      <Sidebar />
      <TopbarComponent />

      <div className="">{children}</div>
    </div>
    </ConfigProvider>
  );
}

export default AdminLayout;
