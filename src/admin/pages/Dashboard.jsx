import { LiaUsersSolid } from "react-icons/lia";
import { IoCartSharp } from "react-icons/io5";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import Chart from "react-apexcharts";
import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { useOrder } from "../../context/OrderContext";

function Dashboard() {
  const { fetchUser, fetchUsers } = useUser();
  const { fetchOrders } = useOrder();
  const [users, setUsers] = useState();
  const [orders, setOrders] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const user = await fetchUser();
      if (user?.result?.role !== "admin") {
        window.location.href = "/sign-in";
      } else {
        const usersData = await fetchUsers();
        const ordersData = await fetchOrders();
        setUsers(usersData);
        setOrders(ordersData);
      }
    };
    fetchData();
  }, []);

  const totalRevenue = () => {
    if (!orders) return 0;
    return orders.reduce((acc, order) => {
      if (order.is_paid && order.order_status === "Hoàn thành") {
        return acc + order.order_total_final;
      }
      return acc;
    }, 0);
  };

  const dashboardData = {
    totalRevenue: totalRevenue() || 0,
    totalOrders: orders?.length || 0,
    totalUsers: users?.length || 0,
  };
  // Dữ liệu cho biểu đồ đường
  const lineOptions = {
    chart: { type: "area" },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    colors: ["#1E90FF", "#2ECC71"],
    fill: { type: "gradient" },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: true,
    },
  };
  const lineSeries = [
    {
      name: "series1",
      data: [30, 35, 25, 40, 50, 90, 100, 85, 60, 75, 95, 110],
    },
    {
      name: "series2",
      data: [20, 30, 35, 30, 45, 60, 70, 65, 80, 90, 100, 120],
    },
  ];

  // Dữ liệu cho biểu đồ cột
  const barOptions = {
    chart: { type: "bar" },
    xaxis: {
      categories: [
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
      ],
    },
    colors: ["#1E90FF", "#2ECC71"],
    plotOptions: { bar: { horizontal: false, columnWidth: "60%" } },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: true,
    },
  };
  // Hàm tạo mảng 12 phần tử ứng với 12 tháng
  const getBarSeriesFromOrders = () => {
    const paidCounts = new Array(12).fill(0);
    const canceledCounts = new Array(12).fill(0);

    if (!orders) return { paidCounts, canceledCounts };

    orders.forEach((order) => {
      if (!order.createdAt) return;
      const month = new Date(order.createdAt).getMonth(); // 0 = Jan, 11 = Dec

      if (order.is_paid && order.order_status === "Hoàn thành") {
        paidCounts[month]++;
      }

      if (order.order_status === "Hủy hàng") {
        canceledCounts[month]++;
      }
    });

    return { paidCounts, canceledCounts };
  };

  const { paidCounts, canceledCounts } = getBarSeriesFromOrders();

  const barSeries = [
    { name: "Đã thanh toán", data: paidCounts },
    { name: "Đã hủy hàng", data: canceledCounts },
  ];

  // Dữ liệu cho biểu đồ tròn
  const donutOptions = {
    labels: [
      "Clothing",
      "Food Products",
      "Electronics",
      "Kitchen Utility",
      "Gardening",
    ],
    colors: ["#20c997", "#007bff", "#dc3545", "#f39c12", "#8e44ad"],
    legend: { position: "bottom" },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: true,
    },
  };
  const donutSeries = [20, 25, 30, 15, 10];

  return (
    <div className="lg:ml-[300px] mt-[64px] px-2 py-4 lg:p-6 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-4">
        <div className="bg-white flex gap-5 py-6 px-2 rounded-lg shadow-lg">
          <div className="bg-blue-500 w-20 h-20 rounded-md flex items-center justify-center">
            <LiaUsersSolid className="text-white text-[40px]" />
          </div>
          <div className="flex flex-col justify-between">
            <p className="text-xl font-Smedium">Khách hàng</p>
            <p className="text-[26px] font-bold">{dashboardData.totalUsers}</p>
          </div>
        </div>

        <div className="bg-white flex gap-5 py-6 px-2 rounded-lg shadow-lg">
          <div className="bg-yellow-500 w-20 h-20 rounded-md flex items-center justify-center">
            <IoCartSharp className="text-white text-[40px]" />
          </div>
          <div className="flex flex-col justify-between">
            <p className="text-xl font-medium">Đơn hàng</p>
            <p className="text-[26px] font-bold">{dashboardData.totalOrders}</p>
          </div>
        </div>

        <div className="bg-white flex gap-5 py-6 px-2 rounded-lg shadow-lg lg:col-span-2 xl:col-span-1">
          <div className="bg-green-500 w-20 h-20 rounded-md flex items-center justify-center">
            <RiMoneyDollarCircleFill className="text-white text-[40px]" />
          </div>
          <div className="flex flex-col justify-between">
            <p className="text-xl font-medium">Doanh thu</p>
            <p className="text-[26px] font-bold">
              {dashboardData.totalRevenue.toLocaleString()}đ
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-4 rounded-lg shadow-lg col-span-2">
          <h3 className="text-lg font-semibold mb-4 text-center uppercase">
            Doanh thu năm
          </h3>
          <Chart
            options={lineOptions}
            series={lineSeries}
            type="area"
            height={250}
          />
        </div>

        <div className="bg-white p-4 rounded-lg shadow-lg col-span-2 md:col-span-1">
          <h3 className="text-lg font-semibold mb-4 text-center uppercase">
            Đơn hàng mới
          </h3>
          <Chart
            options={barOptions}
            series={barSeries}
            type="bar"
            height={250}
          />
        </div>

        <div className="bg-white p-4 rounded-lg shadow-lg col-span-2 md:col-span-1">
          <h3 className="text-lg font-semibold mb-4 text-center uppercase">
            Doanh thu theo danh mục sản phẩm
          </h3>
          <Chart
            options={donutOptions}
            series={donutSeries}
            type="donut"
            height={250}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
