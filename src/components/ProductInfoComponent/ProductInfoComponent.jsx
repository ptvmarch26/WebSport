import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import BackComponent from "../BackComponent/BackComponent";
import NextComponent from "../NextComponent/NextComponent";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Button } from "@material-tailwind/react";
import { getFavourite, updateFavourite } from "../../services/api/FavouriteApi";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { usePopup } from "../../context/PopupContext";
import { useNavigate } from "react-router-dom";

const ProductInfoComponent = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [availableVariants, setAvailableVariants] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { token } = useAuth();
  const { showPopup } = usePopup();
  const navigate = useNavigate();

  // Tham chiếu tới main slider và thumb slider
  const mainSliderRef = useRef(null);
  const thumbSliderRef = useRef(null);

  const mainSliderSettings = {
    // dots: true,
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
    slidesToShow: 5,
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
    mainSliderRef.current.slickGoTo(index);

    if (thumbSliderRef.current) {
      thumbSliderRef.current.slickGoTo(index);
    }
  };

  const toggleFavorite = async () => {
    setIsFavorite(!isFavorite);
    await updateFavourite(product._id);
  };

  const { handleAddToCart, setCart, cart } = useCart();
  const handlePushtoCart = async () => {
    const res = await handleAddToCart(
      product._id,
      selectedColor,
      selectedSize,
      quantity
    );
    if (res.EC === 0) {
      const existingIndex = cart.products.findIndex(
        (item) =>
          item.product_id._id === product._id &&
          item.color_name === selectedColor &&
          item.variant_name === selectedSize
      );

      const updatedCart = { ...cart };
      const updatedProducts = [...cart.products];

      if (existingIndex !== -1) {
        updatedProducts[existingIndex].quantity += quantity;
      } else {
        const newProduct = {
          product_id: product,
          color_name: selectedColor,
          variant_name: selectedSize,
          quantity,
        };
        updatedProducts.push(newProduct);
      }
      updatedCart.products = updatedProducts;
      setCart(updatedCart);
      showPopup(res.EM);
    } else {
      showPopup(res.EM || "Đã có lỗi xảy ra.");
    }
  };

  useEffect(() => {
    setSelectedSize(null);
    setSelectedColor(null);
    setAvailableVariants([]);

    const fetchFavoriteStatus = async () => {
      if(token){
        const favouritesData = await getFavourite();
        if (favouritesData && favouritesData.result) {
          setIsFavorite(favouritesData.result.includes(product._id));
        }
      }
    };

    fetchFavoriteStatus();
  }, [product?._id]);

  const toggleDetails = () => setIsDetailsVisible(!isDetailsVisible);

  const increaseQuantity = () => {
    const maxStock =
      availableVariants.find((v) => v.variant_size === selectedSize)
        ?.variant_countInStock ?? 0;

    if (quantity < maxStock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1);

  const handleNavigateCheckout = () => {
    navigate(
      `/checkout/${product._id}?quantity=${quantity}&color=${selectedColor}&size=${selectedSize}`
    );
  };

  // Hàm lấy ảnh chính và biến thể đưa vào để hiển thị, nếu nhỏ hơn 5 thì gấp đôi lên tại setting đang để min là 5 á
  const getAllImages = (product) => {
    if (!product) return [];

    let images = [product?.product_img];

    // Lấy ảnh từ biến thể
    product.colors?.forEach((color) => {
      images.push(color?.imgs?.img_main);
      images.push(...(color?.imgs?.img_subs || []));
    });

    // Lọc bỏ ảnh null hoặc undefined
    images = images.filter((img) => img);

    while (images.length < 5) {
      images = [...images, ...images];
    }

    return images;
  };

  const allImages = getAllImages(product);

  const handleColorSelect = (color) => {
    setSelectedColor(color.color_name);
    setAvailableVariants(color.variants);
    setSelectedSize(null);

    const mainColorImg = color.imgs?.img_main;
    const index = allImages.findIndex((img) => img === mainColorImg);

    if (index !== -1 && mainSliderRef.current && mainSliderRef.current.slickGoTo) {
      mainSliderRef.current.slickGoTo(index);
      setCurrentIndex(index);
    }

    // Cập nhật vị trí thumbnail
    if (thumbSliderRef.current && thumbSliderRef.current.slickGoTo) {
      thumbSliderRef.current.slickGoTo(index);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row lg:p-10 gap-10">
      <div className="w-full h-full lg:w-[500px] flex flex-col">
        <Slider {...mainSliderSettings} ref={mainSliderRef}>
          {allImages.map((img, index) => (
            <div key={index}>
              <img
                src={img}
                alt={`Product ${index}`}
                className="w-full h-[500px] sm:h-[800px] lg:h-[600px] object-cover border"
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
                  className={`w-full h-20 object-cover cursor-pointer border-2 ${index === currentIndex
                      ? "border-black"
                      : "border-transparent"
                    }`}
                  onClick={() => handleThumbClick(index)}
                // onMouseEnter={() => handleThumbClick(index)}
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
          {!selectedColor || !selectedSize ? (
            <div className="flex items-center">
              <p className="text-xl font-bold text-[#ba2b20] mr-4">
                {product?.product_price?.toLocaleString()}₫
              </p>
            </div>
          ) : (
            <p className="text-xl font-bold text-[#ba2b20] mr-4">
              {availableVariants
                .find((v) => v.variant_size === selectedSize)
                ?.variant_price.toLocaleString()}
              đ
            </p>
          )}
          {product?.product_percent_discount > 0 &&
            selectedColor &&
            selectedSize && (
              <>
                <p className="text-md text-[#9ca3af] line-through mr-4">
                  {(
                    (availableVariants.find(
                      (v) => v.variant_size === selectedSize
                    )?.variant_price *
                      100) /
                    (100 - product.product_percent_discount)
                  ).toLocaleString()}
                  đ
                </p>
                <p className="text-md font-semibold text-[#158857]">
                  {product?.product_percent_discount}% Off
                </p>
              </>
            )}
        </div>

        {product?.colors && product.colors.length > 0 && (
          <div>
            {/* Chọn màu */}
            <p className="text-base my-3 font-lg font-semibold">Chọn màu</p>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color, index) => (
                <Button
                  key={index}
                  color="white"
                  className={`w-24 h-14 border-gray-400 flex items-center justify-center p-2 border rounded-md shadow-md ${selectedColor === color.color_name
                      ? "border-2 border-black"
                      : ""
                    }`}
                  onClick={() => handleColorSelect(color)}
                >
                  {color.color_name}
                </Button>
              ))}
            </div>

            {/* Chọn size dựa theo màu */}
            {availableVariants?.length > 0 && (
              <>
                <p className="text-base my-3 font-lg font-semibold">
                  Chọn kích cỡ
                </p>
                <div className="flex flex-wrap gap-2">
                  {availableVariants.map((variant) => (
                    <Button
                      key={variant._id}
                      color="white"
                      className={`w-14 h-14 border-gray-400 flex items-center justify-center border rounded-md shadow-md ${selectedSize === variant.variant_size
                          ? "border-2 border-black"
                          : ""
                        }`}
                      onClick={() => setSelectedSize(variant.variant_size)}
                      disabled={variant.variant_countInStock === 0}
                    >
                      {variant.variant_size}
                    </Button>
                  ))}
                </div>
              </>
            )}
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
            {selectedColor && selectedSize ? (
              <>
                Còn lại:{" "}
                {availableVariants.find((v) => v.variant_size === selectedSize)
                  ?.variant_countInStock ?? 0}{" "}
                sản phẩm
              </>
            ) : (
              ""
            )}
          </p>
          {token && (
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
          )}
        </div>

        {/* Nút thêm giỏ hàng / mua ngay */}
        <div className="flex flex-wrap sm:flex-nowrap gap-2 mt-4">
          <Button
            onClick={handlePushtoCart}
            disabled={!selectedSize || !selectedColor || !token}
            color="white"
            className="p-3 border border-gray-400 text-black w-full rounded uppercase"
          >
            Thêm vào giỏ hàng
          </Button>
          <Button
            className="p-3 bg-black text-white w-full rounded uppercase"
            disabled={!selectedSize || !selectedColor}
            onClick={handleNavigateCheckout}
          >
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
          className={`mt-4 text-sm text-black transition-all ${isDetailsVisible ? "max-h-[500px]" : "max-h-0 opacity-0"
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
