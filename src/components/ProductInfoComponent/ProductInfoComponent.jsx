import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import BackComponent from "../BackComponent/BackComponent";
import NextComponent from "../NextComponent/NextComponent";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Button } from "@material-tailwind/react";
import { getFavourite, updateFavourite } from "../../services/api/FavouriteApi";

const ProductInfoComponent = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Tham chiếu tới main slider và thumb slider
  const mainSliderRef = useRef(null);
  const thumbSliderRef = useRef(null);

  const mainSliderSettings = {
    dots: true,
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
    // dots: true,
    infinite: true,
    speed: 500,
    // centerMode: true,
    slidesToShow: Math.min(5),
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

  const toggleFavorite = async () => {
    setIsFavorite(!isFavorite);
    const res = await updateFavourite(product._id); // Gọi API để cập nhật danh sách yêu thích
    console.log(res);
  };

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      const favouritesData = await getFavourite();

      if (favouritesData && favouritesData.result) {
        setIsFavorite(favouritesData.result.includes(product._id));
      }
    };

    fetchFavoriteStatus();
  }, [product?._id]);

  const toggleDetails = () => setIsDetailsVisible(!isDetailsVisible);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1);

  // Hàm lấy ảnh chính và biến thể đưa vào để hiển thị, nếu nhỏ hơn 5 thì gấp đôi lên tại setting đang để min là 5 á
  const getAllImages = (product) => {
    if (!product) return [];

    let images = [
      product?.product_img?.image_main,
      ...(product?.product_img?.image_subs || []),
    ];

    // Lấy ảnh từ biến thể
    product.variants?.forEach((variant) => {
      images.push(variant?.variant_img?.image_main);
      images.push(...(variant?.variant_img?.image_subs || []));
    });

    // Lọc bỏ ảnh null hoặc undefined
    images = images.filter((img) => img);

    while (images.length < 5) {
      images = [...images, ...images];
    }

    return images;
  };

  const allImages = getAllImages(product);

  const handleColorClick = (color) => {
    setSelectedColor(color);
    setSelectedSize(null); // Reset size khi thay đổi màu
  };

  console.log("product", product);
  return (
    <div className="flex flex-col lg:flex-row lg:p-10 gap-10">
      <div className="w-full h-full lg:w-[500px] flex flex-col">
        <Slider {...mainSliderSettings} ref={mainSliderRef}>
          {allImages.map((img, index) => (
            <div key={index}>
              <img
                src={img}
                alt={`Product ${index}`}
                className="w-full h-[500px] sm:h-[800px] lg:h-96 object-cover border"
              />
            </div>
          ))}
        </Slider>
        <div className="mt-2 hidden lg:block">
          <Slider {...thumbSliderSettings} ref={thumbSliderRef}>
            {allImages.map((img, index) => (
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
        <h1 className="text-2xl font-bold break-all">
          {product?.product_title}
        </h1>
        <p className="text-lg text-gray-500">{product?.product_brand}</p>

        <div className="flex items-center mt-4">
          <p className="text-xl font-bold text-[#ba2b20] mr-4">
            {product?.product_price?.toLocaleString()}₫
          </p>
          {product?.product_percent_discount > 0 && (
            <>
              <p className="text-md text-[#9ca3af] line-through mr-4">
                {(
                  (product.product_price * 100) /
                  (100 - product.product_percent_discount)
                ).toLocaleString()}
                ₫
              </p>
              <p className="text-md font-semibold text-[#158857]">
                {product?.product_percent_discount}% Off
              </p>
            </>
          )}
        </div>

        {product?.variants && product?.variants.length > 0 && (
          <div>
            {/* Hiển thị màu sắc */}
            <p className="text-base my-3 font-lg font-semibold">Chọn màu</p>
            <div className="flex flex-wrap gap-2">
              {product?.variants.map((variant) =>
                variant.variant_color ? (
                  <Button
                    key={variant._id}
                    color="white"
                    className={`w-24 h-14 border-gray-400 flex items-center justify-center p-2 border rounded-md shadow-md ${
                      selectedColor === variant.variant_color
                        ? "border-2 border-black"
                        : ""
                    }`}
                    onClick={() => handleColorClick(variant.variant_color)}
                  >
                    {variant.variant_img?.image_main && (
                      <img
                        src={variant.variant_img?.image_main}
                        alt={variant.variant_color}
                        className="w-8 h-8 border border-black object-cover rounded-full mr-2"
                      />
                    )}
                    {variant.variant_color}
                  </Button>
                ) : null
              )}
            </div>

            {/* Hiển thị kích thước */}
            <div>
              <p className="text-base my-3 font-lg font-semibold">
                Chọn kích cỡ
              </p>
              <div className="flex flex-wrap gap-2">
                {product?.variants.map((variant) => (
                  <Button
                    key={variant._id}
                    color="white"
                    className={`w-14 h-14 border-gray-400 flex items-center justify-center border rounded-md shadow-md ${
                      selectedSize === variant.variant_size
                        ? "border-2 border-black"
                        : ""
                    }`}
                    onClick={() => setSelectedSize(variant.variant_size)}
                  >
                    {variant.variant_size}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Số lượng */}
        <p className="text-base font-medium my-3">Số lượng</p>
        <div className="flex items-center flex-wrap gap-3">
          <div className="inline-flex items-center border border-[#a1a8af]">
            <button
              className="px-4 py-2 hover:bg-gray-200"
              onClick={decreaseQuantity}
            >
              -
            </button>
            <input
              type="text"
              value={quantity}
              readOnly
              className="w-12 text-center text-black"
            />
            <button
              className="px-4 py-2 hover:bg-gray-200"
              onClick={increaseQuantity}
            >
              +
            </button>
          </div>
          <p className="text-sm text-gray-500">
            Còn lại: {product?.product_countInStock} sản phẩm
          </p>
          <div
            className="flex items-center cursor-pointer"
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

        {/* Nút thêm giỏ hàng / mua ngay */}
        <div className="flex flex-wrap sm:flex-nowrap gap-2 mt-4">
          <Button
            color="white"
            className="p-3 border border-gray-400 text-black w-full rounded uppercase"
          >
            Thêm vào giỏ hàng
          </Button>
          <Button className="p-3 bg-black text-white w-full rounded uppercase">
            Mua ngay
          </Button>
        </div>

        {/* Chi tiết sản phẩm */}
        <div className="border-t-2 border-gray-300 w-full my-8"></div>
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
        <div
          className={`mt-4 text-sm text-black transition-all ${
            isDetailsVisible ? "max-h-[500px]" : "max-h-0 opacity-0"
          }`}
        >
          <p className="text-justify leading-loose">
            {product?.product_description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductInfoComponent;
