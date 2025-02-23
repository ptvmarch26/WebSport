import React, { useRef, useEffect } from "react";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { VscSettings } from "react-icons/vsc";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const TopSortComponent = ({
  sortText,
  isSortOpen,
  onSortChange,
  onSidebarOpen,
  onSortToggle,
  setSortOpen,
}) => {
  const dropdownRef = useRef(null);

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
    <div className="relative">
      <div className="border-t-2 border-[rgba(0, 0, 0, 0.1)] w-full my-5"></div>
      <div className="flex justify-between">
        {/* Nút Bộ Lọc */}
        <ButtonComponent
          text="Bộ lọc"
          color="white"
          className="text-base uppercase font-medium flex"
          icon={<VscSettings className="w-5 h-5 ml-2" />}
          onClick={onSidebarOpen}
        />

        {/* Nút Lọc Theo + Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <ButtonComponent
            text={sortText}
            color="white"
            className="text-base uppercase font-medium"
            icon={
              isSortOpen ? (
                <FaChevronUp className="w-4 h-4 ml-2" />
              ) : (
                <FaChevronDown className="w-4 h-4 ml-2" />
              )
            }
            onClick={onSortToggle}
          />

          {/* Dropdown Menu */}
          {isSortOpen && (
            <div className="absolute left-0 top-full bg-white shadow-md p-2 rounded w-48 z-10">
              <ul className="space-y-2">
                <li
                  className="p-2 hover:bg-gray-100 cursor-pointer transition duration-200 rounded"
                  onClick={() => onSortChange("Giá: Cao đến Thấp")}
                >
                  Giá: Cao đến Thấp
                </li>
                <li
                  className="p-2 hover:bg-gray-100 cursor-pointer transition duration-200 rounded"
                  onClick={() => onSortChange("Giá: Thấp đến Cao")}
                >
                  Giá: Thấp đến Cao
                </li>
                <li
                  className="p-2 hover:bg-gray-100 cursor-pointer transition duration-200 rounded"
                  onClick={() => onSortChange("Mới nhất")}
                >
                  Mới nhất
                </li>
                <li
                  className="p-2 hover:bg-gray-100 cursor-pointer transition duration-200 rounded"
                  onClick={() => onSortChange("Bán chạy")}
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
  );
};

export default TopSortComponent;
