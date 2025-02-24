import { useRef, useState } from "react";
import Slider from "react-slick";
import BackComponent from "../BackComponent/BackComponent";
import NextComponent from "../NextComponent/NextComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const ProductInfoComponent = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);

  // Tham chiếu tới main slider và thumb slider
  const mainSliderRef = useRef(null);
  const thumbSliderRef = useRef(null);

  const mainSliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    arrows: false,
    beforeChange: (_, next) => setCurrentIndex(next),
  };

  const thumbSliderSettings = {
    infinite: true,
    speed: 500,
    // centerMode: true,
    slidesToShow: Math.min(5, product.images.length),
    slidesToScroll: 1,
    nextArrow: (
      <NextComponent
        position="absolute"
        zIndex="1"
        top="50%"
        right="0"
        transform="translateY(-50%)"
        fontSize="1.5rem"
        color="black"
      />
    ),
    prevArrow: (
      <BackComponent
        position="absolute"
        zIndex="1"
        top="50%"
        left="0"
        transform="translateY(-50%)"
        fontSize="1.5rem"
        color="black"
      />
    ),
  };

  const handleThumbClick = (index) => {
    setCurrentIndex(index);
    mainSliderRef.current.slickGoTo(index); // Thay đổi slide của main slider
  };

  // Hàm xử lý tăng số lượng
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Hàm xử lý giảm số lượng (không cho xuống dưới 1)
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const toggleDetails = () => {
    setIsDetailsVisible(!isDetailsVisible); // Đổi trạng thái khi nhấn
  };

  return (
    <div className="flex flex-col lg:flex-row p-10 gap-10">
      {/* Phần hình ảnh */}
      <div className="w-full lg:w-96 flex flex-col">
        <Slider {...mainSliderSettings} ref={mainSliderRef}>
          {product.images.map((img, index) => (
            <div key={index}>
              <img
                src={img}
                alt={`Product ${index}`}
                className="w-full h-96 object-cover border"
              />
            </div>
          ))}
        </Slider>
        <div className="mt-2">
          <Slider {...thumbSliderSettings} ref={thumbSliderRef}>
            {product.images.map((img, index) => (
              <div key={index}>
                <img
                  src={img}
                  alt={`Thumbnail ${index}`}
                  className={`w-full h-20 object-cover cursor-pointer border-2 ${
                    index === currentIndex
                      ? "border-black"
                      : "border-transparent"
                  }`}
                  onClick={() => handleThumbClick(index)}
                  onMouseEnter={() => handleThumbClick(index)}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Phần thông tin sản phẩm */}
      <div className="w-full">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <div className="flex items-center mt-4">
          <p className="text-xl font-bold text-[#ba2b20] mr-4">
            {product.newPrice.toLocaleString()}₫
          </p>
          <p className="text-md font-weight text-[#9ca3af] line-through mr-4">
            {product.oldPrice.toLocaleString()}₫
          </p>
          <p className="text-md font-semibold text-[#158857]">
            {product.percent}% Off
          </p>
        </div>

        {/* Cột size cho sản phẩm */}
        <p className="text-base font-medium my-3">Chọn loại</p>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-1 lg:grid-cols-4">
          {product.sizes.map((size) => (
            <ButtonComponent
              key={size}
              text={size}
              className={`p-2 border rounded`}
              color={selectedSize === size ? "white" : ""}
              onClick={() => setSelectedSize(size)}
            />
          ))}
        </div>
        <p className="text-base font-medium my-3">Số lượng</p>
        <div className="flex items-center">
          <div className="inline-flex items-center w-auto border border-[#a1a8af]">
            <button
              className="px-4 py-2 hover:bg-white hover:text-black"
              onClick={decreaseQuantity}
            >
              -
            </button>
            <input
              type="text"
              value={quantity}
              // readOnly
              className="w-12 text-center text-black"
            />
            <button
              className="px-4 py-2 hover:bg-white hover:text-black"
              onClick={increaseQuantity}
            >
              +
            </button>
          </div>
          <p className="text-sm text-[#757575] ml-4">Còn lại: 8 sản phẩm</p>
          <div
            className="flex items-center cursor-pointer ml-4"
            onClick={toggleFavorite}
          >
            {isFavorite ? (
              <FaHeart className="text-red-500 text-xl mx-2" />
            ) : (
              <FaRegHeart className="text-xl mx-2" />
            )}
            <p>Yêu thích</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="mt-4 p-3 border border-[#a1a8af] bg-white hover:border-black text-black w-full rounded uppercase">
            Thêm vào giỏ hàng
          </button>
          <button className="mt-4 p-3 bg-black hover:opacity-80 text-white w-full rounded uppercase">
            Mua ngay
          </button>
        </div>
        <div className="border-t-2 border-[rgba(0, 0, 0, 0.1)] w-full my-8"></div>
        <div className="w-full">
          {/* Chi tiết sản phẩm */}
          <div
            className="mt-4 cursor-pointer text-xl font-medium uppercase flex items-center justify-between"
            onClick={toggleDetails}
          >
            Chi tiết sản phẩm
            {isDetailsVisible ? (
              <FaChevronUp className="h-5 w-5" />
            ) : (
              <FaChevronDown className="h-5 w-5" />
            )}
          </div>

          {/* Hiển thị chi tiết sản phẩm với hiệu ứng smooth */}
          <div
            className={`mt-4 text-sm text-black overflow-hidden transition-all duration-500 ease-in-out ${
              isDetailsVisible ? "max-h-[500px]" : "max-h-0"
            }`}
          >
            <p className="text-justify leading-loose">{product.details}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfoComponent;
