import Sidebar from "../components/SidebarComponent/SidebarComponent";
import TopbarComponent from "../components/TopbarComponent/TopbarComponent";
// import { useState } from "react";

function AdminLayout({ children }) {
  return (
    <div className="bg-[#f5f5f5]">
      <Sidebar />
      <TopbarComponent />

      <div className="">{children}</div>
    </div>
  );
}

export default AdminLayout;
