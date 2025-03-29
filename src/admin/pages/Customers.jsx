import { useState, useEffect } from "react";
import { Table, Input, Select, Button, Tag, Modal, message } from "antd";
import { DeleteOutlined, ExportOutlined } from "@ant-design/icons";
import { useUser } from "../../context/UserContext";
const { Option } = Select;

const statusColors = {
  "Hoạt động": "green",
  "Đã khóa": "red",
};
// be thiếu trường tên khách hàng, cả phần đăng ký các kiểu...
const Customers = () => {
  const { fetchUsers, users  } = useUser();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchUsers(); 
  }, []);

  const filteredUsers = Array.isArray(users)
  ? users.filter((user) => {
      const searchLower = searchText.toLowerCase();
      return (
        (user.user_name?.toLowerCase().includes(searchLower) ||
         user.phone?.includes(searchText) || 
         user.email?.toLowerCase().includes(searchLower)) &&
        (filterStatus ? user.status === filterStatus : true)
      );
    })
  : [];

  const columns = [
    {
      title: "Ảnh",
      dataIndex: "avt_img",
      key: "avt_img",
      render: (image) =>
        image ? (
          <img src={image} alt="Ảnh sản phẩm" className="w-16 h-16 object-cover rounded" />
        ) : (
          "Không có ảnh"
        ),
    },
    { title: "Giới tính", dataIndex: "gender", key: "gender" },
    { title: "Tên người dùng", dataIndex: "user_name", key: "user_name" },
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
          <Button type="primary" icon={<ExportOutlined />} className="rounded-none">
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
        </div>
      </div>

      <div className="bg-white p-4 shadow-lg">
        <Table
          rowSelection={{
            selectedRowKeys,
            onChange: setSelectedRowKeys,
          }}
          dataSource={filteredUsers}
          columns={columns}
          pagination={{ pageSize: 8 }}
          rowKey="_id"
          className="rounded-none"
        />
      </div>

      
    </div>
  );
};

export default Customers;
