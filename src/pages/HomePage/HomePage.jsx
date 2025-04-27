// import React from 'react'
import { useNavigate } from "react-router-dom";
// import running from "../../assets/images/running.jpg";
// import gym from "../../assets/images/gym.jpg";
// import tennis from "../../assets/images/tennis.jpg";
// import soccer from "../../assets/images/soccer.jpg";
// import basketball from "../../assets/images/basketball.jpg";
// import CardComponent from "../../components/CardComponent/CardComponent";
// import Slider from "react-slick";
// import NextComponent from "../../components/NextComponent/NextComponent";
// import BackComponent from "../../components/BackComponent/BackComponent";
import { Carousel } from "@material-tailwind/react";
import ProductComponent from "../../components/ProductComponent/ProductComponent";
import AnimationScroll from "../../components/AnimationScroll/AnimationScroll";
import { useAuth } from "../../context/AuthContext";
import { useProduct } from "../../context/ProductContext";
import { useEffect } from "react";
import { useState } from "react";
import { getFavourite } from "../../services/api/FavouriteApi";
import { useUser } from "../../context/UserContext";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { getDetailStore } from "../../services/api/StoreApi";

const HomePage = () => {
  const navigate = useNavigate();
  const { products, fetchProducts } = useProduct();
  const [productFamous, setProductFamous] = useState([]);
  const [productSelled, setProductSelled] = useState([]);
  const { fetchUser } = useUser();
  const [productNew, setProductNew] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [favourites, setFavourites] = useState([]);
  const { token } = useAuth();

  const storeId = "680a5a2fe8930a6de2ee81d2";
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanner = async () => {
      const res = await getDetailStore(storeId);
      if (res.EC === 0 && res.EM) {
        const { store_banner } = res.EM;
        setBanners(store_banner);
      }
    };

    fetchBanner();
  }, []);

  const fetchFavourites = async () => {
    if (token) {
      const res = await getFavourite();
      if (res?.EC === 0) {
        setFavourites(res.result);
      }
    }
  };

  // Gọi khi component mount hoặc khi token thay đổi
  useEffect(() => {
    if (token) {
      fetchUser();
      fetchFavourites();
    }
  }, [token]);

  useEffect(() => {
    fetchProducts();

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const productsToShow = windowWidth > 1280 ? 8 : 6;

  useEffect(() => {
    const productFamous = products.filter(
      (product) => product.product_famous === true
    );

    const productSelled = products.filter(
      (product) => product.product_selled >= 10
    );

    const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000; // 7 ngày tính bằng milliseconds
    const now = Date.now();

    const productNew = products.filter((product) => {
      const createdDate = new Date(product.createdAt).getTime();
      return now - createdDate <= SEVEN_DAYS;
    });

    setProductFamous(productFamous);
    setProductSelled(productSelled);
    setProductNew(productNew);
  }, [products]);

  const productsStatus = [
    {
      name: "Sản phẩm nổi bật",
      products: productFamous,
    },
    {
      name: "Sản phẩm bán chạy",
      products: productSelled,
    },
    {
      name: "Sản phẩm mới về",
      products: productNew,
    },
  ];

  // const typeSports = [
  //   {
  //     image: running,
  //     type: "Chạy bộ",
  //     onClick: () => {
  //       navigate("/");
  //     },
  //   },
  //   {
  //     image: soccer,
  //     type: "Bóng đá",
  //     onClick: () => {
  //       navigate("/");
  //     },
  //   },
  //   {
  //     image: gym,
  //     type: "Thể hình",
  //     onClick: () => {
  //       navigate("/");
  //     },
  //   },
  //   {
  //     image: basketball,
  //     type: "Bóng rổ",
  //     onClick: () => {
  //       navigate("/");
  //     },
  //   },
  //   {
  //     image: tennis,
  //     type: "Tennis",
  //     onClick: () => {
  //       navigate("/");
  //     },
  //   },
  // ];

  // const settings = {
  //   dots: true,
  //   speed: 500,
  //   slidesToShow: 3,
  //   slidesToScroll: 1,
  //   nextArrow: (
  //     <NextComponent
  //       position="absolute"
  //       zIndex="1"
  //       top="50%"
  //       right="10px"
  //       transform="translateY(-50%)"
  //       fontSize="2rem"
  //       color="white"
  //     />
  //   ),
  //   prevArrow: (
  //     <BackComponent
  //       position="absolute"
  //       zIndex="1"
  //       top="50%"
  //       left="10px"
  //       transform="translateY(-50%)"
  //       fontSize="2rem"
  //       color="white"
  //     />
  //   ),
  //   responsive: [
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 1,
  //       },
  //     },
  //     {
  //       breakpoint: 640,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //       },
  //     },
  //   ],
  // };

  return (
    <div className="">
      <div className="container mx-auto my-6 px-2">
        <Carousel
          className="h-[200px] md:h-[300px] lg:h-[400px] w-full"
          navigation={({ setActiveIndex, activeIndex, length }) => (
            <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
              {new Array(length).fill("").map((_, i) => (
                <span
                  key={i}
                  className={`block h-1 cursor-pointer rounded-2xl transition-all ${
                    activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                  }`}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>
          )}
          loop
          autoplay
        >
          {banners.map((slide, index) => (
            <div
              key={index}
              className="w-full h-full flex items-center justify-center"
            >
              <img
                src={slide}
                alt={`Slide ${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </Carousel>

        <div>
          {productsStatus.map((productStatus, index) => {
            return (
              <div
                key={index}
                className="border-t-2 border-[rgba(0, 0, 0, 0.1)] w-full my-8"
              >
                <p className="uppercase text-4xl font-extrabold text-center my-8">
                  {productStatus.name}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {productStatus.products
                    .slice(0, productsToShow)
                    .map((product) => (
                      <AnimationScroll
                        key={product._id}
                        type="fadeUp"
                        delay={0.1}
                      >
                        <ProductComponent
                          item={product}
                          favourites={favourites}
                          onFavouriteChange={fetchFavourites}
                          onClick={() => navigate(`/product/${product._id}`)} // Chuyển đến trang chi tiết sản phẩm
                        />
                      </AnimationScroll>
                    ))}
                </div>
                <div className="flex justify-center mt-6">
                  <ButtonComponent
                    color="white"
                    onClick={() => {
                      const queryMap = ["famous", "selled", "new"];
                      navigate(`/product?type=${queryMap[index]}`);
                    }}
                    className="w-[200px]"
                  >
                    Xem thêm
                  </ButtonComponent>
                </div>
              </div>
            );
          })}
        </div>
        {/* <div>
          <div className="border-t-2 border-[rgba(0, 0, 0, 0.1)] w-full my-8 mb-10">
            <p className="uppercase text-4xl font-extrabold text-center my-8">
              Theo môn thể thao
            </p>
            <Slider {...settings}>
              {typeSports.map((sport, index) => (
                <AnimationScroll key={index} type="fadeUp" delay={0.1}>
                  <CardComponent {...sport} />
                </AnimationScroll>
              ))}
            </Slider>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default HomePage;
