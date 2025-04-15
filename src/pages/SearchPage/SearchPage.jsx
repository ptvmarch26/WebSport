import { useEffect, useRef, useState } from "react";
import ProductComponent from "../../components/ProductComponent/ProductComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import PanigationComponent from "../../components/PanigationComponent/PanigationComponent";
import { useProduct } from "../../context/ProductContext";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const SearchPage = () => {
  const location = useLocation();
  const { result } = location.state || {};
  const queryParams = new URLSearchParams(location.search);

  const category = queryParams.get("category") || "";
  const category_gender = queryParams.get("category_gender") || "";
  const category_sub = queryParams.get("category_sub") || "";
  const price_min = queryParams.get("price_min") || "";
  const price_max = queryParams.get("price_max") || "";
  const product_color = queryParams.get("product_color") || "";
  const product_brand = queryParams.get("product_brand") || "";

  useEffect(() => {
    const searchParams = {
      category,
      category_gender,
      category_sub,
      price_min,
      price_max,
      product_color,
      product_brand,
    };

    fetchProducts(searchParams);
  }, [
    category,
    category_gender,
    category_sub,
    price_min,
    price_max,
    product_color,
    product_brand,
  ]);

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
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold uppercase">Kết quả tìm kiếm: {result}</h2>
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
            <ProductComponent
              key={product._id}
              item={product}
              onClick={() => navigate(`/product/${product._id}`)}
            />
          ))}
      </div>
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

export default SearchPage;
