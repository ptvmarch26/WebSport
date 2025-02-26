// import { useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { FaHeart, FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import logo from "../../assets/images/logo.png";
import { useEffect, useState } from "react";
import userScrollHandling from "../../hooks/userScrollHandling";

const Header = () => {
  // const [hoveredOption, setHoveredOption] = useState(null);

  const options = [
    { name: "Hàng mới về", subOptions: ["Giày mới", "Áo mới", "Phụ kiện mới"] },
    { name: "Nam", subOptions: ["Giày nam", "Quần áo nam", "Phụ kiện nam"] },
    { name: "Nữ", subOptions: ["Giày nữ", "Quần áo nữ", "Phụ kiện nữ"] },
    { name: "Trẻ em", subOptions: ["Giày trẻ em", "Áo trẻ em"] },
    { name: "Thể thao", subOptions: ["Bóng đá", "Bóng rổ", "Gym"] },
    { name: "Giảm giá", subOptions: ["Flash Sale", "Mua 1 tặng 1"] },
  ];

  const { scrollDirection } = userScrollHandling(); 
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (scrollDirection === "down") {
      setHidden(true); 
    } else {
      setHidden(false);
    }
  }, [scrollDirection]);

  return (
    <div
      className={clsx(
        "w-full h-[80px] bg-primary fixed top-0 left-0 right-0 z-50 shadow-md transition-transform duration-300 ease-in-out",
        hidden ? "-translate-y-full" : "translate-y-0"
      )}
    >
      <div className="res mx-auto flex justify-between items-center h-full">
        <div className="flex items-center h-full">
          <Link to={"/"}>
            <img src={logo} className="w-[120px] h-[80px]" />
          </Link>
          <div className="h-full relative">
            <ul className="text-white flex space-x-6 text-base font-medium ml-4 h-full">
              {options.map((option, index) => (
                <li
                  key={index}
                  className="relative group h-full uppercase flex items-center cursor-pointer transition-all duration-300 ease-in-out
                  hover:opacity-100 after:content-[''] after:absolute after:left-0 after:right-0 
                  after:h-[2px] after:bg-[#8a7350] after:bottom-[35px] 
                  after:scale-x-0 hover:after:scale-x-100 
                  after:transition-transform after:duration-300"
                >
                  <Link to={"/"}>{option.name}</Link>

                  {/* Dropdown menu */}
                  <div
                    className="absolute left-0 top-[70px] bg-white text-black w-48 shadow-lg p-2 z-10 
                    opacity-0 scale-95 invisible group-hover:opacity-100 group-hover:scale-100 group-hover:visible
                    transition-all duration-700"
                  >
                    {option.subOptions.map((sub, i) => (
                      <Link
                        key={i}
                        to="/"
                        className={`block px-4 py-2 hover:bg-gray-200 rounded 
                        opacity-0 translate-y-2 transition-all duration-300 delay-[${
                          i * 75
                        }ms]
                        group-hover:opacity-100 group-hover:translate-y-0`}
                      >
                        {sub}
                      </Link>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Phần bên phải */}
        <div className="flex items-center space-x-2">
          <div className="w-full max-w-sm min-w-[200px]">
            <div className="relative">
              <input
                className="w-full bg-transparent placeholder:text-white text-white text-sm border border-white rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-opacity-80 hover:border-opacity-80 shadow-sm focus:shadow"
                placeholder="Tên sản phẩm"
              />
              <button className="absolute top-2 right-1 flex items-center rounded bg-secondary py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all">
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
              <Link to={"/user"}>
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
