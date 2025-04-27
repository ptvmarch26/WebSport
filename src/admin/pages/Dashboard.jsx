import { LiaUsersSolid } from "react-icons/lia";
import { IoCartSharp } from "react-icons/io5";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import Chart from "react-apexcharts";
import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { useOrder } from "../../context/OrderContext";
import { getRevenue } from "../../services/api/OrderApi";
import { Select } from "antd";

function Dashboard() {
  const { fetchUser, fetchUsers } = useUser();
  const { fetchOrders } = useOrder();
  const [users, setUsers] = useState();
  const [orders, setOrders] = useState();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [revenueData, setRevenueData] = useState({
    revenueByMonth: Array(12).fill({
      completedRevenue: 0,
      paidRevenue: 0,
      cancelledRevenue: 0,
    }),
  });
  const { Option } = Select;
  const years = Array.from(
    { length: 6 },
    (_, i) => new Date().getFullYear() - 5 + i
  );

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
        fetchRevenueData(selectedYear);
      }
    };
    fetchData();
  }, []);

  const fetchRevenueData = async (year) => {
    try {
      const response = await getRevenue(year);

      if (response.EC === 0 && response.EM) {
        setRevenueData(response.result);
      }
    } catch {
      return;
    }
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
    fetchRevenueData(year);
  };

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
    colors: ["#1E90FF"],
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
      name: "Doanh thu hàng tháng",
      data: revenueData.revenueByMonth.map(
        (item) => item.completedRevenue || 0
      ),
    },
  ];

  // Dữ liệu cho biểu đồ cột
  const barOptions = {
    chart: { type: "bar" },
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
    plotOptions: { bar: { horizontal: false, columnWidth: "60%" } },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: true,
    },
  };

  const barSeries = [
    {
      name: "Đã thanh toán",
      data: revenueData.revenueByMonth.map((item) => item.paidRevenue || 0),
    },
    {
      name: "Đã hủy hàng",
      data: revenueData.revenueByMonth.map(
        (item) => item.cancelledRevenue || 0
      ),
    },
  ];

  // Dữ liệu cho biểu đồ tròn
  const donutOptions = {
    labels: ["Áo", "Quần", "Giày", "Phụ kiện", "Dép"],
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
            <p className="text-xl font-medium">Khách hàng</p>
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

      <div className="mt-8 flex justify-end mb-4">
        <div className="flex items-center gap-2">
          <label htmlFor="yearFilter" className="font-medium">
            Năm:
          </label>
          <Select
            id="yearFilter"
            value={selectedYear}
            onChange={handleYearChange}
            className="min-w-[100px]"
            style={{ width: 120 }}
          >
            {years.map((year) => (
              <Option key={year} value={year}>
                {year}
              </Option>
            ))}
          </Select>
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
            Doanh Thu Theo Trạng Thái Đơn Hàng
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
