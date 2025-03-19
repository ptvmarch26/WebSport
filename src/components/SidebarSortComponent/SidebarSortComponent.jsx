import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Checkbox } from "@material-tailwind/react";

const filterOptions = {
  gender: {
    title: "GIỚI TÍNH",
    type: "checkbox",
    options: ["Nam", "Nữ", "Unisex"],
  },
  category: {
    title: "SẢN PHẨM",
    type: "checkbox",
    options: ["Quần Áo", "Đồ Thể Thao", "Giày", "Túi", "Phụ Kiện"],
  },
  style: {
    title: "LOẠI SẢN PHẨM",
    type: "checkbox",
    options: {
      "Quần Áo": ["Áo thun", "Áo sơ mi", "Quần jean", "Quần short"],
      Giày: ["Giày chạy bộ", "Giày bóng đá", "Giày sneaker"],
      "Đồ Thể Thao": ["Bộ thể thao", "Áo khoác thể thao"],
      Túi: ["Túi đeo chéo", "Ba lô"],
      "Phụ Kiện": ["Mũ", "Kính", "Găng tay"],
    },
  },
  color: {
    title: "MÀU SẮC",
    type: "color",
    options: [
      { name: "Đỏ", color: "#FF0000" },
      { name: "Vàng", color: "#FFD700" },
      { name: "Cam", color: "#FFA500" },
      { name: "Xanh dương", color: "#0000FF" },
      { name: "Xanh lá", color: "#008000" },
      { name: "Nâu", color: "#8B4513" },
      { name: "Xám", color: "#808080" },
      { name: "Tím", color: "#BA55D3" },
      { name: "Hồng", color: "#FF69B4" },
      { name: "Đen", color: "#000000" },
      { name: "Nâu", color: "#D2B48C" },
      { name: "Trắng", color: "#FFFFFF" },
      { name: "Kem", color: "#FAEBD7" },
    ],
  },
  // sizeClothing: {
  //   title: "KÍCH CỠ TRANG PHỤC",
  //   type: "checkbox",
  //   options: ["XXS", "XS", "S", "M", "L", "XL"],
  // },
  // sizeShoes: {
  //   title: "KÍCH CỠ GIÀY DÉP",
  //   type: "dropdown",
  //   options: ["39", "39.5", "40", "41", "42", "43"],
  // },
  price: {
    title: "GIÁ",
    type: "input",
    options: ["Min", "Max"],
  },
};

const SidebarSortComponent = ({ isOpen, onClose }) => {
  // selectedFilters để lưu những gì người dùng chọnchọn
  const [selectedFilters, setSelectedFilters] = useState({
    gender: [],
    category: [],
    style: {},
    color: [],
    // sizeClothing: [],
    // sizeShoes: [],
    price: { min: "", max: "" },
  });
  const [priceCheckTimeout, setPriceCheckTimeout] = useState(null);

  // Hàm này để xử lý lưu và gọi useEffect khi selectedFilters thay đổi
  const handleSelect = (type, value) => {
    setSelectedFilters((prev) => {
      // Kiểm tra xem type có phải là "gender", "color"
      if (["gender", "category", "color"].includes(type)) {
        const isSelected = prev[type].includes(value);
        return {
          ...prev,
          [type]: isSelected
            ? prev[type].filter((item) => item !== value)
            : [...prev[type], value],
        };
      }

      if (type === "style") {
        const { category, style } = value;
        const isSelected = prev.style[category]?.includes(style);

        const updatedStyle = {
          ...prev.style,
          [category]: isSelected
            ? prev.style[category].filter((item) => item !== style)
            : [...(prev.style[category] || []), style],
        };

        if (updatedStyle[category]?.length === 0) {
          const { [category]: _, ...rest } = updatedStyle;
          return {
            ...prev,
            style: rest,
          };
        }

        return {
          ...prev,
          style: updatedStyle,
        };
      }

      return {
        ...prev,
        [type]: prev[type] === value ? null : value,
      };
    });
  };

  console.log("sis", selectedFilters);

  // Hàm này để check min, max sau 2s mà max vẫn nhỏ hơn min thì swapswap
  const handlePriceChange = (e, type) => {
    const value = e.target.value;

    setSelectedFilters((prev) => {
      const newPrice = { ...prev.price, [type]: value };

      if (type === "min") {
        return { ...prev, price: newPrice };
      }

      if (priceCheckTimeout) {
        clearTimeout(priceCheckTimeout);
      }

      const newTimeout = setTimeout(() => {
        setSelectedFilters((prev) => {
          const min = Number(prev.price.min);
          const max = Number(prev.price.max);

          if (!isNaN(min) && !isNaN(max) && min > max) {
            return { ...prev, price: { min: max, max: min } };
          }
          return prev;
        });
      }, 2000);

      setPriceCheckTimeout(newTimeout);
      return { ...prev, price: newPrice };
    });
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
                filter.title !== "LOẠI SẢN PHẨM" &&
                filter.options.map((item) => (
                  <label
                    key={item}
                    className="flex items-center space-x-2 cursor-pointer text-black"
                  >
                    <Checkbox onChange={() => handleSelect(key, item)} />
                    <span>{item}</span>
                  </label>
                ))}

              {filter.type === "checkbox" &&
                filter.title === "LOẠI SẢN PHẨM" && (
                  <div>
                    {Object.entries(filter.options).map(
                      ([category, styles]) => {
                        if (
                          selectedFilters.category.length === 0 ||
                          selectedFilters.category.includes(category)
                        ) {
                          return (
                            <div key={category}>
                              {styles.map((style) => (
                                <label
                                  key={style}
                                  className="flex items-center space-x-2 cursor-pointer text-black"
                                >
                                  <Checkbox
                                    onChange={() =>
                                      handleSelect("style", { category, style })
                                    }
                                  />
                                  <span>{style}</span>
                                </label>
                              ))}
                            </div>
                          );
                        }
                        return null;
                      }
                    )}
                  </div>
                )}

              {filter.type === "color" && (
                <div className="grid grid-cols-4 gap-4 mt-2">
                  {filter.options.map((colorOption, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center justify-center cursor-pointer"
                    >
                      <div
                        className={`w-7 h-7 rounded-full border ${
                          selectedFilters.color.includes(colorOption.color)
                            ? "ring-2 ring-black"
                            : ""
                        }`}
                        style={{ backgroundColor: colorOption.color }}
                        onClick={() => handleSelect("color", colorOption.color)}
                      ></div>
                      <span className="mt-2 text-sm font-medium text-center">
                        {colorOption.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* {filter.type === "dropdown" &&
                  filter.title === "KÍCH CỠ GIÀY DÉP" && (
                    <div>
                      <div className="mb-3 grid grid-cols-5 gap-4">
                        {filter.options.map((size) => (
                          <ButtonComponent
                            key={size}
                            text={size}
                            color={
                              selectedFilters.sizeShoes.includes(size)
                                ? "black"
                                : "white"
                            } // Chọn màu khác khi đã chọn
                            onClick={() => handleSelect("sizeShoes", size)}
                          />
                        ))}
                      </div>
                    </div>
                  )} */}

              {filter.type === "input" && filter.title === "GIÁ" && (
                <div className="mt-2 flex items-center flex-wrap gap-4">
                  <input
                    // type="number"
                    placeholder="Từ"
                    className="p-2 border border-[#a1a8af] font-sm max-w-[100px] sm:max-w-[150px]"
                    value={selectedFilters.price.min}
                    onChange={(e) => handlePriceChange(e, "min")}
                    onInput={(e) =>
                      (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
                    } // Chỉ cho phép nhập số 0-9
                  />
                  <span className="mx-5 font-medium text-md">-</span>
                  <input
                    // type="number"
                    placeholder="Đến"
                    className="p-2 border border-[#a1a8af] font-sm max-w-[100px] sm:max-w-[150px]"
                    value={selectedFilters.price.max}
                    onChange={(e) => handlePriceChange(e, "max")}
                    onInput={(e) =>
                      (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
                    } // Chỉ cho phép nhập số 0-9
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
