import { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Checkbox } from "@material-tailwind/react";
import { useCategories } from "../../context/CategoriesContext";

const SidebarSortComponent = ({ isOpen, onClose, onFilterChange }) => {
  const [filterOptions, setFilterOptions] = useState({
    category_gender: {
      title: "GIỚI TÍNH",
      type: "checkbox",
      options: [
        { name: "Nam", id: 1 },
        { name: "Nữ", id: 2 },
        { name: "Unisex", id: 3 },
      ],
    },
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
        { name: "Xanh lá", color: "#008000" },
        { name: "Cam", color: "#FFA500" },
        { name: "Tím", color: "#800080" },
        { name: "Hồng", color: "#FFC0CB" },
        { name: "Nâu", color: "#8B4513" },
        { name: "Xanh rêu", color: "#556B2F" }
      ],
    },
    product_brand: {
      title: "THƯƠNG HIỆU",
      type: "checkbox",
      options: [
        { name: "Nike", id: 1 },
        { name: "Adidas", id: 2 },
        { name: "Puma", id: 3 },
      ],
    },
    price: {
      title: "GIÁ",
      type: "input",
      options: ["Min", "Max"],
    },
  });

  const [selectedFilters, setSelectedFilters] = useState({
    category_gender: [],
    category: [],
    category_sub: [],
    product_color: [],
    product_brand: [],
    price_min: "",
    price_max: "",
  });

  const [priceCheckTimeout, setPriceCheckTimeout] = useState(null);
  const [categorySubOptions, setCategorySubOptions] = useState([]);

  const { fetchCategories, categories } = useCategories();
  useEffect(() => {
    fetchCategories();
  }, []);

  // Xử lý dữ liệu danh mục từ API
  useEffect(() => {
    if (categories.length > 0) {
      const seenCategoryNames = new Set();
      const seenSubCategoryNames = new Set();

      const groupedCategories = {};

      categories.forEach(cat => {
        if (cat.category_level === 1 && !seenCategoryNames.has(cat.category_type)) {
          seenCategoryNames.add(cat.category_type);
          groupedCategories[cat.category_type] = {
            name: cat.category_type,
            ids: [cat._id],
          };
        } else if (cat.category_level === 1) {
          groupedCategories[cat.category_type].ids.push(cat._id);
        }
      });

      // Danh mục cấp 1
      const categoryOptions = Object.values(groupedCategories).map(group => ({
        id: group.ids,
        name: group.name,
      }));

      const groupedSubCategories = {};

      categories.forEach(cat => {
        if (cat.category_level === 2 && !seenSubCategoryNames.has(cat.category_type)) {
          seenSubCategoryNames.add(cat.category_type);
          groupedSubCategories[cat.category_type] = {
            name: cat.category_type,
            ids: [cat._id],
            parentId: cat.category_parent_id,
          };
        } else if (cat.category_level === 2) {
          groupedSubCategories[cat.category_type].ids.push(cat._id);
        }
      });

      const allCategorySubOptions = Object.values(groupedSubCategories).map(group => ({
        id: group.ids,
        name: group.name,
        parentId: group.parentId,
      }));

      allCategorySubOptions.sort((a, b) => a.name.localeCompare(b.name));

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

  useEffect(() => {
    if (selectedFilters.category?.length > 0 && categorySubOptions?.length > 0) {
      const selectedCategoryIds = categories
        ?.filter(cat => selectedFilters?.category?.includes(cat.category_type) && cat.category_level === 1)
        ?.map(cat => cat._id);


      const filteredSubOptions = categorySubOptions
        ?.filter(subCat => selectedCategoryIds?.includes(subCat.parentId))
        ?.map(subCat => subCat.name);


      setFilterOptions(prev => ({
        ...prev,
        category_sub: {
          ...prev.category_sub,
          options: filteredSubOptions,
        },
      }));

      setSelectedFilters(prev => ({
        ...prev,
        category_sub: Array.isArray(prev?.category_sub)
          ? prev.category_sub.filter(sub => filteredSubOptions.includes(sub))
          : [],
      }));

    } else {

      setFilterOptions(prev => ({
        ...prev,
        category_sub: {
          ...prev.category_sub,
          options: categorySubOptions,
        },
      }));
    }
  }, [selectedFilters.category, categories, categorySubOptions]);

  useEffect(() => {
    if (onFilterChange) {
      onFilterChange(selectedFilters);
    }
  }, [selectedFilters, onFilterChange]);


  const handleSelect = (type, value) => {
    setSelectedFilters((prev) => {
      const currentList = prev[type] || [];
      const isSelected = currentList.includes(value);

      if (["category", "category_sub", "product_color", "product_brand"].includes(type)) {
        if (type === "category" && isSelected) {
          const newCategoryList = currentList.filter((item) => item !== value);
          const newCategorySubList = newCategoryList.length > 0
            ? (prev.category_sub || []).filter((sub) => {
              const firstWord = sub.split('_')[0];
              return firstWord !== value;
            })
            : [];

          return {
            ...prev,
            category: newCategoryList,
            category_sub: newCategorySubList,
          };
        }

        return {
          ...prev,
          [type]: isSelected
            ? currentList.filter((item) => item !== value)
            : [...currentList, value],
        };
      }

      return {
        ...prev,
        [type]: prev[type] === value ? [] : value,
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
      className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      onClick={onClose}
    >
      <div
        className={`pb-[30px] fixed left-0 top-0 h-full w-[80%] sm:w-[450px] bg-white shadow-2xl transform transition-transform p-5 ${isOpen ? "translate-x-0" : "-translate-x-full"
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
                filter.options.map((item, index) => (
                  <label
                    // key={typeof item === 'object' ? item._id : item}
                    key={index}
                    className="flex items-center space-x-2 cursor-pointer text-black"
                  >
                    <Checkbox
                      checked={selectedFilters[key]?.includes(typeof item === 'object' ? item.name : item)}
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
                        className={`w-7 h-7 rounded-full border ${selectedFilters?.product_color?.includes(colorOption.name)
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