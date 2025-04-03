import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Checkbox } from "@material-tailwind/react";
import { useProduct } from "../../context/ProductContext";
import { useCategories } from "../../context/CategoriesContext";

const SidebarSortComponent = ({ isOpen, onClose }) => {
  const [filterOptions, setFilterOptions] = useState({
    category: {
      title: "SẢN PHẨM",
      type: "checkbox",
      options: [],
    },
    category_sub: {
      title: "LOẠI SẢN PHẨM",
      type: "checkbox",
      options: [],
    },
    color: {
      title: "MÀU SẮC",
      type: "color",
      options: [
        { name: "Đỏ", color: "#FF0000" },
        { name: "Vàng", color: "#FFD700" },
        { name: "Xanh dương", color: "#0000FF" },
        { name: "Đen", color: "#000000" },
        { name: "Trắng", color: "#FFFFFF" },
      ],
    },
    price: {
      title: "GIÁ",
      type: "input",
      options: ["Min", "Max"],
    },
  });

  const [selectedFilters, setSelectedFilters] = useState({
    category: [],
    category_sub: [],
    product_color: [],
    price_min: "",
    price_max: "",
    search: "",
  });
  
  const [priceCheckTimeout, setPriceCheckTimeout] = useState(null);
  const [categorySubOptions, setCategorySubOptions] = useState([]);

  const { fetchCategories, categories } = useCategories();
  const { fetchProducts } = useProduct();
  
  useEffect(() => {
    fetchCategories();
  }, []);

  // Xử lý dữ liệu danh mục từ API
  useEffect(() => {
    if (categories.length > 0) {
      // Lọc các danh mục có category_level = 1 cho category
      const categoryOptions = categories
        .filter(cat => cat.category_level === 1)
        .map(cat => ({
          id: cat._id,
          name: cat.category_type
        }));
  
      // Lưu toàn bộ danh mục cấp 2 để lọc sau
      const allCategorySubOptions = categories
        .filter(cat => cat.category_level === 2)
        .map(cat => ({
          id: cat._id,
          name: cat.category_type,
          parentId: cat.category_parent_id
        }));
      
      setCategorySubOptions(allCategorySubOptions);
  
      setFilterOptions(prev => ({
        ...prev,
        category: {
          ...prev.category,
          options: categoryOptions,
        },
      }));
    }
  }, [categories]);
  
  // Cập nhật danh sách loại sản phẩm dựa trên danh mục được chọn
  useEffect(() => {
    if (selectedFilters.category.length > 0 && categorySubOptions.length > 0) {
      // Lấy id của các danh mục được chọn
      const selectedCategoryIds = categories
        .filter(cat => selectedFilters.category.includes(cat.category_type) && cat.category_level === 1)
        .map(cat => cat._id);
      
      // Lọc ra các danh mục con dựa trên parentId
      const filteredSubOptions = categorySubOptions
        .filter(subCat => selectedCategoryIds.includes(subCat.parentId))
        .map(subCat => subCat.name);
      
      setFilterOptions(prev => ({
        ...prev,
        category_sub: {
          ...prev.category_sub,
          options: filteredSubOptions,
        },
      }));
      
      // Xóa các lựa chọn category_sub không còn hợp lệ
      setSelectedFilters(prev => ({
        ...prev,
        category_sub: prev.category_sub.filter(sub => filteredSubOptions.includes(sub))
      }));
    } else {
      // Nếu không có danh mục nào được chọn, hiển thị tất cả danh mục con
      const allSubOptions = categorySubOptions.map(subCat => subCat.name);
      
      setFilterOptions(prev => ({
        ...prev,
        category_sub: {
          ...prev.category_sub,
          options: allSubOptions,
        },
      }));
    }
  }, [selectedFilters.category, categories, categorySubOptions]);

  useEffect(() => {
    fetchProducts(selectedFilters);
  }, [selectedFilters]);

  const handleSelect = (type, value) => {
    setSelectedFilters((prev) => {
      if (type === "category" || type === "category_sub" || type === "product_color") {
        const isSelected = prev[type].includes(value);
  
        return {
          ...prev,
          [type]: isSelected
            ? prev[type].filter((item) => item !== value) // Nếu có rồi thì bỏ
            : [...prev[type], value], // Nếu chưa có thì thêm vào
        };
      }
  
      return {
        ...prev,
        [type]: prev[type] === value ? null : value,
      };
    });
  };

  const handlePriceChange = (e, type) => {
    const value = e.target.value;
    
    setSelectedFilters(prev => ({
      ...prev,
      [`price_${type}`]: value
    }));
    
    if (priceCheckTimeout) {
      clearTimeout(priceCheckTimeout);
    }
    
    const newTimeout = setTimeout(() => {
      setSelectedFilters((prev) => {
        const min = Number(prev.price_min);
        const max = Number(prev.price_max);
        
        if (!isNaN(min) && !isNaN(max) && min > max) {
          return { 
            ...prev, 
            price_min: max.toString(), 
            price_max: min.toString() 
          };
        }
        return prev;
      });
    }, 2000);
    
    setPriceCheckTimeout(newTimeout);
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        className={`pb-[30px] fixed left-0 top-0 h-full w-[80%] sm:w-[450px] bg-white shadow-2xl transform transition-transform p-5 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center pb-3">
          <h2 className="text-xl font-bold uppercase">Bộ lọc sản phẩm</h2>
          <div
            className="p-2 rounded-full hover:bg-[#d1d1d1] transition cursor-pointer"
            onClick={onClose}
          >
            <AiOutlineClose className="w-5 h-5" />
          </div>
        </div>
        {Object.entries(filterOptions).map(([key, filter]) => (
          <div key={key}>
            <div className="border-t-2 border-[#e5e7eb] w-full my-5"></div>
            <h3 className="font-bold text-gray-800">{filter.title}</h3>
            <div className="mt-2">
              {filter.type === "checkbox" &&
                filter.options.map((item) => (
                  <label
                    key={typeof item === 'object' ? item.id : item}
                    className="flex items-center space-x-2 cursor-pointer text-black"
                  >
                    <Checkbox 
                      checked={selectedFilters[key].includes(typeof item === 'object' ? item.name : item)}
                      onChange={() => handleSelect(key, typeof item === 'object' ? item.name : item)} 
                    />
                    <span>{typeof item === 'object' ? item.name : item}</span>
                  </label>
                ))}

              {filter.type === "color" && (
                <div className="grid grid-cols-4 gap-4 mt-2">
                  {filter.options.map((colorOption, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center justify-center cursor-pointer"
                    >
                      <div
                        className={`w-7 h-7 rounded-full border ${
                          selectedFilters.product_color.includes(colorOption.name)
                            ? "ring-2 ring-black"
                            : ""
                        }`}
                        style={{ backgroundColor: colorOption.color }}
                        onClick={() => handleSelect("product_color", colorOption.name)}
                      ></div>
                      <span className="mt-2 text-sm font-medium text-center">
                        {colorOption.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {filter.type === "input" && filter.title === "GIÁ" && (
                <div className="mt-2 flex items-center flex-wrap gap-4">
                  <input
                    placeholder="Từ"
                    className="p-2 border border-[#a1a8af] font-sm max-w-[100px] sm:max-w-[150px]"
                    value={selectedFilters.price_min}
                    onChange={(e) => handlePriceChange(e, "min")}
                    onInput={(e) =>
                      (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
                    }
                  />
                  <span className="mx-5 font-medium text-md">-</span>
                  <input
                    placeholder="Đến"
                    className="p-2 border border-[#a1a8af] font-sm max-w-[100px] sm:max-w-[150px]"
                    value={selectedFilters.price_max}
                    onChange={(e) => handlePriceChange(e, "max")}
                    onInput={(e) =>
                      (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
                    }
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarSortComponent;