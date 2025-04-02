import { useRef, useState } from "react";
import Slider from "react-slick";
import { FaHeart, FaRegHeart, FaChevronDown, FaChevronUp } from "react-icons/fa";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

const ProductInfoComponent = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const toggleFavorite = () => setIsFavorite(!isFavorite);
  const toggleDetails = () => setIsDetailsVisible(!isDetailsVisible);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1);

  return (
    <div className="flex flex-col lg:flex-row lg:p-10 gap-10">
      {/* Phần hình ảnh */}
      <div className="w-full lg:w-[400px]">
        <img
          src={product?.product_img?.image_main}
          alt={product?.product_title}
          className="w-full h-[500px] object-cover border"
        />
      </div>

      {/* Phần thông tin sản phẩm */}
      <div className="w-full">
        <h1 className="text-2xl font-bold">{product?.product_title}</h1>
        <p className="text-lg text-gray-500">{product?.product_brand}</p>
        
        <div className="flex items-center mt-4">
          <p className="text-xl font-bold text-[#ba2b20] mr-4">
            {product?.product_price?.toLocaleString()}₫
          </p>
          {product?.product_percent_discount > 0 && (
            <>
              <p className="text-md text-[#9ca3af] line-through mr-4">
                {(product.product_price * 100 / (100 - product.product_percent_discount)).toLocaleString()}₫
              </p>
              <p className="text-md font-semibold text-[#158857]">
                {product?.product_percent_discount}% Off
              </p>
            </>
          )}
        </div>

        {/* Số lượng */}
        <p className="text-base font-medium my-3">Số lượng</p>
        <div className="flex items-center">
          <div className="inline-flex items-center border border-[#a1a8af]">
            <button className="px-4 py-2 hover:bg-gray-200" onClick={decreaseQuantity}>-</button>
            <input
              type="text"
              value={quantity}
              readOnly
              className="w-12 text-center text-black"
            />
            <button className="px-4 py-2 hover:bg-gray-200" onClick={increaseQuantity}>+</button>
          </div>
          <p className="text-sm text-gray-500 ml-4">Còn lại: {product?.product_countInStock} sản phẩm</p>
        </div>

        {/* Nút thêm giỏ hàng / mua ngay */}
        <div className="flex flex-wrap sm:flex-nowrap gap-2 mt-4">
          <button className="p-3 border border-gray-400 text-black w-full rounded uppercase">
            Thêm vào giỏ hàng
          </button>
          <button className="p-3 bg-black text-white w-full rounded uppercase">
            Mua ngay
          </button>
        </div>

        {/* Chi tiết sản phẩm */}
        <div className="border-t-2 border-gray-300 w-full my-8"></div>
        <div
          className="mt-4 cursor-pointer text-xl font-medium uppercase flex items-center justify-between"
          onClick={toggleDetails}
        >
          Chi tiết sản phẩm
          {isDetailsVisible ? <FaChevronUp className="h-5 w-5" /> : <FaChevronDown className="h-5 w-5" />}
        </div>
        <div className={`mt-4 text-sm text-black transition-all ${isDetailsVisible ? "max-h-[500px]" : "max-h-0 opacity-0"}`}>
          <p className="text-justify leading-loose">{product?.product_description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductInfoComponent;
