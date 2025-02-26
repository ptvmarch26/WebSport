// import React from 'react'
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import MoreProductsComponent from "../../components/MoreProductsComponent/MoreProductsComponent";
import slider1 from "../../assets/images/slider1.jpg";
import running from '../../assets/images/running.jpg'
import gym from '../../assets/images/gym.jpg'
import tennis from '../../assets/images/tennis.jpg'
import soccer from '../../assets/images/soccer.jpg'
import basketball from '../../assets/images/basketball.jpg'
import MoreCardComponent from "../../components/MoreCardComponent/MoreCardComponent";
import SliderComponent from '../../components/SliderComponent/SliderComponent'

const HomePage = () => {
  const navigate = useNavigate();
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
      }
    },
    {
      image: soccer,
      type: "Bóng đá",
      onClick: () => {
        navigate("/");
      }
    },
    {
      image: gym,
      type: "Thể hình",
      onClick: () => {
        navigate("/");
      }
    },
    {
      image: basketball,
      type: "Bóng rổ",
      onClick: () => {
        navigate("/");
      }
    },
    {
      image: tennis,
      type: "Tennis",
      onClick: () => {
        navigate("/");
      }
    },
  ]
  //   <div key="1" className="w-full h-full">
  //     <img src={slider1} alt="Slide 1" className="w-full h-full object-cover" />
  //   </div>,
  //   <div key="2" className="w-full h-full">
  //     <img src={slider1} alt="Slide 2" className="w-full h-full object-cover" />
  //   </div>,
  //   <div key="3" className="w-full h-full">
  //     <img src={slider1} alt="Slide 3" className="w-full h-full object-cover" />
  //   </div>,
  // ];

  return (
    <div className="">
      <div className="res my-6">
        <SliderComponent loop autoplay arrSlides={[slider1, slider1, slider1]} />
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
                <MoreProductsComponent products={product.products} />
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
            <MoreCardComponent sports={typeSports}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
