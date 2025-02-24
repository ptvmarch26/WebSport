function Dashboard() {
    const dashboardData = {
      totalRevenue: 50000000,
      totalOrders: 1200,
      totalUsers: 500,
      totalProducts: 150,
    };
  
    return (
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-blue-500 text-white p-4 rounded">Doanh thu: {dashboardData.totalRevenue} VND</div>
          <div className="bg-green-500 text-white p-4 rounded">Tổng đơn hàng: {dashboardData.totalOrders}</div>
          <div className="bg-yellow-500 text-white p-4 rounded">Người dùng: {dashboardData.totalUsers}</div>
          <div className="bg-red-500 text-white p-4 rounded">Sản phẩm: {dashboardData.totalProducts}</div>
        </div>
      </div>
    );
  }
  
  export default Dashboard;
  