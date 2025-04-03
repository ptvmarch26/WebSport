import { useEffect, useState } from "react";
import { Table, Input, Select, Button, Tag } from "antd";
import { ExportOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useOrder } from "../../context/OrderContext";
import moment from "moment";

const { Option } = Select;

const statusColors = {
  "Chờ xác nhận": "orange",
  "Đang giao": "blue",
  "Hoàn thành": "green",
  "Hủy hàng": "red",
  "Hoàn hàng": "purple",
};

const Orders = () => {
  const { orders, fetchOrders } = useOrder();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  console.log(orders);
  const filteredOrders = orders.filter((order) => {
    const matchesStatus = filterStatus ? order.status === filterStatus : true;
    const matchesSearch = searchText
      ? order.products.some((product) =>
          product.name.toLowerCase().includes(searchText.toLowerCase())
        )
      : true;
    return matchesStatus && matchesSearch;
  });

  const columns = [
    {
      title: "Mã đơn",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Sản phẩm",
      dataIndex: "products",
      key: "products",
      render: (products) => (
        <span>
          {`${products.length} sản phẩm`}
        </span>
      ),
    },
    {
      title: "Ngày đặt",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => {
        return date ? moment(date).format("YYYY-MM-DD") : ""
      }
    },
    {
      title: "Khách hàng",
      dataIndex: "user_id",
      key: "user_id",
    },
    {
      title: "Hình thức",
      dataIndex: "order_payment_method",
      key: "order_payment_method",
    },
    {
      title: "Tổng tiền",
      dataIndex: "order_total_final",
      key: "order_total_final",
      render: (value) => `${value.toLocaleString()}đ`,
    },
    {
      title: "Trạng thái",
      dataIndex: "order_status",
      key: "order_status",
      render: (status) => <Tag color={statusColors[status]}>{status}</Tag>,
    },
  ];

  return (
    <div className="lg:ml-[300px] mt-[64px] px-2 py-4 lg:p-6 min-h-screen">
      <div className="space-y-3 mb-4">
        <div className="flex gap-4">
          <Input
            placeholder="Tìm kiếm theo tên sản phẩm..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="rounded-none"
          />

          <Button
            type="primary"
            icon={<ExportOutlined />}
            className="rounded-none"
          >
            Xuất file
          </Button>
        </div>
        <div className="flex justify-between">
          <Select
            placeholder="Trạng thái đơn hàng"
            value={filterStatus}
            onChange={setFilterStatus}
            allowClear
            className="w-[300px]"
          >
            {Object.keys(statusColors).map((status) => (
              <Option key={status} value={status}>
                {status}
              </Option>
            ))}
          </Select>
        </div>
      </div>

      <div className="bg-white p-4 shadow-lg">
        <Table
          rowSelection={{
            selectedRowKeys,
            onChange: setSelectedRowKeys,
          }}
          dataSource={filteredOrders}
          columns={columns}
          pagination={{ pageSize: 5 }}
          rowKey="_id"
          // onRow={(record) => ({
          //   onClick: () =>
          //     navigate(`/admin/order-details/${record._id}`, {
          //       state: { order: record },
          //     }),
          // })}
        />
      </div>
    </div>
  );
};

export default Orders;
