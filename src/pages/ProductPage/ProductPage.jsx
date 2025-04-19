import React, { use, useEffect, useRef, useState } from "react";
import SidebarSortComponent from "../../components/SidebarSortComponent/SidebarSortComponent";
import ProductComponent from "../../components/ProductComponent/ProductComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import PanigationComponent from "../../components/PanigationComponent/PanigationComponent";
import { useProduct } from "../../context/ProductContext";
import { VscSettings } from "react-icons/vsc";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getFavourite } from "../../services/api/FavouriteApi"; // import API
import AnimationScroll from "../../components/AnimationScroll/AnimationScroll";
const ProductPage = () => {
  const [selectedFilters, setSelectedFilters] = useState({});
  
  useEffect(() => {
    fetchProducts(selectedFilters);
  }, [selectedFilters]);

  const { token } = useAuth();
  const [favourites, setFavourites] = useState([]);
  const fetchFavourites = async () => {
      if (token) {
        try {
          const res = await getFavourite();
          if (res?.result) {
            setFavourites(res.result);
          }
        } catch (error) {
          console.error("Lỗi khi fetch danh sách yêu thích:", error);
        }
      }
    };
    
    // Gọi khi component mount hoặc khi token thay đổi
    useEffect(() => {
      fetchFavourites();
    }, [token]);

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSortOpen, setSortOpen] = useState(false);
  const [sortText, setSortText] = useState("Lọc theo");
  const [currentPage, setCurrentPage] = useState(1);
  const dropdownRef = useRef(null);
  const { products, fetchProducts } = useProduct(); 

  const handleSortChange = (sortOption) => {
    console.log(sortOption);
    setSortText(sortOption);
    setSortOpen(false);
  };

  const navigate = useNavigate();

  const totalPages = Math.ceil(products.length / 12);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setSortOpen]);

  return (
    <div className="container mx-auto px-2 my-10">
      <div className="relative">
        <div className="border-t-2 border-[rgba(0, 0, 0, 0.1)] w-full my-5"></div>
        <div className="flex flex-wrap gap-4 justify-between">
          {/* Nút Bộ Lọc */}
          <ButtonComponent
            text="Bộ lọc"
            color="white"
            className="text-sm sm:text-base uppercase font-medium flex"
            icon={<VscSettings className="w-5 h-5 ml-2" />}
            onClick={() => setSidebarOpen(true)}
          />

          {/* Nút Lọc Theo + Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <ButtonComponent
              text={sortText}
              color="white"
              className="text-sm sm:text-base uppercase font-medium"
              icon={
                isSortOpen ? (
                  <FaChevronUp className="w-4 h-4 ml-2" />
                ) : (
                  <FaChevronDown className="w-4 h-4 ml-2" />
                )
              }
              onClick={() => setSortOpen(!isSortOpen)}
            />

            {/* Dropdown Menu */}
            {isSortOpen && (
              <div className="absolute right-0 top-full bg-white shadow-md p-2 rounded w-48 z-10">
                <ul className="space-y-2">
                  <li
                    className="p-2 hover:bg-gray-100 cursor-pointer transition duration-200 rounded"
                    onClick={() => handleSortChange("Giá: Cao đến Thấp")}
                  >
                    Giá: Cao đến Thấp
                  </li>
                  <li
                    className="p-2 hover:bg-gray-100 cursor-pointer transition duration-200 rounded"
                    onClick={() => handleSortChange("Giá: Thấp đến Cao")}
                  >
                    Giá: Thấp đến Cao
                  </li>
                  <li
                    className="p-2 hover:bg-gray-100 cursor-pointer transition duration-200 rounded"
                    onClick={() => handleSortChange("Mới nhất")}
                  >
                    Mới nhất
                  </li>
                  <li
                    className="p-2 hover:bg-gray-100 cursor-pointer transition duration-200 rounded"
                    onClick={() => handleSortChange("Bán chạy")}
                  >
                    Bán chạy
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="border-t-2 border-[rgba(0, 0, 0, 0.1)] w-full my-5 mb-10"></div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products
          .slice((currentPage - 1) * 12, currentPage * 12)
          .map((product) => (
            <AnimationScroll key={product._id} type="fadeUp" delay={0.1}>
              <ProductComponent
                key={product._id}
                item={product}
                favourites={favourites}
                onFavouriteChange={fetchFavourites}
                onClick={() => navigate(`/product/${product._id}`)} 
              />
            </AnimationScroll>
          ))}
      </div>

      <SidebarSortComponent
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onFilterChange={setSelectedFilters}
      />
      <div className="flex justify-center mt-10">
      <PanigationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      </div>
    </div>
  );
};

export default ProductPage;
