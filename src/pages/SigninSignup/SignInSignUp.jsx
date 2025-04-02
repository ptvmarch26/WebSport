import { useState } from "react";
import { FaUser, FaLock, FaEdit } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Checkbox } from "@material-tailwind/react";
import facebook from "../../assets/images/logo_facebook.png";
import google from "../../assets/images/logo_google.png";
import { useAuth } from "../../context/AuthContext";

const SignInSignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSignUp, setIsSignUp] = useState(location.pathname === "/signup");

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { handleSignUp, handleLogin, handlLoginWithGoogle, token } = useAuth();

  useEffect(() => {
    if (token) {
      navigate("/", { replace: true });
    }
  }, [token, navigate]);

  if (token) {
    return null;
  }

  const handleSubmitSignUp = async () => {
    if (password !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }

    const result = await handleSignUp(userName, email, password);
    if (result?.EC === 0) {
      alert("Đăng ký thành công!");
      setIsSignUp(false); // Chuyển sang màn hình đăng nhập
      setUserName("");
      setEmail("");
      setPassword("");
    } else {
      alert("Tên đăng nhập hoặc email đã tồn tại!");
    }
  };

  const handleSubmitSignIn = async () => {
    if (!userName || !password) {
      alert("Vui lòng nhập đầy đủ tài khoản và mật khẩu!");
      return;
    }
    const result = await handleLogin(userName, password);
    if (result?.result?.accessToken) {
      alert("Đăng nhập thành công!");
      navigate("/");
    } else {
      alert("Tài khoản hoặc mật khẩu không đúng!");
    }
  };

  const handleSignInWithGoogle = async () => {
    const result = await handlLoginWithGoogle();
    if (result?.result?.accessToken) {
      alert("Đăng nhập thành công!");
      navigate("/");
    } else {
      alert("Tài khoản hoặc mật khẩu không đúng!");
    }
  };
  return (
    <div className="bg-white py-14 px-2">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center">
        <div className="flex w-full justify-center">
          <div className="max-w-full w-[250px]">
            <h2
              className={`group text-base uppercase text-center font-bold text-gray-900 cursor-pointer relative 
              after:content-[''] after:absolute after:left-0 after:bottom-[-5px] after:w-full after:h-[2px] 
              after:bg-gray-900 after:transition-transform after:duration-500 
              ${
                !isSignUp
                  ? "after:scale-x-100"
                  : "after:scale-x-0 hover:after:scale-x-100 hover:after:bg-[#e5e7eb]"
              }`}
              onClick={() => setIsSignUp(false)}
            >
              <span className={!isSignUp ? "" : "text-[#e5e7eb]"}>
                Đăng nhập
              </span>
            </h2>
          </div>
          <div className="max-w-full w-[250px]">
            <h2
              className={`group text-base uppercase text-center font-bold text-gray-900 cursor-pointer relative 
              after:content-[''] after:absolute after:left-0 after:bottom-[-5px] after:w-full after:h-[2px] 
              after:bg-gray-900 after:transition-transform after:duration-500 
              ${
                isSignUp
                  ? "after:scale-x-100"
                  : "after:scale-x-0 hover:after:scale-x-100 hover:after:bg-[#e5e7eb]"
              }`}
              onClick={() => setIsSignUp(true)}
            >
              <span className={isSignUp ? "" : "text-[#e5e7eb]"}>Đăng ký</span>
            </h2>
          </div>
        </div>
        {/* Khối Đăng Nhập */}
        {!isSignUp && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-full w-[500px] py-10"
          >
            <div className="flex flex-col">
              <div className="">
                <label
                  htmlFor="userName"
                  className="min-w-[170px] block antialiased font-sans text-sm mb-1 leading-normal text-inherit font-medium text-gray-900"
                >
                  Tài khoản
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-[37%] transform -translate-y-1/2 text-gray-700" />
                  <input
                    id="userName"
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Số điện thoại/Email/Tên đăng nhập"
                    className={`mb-4 peer w-full bg-transparent text-gray-700 font-sans font-normal outline-none focus:outline-none disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 border focus:border-2 border-t-gray-200 focus:border-t-primary placeholder:opacity-100 focus:placeholder:opacity-100 text-sm px-3 py-3 rounded-md border-gray-200 focus:border-gray-900 pl-10 `}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="min-w-[170px] block antialiased font-sans text-sm mb-1 leading-normal text-inherit font-medium text-gray-900"
                >
                  Mật khẩu
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-[37%] transform -translate-y-1/2 text-gray-700" />
                  <input
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Mật khẩu"
                    className={`mb-4 peer w-full bg-transparent text-gray-700 font-sans font-normal outline-none focus:outline-none disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 border focus:border-2 border-t-gray-200 focus:border-t-primary placeholder:opacity-100 focus:placeholder:opacity-100 text-sm px-3 py-3 rounded-md border-gray-200 focus:border-gray-900 pl-10 `}
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
                <Button
                  onClick={handleSubmitSignIn}
                  className="w-full h-12 mb-6"
                >
                  Đăng nhập
                </Button>
                <div className="space-y-4">
                  <Button
                    onClick={handleSignInWithGoogle}
                    variant="outlined"
                    size="lg"
                    className="flex h-12 items-center justify-center gap-2"
                    fullWidth
                  >
                    <img src={google} alt="google" className="h-6 w-6" /> Đăng
                    nhập với google
                  </Button>
                  <Button
                    variant="outlined"
                    size="lg"
                    className="flex h-12 items-center justify-center gap-2"
                    fullWidth
                  >
                    <img src={facebook} alt="facebook" className="h-6 w-6" />{" "}
                    Đăng nhập với Facebook
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Khối Đăng Ký */}
        {isSignUp && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-full w-[500px] py-10"
          >
            <div className="flex flex-col">
              <div>
                <label
                  htmlFor="name"
                  className="min-w-[170px] block antialiased font-sans text-sm mb-1 leading-normal text-inherit font-medium text-gray-900"
                >
                  Tên đăng nhập
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-[38%] transform -translate-y-1/2 text-gray-700" />
                  <input
                    id="name"
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Tên đăng nhập"
                    className={`mb-4 peer w-full bg-transparent text-gray-700 font-sans font-normal outline-none focus:outline-none disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 border focus:border-2 border-t-gray-200 focus:border-t-primary placeholder:opacity-100 focus:placeholder:opacity-100 text-sm px-3 py-3 rounded-md border-gray-200 focus:border-gray-900 pl-10 `}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="min-w-[170px] block antialiased font-sans text-sm mb-1 leading-normal text-inherit font-medium text-gray-900"
                >
                  Email
                </label>
                <div className="relative">
                  <MdEmail className="absolute left-3 top-[38%] transform -translate-y-1/2 text-gray-700" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className={`mb-4 peer w-full bg-transparent text-gray-700 font-sans font-normal outline-none focus:outline-none disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 border focus:border-2 border-t-gray-200 focus:border-t-primary placeholder:opacity-100 focus:placeholder:opacity-100 text-sm px-3 py-3 rounded-md border-gray-200 focus:border-gray-900 pl-10 `}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password-su"
                  className="min-w-[170px] block antialiased font-sans text-sm mb-1 leading-normal text-inherit font-medium text-gray-900"
                >
                  Mật khẩu
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-[38%] transform -translate-y-1/2 text-gray-700" />
                  <input
                    id="password-su"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mật khẩu"
                    className={`mb-4 peer w-full bg-transparent text-gray-700 font-sans font-normal outline-none focus:outline-none disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 border focus:border-2 border-t-gray-200 focus:border-t-primary placeholder:opacity-100 focus:placeholder:opacity-100 text-sm px-3 py-3 rounded-md border-gray-200 focus:border-gray-900 pl-10 `}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="min-w-[170px] block antialiased font-sans text-sm mb-1 leading-normal text-inherit font-medium text-gray-900"
                >
                  Xác nhận mật khẩu
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-[38%] transform -translate-y-1/2 text-gray-700" />
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Xác nhận mật khẩu"
                    className={`mb-4 peer w-full bg-transparent text-gray-700 font-sans font-normal outline-none focus:outline-none disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 border focus:border-2 border-t-gray-200 focus:border-t-primary placeholder:opacity-100 focus:placeholder:opacity-100 text-sm px-3 py-3 rounded-md border-gray-200 focus:border-gray-900 pl-10 `}
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
                <Button
                  onClick={handleSubmitSignUp}
                  className="w-full h-12 mb-6"
                >
                  Đăng ký
                </Button>
                <div className="space-y-4">
                  <Button
                    onClick={handleSignInWithGoogle}
                    variant="outlined"
                    size="lg"
                    className="flex h-12 items-center justify-center gap-2"
                    fullWidth
                  >
                    <img src={google} alt="google" className="h-6 w-6" /> Đăng
                    ký với google
                  </Button>
                  <Button
                    variant="outlined"
                    size="lg"
                    className="flex h-12 items-center justify-center gap-2"
                    fullWidth
                  >
                    <img src={facebook} alt="facebook" className="h-6 w-6" />{" "}
                    Đăng ký với Facebook
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SignInSignUp;
