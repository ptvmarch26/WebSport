import React, { useState, useEffect } from "react";
import {
  Table,
  Input,
  Select,
  Button,
  Tag,
  Modal,
  Form,
  DatePicker,
  InputNumber,
} from "antd";
import {
  DeleteOutlined,
  ExportOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useDiscount } from "../../context/DiscountContext";
import { useProduct } from "../../context/ProductContext";

const { Option } = Select;

const statusColors = {
  active: "green",
  expired: "red",
  upcoming: "blue",
};

const Discounts = () => {
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddDiscountModalVisible, setIsAddDiscountModalVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isEditDiscountModalVisible, setIsEditDiscountModalVisible] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState(null);

  const { discounts, setDiscounts, fetchDiscounts, handleCreateDiscount, handleDeleteDiscount, handleUpdateDiscount } = useDiscount();
  const { products, fetchProducts } = useProduct();
  
  useEffect(() => {
    fetchProducts();    
  }, []);
  
  useEffect(() => {
    fetchDiscounts();
  }, []);

  const handleDelete = async () => {
    try {
      await Promise.all(selectedRowKeys.map((id) => handleDeleteDiscount(id)));
      fetchDiscounts();
      setSelectedRowKeys([]);
      setIsModalVisible(false);
    } catch (error) {
      console.error("Lỗi khi xóa mã:", error);
    }
  };

  const filteredDiscounts = discounts.filter((discount) => {
    const matchesStatus = filterStatus ? discount.status === filterStatus : true;
    const matchesSearch = searchText ? discount.discount_code.toLowerCase().includes(searchText.toLowerCase()) : true;
    return matchesStatus && matchesSearch;
  });

  const handleAddDiscount = async () => {
    try {
      await form.validateFields(); 
      const newDiscount = form.getFieldsValue(); 
  
      // Kiểm tra giá trị ngày hợp lệ
      if (!newDiscount.discount_start_day || !newDiscount.discount_end_day) {
        console.error("Ngày bắt đầu hoặc ngày kết thúc không hợp lệ");
        return;
      }
  
      const res = await handleCreateDiscount(newDiscount);
      if (res?.EC === 0) {
        setDiscounts((prevDiscounts) => [...prevDiscounts, res.data]);
        form.resetFields(); 
        setIsAddDiscountModalVisible(false);
      }
    } catch (error) {
      console.log("Lỗi khi xác thực form:", error.message || error);
    }
  }; 

  const handleEditDiscount = (record) => {
    if (record) {
      setSelectedDiscount(record);  // Cập nhật giá trị discount được chọn
      form.setFieldsValue(record);  // Điền thông tin discount vào form
      setIsEditDiscountModalVisible(true);  // Mở modal chỉnh sửa
    } else {
      console.error("Không có discount được chọn");
    }
  };

  const handleUpdate = async () => {
    try {
      await form.validateFields();
      const updatedFields = form.getFieldsValue(); 
      const updatedDiscount = { ...selectedDiscount, ...updatedFields };

      const res = await handleUpdateDiscount(selectedDiscount._id, updatedDiscount);
      console.log(res);
      if (res?.EC === 0) {
        form.resetFields();
        setIsEditDiscountModalVisible(false);
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật mã giảm giá:", error);
    }
  };

  const columns = [
    { title: "Mã giảm giá", dataIndex: "_id", key: "_id" },
    { title: "Code", dataIndex: "discount_code", key: "discount_code" },
    { title: "Loại", dataIndex: "discount_type", key: "discount_type" },
    { title: "Mô tả", dataIndex: "description", key: "description" },
    { title: "Hạn sử dụng", dataIndex: "discount_end_day", key: "discount_end_day" },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag className="py-1 px-2" color={statusColors[status]}>{status}</Tag>,
    },
    {
      title: "Chỉnh sửa",
      key: "edit",
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => handleEditDiscount(record)} // Gọi handleEditDiscount với dòng được chọn
        >
          Chỉnh sửa
        </Button>
      ),
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
            <Option value="active">Hoạt động</Option>
            <Option value="expired">Hết hạn</Option>
            <Option value="upcoming">Sắp tới</Option>
          </Select>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            disabled={selectedRowKeys.length === 0}
            onClick={() => setIsModalVisible(true)}
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
          dataSource={filteredDiscounts}
          columns={columns}
          pagination={{ pageSize: 8}}
          rowKey="_id"
        />
      </div>
      <Modal
        title="Xác nhận xóa"
        open={isModalVisible}
        onOk={handleDelete}
        onCancel={() => setIsModalVisible(false)}
        okText="Xóa"
        cancelText="Hủy"
        okButtonProps={{ danger: true }}
        width={500}
        styles={{ padding: "20px" }}
      >
        <p>Bạn có chắc muốn xóa các mã giảm giá đã chọn?</p>
      </Modal>

      <Modal
        title="Thêm mã giảm giá"
        open={isAddDiscountModalVisible}
        onOk={handleAddDiscount}
        onCancel={() => setIsAddDiscountModalVisible(false)}
        okText="Thêm"
        cancelText="Hủy"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddDiscount}
        >
          <Form.Item
            label="Tên mã giảm giá"
            name="discount_title"
            rules={[{ required: true, message: "Tiêu đề là bắt buộc" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mã giảm giá"
            name="discount_code"
            rules={[{ required: true, message: "Mã Code là bắt buộc" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Loại giảm giá"
            name="discount_type"
            rules={[{ required: true, message: "Loại giảm giá là bắt buộc" }]}
          >
            <Select>
              <Option value="shipping">Vận chuyển</Option>
              <Option value="product">Sản phẩm</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Số lượng giảm giá (%)"
            name="discount_number"
            rules={[{ required: true, message: "Số lượng giảm giá là bắt buộc" }]}
          >
            <InputNumber min={0} max={100} />
          </Form.Item>
          <Form.Item
            label="Số lượng mã giảm giá (%)"
            name="discount_amount"
            rules={[{ required: true, message: "Số lượng mã giảm giá là bắt buộc" }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Ngày bắt đầu"
            name="discount_start_day"
            rules={[{ required: true, message: "Ngày bắt đầu là bắt buộc" }]}
          >
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item
            label="Ngày kết thúc"
            name="discount_end_day"
            rules={[{ required: true, message: "Ngày kết thúc là bắt buộc" }]}
          >
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="description"
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Giá trị đơn hàng tối thiểu"
            name="min_order_value"
          >
            <InputNumber />
          </Form.Item>
          {/* <Form.Item
            label="Danh mục áp dụng"
            name="applicable_categories"
            rules={[{ required: true, message: "Danh mục là bắt buộc" }]}
          >
            <Select mode="multiple">
              {/* Option categories sẽ được lấy từ backend hoặc context */}
              {/* <Option value="categoryId1">Category 1</Option>
              <Option value="categoryId2">Category 2</Option>
            </Select>
          </Form.Item> */}
          <Form.Item
            label="Sản phẩm áp dụng"
            name="applicable_products"
            rules={[{ required: true, message: "Sản phẩm là bắt buộc" }]}
          >
            <Select mode="multiple">
              {products?.map((product) => (
                <Option key={product._id} value={product._id}>
                  {product.product_title}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Chỉnh sửa mã giảm giá"
        open={isEditDiscountModalVisible}
        onOk={handleUpdate}  // Xử lý cập nhật khi nhấn OK
        onCancel={() => setIsEditDiscountModalVisible(false)}
        okText="Cập nhật"
        cancelText="Hủy"
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={selectedDiscount}  // Điền giá trị selectedDiscount vào form
          onFinish={handleUpdate}  // Xử lý cập nhật thông tin
        >
          <Form.Item
            label="Tên mã giảm giá"
            name="discount_title"
            rules={[{ required: true, message: "Tiêu đề là bắt buộc" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mã giảm giá"
            name="discount_code"
            rules={[{ required: true, message: "Mã Code là bắt buộc" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Loại giảm giá"
            name="discount_type"
            rules={[{ required: true, message: "Loại giảm giá là bắt buộc" }]}
          >
            <Select>
              <Option value="shipping">Vận chuyển</Option>
              <Option value="product">Sản phẩm</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Số lượng giảm giá (%)"
            name="discount_number"
            rules={[{ required: true, message: "Số lượng giảm giá là bắt buộc" }]}
          >
            <InputNumber min={0} max={100} />
          </Form.Item>
          <Form.Item
            label="Số lượng mã giảm giá (%)"
            name="discount_amount"
            rules={[{ required: true, message: "Số lượng mã giảm giá là bắt buộc" }]}
          >
            <InputNumber />
          </Form.Item>
          {/* <Form.Item
            label="Ngày bắt đầu"
            name="discount_start_day"
            rules={[{ required: true, message: "Ngày bắt đầu là bắt buộc" }]}
          >
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item
            label="Ngày kết thúc"
            name="discount_end_day"
            rules={[{ required: true, message: "Ngày kết thúc là bắt buộc" }]}
          >
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item> */}
          <Form.Item
            label="Mô tả"
            name="description"
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Giá trị đơn hàng tối thiểu"
            name="min_order_value"
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Sản phẩm áp dụng"
            name="applicable_products"
            rules={[{ required: true, message: "Sản phẩm là bắt buộc" }]}
          >
            <Select mode="multiple">
              {products?.map((product) => (
                <Option key={product._id} value={product._id}>
                  {product.product_title}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
  
    </div>
  );
};

export default Discounts;
