import { useState } from "react";
import {
  Table,
  Input,
  Select,
  Button,
  Tag,
  Modal,
  Form,
  InputNumber,
} from "antd";
import { DeleteOutlined, ExportOutlined, PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const initialProducts = [
  {
    id: "SP001",
    name: "Vòng tay phong thủy",
    stock: 100,
    sold: 50,
    originalPrice: 300000,
    discount: 10,
    updatedPrice: 270000,
    status: "Còn hàng",
  },
  {
    id: "SP002",
    name: "Giày Nike Air Force 1",
    stock: 0,
    sold: 200,
    originalPrice: 2500000,
    discount: 20,
    updatedPrice: 2000000,
    status: "Hết hàng",
  },
  {
    id: "SP003",
    name: "Balo Laptop Xiaomi",
    stock: 9,
    sold: 80,
    originalPrice: 800000,
    discount: 15,
    updatedPrice: 680000,
    status: "Còn hàng",
  },
];

const updateProductStatus = (product) => {
  if (product.stock === 0) {
    return { ...product, status: "Hết hàng" };
  }
  if (product.stock > 0 && product.stock < 10) {
    return { ...product, status: "Cần nhập" };
  }
  return { ...product, status: "Còn hàng" };
};

const statusColors = {
  "Còn hàng": "green",
  "Hết hàng": "red",
  "Cần nhập": "orange",
};

const Products = () => {
  const [form] = Form.useForm();
  const [products, setProducts] = useState(
    initialProducts.map(updateProductStatus)
  );
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddProductModalVisible, setIsAddProductModalVisible] =
    useState(false);
  const [newProduct, setNewProduct] = useState({
    id: "",
    name: "",
    stock: "",
    sold: "",
    originalPrice: "",
    discount: "",
    updatedPrice: "",
    status: "Còn hàng",
  });

  // Xử lý xóa sản phẩm
  const handleDelete = () => {
    setProducts(
      products.filter((product) => !selectedRowKeys.includes(product.id))
    );
    setSelectedRowKeys([]);
    setIsModalVisible(false);
  };

  // Lọc sản phẩm theo trạng thái & tìm kiếm
  const filteredProducts = products.filter((product) => {
    const matchesStatus = filterStatus ? product.status === filterStatus : true;
    const matchesSearch = searchText
      ? product.name.toLowerCase().includes(searchText.toLowerCase())
      : true;
    return matchesStatus && matchesSearch;
  });

  const handleAddProduct = async () => {
    try {
      await form.validateFields();

      const updatedProduct = updateProductStatus(newProduct);
      setProducts([...products, updatedProduct]);
      setIsAddProductModalVisible(false);
      setNewProduct({
        id: "",
        name: "",
        stock: 0,
        sold: 0,
        originalPrice: 0,
        discount: 0,
        updatedPrice: 0,
        status: "Còn hàng",
      });
    } catch (error) {
      console.log("Form validation failed:", error);
    }
  };

  const columns = [
    {
      title: "Mã sản phẩm",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số lượng tồn",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Đã bán",
      dataIndex: "sold",
      key: "sold",
    },
    {
      title: "Giá gốc",
      dataIndex: "originalPrice",
      key: "originalPrice",
      render: (value) => `${value.toLocaleString()}đ`,
    },
    {
      title: "Giảm giá (%)",
      dataIndex: "discount",
      key: "discount",
      render: (value) => `${value}%`,
    },
    {
      title: "Giá cập nhật",
      dataIndex: "updatedPrice",
      key: "updatedPrice",
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

          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsAddProductModalVisible(true)}
            className="rounded-none"
          >
            Thêm sản phẩm
          </Button>
        </div>
        <div className="flex justify-between">
          <Select
            placeholder="Trạng thái sản phẩm"
            value={filterStatus}
            onChange={setFilterStatus}
            allowClear
            className="w-[300px]"
          >
            <Option value="Còn hàng">Còn hàng</Option>
            <Option value="Hết hàng">Hết hàng</Option>
            <Option value="Cần nhập">Cần nhập</Option>
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
          dataSource={filteredProducts}
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
        <p>Bạn có chắc muốn xóa các sản phẩm đã chọn?</p>
      </Modal>

      <Modal
        title="Thêm sản phẩm mới"
        visible={isAddProductModalVisible}
        onOk={handleAddProduct}
        onCancel={() => setIsAddProductModalVisible(false)}
        okText="Thêm"
        cancelText="Hủy"
        width={500}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddProduct}
          initialValues={newProduct}
        >
          <Form.Item
            label="Mã sản phẩm"
            name="id"
            rules={[{ required: true, message: "Mã sản phẩm là bắt buộc" }]}
          >
            <Input
              value={newProduct.id}
              onChange={(e) =>
                setNewProduct({ ...newProduct, id: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item
            label="Tên sản phẩm"
            name="name"
            rules={[{ required: true, message: "Tên sản phẩm là bắt buộc" }]}
          >
            <Input
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item
            label="Số lượng tồn"
            name="stock"
            rules={[
              {
                required: true,
                type: "number",
                min: 0,
                message: "Số lượng tồn là bắt buộc",
              },
            ]}
          >
            <InputNumber
              value={newProduct.stock}
              onChange={(value) =>
                setNewProduct({ ...newProduct, stock: value })
              }
              min={0}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            label="Giá gốc"
            name="originalPrice"
            rules={[
              {
                required: true,
                type: "number",
                min: 0,
                message: "Giá gốc là bắt buộc",
              },
            ]}
          >
            <InputNumber
              value={newProduct.originalPrice}
              onChange={(value) =>
                setNewProduct({ ...newProduct, originalPrice: value })
              }
              min={0}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            label="Giảm giá (%)"
            name="discount"
            rules={[
              {
                required: true,
                type: "number",
                min: 0,
                max: 100,
                message: "Giảm giá là bắt buộc",
              },
            ]}
          >
            <InputNumber
              value={newProduct.discount}
              onChange={(value) =>
                setNewProduct({ ...newProduct, discount: value })
              }
              min={0}
              max={100}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            label="Giá cập nhật"
            name="updatedPrice"
            rules={[
              {
                required: true,
                type: "number",
                min: 0,
                message: "Giá cập nhật là bắt buộc",
              },
            ]}
          >
            <InputNumber
              value={newProduct.updatedPrice}
              onChange={(value) =>
                setNewProduct({ ...newProduct, updatedPrice: value })
              }
              min={0}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Products;
