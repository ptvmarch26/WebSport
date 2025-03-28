import { useEffect, useState } from "react";
import { Table, Input, Select, Button, Tag, Modal, Form } from "antd";
import {
  DeleteOutlined,
  ExportOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useProduct } from "../../context/ProductContext";
import { Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
const { Option } = Select;

const statusColors = {
  "Còn hàng": "green",
  "Hết hàng": "red",
  "Cần nhập": "orange",
};

const Products = () => {
  const { products, fetchProducts, removeProduct, addProduct } = useProduct();
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddProductModalVisible, setIsAddProductModalVisible] =
    useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async () => {
    try {
      await Promise.all(selectedRowKeys.map((id) => removeProduct(id)));
      fetchProducts();
      setSelectedRowKeys([]);
      setIsModalVisible(false);
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  };

  const handleUpload = (file) => {
    setImage(file);
    return false; // Ngăn tải lên tự động
  };

  const normFile = (e) => {
    if (Array.isArray(e)) return e;
    return e?.fileList;
  };

  const handleAddProduct = async (values) => {
    console.log("Form values from validateFields:", values);

    // Tạo FormData
    const formData = new FormData();

    // Thêm từng trường vào FormData
    for (const key in values) {
      // Chuyển đổi các giá trị undefined hoặc null thành chuỗi rỗng
      const value =
        values[key] !== undefined && values[key] !== null ? values[key] : "";
      formData.append(key, value);
    }

    // Kiểm tra nội dung FormData
    console.log("FormData entries:");
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    setIsAddProductModalVisible(false);
    form.resetFields();
    // setImage(null);
  };

  const filteredProducts = products.filter((product) => {
    const matchesStatus = filterStatus ? product.status === filterStatus : true;
    const matchesSearch = searchText
      ? product.product_title.toLowerCase().includes(searchText.toLowerCase())
      : true;
    return matchesStatus && matchesSearch;
  });

  const columns = [
    {
      title: "Ảnh",
      dataIndex: "product_img",
      key: "image",
      render: (product_img) =>
        product_img?.image_main ? (
          <img
            src={product_img.image_main}
            alt="Ảnh sản phẩm"
            className="w-16 h-16 object-cover rounded"
          />
        ) : (
          "Không có ảnh"
        ),
    },
    { title: "Mã sản phẩm", dataIndex: "_id", key: "id" },
    { title: "Tên sản phẩm", dataIndex: "product_title", key: "product_title" },
    { title: "Thương hiệu", dataIndex: "product_brand", key: "product_brand" },
    {
      title: "Số lượng tồn",
      dataIndex: "product_countInStock",
      key: "product_countInStock",
    },
    { title: "Đã bán", dataIndex: "product_selled", key: "product_selled" },
    {
      title: "Giá gốc",
      dataIndex: "product_price",
      key: "product_price",
      render: (value) => `${value.toLocaleString()}đ`,
    },
    {
      title: "Giảm giá (%)",
      dataIndex: "product_percent_discount",
      key: "product_percent_discount",
      render: (value) => `${value}%`,
    },
    { title: "Đánh giá", dataIndex: "product_rate", key: "product_rate" },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString("vi-VN"),
    },
    {
      title: "Trạng thái",
      dataIndex: "product_countInStock",
      key: "status",
      render: (countInStock) => {
        let status = "Hết hàng";
        if (countInStock > 5) status = "Còn hàng";
        else if (countInStock > 0) status = "Cần nhập";

        return (
          <Tag className="py-1 px-2" color={statusColors[status]}>
            {status}
          </Tag>
        );
      },
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
          rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
          dataSource={filteredProducts}
          columns={columns}
          pagination={{ pageSize: 5 }}
          rowKey="_id"
          className="rounded-none"
        />
      </div>

      {/* Modal Xóa */}
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
        <p>Bạn có chắc muốn xóa các sản phẩm đã chọn?</p>
      </Modal>

      {/* Modal Thêm Sản Phẩm */}
      <Modal
        title="Thêm sản phẩm mới"
        open={isAddProductModalVisible}
        onCancel={() => setIsAddProductModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => {
            console.log("onFinish values:", values);
            handleAddProduct(values);
          }}
          initialValues={{
            product_title: "",
            product_brand: "",
            product_price: 0,
            product_countInStock: 0,
            product_selled: 0,
            product_percent_discount: 0,
            product_rate: 0,
          }}
        >
          <Form.Item label="Tên sản phẩm" name="product_title">
            
            <Input />
          </Form.Item>
          <Form.Item label="Thương hiệu" name="product_brand">
            
            <Input />
          </Form.Item>
          <Form.Item label="Giá gốc" name="product_price">
            
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Số lượng tồn" name="product_countInStock">
            
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Đã bán" name="product_selled">
            
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Giảm giá (%)" name="product_percent_discount">
            
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Đánh giá" name="product_rate">
            
            <Input type="number" step="0.1" />
          </Form.Item>
          {/* <Form.Item label="Ảnh sản phẩm" name="product_image" valuePropName="fileList" getValueFromEvent={normFile}>
            <Upload beforeUpload={handleUpload} listType="picture">
              <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
            </Upload>
          </Form.Item> */}
          <Form.Item>
            
            <Button type="primary" htmlType="submit">
              Thêm sản phẩm
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Products;
