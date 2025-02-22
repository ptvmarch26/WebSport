// import React from 'react'
import { Link } from "react-router-dom";
import facebook from "../../assets/images/facebook.svg";
import instagram from "../../assets/images/instagram.svg";
import tiktok from "../../assets/images/tiktok.svg";
import logo from "../../assets/images/logo.png";
import { IoLocationSharp } from "react-icons/io5";
import { MdPhone } from "react-icons/md";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <div>
      <div className="w-full bg-primary text-white pt-10 pb-[30px]">
        <div className="res mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo + Mạng xã hội */}
          <div>
            <Link to={"/"} className="flex justify-center">
              <img
                src={logo}
                alt="Logo WTM SPORT"
                className="w-full max-w-[200px] h-[80px] object-cover"
              />
              {/* <h2 className="text-xl font-bold text-l">WTM</h2> */}
            </Link>
            <span className="text-sm font-semibold opacity-80 block mt-10 mb-3 text-center">
              Cửa hàng đồ dùng thể thao
            </span>
            <div className="flex space-x-3 justify-center">
              <img
                src={facebook}
                className="w-8 h-8 cursor-pointer opacity-80 hover:opacity-100 transition"
              />
              <img
                src={instagram}
                className="w-8 h-8 cursor-pointer opacity-80 hover:opacity-100 transition"
              />
              <img
                src={tiktok}
                className="w-8 h-8 cursor-pointer opacity-80 hover:opacity-100 transition"
              />
            </div>
          </div>

          {/* Về WTM SPORT */}
          <div>
            <h3 className="text-lg font-semibold mb-3 uppercase">
              Về WTM SPORT
            </h3>
            <nav className="space-y-2">
              <Link
                to={"/"}
                className="block text-sm opacity-80 hover:opacity-100 hover:font-medium transition"
              >
                Về chúng tôi
              </Link>
              <Link
                to={"/"}
                className="block text-sm opacity-80 hover:opacity-100 hover:font-medium transition"
              >
                Điều khoản chung
              </Link>
              <Link
                to={"/"}
                className="block text-sm opacity-80 hover:opacity-100 hover:font-medium transition"
              >
                Chính sách bảo mật
              </Link>
            </nav>
          </div>

          {/* Hỗ trợ */}
          <div>
            <h3 className="text-lg font-semibold mb-3 uppercase">Hỗ trợ</h3>
            <nav className="space-y-2">
              <Link
                to={"/"}
                className="block text-sm opacity-80 hover:opacity-100 hover:font-medium transition"
              >
                Trung tâm trợ giúp
              </Link>
              <Link
                to={"/"}
                className="block text-sm opacity-80 hover:opacity-100 hover:font-medium transition"
              >
                Chính sách bảo hành
              </Link>
              <Link
                to={"/"}
                className="block text-sm opacity-80 hover:opacity-100 hover:font-medium transition"
              >
                Chính sách trả hàng
              </Link>
            </nav>
          </div>

          {/* Liên hệ */}
          <div>
            <h3 className="text-lg font-semibold mb-3 uppercase">Liên hệ</h3>
            <nav className="space-y-2">
              <div className="flex items-center">
                <IoLocationSharp />
                <a
                  href="https://maps.google.com/?q=Linh+Trung,+Thủ+Đức,+HCM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm ml-1 opacity-80 hover:opacity-100 hover:font-medium transition"
                >
                  Linh Trung, Thủ Đức, HCM
                </a>
              </div>
              <div className="flex items-center">
                <MdPhone />
                <a
                  href="tel:0595275688"
                  className="block text-sm ml-1 opacity-80 hover:opacity-100 hover:font-medium transition"
                >
                  0595 275 688
                </a>
              </div>
              <div className="flex items-center">
                <MdEmail />
                <a
                  href="mailto:wtmsport.contact@gmail.com"
                  className="block text-sm ml-1 opacity-80 hover:opacity-100 hover:font-medium transition"
                >
                  wtmsport.contact@gmail.com
                </a>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <div className="bg-primary text-center text-sm py-2">
        <span className="text-white font-semibold text-sm block pb-3">
          2025 - Bản quyền thuộc về cửa hàng WTM SPORT
        </span>
      </div>
    </div>
  );
};

export default Footer;
