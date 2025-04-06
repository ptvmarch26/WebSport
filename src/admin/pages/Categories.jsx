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
import { useCategories } from "../../context/CategoriesContext";

const { Option } = Select;

const Categories = () => {
  
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddDadCategoryModalVisible, setIsAddDadCategoryModalVisible] = useState(false);
  const [isAddChildCategoryModalVisible, setIsAddChildCategoryModalVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isEditCategoryModalVisible, setIsEditCategoryModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { categories, fetchCategories, removeCategory, addCategory, handleUpdateCategory } = useCategories();

  const filteredCategory = categories.filter((category) => {
    const matchesSearch = searchText ? category.category_type.toLowerCase().includes(searchText.toLowerCase()) : true;
    return matchesSearch;
  });
  
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async () => {
    try {
      await Promise.all(selectedRowKeys.map((id) => removeCategory(id)));
      fetchCategories();
      setSelectedRowKeys([]);
      setIsModalVisible(false);
    } catch (error) {
      console.error("Lỗi khi xóa danh mục:", error);
    }
  };

  const handleAddDadCategory = async () => {
    try {
      await form.validateFields();
      const newCategory = form.getFieldsValue();
      
      const res = await addCategory(newCategory);
      if (res?.data?.EC === 0) {
        fetchCategories();
        form.resetFields();
        setIsAddDadCategoryModalVisible(false); 
        console.log("Thêm danh mục cha thành công:", res);
      }
    } catch (error) {
      console.error("Lỗi khi thêm danh mục:", error);
    }
  };

  const handleAddChildCategory = async () => {
    try {
      await form.validateFields();
      const newCategory = form.getFieldsValue();

      const parentCategory = categories.find(
        (cat) => cat._id === newCategory.category_parent_id
      );

      newCategory.category_gender = parentCategory?.category_gender || null;

      const res = await addCategory(newCategory);
      if (res?.data?.EC === 0) {
        fetchCategories();
        form.resetFields();
        setIsAddChildCategoryModalVisible(false); 
        console.log("Thêm danh mục con thành công:", res);
      }
    }
    catch (error) {
      console.error("Lỗi khi thêm danh mục:", error);
    }
  };

  console.log(categories);

  const handleEditCategory = (record) => {
    if (record) {
      setSelectedCategory(record);  // Cập nhật giá trị discount được chọn
      form.setFieldsValue(record);  // Điền thông tin discount vào form
      setIsEditCategoryModalVisible(true);  // Mở modal chỉnh sửa
    } else {
      console.error("Không có danh mục được chọn");
    }
  };

  const handleUpdate = async () => {
    try{
      await form.validateFields();
      const updateData = form.getFieldsValue();
      console.log("updateData", updateData);
      if (updateData.category_level === 1 && updateData.category_parent_id !== null) {
        console.error("Danh mục cấp 1 không thể có danh mục cha");
        return;
      }

      if (updateData.category_level >= 2 && updateData.category_parent_id === null) {
        console.error("Danh mục cấp 2 phải có danh mục cha");
        return;
      }

      const res = await handleUpdateCategory(selectedCategory._id, updateData);
      if (res?.data?.EC === 0) {
        fetchCategories();
        form.resetFields();
        setIsEditCategoryModalVisible(false); 
        console.log("Sửa danh mục thành công:", res);
      }
    }
    catch (error) {
      console.error("Lỗi khi cập nhật danh mục:", error);
    }
  };

  const columns = [
    {
      title: "Mã danh mục",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Loại danh mục",
      dataIndex: "category_type",
      key: "category_type",
    },
    {
      title: "Giới tính",
      dataIndex: "category_gender",
      key: "category_gender",
      render: (gender) => {
        const genderMap = {
          Male: "Nam",
          Female: "Nữ",
          Unisex: "Unisex"
        };
        return genderMap[gender];
      },
    },
    {
      title: "Chỉnh sửa",
      key: "edit",
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => handleEditCategory(record)} 
        >
          Chỉnh sửa
        </Button>
      ),
    },
  ];

  return (
    <div className="lg:ml-[300px] mt-[64px] px-2 py-4 lg:p-6 min-h-screen">
      <div className="space-y-3 mb-4">
        <div className="flex flex-wrap sm:flex-nowrap gap-4">
         <Input
            placeholder="Tìm kiếm theo..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button type="primary" icon={<ExportOutlined />}>
            Xuất file
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsAddDadCategoryModalVisible(true)}
          >
            Thêm danh mục cha 
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsAddChildCategoryModalVisible(true)}
          >
            Thêm danh mục con 
          </Button>
        </div>
      </div>
        <div className="my-4">
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
      <div className="bg-white p-4 shadow-lg">
        <Table
          rowSelection={{
            selectedRowKeys,
            onChange: setSelectedRowKeys,
          }}
          dataSource={filteredCategory}
          columns={columns}
          pagination={{ pageSize: 8}}
          rowKey="_id"
          scroll={{x: 'max-content'}}
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
        <p>Bạn có chắc muốn xóa các danh mục đã chọn?</p>
      </Modal>
      <Modal
        title="Thêm danh mục cha"
        open={isAddDadCategoryModalVisible}
        onOk={handleAddDadCategory}
        onCancel={() => setIsAddDadCategoryModalVisible(false)}
        okText="Thêm"
        cancelText="Hủy"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddDadCategory}
          initialValues={{
            category_level: 1,
            category_parent_id: null,
          }}
        >
          <Form.Item
            label="Giới tính"
            name="category_gender"
            rules={[{ required: true, message: "Giới tính là bắt buộc" }]}
          >
            <Select placeholder="Chọn giới tính" allowClear>
              <Option value="Male">Nam</Option>
              <Option value="Female">Nữ</Option>
              <Option value="Unisex">Unisex</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Level"
            name="category_level"
            rules={[{ required: true, message: "Level là bắt buộc" }]}
          >
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item
            label="Loại danh mục"
            name="category_type"
            rules={[{ required: true, message: "Loại danh mục là bắt buộc" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Thêm danh mục con"
        open={isAddChildCategoryModalVisible}
        onOk={handleAddChildCategory}
        onCancel={() => setIsAddChildCategoryModalVisible(false)}
        okText="Thêm"
        cancelText="Hủy"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddChildCategory}
          initialValues={{
            category_level: 2,
          }}
        >
          <Form.Item
            label="Level"
            name="category_level"
            rules={[{ required: true, message: "Level là bắt buộc" }]}
          >
            <InputNumber min={2} />
          </Form.Item>
          <Form.Item
            label="Thuộc danh mục"
            name="category_parent_id"
          >
            <Select placeholder="Chọn danh mục" allowClear>
              {categories
                ?.filter((category) => category.category_level === 1)
                .map((category) => (
                  <Option key={category._id} value={category._id}>
                    {category.category_type} - {category.category_gender}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Loại danh mục"
            name="category_type"
            rules={[{ required: true, message: "Loại danh mục là bắt buộc" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Chỉnh sửa danh mục"
        open={isEditCategoryModalVisible}
        onOk={handleUpdate}
        onCancel={() => setIsEditCategoryModalVisible(false)}
        okText="Cập nhật"
        cancelText="Hủy"
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={selectedCategory}
          onFinish={handleUpdate}
        >
          <Form.Item
            label="Giới tính"
            name="category_gender"
            rules={[{ required: true, message: "Giới tính là bắt buộc" }]}
          >
            <Select placeholder="Chọn giới tính" allowClear>
              <Option value="Male">Nam</Option>
              <Option value="Female">Nữ</Option>
              <Option value="Unisex">Unisex</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Level"
            name="category_level"
            rules={[{ required: true, message: "Level là bắt buộc" }]}
          >
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item
            label="Thuộc danh mục"
            name="category_parent_id"
          >
            <Select placeholder="Chọn danh mục" allowClear>
              {categories?.map((category) => (
                <Option key={category._id} value={category._id}>
                  {category.category_type}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Loại danh mục"
            name="category_type"
            rules={[{ required: true, message: "Loại danh mục là bắt buộc" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Categories;
