import { ConfigProvider } from "antd";
import Sidebar from "../components/SidebarComponent/SidebarComponent";
import TopbarComponent from "../components/TopbarComponent/TopbarComponent";

function AdminLayout({ children }) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: { borderRadius: 0 },
          Card: { borderRadius: 0 },
          Modal: { borderRadius: 0 },
        },
      }}
    >
      <div className="bg-[#f5f5f5]">
        <Sidebar />
        <TopbarComponent />
        <div>{children}</div>
      </div>
    </ConfigProvider>
  );
}

export default AdminLayout;
