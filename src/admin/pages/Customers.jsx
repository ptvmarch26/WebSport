import { useState, useEffect } from "react";
import { Table, Input, Select, Button, Tag } from "antd";
import { ExportOutlined } from "@ant-design/icons";
import { useUser } from "../../context/UserContext";
const { Option } = Select;

const statusColors = {
  "Hoạt động": "green",
  "Đã khóa": "red",
};
// be thiếu trường tên khách hàng, cả phần đăng ký các kiểu...
const Customers = () => {
  const { fetchUsers, fetchUser } = useUser();
  const [users, setUsers] = useState();
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState(null);

  useEffect(() => {
    const fetchDataUsers = async () => {
      const user = await fetchUser();
      if (user.result.role !== "admin") {
        window.location.href = "/sign-in";
      } else {
        const usersData = await fetchUsers();
        setUsers(usersData);
      }
    };
    fetchDataUsers();
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
          <img
            src={image}
            alt="Ảnh sản phẩm"
            className="w-12 h-12 object-cover rounded-full"
          />
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
    <div className="lg:ml-[300px] mt-[64px] px-2 py-4 lg:p-6 min-h-screen">
      <div className="space-y-3 mb-4">
        <div className="flex flex-wrap sm:flex-nowrap gap-4">
          <Input
            placeholder="Tìm kiếm theo tên, email, số điện thoại khách hàng"
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
        </div>
      </div>

      <div className="bg-white p-4 shadow-lg">
        <Table
          dataSource={filteredUsers}
          columns={columns}
          pagination={{ pageSize: 8 }}
          rowKey="_id"
          className="rounded-none"
          scroll={{ x: "max-content" }}
        />
      </div>
    </div>
  );
};

export default Customers;
