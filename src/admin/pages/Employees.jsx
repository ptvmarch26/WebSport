import { useState } from "react";
import { Table, Input, Button, Modal, Form, Select, Tag } from "antd";
import {
  DeleteOutlined,
  PlusOutlined,
  ExportOutlined,
} from "@ant-design/icons";

const { Option } = Select;

const initialEmployees = [
  {
    id: "NV001",
    name: "John Doe",
    phone: "1234567890",
    email: "johndoe@example.com",
    role: "Nhân viên",
    username: "johndoe",
    password: "password123",
  },
  {
    id: "NV002",
    name: "Jane Doe",
    phone: "0987654321",
    email: "janedoe@example.com",
    role: "Quản lý",
    username: "janedoe",
    password: "password456",
  },
];

const Employees = () => {
  const [form] = Form.useForm();
  const [employees, setEmployees] = useState(initialEmployees);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddEmployeeModalVisible, setIsAddEmployeeModalVisible] =
    useState(false);
  const [newEmployee, setNewEmployee] = useState({
    id: "",
    name: "",
    phone: "",
    email: "",
    role: "Nhân viên",
    username: "",
    password: "",
  });
  const [filterRole, setFilterRole] = useState(null);

  const handleDelete = () => {
    setEmployees(
      employees.filter((employee) => !selectedRowKeys.includes(employee.id))
    );
    setSelectedRowKeys([]);
    setIsModalVisible(false);
  };

  const handleAddEmployee = async () => {
    try {
      await form.validateFields();

      const newEmployeeData = {
        ...newEmployee,
        id: `NV${(employees.length + 1).toString().padStart(3, "0")}`,
      };
      setEmployees([...employees, newEmployeeData]);
      setIsAddEmployeeModalVisible(false);
      setNewEmployee({
        id: "",
        name: "",
        phone: "",
        email: "",
        role: "Nhân viên",
        username: "",
        password: "",
      });
    } catch (error) {
      console.log("Form validation failed:", error);
    }
  };

  const statusColors = {
    "Nhân viên": "green",
    "Quản lý": "blue",
  };

  const filteredEmployees = filterRole
    ? employees.filter((employee) => employee.role === filterRole)
    : employees;

  const columns = [
    {
      title: "Mã nhân viên",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên nhân viên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tên đăng nhập",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Chức vụ",
      dataIndex: "role",
      key: "role",
      render: (role) => <Tag className="py-1 px-2" color={statusColors[role]}>{role}</Tag>,
    },
  ];

  return (
    <div className="ml-[300px] mt-[64px] p-6 min-h-screen bg-gray-100">
      <div className="space-y-3 mb-4">
        <div className="flex gap-4">
          <Input
            placeholder="Tìm kiếm theo tên nhân viên..."
            className="rounded-none"
          />
          <Button
            type="primary"
            icon={<ExportOutlined />}
            className="rounded-none"
          >
            Xuất file
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsAddEmployeeModalVisible(true)}
            className="rounded-none"
          >
            Thêm nhân viên
          </Button>
        </div>

        <div className="flex justify-between">
          <Select
            placeholder="Lọc theo chức vụ"
            value={filterRole}
            onChange={setFilterRole}
            allowClear
            className="w-[300px]"
          >
            <Option value="Nhân viên">Nhân viên</Option>
            <Option value="Quản lý">Quản lý</Option>
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
          dataSource={filteredEmployees}
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
        <p>Bạn có chắc muốn xóa các nhân viên đã chọn?</p>
      </Modal>

      <Modal
        title="Thêm nhân viên mới"
        visible={isAddEmployeeModalVisible}
        onOk={handleAddEmployee}
        onCancel={() => setIsAddEmployeeModalVisible(false)}
        okText="Thêm"
        cancelText="Hủy"
        width={500}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddEmployee}
          initialValues={newEmployee}
        >
          <Form.Item
            label="Tên nhân viên"
            name="name"
            rules={[{ required: true, message: "Tên nhân viên là bắt buộc" }]}
          >
            <Input
              value={newEmployee.name}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, name: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[{ required: true, message: "Số điện thoại là bắt buộc" }]}
          >
            <Input
              value={newEmployee.phone}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, phone: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Email là bắt buộc" }]}
          >
            <Input
              value={newEmployee.email}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, email: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item
            label="Chức vụ"
            name="role"
            rules={[{ required: true, message: "Chức vụ là bắt buộc" }]}
          >
            <Select
              value={newEmployee.role}
              onChange={(value) =>
                setNewEmployee({ ...newEmployee, role: value })
              }
            >
              <Option value="Nhân viên">Nhân viên</Option>
              <Option value="Quản lý">Quản lý</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Tên đăng nhập"
            name="username"
            rules={[{ required: true, message: "Tên đăng nhập là bắt buộc" }]}
          >
            <Input
              value={newEmployee.username}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, username: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Mật khẩu là bắt buộc" }]}
          >
            <Input.Password
              value={newEmployee.password}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, password: e.target.value })
              }
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Employees;
