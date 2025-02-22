import { useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import logo from "../../assets/images/logo.png";
const Header = () => {
  const [isHovered, setIsHovered] = useState(false);
  const options = [
    "Hàng mới về",
    "Nam",
    "Nữ",
    "Trẻ em",
    "Bộ sưu tập",
    "Giảm giá",
  ];

  return (
    <div className="w-full h-[100px] bg-primary">
      <div className="res mx-auto flex justify-between items-center h-full">
        <div className="flex items-center h-full">
          <Link to={"/"}>
            <img src={logo} className="w-[80px] h-[80px]" />
          </Link>
          <div className="group h-full">
            <ul className="text-white flex space-x-6 text-base font-medium ml-4 h-full">
              {options.map((option, index) => (
                <li
                  key={index}
                  onMouseEnter={() => setIsHovered(true)} // Khi hover vào
                  onMouseLeave={() => setIsHovered(false)}
                  className="h-full uppercase flex items-center relative cursor-pointer transition-all duration-300 ease-in-out
                   group-hover:opacity-60 hover:!opacity-100
                   after:content-[''] after:absolute after:left-0 after:right-0 
                   after:h-[2px] after:bg-[#8a7350] after:bottom-[35px] 
                   after:scale-x-0 hover:after:scale-x-100 
                   after:transition-transform after:duration-300"
                >
                  <Link to={"/"}>{option}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* <div>
            <button
              className="flex items-center space-x-2 px-4 py-2 border border-white/50 text-white 
                     hover:border-white transition"
            >
              <FaSearch className="text-base" />
              <span className="uppercase">Tìm kiếm</span>
            </button>
          </div> */}
          <div className="w-full max-w-sm min-w-[200px]">
            <div className="relative">
              <input
                className="w-full bg-transparent placeholder:text-white text-white text-sm border border-white rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-opacity-80 hover:border-opacity-80 shadow-sm focus:shadow"
                placeholder="Tên sản phẩm"
              />
              <button
                className="absolute top-2 right-1 flex items-center rounded bg-secondary py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:opacity-80 focus:shadow-none active:opacity-80 hover:opacity-80 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                <FaSearch className="h-full" />
              </button>
            </div>
          </div>
          <div className={clsx("flex space-x-4 text-white text-xl")}>
            <div className="p-2 rounded-full hover:bg-white/20 transition cursor-pointer">
              <Link to={"/"}>
                <FaHeart />
              </Link>
            </div>
            <div className="p-2 rounded-full hover:bg-white/20 transition cursor-pointer">
              <Link to={"/"}>
                <FaShoppingCart />
              </Link>
            </div>
            <div className="p-2 rounded-full hover:bg-white/20 transition cursor-pointer">
              <Link to={"/"}>
                <FaUser />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
