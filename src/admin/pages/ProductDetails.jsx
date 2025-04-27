import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useProduct } from "../../context/ProductContext";
import { Card } from "antd";

const ProductDetails = () => {
  const { id } = useParams();
  const { productDetails, fetchProductDetails } = useProduct();

  useEffect(() => {
    fetchProductDetails(id);
  }, [id]);

  return (
    <div className="lg:ml-[300px] mt-[64px] px-2 py-4 lg:p-6 min-h-screen bg-gray-50">
      <div className="space-y-6">
        <div className="bg-white shadow-xl p-6 rounded-xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Chi tiết sản phẩm
            </h1>
            <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0">
              <p className="text-gray-600 font-semibold">
                🛒 Đã bán:{" "}
                <span className="text-black">
                  {productDetails?.product_selled}
                </span>
              </p>
              <p className="text-yellow-500 font-semibold flex items-center">
                ⭐ {productDetails?.product_rate} / 5
              </p>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <img
              src={productDetails?.product_img}
              alt={productDetails?.product_title}
              className="w-40 h-40 object-cover rounded-xl border border-gray-300"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-semibold text-gray-700">Tên sản phẩm</h4>
              <p className="text-gray-800">{productDetails?.product_title}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700">Thương hiệu</h4>
              <p className="text-gray-800">{productDetails?.product_brand}</p>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold text-gray-700">Mô tả</h4>
            <p className="text-gray-800 whitespace-pre-line">
              {productDetails?.product_description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
            <div>
              <h4 className="font-semibold text-gray-700">Kho hàng</h4>
              <p className="text-gray-800">
                {productDetails?.product_countInStock}
              </p>
            </div>
            {productDetails?.product_percent_discount > 0 && (
              <div>
                <h4 className="font-semibold text-gray-700">Giá gốc</h4>
                <p className="text-gray-800">
                  {(
                    productDetails.product_price /
                    (1 - productDetails.product_percent_discount / 100)
                  ).toLocaleString()}
                </p>
              </div>
            )}
            <div>
              <h4 className="font-semibold text-gray-700">Giá bán</h4>
              <p className="text-gray-800">
                {productDetails?.product_price.toLocaleString()}₫
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700">Giảm giá</h4>
              <p className="text-red-600 font-semibold">
                {productDetails?.product_percent_discount}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-xl p-6 rounded-xl">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Biến thể</h1>
          {productDetails?.colors.map((color, index) => (
            <Card key={index} className="mb-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">
                    Biến thể: {color.color_name}
                  </h4>
                  <img
                    src={color.imgs.img_main}
                    alt="Ảnh chính"
                    className="w-28 h-28 object-cover rounded-lg border border-gray-300"
                  />
                </div>

                <div className="sm:col-span-2">
                  <h4 className="font-semibold text-gray-700 mb-2">Ảnh phụ</h4>
                  <div className="flex flex-wrap gap-4">
                    {color.imgs.img_subs.map((img, imgIndex) => (
                      <img
                        key={imgIndex}
                        src={img}
                        alt={`Phụ ${imgIndex + 1}`}
                        className="w-24 h-24 object-cover rounded-lg border border-gray-300"
                      />
                    ))}
                  </div>
                </div>

                {color.variants.map((variant, variantIndex) => (
                  <div
                    key={variantIndex}
                    className="bg-gray-100 p-4 rounded-lg border border-gray-200 sm:col-span-2"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <h4 className="font-semibold text-gray-700">
                          Kích thước
                        </h4>
                        <p className="text-gray-800">{variant.variant_size}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-700">Giá</h4>
                        <p className="text-gray-800">
                          {variant.variant_price.toLocaleString()}₫
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-700">
                          Kho hàng
                        </h4>
                        <p className="text-gray-800">
                          {variant.variant_countInStock}
                        </p>
                      </div>
                    </div>
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
