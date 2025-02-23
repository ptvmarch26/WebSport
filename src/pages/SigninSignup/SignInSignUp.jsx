import { useState } from "react";
import { FaFacebookF, FaGoogle, FaRegEnvelope, FaUser } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SignInSignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSignUp, setIsSignUp] = useState(location.pathname === "/signup");

  // Cập nhật path khi thay đổi trạng thái
  useEffect(() => {
    navigate(isSignUp ? "/signup" : "/login", { replace: true });
  }, [isSignUp, navigate]);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl relative">
          {/* Sign In */}
          <div className={`w-1/2 p-5 transition-all duration-500 ${isSignUp ? "opacity-50" : "opacity-100"}`}>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Đăng nhập</h2>
            <div className="border-2 w-10 border-gray-900 inline-block mb-2"></div>
            <div className="flex justify-center my-2">
              <a href="#" className="border-2 border-gray-900 rounded-full p-3 mx-1 flex items-center justify-center w-10 h-10 transition duration-300 hover:border-blue-600">
                <FaFacebookF className="text-blue-600 text-lg " />
              </a>
              <a href="#" className="border-2 border-gray-900 rounded-full p-3 mx-1 flex items-center justify-center w-10 h-10 transition duration-300 hover:border-red-600">
                <FaGoogle className="text-red-500 text-lg" />
              </a>
            </div>
            <p className="text-gray-500 my-3">hoặc sử dụng tài khoản của bạn</p>
            <div className="flex flex-col items-center">
              <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                <FaUser className="text-gray-400 m-2" />
                <input type="email" placeholder="Tên đăng nhập" className="bg-gray-100 outline-none text-sm flex-1" />
              </div>
              <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                <MdLockOutline className="text-gray-400 m-2" />
                <input type="password" placeholder="Mật khẩu" className="bg-gray-100 outline-none text-sm flex-1" />
              </div>
              <div className="flex w-64 mb-5">
                <label className="flex items-center text-xs"><input type="checkbox" name="remember" className="mr-1"/>Lưu tài khoản</label>
                <a href="#" className="text-xs ml-auto">Quên mật khẩu?</a>
              </div>
              <button className="border-2 border-gray-900 rounded-full px-12 py-2 font-semibold hover:bg-gray-900 hover:text-white mt-4 duration-300">
                Đăng nhập
              </button>
              
            </div>
          </div>

          {/* Sign Up  */}
          <div className={`w-1/2 p-5 transition-all duration-500 ${isSignUp ? "opacity-100" : "opacity-50"}`}>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Đăng ký</h2>
            <div className="border-2 w-10 border-gray-900 inline-block mb-2"></div>
            <div className="flex justify-center my-2">
              <a href="#" className="border-2 border-gray-900 rounded-full p-3 mx-1 flex items-center justify-center w-10 h-10 transition duration-300 hover:border-blue-600">
                <FaFacebookF className="text-blue-600 text-lg" />
              </a>
              <a href="#" className="border-2 border-gray-900 rounded-full p-3 mx-1 flex items-center justify-center w-10 h-10 transition duration-300 hover:border-red-600">
                <FaGoogle className="text-red-500 text-lg" />
              </a>
            </div>
            <p className="text-gray-500 my-3">hoặc tự tạo tài khoản mới</p>
            <div className="flex flex-col items-center">
              <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                <FaUser className="text-gray-400 m-2" />
                <input type="text" placeholder="Tên đăng nhập" className="bg-gray-100 outline-none text-sm flex-1" />
              </div>
              <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                <FaRegEnvelope className="text-gray-400 m-2" />
                <input type="email" placeholder="Email" className="bg-gray-100 outline-none text-sm flex-1" />
              </div>
              <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                <MdLockOutline className="text-gray-400 m-2" />
                <input type="password" placeholder="Mật khẩu" className="bg-gray-100 outline-none text-sm flex-1" />
              </div>
              <div className="bg-gray-100 w-64 p-2 flex items-center">
                <MdLockOutline className="text-gray-400 m-2" />
                <input type="password" placeholder="Nhập lại mật khẩu" className="bg-gray-100 outline-none text-sm flex-1" />
              </div>
              <button className="border-2 border-gray-900 text-gray-900 rounded-full px-12 py-2 font-semibold hover:bg-gray-900 hover:text-white mt-4 duration-300">
                Đăng ký
              </button>
            </div>
          </div>

          <motion.div
            className="absolute w-1/2 h-full top-0 right-0 bg-gray-900 text-white rounded-2xl py-36 px-12 flex flex-col items-center justify-center"
            animate={{ x: isSignUp ? "-100%" : "0%" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <h2 className="text-3xl font-bold mb-2">{isSignUp ? "Chào mừng bạn trở lại!" : "Xin chào!"}</h2>
            <div className="border-2 w-10 border-white inline-block mb-2"></div>
            <p className="mb-10">{isSignUp ? "Đăng nhập để tiếp tục" : "Hãy khám phá thêm về chúng tôi!"}</p>
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="border-2 border-white rounded-full px-12 py-2 font-semibold hover:bg-white hover:text-black transition-all duration-300"
            >
              {isSignUp ? "Đăng nhập" : "Đăng ký"}
            </button>
          </motion.div>

        </div>
      </main>
    </div>
  );
}

export default SignInSignUp;
