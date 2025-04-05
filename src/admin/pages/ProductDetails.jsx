import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProduct } from "../../context/ProductContext";
import { Card } from "antd";

const ProductDetails = () => {
  const { id } = useParams();
  const { productDetails, fetchProductDetails } = useProduct();
  // const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProductDetails(id);
  }, [id]);

  console.log("productDetails", productDetails);


  return (
    <div className="lg:ml-[300px] mt-[64px] px-2 py-4 lg:p-6 min-h-screen">
      <div className="space-y-3 mb-4">
        <div className="bg-white shadow-lg px-2 md:px-10 py-5 rounded-md">
          <div className="flex flex-wrap items-center justify-between mb-5">
            <h1 className="text-2xl font-bold">Chi tiết sản phẩm</h1>
            <div className="flex gap-x-5">
              <p className="text-gray-700 font-bold">Đã bán: {productDetails?.product_selled}</p>
              <p className="text-yellow-500 font-bold flex items-center">
                ⭐ {productDetails?.product_rate} / 5
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-x-2 my-5 space-y-5">
            <div className="space-y-5">
              <h3 className="text-base font-semibold">Ảnh chính</h3>
              <img
                src={productDetails?.product_img}
                alt={productDetails?.product_title}
                className="w-36 h-36 object-cover rounded-lg border border-black"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-4 mt-6">
            <div>
              <h4 className="font-medium">Tên sản phẩm</h4>
              <p>{productDetails?.product_title}</p>
            </div>
            <div>
              <h4 className="font-medium">Thương hiệu</h4>
              <p>{productDetails?.product_brand}</p>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="font-medium">Mô tả</h4>
            <p>{productDetails?.product_description}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 mt-4">
            <div>
              <h4 className="font-medium">Kho hàng</h4>
              <p>{productDetails?.product_countInStock}</p>
            </div>
            <div>
              <h4 className="font-medium">Giá gốc</h4>
              <p>{productDetails?.product_price}₫</p>
            </div>
            <div>
              <h4 className="font-medium">Giảm giá</h4>
              <p>{productDetails?.product_percent_discount}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg px-2 md:px-10 py-5 rounded-md">
          <h1 className="text-2xl font-bold mb-5">Biến thể</h1>
          {productDetails?.colors.map((color, index) => (
            <Card key={index} className="mb-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium">Màu</h4>
                  <p>{color.color_name}</p>
                </div>
                <div>
                  <h4 className="font-medium">Ảnh chính</h4>
                  <p>{color.imgs.img_main}</p>
                </div>
                <div>
                  <h4 className="font-medium">Ảnh phụ</h4>
                  {color.imgs.img_subs.map((img, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={img}
                      alt={`Biến thể phụ ${imgIndex + 1}`}
                      className="w-24 h-24 object-cover rounded-lg border border-black"
                    />
                  ))}
                </div>
                {color.variants.map((variant, variantIndex) => (
                  <div key={variantIndex} className="mt-4">
                    <h4 className="font-medium">Kích thước</h4>
                    <p>{variant.variant_size}</p>
                    <h4 className="font-medium">Giá</h4>
                    <p>{variant.variant_price}₫</p>
                    <h4 className="font-medium">Kho hàng</h4>
                    <p>{variant.variant_countInStock}</p>
                  </div>

                ))}
              </div>
              
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;