import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProduct } from "../../context/ProductContext";
import { Input, Button, Card, Form, Upload } from "antd";
import {
  DeleteOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";

const ProductDetails = () => {
  const { id } = useParams();
  const { productDetails, fetchProductDetails } = useProduct();
  const [product, setProduct] = useState(null);
  const [originalProduct, setOriginalProduct] = useState(null);

  useEffect(() => {
    fetchProductDetails(id);
    // console.log("pr", productDetails);
  }, [id]);

  useEffect(() => {
    if (productDetails) {
      const clonedProduct = JSON.parse(JSON.stringify(productDetails));
      setProduct(clonedProduct);
      setOriginalProduct(clonedProduct);
    }
  }, [productDetails]);

  if (!product) {
    return <div className="text-center mt-10">Đang tải...</div>;
  }

  // Kiểm tra thay đổi
  const isChanged = JSON.stringify(product) !== JSON.stringify(originalProduct);

  const handleChange = (key, value) => {
    if (key.startsWith("variants")) {
      const [_, index, field] = key.match(/variants\[(\d+)\]\.(.+)/);
      setProduct((prev) => ({
        ...prev,
        variants: prev.variants.map((variant, i) =>
          i === Number(index) ? { ...variant, [field]: value } : variant
        ),
      }));
    } else {
      setProduct((prev) => ({ ...prev, [key]: value }));
    }
  };
  console.log("originalProduct", originalProduct);
  console.log("product", product);

  // Thay đổi ảnh chính của sản phẩm
  const handleImageChange = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setProduct((prev) => ({
        ...prev,
        product_img: { ...prev.product_img, image_main: e.target.result },
      }));
    };
    reader.readAsDataURL(file);
    return false;
  };

  // Thêm ảnh phụ cho sản phẩm
  const handleAddSubImage = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setProduct((prev) => ({
        ...prev,
        product_img: {
          ...prev.product_img,
          image_subs: [...prev.product_img.image_subs, e.target.result],
        },
      }));
    };
    reader.readAsDataURL(file);
    return false;
  };

  // Xóa ảnh phụ
  const handleRemoveSubImage = (index) => {
    setProduct((prev) => ({
      ...prev,
      product_img: {
        ...prev.product_img,
        image_subs: prev.product_img.image_subs.filter((_, i) => i !== index),
      },
    }));
  };

  // Xử lý ảnh chính của biến thể
  const handleVariantImageChange = (index, file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setProduct((prev) => {
        const updatedVariants = [...prev.variants];
        updatedVariants[index].variant_img = {
          ...updatedVariants[index].variant_img,
          image_main: e.target.result,
        };
        return { ...prev, variants: updatedVariants };
      });
    };
    reader.readAsDataURL(file);
    return false;
  };

  // Thêm ảnh phụ của biến thể
  const handleAddVariantSubImage = (index, file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setProduct((prev) => {
        const updatedVariants = [...prev.variants];
        const currentSubs = updatedVariants[index].variant_img.image_subs || [];
        return {
          ...prev,
          variants: updatedVariants.map((variant, i) =>
            i === index
              ? {
                  ...variant,
                  variant_img: {
                    ...variant.variant_img,
                    image_subs: [...currentSubs, e.target.result], // Đảm bảo không nhân đôi ảnh
                  },
                }
              : variant
          ),
        };
      });
    };
    reader.readAsDataURL(file);
    return false;
  };

  //Xóa ảnh phụ của biến thể
  const handleRemoveVariantSubImage = (variantIndex, imageIndex) => {
    setProduct((prev) => {
      return {
        ...prev,
        variants: prev.variants.map((variant, i) =>
          i === variantIndex
            ? {
                ...variant,
                variant_img: {
                  ...variant.variant_img,
                  image_subs: variant.variant_img.image_subs.filter(
                    (_, j) => j !== imageIndex
                  ),
                },
              }
            : variant
        ),
      };
    });
  };

  const handleAddVariant = () => {
    setProduct((prev) => ({
      ...prev,
      variants: [
        ...prev.variants,
        {
          variant_color: "",
          variant_size: "",
          variant_price: 0,
          variant_countInStock: 0,
          variant_percent_discount: 0,
          variant_img: { image_main: "", image_subs: [] },
        },
      ],
    }));
  };

  const handleRemoveVariant = (index) => {
    setProduct((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
  };

  const handleSave = () => {
    setOriginalProduct(JSON.parse(JSON.stringify(product)));
    console.log("Sản phẩm đã lưu:", product);
  };

  return (
    <div className="lg:ml-[300px] mt-[64px] px-2 py-4 lg:p-6 min-h-screen">
      <div className="space-y-3 mb-4">
        <div className="bg-white shadow-lg px-2 md:px-10 py-5 rounded-md">
          <div className="flex flex-wrap items-center justify-between mb-5">
            <h1 className="text-2xl font-bold">Chi tiết sản phẩm</h1>
            <div className="flex gap-x-5">
              <p className="text-gray-700 font-bold">
                Đã bán: {product.product_selled}
              </p>
              <p className="text-yellow-500 font-bold flex items-center">
                ⭐ {product.product_rate} / 5
              </p>
            </div>
          </div>
          <div>
            <div className="flex flex-col gap-x-2 my-5 space-y-5">
              <div className="space-y-5">
                <div className="flex items-center gap-x-5">
                  <h3 className="text-base font-semibold">Ảnh chính</h3>
                  <Upload
                    beforeUpload={handleImageChange}
                    showUploadList={false}
                  >
                    <Button icon={<UploadOutlined />}>
                      Thay đổi ảnh chính
                    </Button>
                  </Upload>
                </div>
                <img
                  src={product.product_img?.image_main}
                  alt={product.product_title}
                  className="w-36 h-36 object-cover rounded-lg border border-black"
                />
              </div>
              <div className="space-y-5">
                <div className="flex items-center gap-x-5">
                  <h3 className="text-base font-semibold">Ảnh phụ</h3>
                  <Upload
                    multiple
                    beforeUpload={handleAddSubImage}
                    showUploadList={false}
                  >
                    <Button icon={<PlusOutlined />}>Thêm ảnh phụ</Button>
                  </Upload>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {product.product_img?.image_subs.map((img, index) => (
                    <div key={index} className="relative">
                      <img
                        src={img}
                        alt={`Ảnh phụ ${index}`}
                        className="w-36 h-36 object-cover rounded-lg border border-black"
                      />
                      <Button
                        type="primary"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleRemoveSubImage(index)}
                        className="absolute top-1 right-1"
                        size="small"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <Form layout="vertical">
                <div className="grid grid-cols-2 gap-x-4">
                  <Form.Item label="Tên sản phẩm">
                    <Input
                      value={product.product_title}
                      onChange={(e) =>
                        handleChange("product_title", e.target.value)
                      }
                    />
                  </Form.Item>
                  <Form.Item label="Thương hiệu">
                    <Input
                      value={product.product_brand}
                      onChange={(e) =>
                        handleChange("product_brand", e.target.value)
                      }
                    />
                  </Form.Item>
                </div>
                <Form.Item label="Mô tả">
                  <Input.TextArea
                    value={product.product_description}
                    onChange={(e) =>
                      handleChange("product_description", e.target.value)
                    }
                  />
                </Form.Item>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4">
                  <Form.Item label="Kho hàng">
                    <Input
                      type="number"
                      value={product.product_countInStock}
                      onChange={(e) =>
                        handleChange(
                          "product_countInStock",
                          Number(e.target.value)
                        )
                      }
                    />
                  </Form.Item>
                  <Form.Item label="Giá">
                    <Input
                      type="number"
                      value={product.product_price}
                      onChange={(e) =>
                        handleChange("product_price", Number(e.target.value))
                      }
                    />
                  </Form.Item>
                  <Form.Item label="Giảm giá (%)">
                    <Input
                      type="number"
                      value={product.product_percent_discount}
                      onChange={(e) => {
                        const value = Math.min(100, Number(e.target.value));
                        handleChange("product_percent_discount", value);
                      }}
                    />
                  </Form.Item>
                </div>
              </Form>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg px-2 md:px-10 py-5 rounded-md">
          <h1 className="text-2xl font-bold mb-5">Biến thể</h1>
          {product.variants.map((variant, index) => (
            <Card key={index} className="mb-4">
              <Form layout="vertical">
                <div className="grid grid-cols-2 gap-4">
                  <Form.Item label="Màu">
                    <Input
                      value={variant.variant_color}
                      onChange={(e) =>
                        handleChange(
                          `variants[${index}].variant_color`,
                          e.target.value
                        )
                      }
                    />
                  </Form.Item>
                  <Form.Item label="Size">
                    <Input
                      value={variant.variant_size}
                      onChange={(e) =>
                        handleChange(
                          `variants[${index}].variant_size`,
                          e.target.value
                        )
                      }
                    />
                  </Form.Item>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Form.Item label="Giá">
                    <Input
                      type="number"
                      value={variant.variant_price}
                      onChange={(e) =>
                        handleChange(
                          `variants[${index}].variant_price`,
                          Number(e.target.value)
                        )
                      }
                    />
                  </Form.Item>
                  <Form.Item label="Kho hàng">
                    <Input
                      type="number"
                      value={variant.variant_countInStock}
                      onChange={(e) =>
                        handleChange(
                          `variants[${index}].variant_countInStock`,
                          Number(e.target.value)
                        )
                      }
                    />
                  </Form.Item>
                  <Form.Item label="Giảm giá (%)">
                    <Input
                      type="number"
                      value={variant.variant_percent_discount}
                      onChange={(e) =>
                        handleChange(
                          `variants[${index}].variant_percent_discount`,
                          Number(e.target.value)
                        )
                      }
                    />
                  </Form.Item>
                </div>

                {/* Phần quản lý ảnh cho biến thể */}
                <div className="mt-4 border-t pt-4">
                  <h3 className="text-base font-semibold mb-3">Ảnh biến thể</h3>
                  <div className="flex flex-col gap-x-2 space-y-5">
                    <div className="space-y-3">
                      <div className="flex items-center gap-x-5">
                        <h4 className="text-sm font-medium">Ảnh chính</h4>
                        <Upload
                          beforeUpload={(file) =>
                            handleVariantImageChange(index, file)
                          }
                          showUploadList={false}
                        >
                          <Button
                            icon={<UploadOutlined />}
                            size="small"
                            className="rounded-none"
                          >
                            Thay đổi ảnh chính
                          </Button>
                        </Upload>
                      </div>
                      {variant.variant_img.image_main && (
                        <img
                          src={variant.variant_img.image_main}
                          alt={`Biến thể chính ${index + 1}`}
                          className="w-24 h-24 object-cover rounded-lg border border-black"
                        />
                      )}
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-x-5">
                        <h4 className="text-sm font-medium">Ảnh phụ</h4>
                        <Upload
                          multiple
                          beforeUpload={(file) =>
                            handleAddVariantSubImage(index, file)
                          }
                          showUploadList={false}
                        >
                          <Button
                            icon={<PlusOutlined />}
                            size="small"
                            className="rounded-none"
                          >
                            Thêm ảnh phụ
                          </Button>
                        </Upload>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {variant.variant_img?.image_subs?.map(
                          (img, imgIndex) => (
                            <div key={imgIndex} className="relative">
                              <img
                                src={img}
                                alt={`Biến thể ${index + 1} phụ ${
                                  imgIndex + 1
                                }`}
                                className="w-24 h-24 object-cover rounded-lg border border-black"
                              />
                              <Button
                                type="primary"
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() =>
                                  handleRemoveVariantSubImage(index, imgIndex)
                                }
                                className="absolute top-1 right-1"
                                size="small"
                              />
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleRemoveVariant(index)}
                className="rounded-none mt-4"
              >
                Xóa biến thể
              </Button>
            </Card>
          ))}

          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddVariant}
            className="rounded-none"
          >
            Thêm biến thể
          </Button>
        </div>

        <div className="min-w-[200px] flex justify-end mt-4">
          <Button type="primary" onClick={handleSave} disabled={!isChanged}>
            Lưu sản phẩm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
