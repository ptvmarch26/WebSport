// import React from 'react'
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import slider1 from "../../assets/images/slider1.jpg";
import running from "../../assets/images/running.jpg";
import gym from "../../assets/images/gym.jpg";
import tennis from "../../assets/images/tennis.jpg";
import soccer from "../../assets/images/soccer.jpg";
import basketball from "../../assets/images/basketball.jpg";
import { Carousel } from "@material-tailwind/react";
import ProductComponent from "../../components/ProductComponent/ProductComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import Slider from "react-slick";
import NextComponent from "../../components/NextComponent/NextComponent";
import BackComponent from "../../components/BackComponent/BackComponent";
import { useAuth } from "../../context/AuthContext";

const HomePage = () => {
  const navigate = useNavigate();
  const arrSlides = [slider1, slider1, slider1];

  // Sản phẩm giả để css
  const products = [
    {
      src: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/631126/01/mod01/fnd/PNA/fmt/png/A$AP-ROCKY-x-PUMA-Distressed-Sweatshirt",
      alt: "Product 1",
      name: "Nước Hoa Chó Mèo ABURA Khử Mùi Hôi, Nước Tiểu Chó Mèo Hương Thơm Lưu Giữ Lâu, An Toàn",
      oldPrice: 500000,
      newPrice: 400000,
      star: 1.5,
      percent: 20,
    },
    {
      src: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/677912/01/mod01/fnd/PNA/fmt/png/PUMA-MOTION-Women's-Sweatshirt",
      alt: "Product 2",
      name: "Nike Air Force 1 '07",
      oldPrice: 600000,
      newPrice: 480000,
      star: 5,
      percent: 20,
    },
    {
      src: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/630045/87/mod01/fnd/PNA/fmt/png/Wardrobe-Essentials-Women's-Oversized-Crew-Sweatshirt",
      alt: "Product 3",
      name: "Nike Air Force 1 '07",
      oldPrice: 700000,
      newPrice: 560000,
      star: 4.8,
      percent: 20,
    },
    {
      src: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/630045/87/mod01/fnd/PNA/fmt/png/Wardrobe-Essentials-Women's-Oversized-Crew-Sweatshirt",
      alt: "Product 4",
      name: "Nike Air Force 1 '07",
      oldPrice: 800000,
      newPrice: 640000,
      star: 4.2,
      percent: 20,
    },
    {
      src: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/631126/01/mod01/fnd/PNA/fmt/png/A$AP-ROCKY-x-PUMA-Distressed-Sweatshirt",
      alt: "Product 1",
      name: "Nước Hoa Chó Mèo ABURA Khử Mùi Hôi, Nước Tiểu Chó Mèo Hương Thơm Lưu Giữ Lâu, An Toàn",
      oldPrice: 500000,
      newPrice: 400000,
      star: 1.5,
      percent: 20,
    },
    {
      src: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/677912/01/mod01/fnd/PNA/fmt/png/PUMA-MOTION-Women's-Sweatshirt",
      alt: "Product 2",
      name: "Nike Air Force 1 '07",
      oldPrice: 600000,
      newPrice: 480000,
      star: 5,
      percent: 20,
    },
    {
      src: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/630045/87/mod01/fnd/PNA/fmt/png/Wardrobe-Essentials-Women's-Oversized-Crew-Sweatshirt",
      alt: "Product 3",
      name: "Nike Air Force 1 '07",
      oldPrice: 700000,
      newPrice: 560000,
      star: 4.8,
      percent: 20,
    },
    {
      src: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/630045/87/mod01/fnd/PNA/fmt/png/Wardrobe-Essentials-Women's-Oversized-Crew-Sweatshirt",
      alt: "Product 4",
      name: "Nike Air Force 1 '07",
      oldPrice: 800000,
      newPrice: 640000,
      star: 4.2,
      percent: 20,
    },
    {
      src: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/630045/87/mod01/fnd/PNA/fmt/png/Wardrobe-Essentials-Women's-Oversized-Crew-Sweatshirt",
      alt: "Product 4",
      name: "Nike Air Force 1 '07",
      oldPrice: 800000,
      newPrice: 640000,
      star: 4.2,
      percent: 20,
    },
  ];

  const productsStatus = [
    {
      name: "Sản phẩm nổi bật",
      products: products,
      onClick: () => {
        navigate("/");
      },
    },
    {
      name: "Sản phẩm bán chạy",
      products: products,
      onClick: () => {
        navigate("/");
      },
    },
    {
      name: "Sản phẩm mới về",
      products: products,
      onClick: () => {
        navigate("/");
      },
    },
  ];

  const typeSports = [
    {
      image: running,
      type: "Chạy bộ",
      onClick: () => {
        navigate("/");
      },
    },
    {
      image: soccer,
      type: "Bóng đá",
      onClick: () => {
        navigate("/");
      },
    },
    {
      image: gym,
      type: "Thể hình",
      onClick: () => {
        navigate("/");
      },
    },
    {
      image: basketball,
      type: "Bóng rổ",
      onClick: () => {
        navigate("/");
      },
    },
    {
      image: tennis,
      type: "Tennis",
      onClick: () => {
        navigate("/");
      },
    },
  ];

  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: (
      <NextComponent
        position="absolute"
        zIndex="1"
        top="50%"
        right="10px"
        transform="translateY(-50%)"
        fontSize="2rem"
        color="white"
      />
    ),
    prevArrow: (
      <BackComponent
        position="absolute"
        zIndex="1"
        top="50%"
        left="10px"
        transform="translateY(-50%)"
        fontSize="2rem"
        color="white"
      />
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

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
          {arrSlides.map((slide, index) => (
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
          {productsStatus.map((product, index) => {
            return (
              <div
                key={index}
                className="border-t-2 border-[rgba(0, 0, 0, 0.1)] w-full my-8"
              >
                <p className="uppercase text-4xl font-extrabold text-center my-8">
                  {product.name}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {products.slice(0, 8).map((product, index) => (
                    <ProductComponent key={index} {...product} />
                  ))}
                </div>
                <div className="my-4 flex justify-center">
                  <ButtonComponent
                    width="w-[200px]"
                    onClick={product.onClick}
                    color="white"
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div>
          <div className="border-t-2 border-[rgba(0, 0, 0, 0.1)] w-full my-8 mb-10">
            <p className="uppercase text-4xl font-extrabold text-center my-8">
              Theo môn thể thao
            </p>
            <Slider {...settings}>
              {typeSports.map((sport, index) => (
                <CardComponent key={index} {...sport} />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
