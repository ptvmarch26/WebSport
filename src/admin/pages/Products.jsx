import { useEffect, useState } from "react";
import { Table, Input, Select, Button, Modal, Form, InputNumber } from "antd";
import {
  DeleteOutlined,
  ExportOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useProduct } from "../../context/ProductContext";
import { Upload, Switch, Card } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useCategories } from "../../context/CategoriesContext";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const Products = () => {
  const { products, fetchProducts, removeProduct, addProduct, editProduct } =
    useProduct();
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddProductModalVisible, setIsAddProductModalVisible] =
    useState(false);
  const [isEditProductModalVisible, setIsEditProductgModalVisible] =
    useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  const { categories, fetchCategories } = useCategories();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
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

  const normFile = (e) => {
    if (Array.isArray(e)) return e;
    return e?.fileList;
  };

  const handleAddProduct = async () => {
    try {
      await form.validateFields();
      const newProduct = form.getFieldsValue();
      const res = await addProduct(newProduct);
      if (res?.EC === 0) {
        fetchProducts();
        form.resetFields();
        setIsAddProductModalVisible(false);
      }
    } catch (error) {
      console.log("Lỗi khi xác thực form:", error);
    }
  };

  const handleEditProduct = (record) => {
    if (record) {
      setSelectedProduct(record); // Cập nhật giá trị discount được chọn
      form.setFieldsValue(record); // Điền thông tin discount vào form
      setIsEditProductgModalVisible(true); // Mở modal chỉnh sửa
    } else {
      console.error("Không có discount được chọn");
    }
  };

  const handleUpdate = async () => {
    try {
      await form.validateFields();
      const updatedFields = form.getFieldsValue();

      const res = await editProduct(selectedProduct._id, updatedFields);
      console.log(res);
      if (res?.EC === 0) {
        fetchProducts();
        form.resetFields();
        setIsEditProductgModalVisible(false);
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm:", error);
    }
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
      key: "product_img",
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
    { title: "Tên sản phẩm", dataIndex: "product_title", key: "product_title" },
    { title: "Thương hiệu", dataIndex: "product_brand", key: "product_brand" },
    {
      title: "Số lượng tồn",
      dataIndex: "product_countInStock",
      key: "product_countInStock",
      render: (value) => `${value}`,
    },
    {
      title: "Đã bán",
      dataIndex: "product_selled",
      key: "product_selled",
      render: (value) => value ?? 0,
    },
    {
      title: "Giá gốc",
      dataIndex: "product_price",
      key: "product_price",
      render: (value) => `${value}đ`,
    },
    {
      title: "Giảm giá (%)",
      dataIndex: "product_percent_discount",
      key: "product_percent_discount",
      render: (value) => `${value}%`,
    },
    {
      title: "Đánh giá",
      dataIndex: "product_rate",
      key: "product_rate",
      render: (value) => value ?? "Chưa có",
    },
    {
      title: "Chỉnh sửa",
      key: "edit",
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => handleEditProduct(record)} // Gọi handleEditDiscount với dòng được chọn
        >
          Chỉnh sửa
        </Button>
      ),
    },
    {
      title: "Xem chi tiết",
      key: "view",
      render: (record) => (
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => navigate(`/admin/product-details/${record._id}`)}
        >
          Chi tiết
        </span>
      ),
    },
  ];

  return (
    <div className="lg:ml-[300px] mt-[64px] px-2 py-4 lg:p-6 min-h-screen">
      <div className="space-y-3 mb-4">
        <div className="flex flex-wrap sm:flex-nowrap gap-4">
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
        <div className="flex flex-wrap sm:flex-nowrap gap-4 justify-between">
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
          pagination={{ pageSize: 10 }}
          rowKey="_id"
          onRow={(record) => ({
            onClick: () => navigate(`/admin/product-details/${record._id}`),
          })}
          className="rounded-none cursor-pointer"
          scroll={{x: 'max-content'}}
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
        onOk={form.submit}
        onCancel={() => setIsAddProductModalVisible(false)}
        okText="Thêm"
        cancelText="Hủy"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddProduct}
          initialValues={{
            product_price: 0,
            product_countInStock: 0,
            product_display: true,
            product_famous: false,
            product_percent_discount: 0,
            product_rate: 0,
            product_selled: 0,
            product_img_subs: [],
          }}
        >
          <Form.Item
            label="Tên sản phẩm"
            name="product_title"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Thương hiệu"
            name="product_brand"
            rules={[{ required: true, message: "Vui lòng nhập thương hiệu" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Giá gốc"
            name="product_price"
            rules={[{ required: true, message: "Vui lòng nhập giá" }]}
          >
            <InputNumber min={0} className="w-full" />
          </Form.Item>

          <Form.Item
            label="Số lượng tồn"
            name="product_countInStock"
            rules={[{ required: true, message: "Vui lòng nhập số lượng" }]}
          >
            <InputNumber min={0} className="w-full" />
          </Form.Item>

          <Form.Item label="Đã bán" name="product_selled">
            <InputNumber min={0} className="w-full" />
          </Form.Item>

          <Form.Item label="Giảm giá (%)" name="product_percent_discount">
            <InputNumber min={0} max={100} className="w-full" />
          </Form.Item>

          <Form.Item label="Đánh giá" name="product_rate">
            <InputNumber min={0} max={5} step={0.1} className="w-full" />
          </Form.Item>

          <Form.Item
            label="Danh mục"
            name="product_category"
            rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
          >
            <Select>
              {categories?.map((cat) => (
                <Select.Option key={cat._id} value={cat._id}>
                  {cat.category_type}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Mô tả sản phẩm"
            name="product_description"
            rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label="Ảnh chính"
            name="product_main_img"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload beforeUpload={() => false} listType="picture" maxCount={1}>
              <Button icon={<UploadOutlined />}>Tải ảnh chính lên</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Ảnh phụ"
            name="product_subs_img"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload beforeUpload={() => false} listType="picture" multiple>
              <Button icon={<UploadOutlined />}>Tải ảnh phụ lên</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            name="product_display"
            label="Hiển thị sản phẩm"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item
            name="product_famous"
            label="Sản phẩm nổi bật"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Form.List name="variants">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Card
                    key={key}
                    title={`Biến thể ${key + 1}`}
                    className="mb-4"
                    extra={
                      <Button danger onClick={() => remove(name)}>
                        Xóa
                      </Button>
                    }
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "variant_color"]}
                      label="Màu sắc"
                      rules={[{ required: true, message: "Vui lòng nhập màu" }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "variant_size"]}
                      label="Kích cỡ"
                      rules={[
                        { required: true, message: "Vui lòng nhập kích cỡ" },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "variant_price"]}
                      label="Giá"
                      rules={[{ required: true, message: "Vui lòng nhập giá" }]}
                    >
                      <InputNumber min={0} className="w-full" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "variant_countInStock"]}
                      label="Số lượng tồn"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập số lượng tồn",
                        },
                      ]}
                    >
                      <InputNumber min={0} className="w-full" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "variant_percent_discount"]}
                      label="Giảm giá (%)"
                    >
                      <InputNumber min={0} max={100} className="w-full" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "variant_img_main"]}
                      label="Ảnh chính"
                      valuePropName="fileList"
                      getValueFromEvent={normFile}
                    >
                      <Upload
                        beforeUpload={() => false}
                        listType="picture"
                        maxCount={1}
                      >
                        <Button icon={<UploadOutlined />}>
                          Tải ảnh chính lên
                        </Button>
                      </Upload>
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "variant_img_subs"]}
                      label="Ảnh phụ"
                      valuePropName="fileList"
                      getValueFromEvent={normFile}
                    >
                      <Upload
                        beforeUpload={() => false}
                        listType="picture"
                        multiple
                      >
                        <Button icon={<UploadOutlined />}>
                          Tải ảnh phụ lên
                        </Button>
                      </Upload>
                    </Form.Item>
                  </Card>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Thêm biến thể
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </Modal>

      {/* Modal chỉnh sửa  */}
      <Modal
        title="Chỉnh sửa sản phẩm"
        open={isEditProductModalVisible}
        onOk={handleUpdate}
        onCancel={() => setIsEditProductgModalVisible(false)}
        okText="Cập nhật"
        cancelText="Hủy"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleUpdate}
          initialValues={selectedProduct}
        >
          <Form.Item
            label="Tên sản phẩm"
            name="product_title"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Thương hiệu"
            name="product_brand"
            rules={[{ required: true, message: "Vui lòng nhập thương hiệu" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Giá gốc"
            name="product_price"
            rules={[{ required: true, message: "Vui lòng nhập giá" }]}
          >
            <InputNumber min={0} className="w-full" />
          </Form.Item>

          <Form.Item
            label="Số lượng tồn"
            name="product_countInStock"
            rules={[{ required: true, message: "Vui lòng nhập số lượng" }]}
          >
            <InputNumber min={0} className="w-full" />
          </Form.Item>

          <Form.Item label="Đã bán" name="product_selled">
            <InputNumber min={0} className="w-full" />
          </Form.Item>

          <Form.Item label="Giảm giá (%)" name="product_percent_discount">
            <InputNumber min={0} max={100} className="w-full" />
          </Form.Item>

          <Form.Item label="Đánh giá" name="product_rate">
            <InputNumber min={0} max={5} step={0.1} className="w-full" />
          </Form.Item>

          <Form.Item
            label="Danh mục"
            name="product_category"
            rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
          >
            <Select>
              {categories?.map((cat) => (
                <Select.Option key={cat._id} value={cat._id}>
                  {cat.category_type}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Mô tả sản phẩm"
            name="product_description"
            rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label="Ảnh chính"
            name="product_main_img"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload beforeUpload={() => false} listType="picture" maxCount={1}>
              <Button icon={<UploadOutlined />}>Tải ảnh chính lên</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Ảnh phụ"
            name="product_subs_img"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload beforeUpload={() => false} listType="picture" multiple>
              <Button icon={<UploadOutlined />}>Tải ảnh phụ lên</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            name="product_display"
            label="Hiển thị sản phẩm"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item
            name="product_famous"
            label="Sản phẩm nổi bật"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Form.List name="variants">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Card
                    key={key}
                    title={`Biến thể ${key + 1}`}
                    className="mb-4"
                    extra={
                      <Button danger onClick={() => remove(name)}>
                        Xóa
                      </Button>
                    }
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "variant_color"]}
                      label="Màu sắc"
                      rules={[{ required: true, message: "Vui lòng nhập màu" }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "variant_size"]}
                      label="Kích cỡ"
                      rules={[
                        { required: true, message: "Vui lòng nhập kích cỡ" },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "variant_price"]}
                      label="Giá"
                      rules={[{ required: true, message: "Vui lòng nhập giá" }]}
                    >
                      <InputNumber min={0} className="w-full" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "variant_countInStock"]}
                      label="Số lượng tồn"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập số lượng tồn",
                        },
                      ]}
                    >
                      <InputNumber min={0} className="w-full" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "variant_percent_discount"]}
                      label="Giảm giá (%)"
                    >
                      <InputNumber min={0} max={100} className="w-full" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "variant_img_main"]}
                      label="Ảnh chính"
                      valuePropName="fileList"
                      getValueFromEvent={normFile}
                    >
                      <Upload
                        beforeUpload={() => false}
                        listType="picture"
                        maxCount={1}
                      >
                        <Button icon={<UploadOutlined />}>
                          Tải ảnh chính lên
                        </Button>
                      </Upload>
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "variant_img_subs"]}
                      label="Ảnh phụ"
                      valuePropName="fileList"
                      getValueFromEvent={normFile}
                    >
                      <Upload
                        beforeUpload={() => false}
                        listType="picture"
                        multiple
                      >
                        <Button icon={<UploadOutlined />}>
                          Tải ảnh phụ lên
                        </Button>
                      </Upload>
                    </Form.Item>
                  </Card>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Thêm biến thể
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </Modal>
    </div>
  );
};

export default Products;
