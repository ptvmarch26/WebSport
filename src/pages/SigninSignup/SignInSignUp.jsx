import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Checkbox } from "@material-tailwind/react";
import { FaEdit } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import facebook from '../../assets/images/logo_facebook.png';
import google from '../../assets/images/logo_google.png';

const SignInSignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSignUp, setIsSignUp] = useState(location.pathname === "/signup");

  // Cập nhật path khi thay đổi trạng thái
  useEffect(() => {
    navigate(isSignUp ? "/signup" : "/login", { replace: true });
  }, [isSignUp, navigate]);

  return (
    <div className="bg-white">
      <div className="py-14 res">
        <main className="w-full flex-1 px-32 text-center">
          <div className="bg-white rounded-2xl shadow-2xl flex relative w-full">
            {/* Sign In */}
            <div
              className={`w-1/2 py-10 px-5 transition-all duration-500 ${
                isSignUp ? "opacity-50" : "opacity-100"
              }`}
            >
              <h2 className="text-[40px] font-bold text-gray-900 mb-8">
                Đăng nhập
              </h2>
              <div className="flex flex-col">
                <div className="">
                  <label
                    htmlFor="userName"
                    className="text-left block mb-2 ml-1 antialiased font-sans text-md leading-normal text-inherit font-medium text-gray-900"
                  >
                    Tài khoản
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-[37%] transform -translate-y-1/2 text-gray-700" />
                    <input
                      id="userName"
                      type="text"
                      placeholder="Số điện thoại/Email"
                      className="peer mb-4 w-full bg-transparent text-gray-700 font-sans font-normal outline-none focus:outline-none disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 border focus:border-2 border-t-gray-200 focus:border-t-primary placeholder:opacity-100 focus:placeholder:opacity-100 text-sm px-3 py-3 rounded-md border-gray-200 focus:border-gray-900 pl-10"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="text-left block mb-2 ml-1 antialiased font-sans text-md leading-normal text-inherit font-medium text-gray-900"
                  >
                    Mật khẩu
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-3 top-[37%] transform -translate-y-1/2 text-gray-700" />
                    <input
                      id="password"
                      type="password"
                      placeholder="Mật khẩu"
                      className="peer mb-4 w-full bg-transparent text-gray-700 font-sans font-normal outline-none focus:outline-none disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 border focus:border-2 border-t-gray-200 focus:border-t-primary placeholder:opacity-100 focus:placeholder:opacity-100 text-sm px-3 py-3 rounded-md border-gray-200 focus:border-gray-900 pl-10"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center mb-2">
                  <Checkbox
                    defaultChecked
                    containerProps={{ className: "-ml-2 -mt-3" }}
                    labelProps={{ className: "-mt-[10px] text-md" }}
                    label="Nhớ mật khẩu"
                  />
                  <Link
                    to={"/forgot-password"}
                    className="text-sm group -mt-[4px] relative"
                  >
                    Quên mật khẩu?
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-current transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </div>
                <div className="mt-2">
                  <Button className="w-full h-12 mb-6">Đăng nhập</Button>
                  <div className="space-y-4">
                    <Button
                      variant="outlined"
                      size="lg"
                      className="flex h-12 items-center justify-center gap-2"
                      fullWidth
                    >
                      <img
                        src={google}
                        alt="google"
                        className="h-6 w-6"
                      />{" "}
                      Đăng nhập với google
                    </Button>
                    <Button
                      variant="outlined"
                      size="lg"
                      className="flex h-12 items-center justify-center gap-2"
                      fullWidth
                    >
                      <img
                        src={facebook}
                        alt="facebook"
                        className="h-6 w-6"
                      />{" "}
                      Đăng nhập với Facebook
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sign Up  */}
            <div
              className={`w-1/2 py-10 px-5 transition-all duration-500 ${
                isSignUp ? "opacity-100" : "opacity-50"
              }`}
            >
              <h2 className="text-[40px] font-bold text-gray-900 mb-8">
                Đăng ký
              </h2>
              <div className="flex flex-col">
                <div>
                  <label
                    htmlFor="fullName"
                    className="text-left block mb-2 ml-1 antialiased font-sans text-md leading-normal text-inherit font-medium text-gray-900"
                  >
                    Họ và tên
                  </label>
                  <div className="relative">
                    <FaEdit className="absolute left-3 top-[38%] transform -translate-y-1/2 text-gray-700" />
                    <input
                      id="fullName"
                      type="text"
                      placeholder="Họ và tên"
                      className="peer mb-4 w-full bg-transparent text-gray-700 font-sans font-normal outline-none focus:outline-none disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 border focus:border-2 border-t-gray-200 focus:border-t-primary placeholder:opacity-100 focus:placeholder:opacity-100 text-sm px-3 py-3 rounded-md border-gray-200 focus:border-gray-900 pl-10"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="text-left block mb-2 ml-1 antialiased font-sans text-md leading-normal text-inherit font-medium text-gray-900"
                  >
                    Số điện thoại
                  </label>
                  <div className="relative">
                    <FaPhone className="absolute left-3 top-[38%] transform -translate-y-1/2 text-gray-700" />
                    <input
                      id="phone"
                      type="tel"
                      placeholder="Số điện thoại"
                      className="peer mb-4 w-full bg-transparent text-gray-700 font-sans font-normal outline-none focus:outline-none disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 border focus:border-2 border-t-gray-200 focus:border-t-primary placeholder:opacity-100 focus:placeholder:opacity-100 text-sm px-3 py-3 rounded-md border-gray-200 focus:border-gray-900 pl-10"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="password-su"
                    className="text-left block mb-2 ml-1 antialiased font-sans text-md leading-normal text-inherit font-medium text-gray-900"
                  >
                    Mật khẩu
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-3 top-[38%] transform -translate-y-1/2 text-gray-700" />
                    <input
                      id="password-su"
                      type="password"
                      placeholder="Mật khẩu"
                      className="peer mb-4 w-full bg-transparent text-gray-700 font-sans font-normal outline-none focus:outline-none disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 border focus:border-2 border-t-gray-200 focus:border-t-primary placeholder:opacity-100 focus:placeholder:opacity-100 text-sm px-3 py-3 rounded-md border-gray-200 focus:border-gray-900 pl-10"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="text-left block mb-2 ml-1 antialiased font-sans text-md leading-normal text-inherit font-medium text-gray-900"
                  >
                    Xác nhận mật khẩu
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-3 top-[38%] transform -translate-y-1/2 text-gray-700" />
                    <input
                      id="confirmPassword"
                      type="password"
                      placeholder="Xác nhận mật khẩu"
                      className="peer mb-4 w-full bg-transparent text-gray-700 font-sans font-normal outline-none focus:outline-none disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 border focus:border-2 border-t-gray-200 focus:border-t-primary placeholder:opacity-100 focus:placeholder:opacity-100 text-sm px-3 py-3 rounded-md border-gray-200 focus:border-gray-900 pl-10"
                    />
                  </div>
                </div>
                <Checkbox
                  defaultChecked
                  containerProps={{ className: "-ml-2 -mt-3" }}
                  labelProps={{ className: "-mt-[10px] text-md" }}
                  label={
                    <>
                      <span className="text-[#9e9e9e] text-sm">
                        Tôi đồng ý với
                      </span>{" "}
                      <Link
                        to={"/terms-and-conditions"}
                        className="underline text-sm"
                      >
                        chính sách và điều khoản
                      </Link>
                    </>
                  }
                />
                <div className="mt-2">
                  <Button className="w-full h-12 mb-6">Đăng ký</Button>
                  <div className="space-y-4">
                    <Button
                      variant="outlined"
                      size="lg"
                      className="flex h-12 items-center justify-center gap-2"
                      fullWidth
                    >
                      <img
                        src={google}
                        alt="google"
                        className="h-6 w-6"
                      />{" "}
                      Đăng ký với google
                    </Button>
                    <Button
                      variant="outlined"
                      size="lg"
                      className="flex h-12 items-center justify-center gap-2"
                      fullWidth
                    >
                      <img
                        src={facebook}
                        alt="facebook"
                        className="h-6 w-6"
                      />{" "}
                      Đăng ký với Facebook
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              className="absolute w-1/2 h-full top-0 right-0 bg-gray-900 text-white rounded-2xl py-36 px-12 flex flex-col items-center justify-center"
              animate={{ x: isSignUp ? "-100%" : "0%" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <h2 className="text-3xl font-bold mb-4">
                {isSignUp ? "Chào mừng trở lại" : "Tạo tài khoản mới"}
              </h2>
              <div className="border-2 w-10 border-white inline-block mb-4"></div>
              <p className="mb-8">
                {isSignUp
                  ? "Đăng nhập để tiếp tục"
                  : "Hãy khám phá thêm về chúng tôi!"}
              </p>
              <Button
                onClick={() => setIsSignUp(!isSignUp)}
                className="w-full border-2 border-white font-semibold hover:bg-white hover:text-black transition-all duration-300"
              >
                {isSignUp ? "Đăng nhập" : "Đăng ký"}
              </Button>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SignInSignUp;
