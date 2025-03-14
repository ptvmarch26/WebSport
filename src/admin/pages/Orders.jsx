import { useState } from "react";
import { Table, Input, Select, Button, Tag, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { ExportOutlined } from "@ant-design/icons";

const { Option } = Select;

const initialOrders = [
  {
    id: "DH001",
    products: ["Giày Nike Air Force 1", "Áo Hoodie Adidas"],
    date: "12/03/2025",
    customer: "Nguyễn Văn A",
    payment: "Chuyển khoản",
    total: 1200000,
    status: "Chờ xác nhận",
  },
  {
    id: "DH002",
    products: ["Vòng tay phong thủy"],
    date: "11/03/2025",
    customer: "Trần Thị B",
    payment: "Tiền mặt",
    total: 500000,
    status: "Đang giao",
  },
  {
    id: "DH003",
    products: [
      "Laptop Dell XPS",
      "Chuột Logitech G Pro",
      "Bàn phím cơ Keychron K6",
    ],
    date: "10/03/2025",
    customer: "Lê Văn C",
    payment: "Momo",
    total: 25000000,
    status: "Hoàn thành",
  },
  {
    id: "DH004",
    products: ["Túi xách Gucci"],
    date: "09/03/2025",
    customer: "Phạm Thị D",
    payment: "Chuyển khoản",
    total: 15000000,
    status: "Hủy hàng",
  },
  {
    id: "DH005",
    products: ["Túi xách Gucci"],
    date: "09/03/2025",
    customer: "Phạm Thị D",
    payment: "Chuyển khoản",
    total: 15000000,
    status: "Hoàn hàng",
  },
];

const statusColors = {
  "Chờ xác nhận": "orange",
  "Đang giao": "blue",
  "Hoàn thành": "green",
  "Hủy hàng": "red",
  "Hoàn hàng": "purple",
};

const Orders = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Xử lý xóa đơn hàng
  const handleDelete = () => {
    setOrders(orders.filter((order) => !selectedRowKeys.includes(order.id)));
    setSelectedRowKeys([]);
    setIsModalVisible(false);
  };

  // Lọc đơn hàng theo trạng thái & tìm kiếm sản phẩm
  const filteredOrders = orders.filter((order) => {
    const matchesStatus = filterStatus ? order.status === filterStatus : true;
    const matchesSearch = searchText
      ? order.products.some((product) =>
          product.toLowerCase().includes(searchText.toLowerCase())
        )
      : true;
    return matchesStatus && matchesSearch;
  });

  const columns = [
    {
      title: "Mã đơn",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Sản phẩm",
      dataIndex: "products",
      key: "products",
      render: (products) => (
        <span>
          {products[0]}{" "}
          {products.length > 1 && `+${products.length - 1} sản phẩm`}
        </span>
      ),
    },
    {
      title: "Ngày đặt",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Khách hàng",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Hình thức",
      dataIndex: "payment",
      key: "payment",
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      render: (value) => `${value.toLocaleString()}đ`,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag className="py-1 px-2" color={statusColors[status]}>
          {status}
        </Tag>
      ),
    },
  ];

  return (
    <div className="ml-[300px] mt-[64px] p-6 min-h-screen bg-gray-100">
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
            borderRadius="0"
          >
            <Option value="Chờ xác nhận">Chờ xác nhận</Option>
            <Option value="Đang giao">Đang giao</Option>
            <Option value="Hoàn thành">Hoàn thành</Option>
            <Option value="Hủy hàng">Hủy hàng</Option>
            <Option value="Hoàn hàng">Hoàn hàng</Option>
          </Select>

          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            disabled={selectedRowKeys.length === 0}
            onClick={() => setIsModalVisible(true)}
            className="rounded-none"
          >
            Xóa ({selectedRowKeys.length})
          </Button>
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
          pagination={{ pageSize: 3 }}
          rowKey="id"
          className="rounded-none"
        />
      </div>

      <Modal
        title="Xác nhận xóa"
        visible={isModalVisible}
        onOk={handleDelete}
        onCancel={() => setIsModalVisible(false)}
        okText="Xóa"
        cancelText="Hủy"
        okButtonProps={{ danger: true }}
        width={500}
        bodyStyle={{
          padding: "20px",
        }}
      >
        <p>Bạn có chắc muốn xóa các đơn hàng đã chọn?</p>
      </Modal>
    </div>
  );
};

export default Orders;
