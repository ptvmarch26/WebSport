// import ProductComponent from "../../components/ProductComponent/ProductComponent";
// import ProductFeedBackComponent from "../../components/ProductFeedBackComponent/ProductFeedBackComponent";
// import ProductInfoComponent from "../../components/ProductInfoComponent/ProductInfoComponent";

// const ProductDetailsPage = () => {
//   const product = {
//     name: "Nike Air Force 1 '07",
//     images: [
//       "data:image/jpeg;base64,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",
//       "data:image/jpeg;base64,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",
//       "data:image/jpeg;base64,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",
//       "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/4898d109-2c6f-4aeb-a098-463f75926f76/AS+W+NSW+PHNX+FLC+FT+HR+PANT+W.png",
//       "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/4898d109-2c6f-4aeb-a098-463f75926f76/AS+W+NSW+PHNX+FLC+FT+HR+PANT+W.png",
//       "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/4898d109-2c6f-4aeb-a098-463f75926f76/AS+W+NSW+PHNX+FLC+FT+HR+PANT+W.png",
//       "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/342cae83-42be-4c1f-98de-b8d5f525bae9/AS+M+NK+RPL+MILER+JKT.png",
//       "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/3ce32cb4-7f77-4c51-b98b-3411893eabf7/NIKE+PEGASUS+PLUS+CM.png",
//     ],
//     sizes: [39, 39.5, 40, 41, 42, 43, 44, 45],
//     oldPrice: 500000,
//     newPrice: 400000,
//     star: 1.5,
//     percent: 20,
//     details:
//       "Carve a new lane for yourself in the Vomero 5—your go-to for depth, durability and easy styling. The richly layered design includes textiles, leather and plastic accents that nod to the Y2K aesthetic.BenefitsReal and synthetic leathers on the upper add durability.The mesh panels and ventilation ports on heel help keep it light and breathable.Snappy and responsive, Air Zoom cushioning helps provide a quick-off-the-ground sensation.Plastic caging on the side adds support.Rubber outsole gives you durable traction.Product detailsReflective design detailsNot intended for use as personal protective equipment (PPE)Colour Shown: Platinum Violet/Light Violet Ore/Team Gold/Dark RaisinStyle: HQ3643-019Country/Region of Origin: Vietnam",
//   };

//   const productsRelative = [
//     {
//       src: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/631126/01/mod01/fnd/PNA/fmt/png/A$AP-ROCKY-x-PUMA-Distressed-Sweatshirt",
//       alt: "Product 1",
//       name: "Nước Hoa Chó Mèo ABURA Khử Mùi Hôi, Nước Tiểu Chó Mèo Hương Thơm Lưu Giữ Lâu, An Toàn",
//       oldPrice: 500000,
//       newPrice: 400000,
//       star: 1.5,
//       percent: 20,
//     },
//     {
//       src: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/677912/01/mod01/fnd/PNA/fmt/png/PUMA-MOTION-Women's-Sweatshirt",
//       alt: "Product 2",
//       name: "Nike Air Force 1 '07",
//       oldPrice: 600000,
//       newPrice: 480000,
//       star: 5,
//       percent: 20,
//     },
//     {
//       src: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/630045/87/mod01/fnd/PNA/fmt/png/Wardrobe-Essentials-Women's-Oversized-Crew-Sweatshirt",
//       alt: "Product 3",
//       name: "Nike Air Force 1 '07",
//       oldPrice: 700000,
//       newPrice: 560000,
//       star: 4.8,
//       percent: 20,
//     },
//     {
//       src: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/630045/87/mod01/fnd/PNA/fmt/png/Wardrobe-Essentials-Women's-Oversized-Crew-Sweatshirt",
//       alt: "Product 4",
//       name: "Nike Air Force 1 '07",
//       oldPrice: 800000,
//       newPrice: 640000,
//       star: 4.2,
//       percent: 20,
//     },
//     {
//       src: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/631126/01/mod01/fnd/PNA/fmt/png/A$AP-ROCKY-x-PUMA-Distressed-Sweatshirt",
//       alt: "Product 1",
//       name: "Nước Hoa Chó Mèo ABURA Khử Mùi Hôi, Nước Tiểu Chó Mèo Hương Thơm Lưu Giữ Lâu, An Toàn",
//       oldPrice: 500000,
//       newPrice: 400000,
//       star: 1.5,
//       percent: 20,
//     },
//     {
//       src: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/677912/01/mod01/fnd/PNA/fmt/png/PUMA-MOTION-Women's-Sweatshirt",
//       alt: "Product 2",
//       name: "Nike Air Force 1 '07",
//       oldPrice: 600000,
//       newPrice: 480000,
//       star: 5,
//       percent: 20,
//     },
//     {
//       src: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/630045/87/mod01/fnd/PNA/fmt/png/Wardrobe-Essentials-Women's-Oversized-Crew-Sweatshirt",
//       alt: "Product 3",
//       name: "Nike Air Force 1 '07",
//       oldPrice: 700000,
//       newPrice: 560000,
//       star: 4.8,
//       percent: 20,
//     },
//     {
//       src: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/630045/87/mod01/fnd/PNA/fmt/png/Wardrobe-Essentials-Women's-Oversized-Crew-Sweatshirt",
//       alt: "Product 4",
//       name: "Nike Air Force 1 '07",
//       oldPrice: 800000,
//       newPrice: 640000,
//       star: 4.2,
//       percent: 20,
//     },
//     {
//       src: "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/3ce32cb4-7f77-4c51-b98b-3411893eabf7/NIKE+PEGASUS+PLUS+CM.png",
//       alt: "Product 4",
//       name: "Nike Air Force 1 '07",
//       oldPrice: 800000,
//       newPrice: 640000,
//       star: 4.2,
//       percent: 20,
//     },
//   ];

//   return (
//     <div className="container mx-auto px-2">
//       <ProductInfoComponent product={product} />
//       <ProductFeedBackComponent product={product} />
//       <div className="mt-10 mb-20">
//         <div className="border-t-2 border-[rgba(0, 0, 0, 0.1)] w-full mb-4"></div>
//         <p className="text-xl font-semibold uppercase my-8">
//           Sản phẩm liên quan
//         </p>
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//           {productsRelative.slice(0, 8).map((product, index) => (
//             <ProductComponent key={index} {...product} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetailsPage;
import ProductComponent from "../../components/ProductComponent/ProductComponent";
import ProductFeedBackComponent from "../../components/ProductFeedBackComponent/ProductFeedBackComponent";
import ProductInfoComponent from "../../components/ProductInfoComponent/ProductInfoComponent";
import { useParams } from "react-router-dom";
import { use, useEffect, useState } from "react";
import { useProduct } from "../../context/ProductContext";

const ProductDetailsPage = () => {
  
  const { id } = useParams();
  const { fetchProductDetails, productDetails, fetchProducts, products } = useProduct();

  useEffect(() => {
    fetchProductDetails(id);
  }
  , [id]);

  useEffect(() => {
    fetchProducts();
  }, []);

  

  return (
    <div className="container mx-auto px-2">
      <ProductInfoComponent product={productDetails} />
      {/* <ProductFeedBackComponent product={productDetails} /> */}
      <div className="mt-10 mb-20">
        <div className="border-t-2 border-[rgba(0, 0, 0, 0.1)] w-full mb-4"></div>
        <p className="text-xl font-semibold uppercase my-8">
          Sản phẩm liên quan
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.slice(0, 8).map((product) => (
            <ProductComponent
            key={product._id}
            src={product.product_img.image_main} // Lấy ảnh chính
            alt={product.product_title}
            name={product.product_title}
            oldPrice={product.product_price} // Nếu có giảm giá, thêm oldPrice
            newPrice={product.product_price * (1 - product.product_percent_discount / 100)} // Giá sau giảm
            star={product.product_rate} // Số sao đánh giá
            percent={product.product_percent_discount} // % giảm giá
            onClick={() => navigate(`/product/${product._id}`)} // Chuyển đến trang chi tiết sản phẩm
          />
          ))}
        </div>
      </div>
    </div>
  );
};

