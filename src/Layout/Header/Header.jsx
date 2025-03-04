import { useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { FaHeart, FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import logo from "../../assets/images/logo.png";
import { AiOutlineClose } from "react-icons/ai";
import { useEffect } from "react";
import userScrollHandling from "../../hooks/userScrollHandling";

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

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
                   after:h-[2px] after:bg-[#8a7350] after:bottom-[26px] 
                  after:scale-x-0 hover:after:scale-x-100 
                  after:transition-transform after:duration-300"
                >
                  <Link to={"/"}>{option.name}</Link>
                  <div className="absolute left-0 top-[60px] bg-white text-black w-48 shadow-lg p-2 z-10 opacity-0 scale-95 invisible group-hover:opacity-100 group-hover:scale-100 group-hover:visible transition-all duration-700">
                    {option.subOptions.map((sub, i) => (
                      <Link
                        key={i}
                        to="/"
                        className={`block px-4 py-2 hover:bg-gray-200 rounded opacity-0 translate-y-2 transition-all duration-300 delay-[${
                          i * 75
                        }ms] group-hover:opacity-100 group-hover:translate-y-0`}
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
          <div
            className={clsx("flex items-center space-x-4 text-white text-xl")}
          >
            <button
              onClick={toggleSearch}
              className="flex items-center border border-[#676d75] py-2 px-4 text-white uppercase space-x-2 hover:border-white"
            >
              <FaSearch className="text-base " />
              <p className="text-base">Tìm kiếm</p>
            </button>
            <Link to={"/favorite"}>
              <div className="p-2 rounded-full hover:bg-white/20 transition cursor-pointer">
                <FaHeart />
              </div>
            </Link>
            <Link to={"/cart"}>
              <div className="p-2 rounded-full hover:bg-white/20 transition cursor-pointer">
                <FaShoppingCart />
              </div>
            </Link>
            <Link to={"/login"}>
              <div className="p-2 rounded-full hover:bg-white/20 transition cursor-pointer">
                <FaUser />
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Ô tìm kiếm và overlay */}
      {searchOpen && (
        <div>
          <div>
            <div className="absolute top-0 left-0 w-full h-[100px] bg-white flex items-center justify-center shadow-md z-10">
              <input
                type="text"
                placeholder="Tìm kiếm"
                className="w-1/2 p-2 border border-gray-300 focus:outline-none"
              />
              <button onClick={toggleSearch} className="ml-4">
                <AiOutlineClose className="text-2xl text-black hover:opacity-90" />
              </button>
            </div>
          </div>
          <div
            className="fixed top-[100px] left-0 right-0 h-screen w-screen bg-black/40 z-20"
            onClick={toggleSearch}
          ></div>
        </div>
      )}
    </div>
  );
};

export default Header;
