import { LiaUsersSolid } from "react-icons/lia";
import { IoCartSharp } from "react-icons/io5";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import Chart from "react-apexcharts";

function Dashboard() {
  const dashboardData = {
    totalRevenue: 50000000,
    totalOrders: 1200,
    totalUsers: 500,
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
  const barSeries = [
    { name: "Đã thanh toán", data: [40, 50, 60, 70, 80, 75, 85, 90, 95] },
    { name: "Đã hủy", data: [60, 70, 80, 90, 100, 95, 105, 110, 115] },
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
    <div className="ml-[300px] mt-[64px] p-6 min-h-screen">
      <div className="grid grid-cols-3 gap-6 mt-4">
        <div className="bg-white flex gap-5 py-6 px-2 rounded-lg shadow-lg">
          <div className="bg-blue-500 w-20 h-20 rounded-md flex items-center justify-center">
            <LiaUsersSolid className="text-white text-[40px]" />
          </div>
          <div className="flex flex-col justify-between">
            <p className="text-xl font-medium">Khách hàng</p>
            <p className="text-3xl font-bold">{dashboardData.totalUsers}</p>
          </div>
        </div>

        <div className="bg-white flex gap-5 py-6 px-2 rounded-lg shadow-lg">
          <div className="bg-yellow-500 w-20 h-20 rounded-md flex items-center justify-center">
            <IoCartSharp className="text-white text-[40px]" />
          </div>
          <div className="flex flex-col justify-between">
            <p className="text-xl font-medium">Đơn hàng</p>
            <p className="text-3xl font-bold">{dashboardData.totalOrders}</p>
          </div>
        </div>

        <div className="bg-white flex gap-5 py-6 px-2 rounded-lg shadow-lg">
          <div className="bg-green-500 w-20 h-20 rounded-md flex items-center justify-center">
            <RiMoneyDollarCircleFill className="text-white text-[40px]" />
          </div>
          <div className="flex flex-col justify-between">
            <p className="text-xl font-medium">Doanh thu</p>
            <p className="text-3xl font-bold">
              {dashboardData.totalRevenue.toLocaleString()}đ
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-4 rounded-lg shadow-lg col-span-2">
          <h3 className="text-lg font-semibold mb-4">Doanh thu năm</h3>
          <Chart
            options={lineOptions}
            series={lineSeries}
            type="area"
            height={250}
          />
        </div>

        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Đơn hàng mới</h3>
          <Chart
            options={barOptions}
            series={barSeries}
            type="bar"
            height={250}
          />
        </div>

        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">
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
