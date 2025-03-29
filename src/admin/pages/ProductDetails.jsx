import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useProduct } from "../../context/ProductContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { productDetails, fetchProductDetails } = useProduct();

  useEffect(() => {
    fetchProductDetails(id);
    console.log("pr", productDetails)
  }, [id]);

  if (!productDetails) {
    return <div className="text-center mt-10">Đang tải...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <div className="grid grid-cols-2 gap-6">
        {/* Hình ảnh sản phẩm */}
        <div>
          <img
            src={productDetails.product_img?.image_main}
            alt={productDetails.product_title}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>

        {/* Thông tin sản phẩm */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {productDetails.product_title}
          </h2>
          <p className="text-gray-600 mt-2">
            {productDetails.product_description}
          </p>
          <p className="text-gray-900 font-semibold text-xl mt-4">
            Giá: {productDetails.product_price.toLocaleString()}đ
          </p>
          <p className="text-gray-500 text-sm">
            Giảm giá: {productDetails.product_percent_discount}%
          </p>
          <p className="text-gray-700 mt-2">
            Thương hiệu: {productDetails.product_brand}
          </p>
          <p className="text-gray-700">
            Số lượng tồn kho: {productDetails.product_countInStock}
          </p>
          <p className="text-gray-700">
            Đã bán: {productDetails.product_selled}
          </p>
          <p className="text-yellow-500 font-bold">
            ⭐ {productDetails.product_rate} / 5
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
