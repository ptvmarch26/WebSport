import React, { useState } from "react";
import SidebarSortComponent from "../../components/SidebarSortComponent/SideBarSortComponent";
import TopSortComponent from "../../components/TopSortComponent/TopSortComponent";
import MoreProductsComponent from "../../components/MoreProductsComponent/MoreProductsComponent";

const ProductPage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSortOpen, setSortOpen] = useState(false);
  const [sortText, setSortText] = useState("Lọc theo");

  const products = [
    {
      src: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/631126/01/mod01/fnd/PNA/fmt/png/A$AP-ROCKY-x-PUMA-Distressed-Sweatshirt",
      alt: "Product 1",
      name: "Nước Hoa Chó Mèo ABURA Khử Mùi Hôi, Nước Tiểu Chó Mèo Hương Thơm Lưu Giữ Lâu, An Toàn",
      oldPrice: 500000,
      newPrice: 400000,
      start: 1.5,
      percent: 20,
    },
    {
      src: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/677912/01/mod01/fnd/PNA/fmt/png/PUMA-MOTION-Women's-Sweatshirt",
      alt: "Product 2",
      name: "Nike Air Force 1 '07",
      oldPrice: 600000,
      newPrice: 480000,
      start: 5,
      percent: 20,
    },
    {
      src: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/630045/87/mod01/fnd/PNA/fmt/png/Wardrobe-Essentials-Women's-Oversized-Crew-Sweatshirt",
      alt: "Product 3",
      name: "Nike Air Force 1 '07",
      oldPrice: 700000,
      newPrice: 560000,
      start: 4.8,
      percent: 20,
    },
    {
      src: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/630045/87/mod01/fnd/PNA/fmt/png/Wardrobe-Essentials-Women's-Oversized-Crew-Sweatshirt",
      alt: "Product 4",
      name: "Nike Air Force 1 '07",
      oldPrice: 800000,
      newPrice: 640000,
      start: 4.2,
      percent: 20,
    },
    {
      src: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/631126/01/mod01/fnd/PNA/fmt/png/A$AP-ROCKY-x-PUMA-Distressed-Sweatshirt",
      alt: "Product 1",
      name: "Nước Hoa Chó Mèo ABURA Khử Mùi Hôi, Nước Tiểu Chó Mèo Hương Thơm Lưu Giữ Lâu, An Toàn",
      oldPrice: 500000,
      newPrice: 400000,
      start: 1.5,
      percent: 20,
    },
    {
      src: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/677912/01/mod01/fnd/PNA/fmt/png/PUMA-MOTION-Women's-Sweatshirt",
      alt: "Product 2",
      name: "Nike Air Force 1 '07",
      oldPrice: 600000,
      newPrice: 480000,
      start: 5,
      percent: 20,
    },
    {
      src: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/630045/87/mod01/fnd/PNA/fmt/png/Wardrobe-Essentials-Women's-Oversized-Crew-Sweatshirt",
      alt: "Product 3",
      name: "Nike Air Force 1 '07",
      oldPrice: 700000,
      newPrice: 560000,
      start: 4.8,
      percent: 20,
    },
    {
      src: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/630045/87/mod01/fnd/PNA/fmt/png/Wardrobe-Essentials-Women's-Oversized-Crew-Sweatshirt",
      alt: "Product 4",
      name: "Nike Air Force 1 '07",
      oldPrice: 800000,
      newPrice: 640000,
      start: 4.2,
      percent: 20,
    },
    {
      src: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/630045/87/mod01/fnd/PNA/fmt/png/Wardrobe-Essentials-Women's-Oversized-Crew-Sweatshirt",
      alt: "Product 4",
      name: "Nike Air Force 1 '07",
      oldPrice: 800000,
      newPrice: 640000,
      start: 4.2,
      percent: 20,
    },
  ];

  const handleSortChange = (sortOption) => {
    console.log(sortOption);
    setSortText(sortOption);
    setSortOpen(false);
  };

  return (
    <div className="res my-10">
      <TopSortComponent
        sortText={sortText}
        isSortOpen={isSortOpen}
        setSortOpen={setSortOpen} // Thêm prop này để đóng dropdown khi click ra ngoài
        onSidebarOpen={() => setSidebarOpen(true)}
        onSortToggle={() => setSortOpen(!isSortOpen)}
        onSortChange={handleSortChange}
      />
      <MoreProductsComponent products={products} />

      <SidebarSortComponent
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
    </div>
  );
};

export default ProductPage;
