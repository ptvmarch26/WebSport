import { useState } from "react";
import { Table, Input, Select, Button, Tag, Modal } from "antd";
import { DeleteOutlined, ExportOutlined } from "@ant-design/icons";

const { Option } = Select;

const initialCustomers = [
  {
    id: "KH001",
    name: "Nguyễn Văn A",
    email: "a@gmail.com",
    phone: "0987654321",
    status: "Hoạt động",
  },
  {
    id: "KH002",
    name: "Trần Thị B",
    email: "b@gmail.com",
    phone: "0976543210",
    status: "Đã khóa",
  },
  {
    id: "KH003",
    name: "Lê Văn C",
    email: "c@gmail.com",
    phone: "0965432109",
    status: "Mới",
  },
  {
    id: "KH004",
    name: "Phạm Thị D",
    email: "d@gmail.com",
    phone: "0954321098",
    status: "Hoạt động",
  },
  {
    id: "KH005",
    name: "Hoàng Minh E",
    email: "e@gmail.com",
    phone: "0943210987",
    status: "Đã khóa",
  },
];

const statusColors = {
  "Hoạt động": "green",
  "Đã khóa": "red",
  Mới: "blue",
};

const Customers = () => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Xử lý xóa khách hàng
  const handleDelete = () => {
    setCustomers(
      customers.filter((customer) => !selectedRowKeys.includes(customer.id))
    );
    setSelectedRowKeys([]);
    setIsModalVisible(false);
  };

  // Lọc khách hàng theo trạng thái & tìm kiếm theo tên
  const filteredCustomers = customers.filter((customer) => {
    const matchesStatus = filterStatus
      ? customer.status === filterStatus
      : true;
    const matchesSearch = searchText
      ? customer.name.toLowerCase().includes(searchText.toLowerCase())
      : true;
    return matchesStatus && matchesSearch;
  });

  const columns = [
    { title: "Mã khách hàng", dataIndex: "id", key: "id" },
    { title: "Tên khách hàng", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Số điện thoại", dataIndex: "phone", key: "phone" },
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
            placeholder="Tìm kiếm theo tên khách hàng..."
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
            placeholder="Trạng thái khách hàng"
            value={filterStatus}
            onChange={setFilterStatus}
            allowClear
            className="w-[300px]"
          >
            <Option value="Hoạt động">Hoạt động</Option>
            <Option value="Đã khóa">Đã khóa</Option>
            <Option value="Mới">Mới</Option>
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
          dataSource={filteredCustomers}
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
        bodyStyle={{ padding: "20px" }}
      >
        <p>Bạn có chắc muốn xóa các khách hàng đã chọn?</p>
      </Modal>
    </div>
  );
};

export default Customers;
