import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { FaHeart, FaShoppingCart, FaSearch, FaBars } from "react-icons/fa";
import logo from "../../assets/images/logo.png";
import { AiOutlineClose } from "react-icons/ai";
import { useEffect } from "react";
import userScrollHandling from "../../hooks/userScrollHandling";
import { AnimatePresence, motion } from "framer-motion";
import { MdNavigateNext } from "react-icons/md";
import flag_vn from "../../assets/images/flag_vn.jpg";
import flag_us from "../../assets/images/flag_us.jpg";
import { useAuth } from "../../context/AuthContext";
import avatar_false from "../../assets/images/avatar-false.jpg";
import { useUser } from "../../context/UserContext";
import axios from "axios";
const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [language, setLanguage] = useState("vi");
  const [searchQuery, setSearchQuery] = useState("");
  const { selectedUser } = useUser();
  const { token } = useAuth();
  const navigate = useNavigate();

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSearch = async () => {

    if (!searchQuery.trim()) return;
    try {
      const token = localStorage.getItem("accessToken");

      const res = await axios.get("http://localhost:5000/chat", {
        params: { message: searchQuery },
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` })
        },
      });

      // console.log("Kết quả tìm kiếm:", res.data.result);
      if (res.data.EC === 0) {
        const result = res.data.result;
        const parsedResult =
          typeof result === "string" ? JSON.parse(result) : result;
        console.log("Kết quả tìm kiếm:", parsedResult);
        
        setSearchOpen(!searchOpen);
        const queryString = new URLSearchParams(parsedResult).toString();
        navigate(`/search?${queryString}`, {
          state: {
            result: searchQuery
          }
        });
      }
    } catch (err) {
      console.error("Lỗi tìm kiếm:", err);
    }
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

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  const toggleSubMenu = (index) => {
    setOpenSubMenu(openSubMenu === index ? null : index);
  };

  const toggleLanguage = () => {
    setLanguage(language === "vi" ? "en" : "vi");
  };

  return (
    <div
      className={clsx(
        "w-full h-[80px] fixed top-0 left-0 right-0 bg-primary z-10 shadow-md transition-transform duration-300 ease-in-out"
      )}
    >
      <div className="container mx-auto flex justify-between items-center h-full px-2">
        <div className="flex items-center h-full">
          <div className="p-2 flex items-center space-x-4 lg:hidden">
            <button onClick={toggleMenu} className="text-white text-2xl">
              <FaBars />
            </button>
            <button
              onClick={toggleSearch}
              className="p-2 rounded-full hover:bg-white/20 transition cursor-pointer text-white text-xl"
            >
              <FaSearch />
            </button>
          </div>

          <Link to={"/"}>
            <img src={logo} className="w-[120px] h-[80px] hidden lg:block" />
          </Link>

          <div className="hidden lg:block h-full relative">
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

        <Link to={"/"}>
          <img
            src={logo}
            className="w-[100px] h-[60px] md:w-[150px] md:h-[80px] lg:hidden"
          />
        </Link>

        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-4 text-white text-xl">
            <button
              onClick={toggleSearch}
              className="items-center border border-[#676d75] py-2 px-4 text-white uppercase space-x-2 hover:border-white hidden lg:flex"
            >
              <FaSearch className="text-base" />
              <p className="text-base">Tìm kiếm</p>
            </button>
            {token ? (
              <div className="flex items-center space-x-4 text-white text-xl">
                <Link to={"/favorite"} className="hidden lg:block">
                  <div className="p-2 rounded-full hover:bg-white/20 transition cursor-pointer">
                    <FaHeart />
                  </div>
                </Link>
                <Link to={"/account"} className="order-1">
                  <div>
                    <img
                      src={selectedUser?.avt_img || avatar_false}
                      alt="User avatar"
                      className="w-7 h-7 rounded-full ml-1"
                    />
                  </div>
                </Link>
                <Link to={"/cart"}>
                  <div className="p-2 rounded-full hover:bg-white/20 transition cursor-pointer">
                    <FaShoppingCart />
                  </div>
                </Link>
              </div>
            ) : (
              <div className="order-1 flex items-center space-x-4 text-sm font-medium">
                <Link
                  to="/sign-up"
                  className="relative group text-white uppercase transition-all duration-300 ease-in-out
      hover:opacity-100 after:content-[''] after:absolute after:left-0 after:right-0 
      after:h-[2px] after:bg-[#8a7350] after:-bottom-[3px]
      after:scale-x-0 hover:after:scale-x-100 
      after:transition-transform after:duration-300"
                >
                  Đăng ký
                </Link>
                <Link
                  to="/sign-in"
                  className="relative group text-white uppercase transition-all duration-300 ease-in-out
    hover:opacity-100 after:content-[''] after:absolute after:left-0 after:right-0 
    after:h-[2px] after:bg-[#8a7350] after:-bottom-[3px]
    after:scale-x-0 hover:after:scale-x-100 
    after:transition-transform after:duration-300"
                >
                  Đăng nhập
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            key="menu-overlay"
            onClick={toggleMenu}
          >
            <motion.div
              className="bg-white w-[80%] h-full shadow-lg p-6 relative overflow-auto"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.5 }}
              key="menu-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={toggleMenu}
                className="absolute top-2 right-5 text-2xl text-black p-2 rounded-full hover:bg-[#d1d1d1] transition cursor-pointer w-auto"
              >
                <AiOutlineClose className="w-5 h-5" />
              </button>
              <ul className="mt-6">
                {options.map((option, index) => (
                  <li key={index}>
                    <div className="border-t-[1px] border-[rgba(0, 0, 0, 0.1)] w-full my-3"></div>
                    <button
                      onClick={() => toggleSubMenu(index)}
                      className="block px-4 py-2 font-semibold text-xl w-full"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-gray-800">
                          {option.name}
                        </h3>
                        <MdNavigateNext className="w-7 h-7" />
                      </div>
                    </button>
                    {openSubMenu === index && (
                      <div className="space-y-2 pl-4">
                        {option.subOptions.map((sub, i) => (
                          <Link
                            key={i}
                            to="/"
                            className="block px-4 py-2 text-gray-600 hover:text-black text-lg"
                            onClick={toggleMenu}
                          >
                            {sub}
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
                <div className="py-2 px-4 mt-5 text-[#181818] w-full">
                  <p>
                    <Link
                      className="block"
                      to="/about-shop"
                      onClick={toggleMenu}
                    >
                      Về chúng tôi
                    </Link>
                  </p>
                  {token && (
                    <div>
                      <div className="border-t-[1px] border-[rgba(0, 0, 0, 0.1)] w-full my-4"></div>
                      <p>
                        <Link
                          className="block"
                          to="/favorite"
                          onClick={toggleMenu}
                        >
                          Yêu thích
                        </Link>
                      </p>
                    </div>
                  )}
                  <div className="border-t-[1px] border-[rgba(0, 0, 0, 0.1)] w-full my-4"></div>
                  <button
                    onClick={toggleLanguage}
                    className="flex items-center text-[#181818] w-full justify-between"
                  >
                    <span>Ngôn ngữ</span>
                    <div className="flex items-center">
                      <span>{language === "vi" ? "VN" : "US"}</span>
                      <img
                        src={language === "vi" ? flag_vn : flag_us}
                        alt="flag"
                        className="w-6 h-6 rounded-full object-cover ml-2"
                      />
                    </div>
                  </button>
                </div>
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {searchOpen && (
        <div>
          <div>
            <div className="absolute top-0 left-0 w-full h-[100px] bg-white flex items-center justify-center shadow-md z-10">
              <input
                type="text"
                placeholder="Tìm kiếm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSearch();
                  }
                }}
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
