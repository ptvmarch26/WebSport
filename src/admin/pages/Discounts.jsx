import { useState } from "react";
import {
  Table,
  Input,
  Select,
  Button,
  Tag,
  Modal,
  Form,
  DatePicker,
} from "antd";
import {
  DeleteOutlined,
  ExportOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { Option } = Select;

const initialDiscounts = [
  {
    id: "KM001",
    code: "SALE10",
    value: 10,
    description: "Giảm 10% cho đơn hàng từ 500k",
    expire: "2025-06-01",
    status: "Hoạt động",
  },
  {
    id: "KM002",
    code: "FREESHIP",
    value: "Free Ship",
    description: "Miễn phí vận chuyển cho đơn từ 300k",
    expire: "2024-05-01",
    status: "Hết hạn",
  },
];

const updateDiscountStatus = (discount) => {
  return dayjs(discount.expire).endOf('day').isBefore(dayjs())
    ? { ...discount, status: "Hết hạn" }
    : { ...discount, status: "Hoạt động" };
};

const statusColors = {
  "Hoạt động": "green",
  "Hết hạn": "red",
};

const Discounts = () => {
  const [form] = Form.useForm();
  const [discounts, setDiscounts] = useState(
    initialDiscounts.map(updateDiscountStatus)
  );
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddDiscountModalVisible, setIsAddDiscountModalVisible] =
    useState(false);
  const [newDiscount, setNewDiscount] = useState({
    id: "",
    code: "",
    value: "",
    description: "",
    expire: "",
    status: "Hoạt động",
  });

  const handleDelete = () => {
    setDiscounts(
      discounts.filter((discount) => !selectedRowKeys.includes(discount.id))
    );
    setSelectedRowKeys([]);
    setIsModalVisible(false);
  };

  const filteredDiscounts = discounts.filter((discount) => {
    const matchesStatus = filterStatus
      ? discount.status === filterStatus
      : true;
    const matchesSearch = searchText
      ? discount.code.toLowerCase().includes(searchText.toLowerCase())
      : true;
    return matchesStatus && matchesSearch;
  });

  const handleAddDiscount = async () => {
    try {
      await form.validateFields();
      const updatedDiscount = updateDiscountStatus(newDiscount);
      setDiscounts([...discounts, updatedDiscount]);
      setIsAddDiscountModalVisible(false);
      setNewDiscount({
        id: "",
        code: "",
        value: "",
        description: "",
        expire: "",
        status: "Hoạt động",
      });
    } catch (error) {
      console.log("Form validation failed:", error);
    }
  };

  const columns = [
    { title: "Mã giảm giá", dataIndex: "id", key: "id" },
    { title: "Code", dataIndex: "code", key: "code" },
    { title: "Giá trị", dataIndex: "value", key: "value" },
    { title: "Mô tả", dataIndex: "description", key: "description" },
    { title: "Hạn sử dụng", dataIndex: "expire", key: "expire" },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag className="py-1 px-2" color={statusColors[status]}>{status}</Tag>,
    },
  ];

  return (
    <div className="ml-[300px] mt-[64px] p-6 min-h-screen bg-gray-100">
      <div className="space-y-3 mb-4">
        <div className="flex gap-4">
          <Input
            placeholder="Tìm kiếm theo code..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button type="primary" icon={<ExportOutlined />}>
            Xuất file
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsAddDiscountModalVisible(true)}
          >
            Thêm mã
          </Button>
        </div>
        <div className="flex justify-between">
          <Select
            placeholder="Trạng thái mã giảm giá"
            value={filterStatus}
            onChange={setFilterStatus}
            allowClear
            className="w-[300px]"
          >
            <Option value="Hoạt động">Hoạt động</Option>
            <Option value="Hết hạn">Hết hạn</Option>
          </Select>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            disabled={!selectedRowKeys.length}
            onClick={() => setIsModalVisible(true)}
          >
            Xóa ({selectedRowKeys.length})
          </Button>
        </div>
      </div>
      <div className="bg-white p-4 shadow-lg">
        <Table
          rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
          dataSource={filteredDiscounts}
          columns={columns}
          pagination={{ pageSize: 3 }}
          rowKey="id"
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
        <p>Bạn có chắc muốn xóa các mã giảm giá đã chọn?</p>
      </Modal>


      <Modal
        title="Thêm mã giảm giá"
        visible={isAddDiscountModalVisible}
        onOk={handleAddDiscount}
        onCancel={() => setIsAddDiscountModalVisible(false)}
        okText="Thêm"
        cancelText="Hủy"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddDiscount}
          initialValues={newDiscount}
        >
          <Form.Item
            label="Mã giảm giá"
            name="id"
            rules={[{ required: true, message: "Mã giảm giá là bắt buộc" }]}
          >
            <Input
              onChange={(e) =>
                setNewDiscount({ ...newDiscount, id: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item
            label="Code"
            name="code"
            rules={[{ required: true, message: "Code là bắt buộc" }]}
          >
            <Input
              onChange={(e) =>
                setNewDiscount({ ...newDiscount, code: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item
            label="Giá trị"
            name="value"
            rules={[{ required: true, message: "Giá trị là bắt buộc" }]}
          >
            <Input
              onChange={(e) =>
                setNewDiscount({ ...newDiscount, value: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Mô tả" name="description">
            <Input.TextArea
              onChange={(e) =>
                setNewDiscount({ ...newDiscount, description: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item
            label="Hạn sử dụng"
            name="expire"
            rules={[{ required: true, message: "Hạn sử dụng là bắt buộc" }]}
          >
            <DatePicker
              onChange={(date, dateString) =>
                setNewDiscount({ ...newDiscount, expire: dateString })
              }
              format="YYYY-MM-DD"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Discounts;
