import { useEffect, useState } from "react";
import {
  Table,
  Input,
  Select,
  Button,
  Modal,
  Form,
  InputNumber,
} from "antd";
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
import { Divider } from "antd";
import { useLoading } from "../../context/LoadingContext";
import { usePopup } from "../../context/PopupContext";

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
  const { setLoading } = useLoading();
  const { showPopup } = usePopup();
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
      showPopup("Xóa sản phẩm thành công");
    } catch {
      showPopup("Lỗi khi xóa sản phẩm", false);

    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) return e;
    return e?.fileList || [];
  };

  const handleAddProduct = async () => {
    try {
      setLoading(true, "Đang thêm sản phẩm");
      await form.validateFields();
      const newProduct = form.getFieldsValue();

      const res = await addProduct(newProduct);
      if (res?.EC === 0) {
        fetchProducts();
        form.resetFields();
        setIsAddProductModalVisible(false);
      }
    } catch {
      return;
    }
    setLoading(false);
  };

  const urlToFile = async (url, filename, mimeType = "image/png") => {
    const res = await fetch(url);
    const blob = await res.blob();
    return new File([blob], filename, { type: mimeType });
  };

  const handleEditProduct = async (record) => {
    setLoading(true, "Đang mở form sản phẩm");
    const productImages = await Promise.all(
      (Array.isArray(record.product_img)
        ? record.product_img
        : [record.product_img]
      )
        .filter(Boolean)
        .map(async (url, index) => ({
          uid: `${index}`,
          name: `product-image-${index}.png`,
          status: "done",
          originFileObj: await urlToFile(url, `product-image-${index}.png`),
        }))
    );

    const colorImages = await Promise.all(
      (record.colors || []).map(async (color, colorIndex) => {
        const imgMain = color.imgs?.img_main
          ? [
              {
                uid: `main-${colorIndex}`,
                name: `main-color-${colorIndex}.png`,
                status: "done",
                url: color.imgs.img_main,
                originFileObj: await urlToFile(
                  color.imgs.img_main,
                  `main-color-${colorIndex}.png`
                ),
              },
            ]
          : [];

        const imgSubs = Array.isArray(color.imgs?.img_subs)
          ? await Promise.all(
              color.imgs.img_subs.map(async (url, idx) => ({
                uid: `sub-${colorIndex}-${idx}`,
                name: `sub-color-${colorIndex}-${idx}.png`,
                status: "done",
                originFileObj: await urlToFile(
                  url,
                  `sub-color-${colorIndex}-${idx}.png`
                ),
              }))
            )
          : [];
        setLoading(false);

        return {
          ...color,
          imgs: {
            img_main: imgMain,
            img_subs: imgSubs,
          },
        };
      })
    );

    const recordWithNormalizedImages = {
      ...record,
      product_img: productImages,
      product_category: record.product_category._id,
      colors: colorImages,
    };

    setSelectedProduct(recordWithNormalizedImages);
    form.setFieldsValue(recordWithNormalizedImages);
    setIsEditProductgModalVisible(true);
  };

  const handleUpdate = async () => {
    setLoading(true, "Đang sửa sản phẩm");
    try {
      await form.validateFields();
      const updatedFields = form.getFieldsValue();
      const res = await editProduct(selectedProduct._id, updatedFields);
      if (res?.EC === 0) {
        fetchProducts();
        form.resetFields();
        setIsEditProductgModalVisible(false);
      }
    } catch {
      showPopup("Lỗi khi cập nhật sản phẩm", false);
    }
    setLoading(false);
  };

  const filteredProducts = products.filter((product) => {
    let productStatus;
    if (product?.product_countInStock === 0) {
      productStatus = "Hết hàng";
    } else if (product?.product_countInStock < 10) {
      productStatus = "Cần nhập";
    } else {
      productStatus = "Còn hàng";
    }

    const matchesStatus = filterStatus ? productStatus === filterStatus : true;

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
      render: (product_img) => (
        <img
          src={product_img}
          alt="Ảnh sản phẩm"
          className="w-16 h-16 object-cover rounded"
        />
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
          className="rounded-none cursor-pointer"
          scroll={{ x: "max-content" }}
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
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddProduct}
          initialValues={{
            product_price: 0,
            product_percent_discount: 0,
            product_rate: 0,
            product_selled: 0,
            product_display: true,
            product_famous: false,
            colors: [],
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

          <Form.Item label="Giá gốc" name="product_price">
            <InputNumber min={0} className="w-full" />
          </Form.Item>

          <Form.Item label="Đã bán" name="product_selled">
            <InputNumber min={0} className="w-full" />
          </Form.Item>

          <Form.Item label="Giảm giá chung (%)" name="product_percent_discount">
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
                  {cat.category_type} - {cat.category_gender}
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
            label="Ảnh sản phẩm"
            name="product_img"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: "Vui lòng tải ảnh sản phẩm" }]}
          >
            <Upload
              accept="image/*"
              beforeUpload={() => false}
              listType="picture"
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Tải ảnh sản phẩm lên</Button>
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

          {/* Phần quản lý màu sắc */}
          <Divider orientation="left">Màu sắc và kích thước</Divider>

          <Form.List name="colors">
            {(colorFields, { add: addColor, remove: removeColor }) => (
              <>
                {colorFields.map(
                  ({ key: colorKey, name: colorName, ...colorRestField }) => (
                    <Card
                      key={colorKey}
                      title={`Màu sắc ${colorKey + 1}`}
                      className="mb-4"
                      extra={
                        <Button danger onClick={() => removeColor(colorName)}>
                          Xóa màu
                        </Button>
                      }
                    >
                      <Form.Item
                        {...colorRestField}
                        name={[colorName, "color_name"]}
                        label="Tên màu"
                        rules={[
                          { required: true, message: "Vui lòng nhập tên màu" },
                        ]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item
                        {...colorRestField}
                        name={[colorName, "imgs", "img_main"]}
                        label="Ảnh chính của màu"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        rules={[
                          { required: true, message: "Vui lòng tải ảnh chính" },
                        ]}
                      >
                        <Upload
                          accept="image/*"
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
                        {...colorRestField}
                        name={[colorName, "imgs", "img_subs"]}
                        label="Ảnh phụ của màu"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng tải ít nhất một ảnh phụ",
                          },
                        ]}
                      >
                        <Upload
                          accept="image/*"
                          beforeUpload={() => false}
                          listType="picture"
                          multiple
                        >
                          <Button icon={<UploadOutlined />}>
                            Tải ảnh phụ lên
                          </Button>
                        </Upload>
                      </Form.Item>

                      {/* Nested Form.List for variants within each color */}
                      <Divider orientation="left">Các kích thước</Divider>
                      <Form.List name={[colorName, "variants"]}>
                        {(
                          variantFields,
                          { add: addVariant, remove: removeVariant }
                        ) => (
                          <>
                            {variantFields.map(
                              ({
                                key: variantKey,
                                name: variantName,
                                ...variantRestField
                              }) => (
                                <Card
                                  key={variantKey}
                                  type="inner"
                                  title={`Kích thước ${variantKey + 1}`}
                                  className="mb-2"
                                  extra={
                                    <Button
                                      danger
                                      size="small"
                                      onClick={() => removeVariant(variantName)}
                                    >
                                      Xóa
                                    </Button>
                                  }
                                >
                                  <Form.Item
                                    {...variantRestField}
                                    name={[variantName, "variant_size"]}
                                    label="Kích thước"
                                    rules={[
                                      {
                                        required: true,
                                        message: "Vui lòng nhập kích thước",
                                      },
                                    ]}
                                  >
                                    <Input placeholder="Ví dụ: S, M, L, XL" />
                                  </Form.Item>

                                  <Form.Item
                                    {...variantRestField}
                                    name={[variantName, "variant_price"]}
                                    label="Giá"
                                    rules={[
                                      {
                                        required: true,
                                        message: "Vui lòng nhập giá",
                                      },
                                    ]}
                                  >
                                    <InputNumber min={0} className="w-full" />
                                  </Form.Item>

                                  <Form.Item
                                    {...variantRestField}
                                    name={[variantName, "variant_countInStock"]}
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
                                </Card>
                              )
                            )}

                            <Form.Item>
                              <Button
                                type="dashed"
                                onClick={() => addVariant()}
                                block
                                icon={<PlusOutlined />}
                              >
                                Thêm kích thước
                              </Button>
                            </Form.Item>
                          </>
                        )}
                      </Form.List>
                    </Card>
                  )
                )}

                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => addColor()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Thêm màu sắc
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

          <Form.Item label="Đã bán" name="product_selled">
            <InputNumber min={0} className="w-full" />
          </Form.Item>

          <Form.Item label="Giảm giá chung (%)" name="product_percent_discount">
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
                  {cat.category_type} - {cat.category_gender}
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
            label="Ảnh sản phẩm"
            name="product_img"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              accept="image/*"
              beforeUpload={() => false}
              listType="picture"
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Tải ảnh sản phẩm lên</Button>
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

          {/* Phần quản lý màu sắc */}
          <Divider orientation="left">Màu sắc và kích thước</Divider>

          <Form.List name="colors">
            {(colorFields, { add: addColor, remove: removeColor }) => (
              <>
                {colorFields.map(
                  ({ key: colorKey, name: colorName, ...colorRestField }) => (
                    <Card
                      key={colorKey}
                      title={`Màu sắc ${colorKey + 1}`}
                      className="mb-4"
                      extra={
                        <Button danger onClick={() => removeColor(colorName)}>
                          Xóa màu
                        </Button>
                      }
                    >
                      <Form.Item
                        {...colorRestField}
                        name={[colorName, "color_name"]}
                        label="Tên màu"
                        rules={[
                          { required: true, message: "Vui lòng nhập tên màu" },
                        ]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item
                        {...colorRestField}
                        name={[colorName, "imgs", "img_main"]}
                        label="Ảnh chính của màu"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                      >
                        <Upload
                          accept="image/*"
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
                        {...colorRestField}
                        name={[colorName, "imgs", "img_subs"]}
                        label="Ảnh phụ của màu"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                      >
                        <Upload
                          accept="image/*"
                          beforeUpload={() => false}
                          listType="picture"
                          multiple
                        >
                          <Button icon={<UploadOutlined />}>
                            Tải ảnh phụ lên
                          </Button>
                        </Upload>
                      </Form.Item>

                      {/* Nested Form.List for variants within each color */}
                      <Divider orientation="left">Các kích thước</Divider>
                      <Form.List name={[colorName, "variants"]}>
                        {(
                          variantFields,
                          { add: addVariant, remove: removeVariant }
                        ) => (
                          <>
                            {variantFields.map(
                              ({
                                key: variantKey,
                                name: variantName,
                                ...variantRestField
                              }) => (
                                <Card
                                  key={variantKey}
                                  type="inner"
                                  title={`Kích thước ${variantKey + 1}`}
                                  className="mb-2"
                                  extra={
                                    <Button
                                      danger
                                      size="small"
                                      onClick={() => removeVariant(variantName)}
                                    >
                                      Xóa
                                    </Button>
                                  }
                                >
                                  <Form.Item
                                    {...variantRestField}
                                    name={[variantName, "variant_size"]}
                                    label="Kích thước"
                                    rules={[
                                      {
                                        required: true,
                                        message: "Vui lòng nhập kích thước",
                                      },
                                    ]}
                                  >
                                    <Input placeholder="Ví dụ: S, M, L, XL" />
                                  </Form.Item>

                                  <Form.Item
                                    {...variantRestField}
                                    name={[variantName, "variant_price"]}
                                    label="Giá"
                                    rules={[
                                      {
                                        required: true,
                                        message: "Vui lòng nhập giá",
                                      },
                                    ]}
                                  >
                                    <InputNumber min={0} className="w-full" />
                                  </Form.Item>

                                  <Form.Item
                                    {...variantRestField}
                                    name={[variantName, "variant_countInStock"]}
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
                                </Card>
                              )
                            )}

                            <Form.Item>
                              <Button
                                type="dashed"
                                onClick={() => addVariant()}
                                block
                                icon={<PlusOutlined />}
                              >
                                Thêm kích thước
                              </Button>
                            </Form.Item>
                          </>
                        )}
                      </Form.List>
                    </Card>
                  )
                )}

                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => addColor()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Thêm màu sắc
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
