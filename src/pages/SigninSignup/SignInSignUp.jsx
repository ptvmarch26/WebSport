import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Checkbox } from "@material-tailwind/react";
import facebook from "../../assets/images/logo_facebook.png";
import google from "../../assets/images/logo_google.png";
import { useAuth } from "../../context/AuthContext";
import { usePopup } from "../../context/PopupContext";

const SignInSignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSignUp, setIsSignUp] = useState(location.pathname === "/signup");
  const { showPopup } = usePopup();
  const [userName, setUserName] = useState(""); // Đăng nhập
  const [password, setPassword] = useState(""); // Đăng nhập

  // Đăng ký
  const [signUpUserName, setSignUpUserName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Show password
  const [showPassword, setShowPassword] = useState(false);
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Lỗi khi nhập thiếu
  // Lỗi đăng nhập
  const [loginErrors, setLoginErrors] = useState({
    userName: "",
    password: "",
  });

  // Lỗi đăng ký
  const [signUpErrors, setSignUpErrors] = useState({
    signUpUserName: "",
    signUpEmail: "",
    signUpPassword: "",
    confirmPassword: "",
  });

  const validateSignIn = () => {
    let isValid = true;
    const newErrors = { userName: "", password: "" };

    if (!userName.trim()) {
      newErrors.userName = "Vui lòng nhập tài khoản";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
      isValid = false;
    }

    setLoginErrors(newErrors);
    return isValid;
  };

  const validateSignUp = () => {
    let isValid = true;
    const newErrors = {
      signUpUserName: "",
      signUpEmail: "",
      signUpPassword: "",
      confirmPassword: "",
    };

    if (!signUpUserName.trim()) {
      newErrors.signUpUserName = "Vui lòng nhập tên đăng nhập";
      isValid = false;
    }

    if (!signUpEmail.trim()) {
      newErrors.signUpEmail = "Vui lòng nhập email";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(signUpEmail)) {
      newErrors.signUpEmail = "Email không đúng định dạng";
      isValid = false;
    }

    if (!signUpPassword) {
      newErrors.signUpPassword = "Vui lòng nhập mật khẩu";
      isValid = false;
    }
    // else if (signUpPassword.length < 6) {
    //   newErrors.signUpPassword = "Mật khẩu phải có ít nhất 6 ký tự";
    //   isValid = false;
    // }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
      isValid = false;
    } else if (confirmPassword !== signUpPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
      isValid = false;
    }

    setSignUpErrors(newErrors);
    return isValid;
  };

  const {
    handleSignUp,
    handleLogin,
    handlLoginWithGoogle,
    handleSignUpGoogle,
    token,
  } = useAuth();
  useEffect(() => {
    if (token) {
      navigate("/", { replace: true });
    }
  }, [token, navigate]);

  useEffect(() => {
    setIsSignUp(location.pathname === "/sign-up");
  }, [location.pathname]);

  if (token) {
    return null;
  }

  const handleSubmitSignUp = async (e) => {
    if (e) e.preventDefault(); // Vẫn giữ để ngăn submit mặc định
    // Sử dụng hàm validate tùy chỉnh
    if (!validateSignUp()) {
      return;
    }
    const result = await handleSignUp(
      signUpUserName,
      signUpEmail,
      signUpPassword
    );
    if (result?.EC === 0) {
      showPopup(result.EM);
      setIsSignUp(false); // Chuyển sang màn hình đăng nhập
      setSignUpUserName("");
      setSignUpEmail("");
      setSignUpPassword("");
    } else {
      showPopup(result.EM, false);
    }
  };

  const handleSubmitSignIn = async (e) => {
    if (e) e.preventDefault();
    // Xuất lỗi dưới input
    if (!validateSignIn()) {
      return;
    }
    const result = await handleLogin(userName, password);
    if (result.EC === 0 && result?.result?.accessToken) {
      showPopup(result.EM);
      localStorage.removeItem("compareList");
      window.dispatchEvent(new CustomEvent("compareListUpdated"));
      navigate("/");
    } else {
      showPopup(result.EM, false);
    }
  };

  const handleSignInWithGoogle = async () => {
    const result = await handlLoginWithGoogle();
    if (result.EC === 0 && result?.result?.accessToken) {
      showPopup(result.EM);
      localStorage.removeItem("compareList");
      window.dispatchEvent(new CustomEvent("compareListUpdated"));
      navigate("/");
    } else showPopup(result.EM, false);
  };

  const handleSignUpWithGoogle = async () => {
    const result = await handleSignUpGoogle();
    if (result.EC === 0 && result?.result?.accessToken) {
      showPopup(result.EM);
      localStorage.removeItem("compareList");
      window.dispatchEvent(new CustomEvent("compareListUpdated"));
      navigate("/");
    } else {
      showPopup(result.EM, false);
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
              onClick={() => {
                setIsSignUp(false);
                navigate("/sign-in");
              }}
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
              onClick={() => {
                setIsSignUp(true);
                navigate("/sign-up");
              }}
            >
              <span className={isSignUp ? "" : "text-[#e5e7eb]"}>Đăng ký</span>
            </h2>
          </div>
        </div>
        {!isSignUp && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-full w-[500px] py-10"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmitSignIn();
              }}
              className="flex flex-col"
            >
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
                    placeholder="Tên đăng nhập"
                    className={`mb-4 peer w-full bg-transparent text-gray-700 font-sans font-normal outline-none focus:outline-none disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 border focus:border-2 border-t-gray-200 focus:border-t-primary placeholder:opacity-100 focus:placeholder:opacity-100 text-sm px-3 py-3 rounded-md border-gray-200 focus:border-gray-900 pl-10 `}
                  />
                </div>
                {loginErrors.userName && (
                  <p className="text-red-500 text-sm mb-2 -mt-2">
                    {loginErrors.userName}
                  </p>
                )}
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
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mật khẩu"
                    className={`mb-4 peer w-full bg-transparent text-gray-700 font-sans font-normal outline-none focus:outline-none disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 border focus:border-2 border-t-gray-200 focus:border-t-primary placeholder:opacity-100 focus:placeholder:opacity-100 text-sm px-3 py-3 rounded-md border-gray-200 focus:border-gray-900 pl-10 `}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[37%] transform -translate-y-1/2 text-gray-700 cursor-pointer"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                {loginErrors.password && (
                  <p className="text-red-500 text-sm mb-2 -mt-2">
                    {loginErrors.password}
                  </p>
                )}
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
                <Button type="submit" className="w-full h-12 mb-6">
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
                    nhập với Google
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
            </form>
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
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmitSignUp();
              }}
              className="flex flex-col"
            >
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
                    value={signUpUserName}
                    onChange={(e) => setSignUpUserName(e.target.value)}
                    placeholder="Tên đăng nhập"
                    className={`mb-4 peer w-full bg-transparent text-gray-700 font-sans font-normal outline-none focus:outline-none disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 border focus:border-2 border-t-gray-200 focus:border-t-primary placeholder:opacity-100 focus:placeholder:opacity-100 text-sm px-3 py-3 rounded-md border-gray-200 focus:border-gray-900 pl-10 `}
                  />
                </div>
                {signUpErrors.signUpUserName && (
                  <p className="text-red-500 text-sm mb-2 -mt-2">
                    {signUpErrors.signUpUserName}
                  </p>
                )}
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
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    placeholder="Email"
                    className={`mb-4 peer w-full bg-transparent text-gray-700 font-sans font-normal outline-none focus:outline-none disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 border focus:border-2 border-t-gray-200 focus:border-t-primary placeholder:opacity-100 focus:placeholder:opacity-100 text-sm px-3 py-3 rounded-md border-gray-200 focus:border-gray-900 pl-10 `}
                  />
                </div>
                {signUpErrors.signUpEmail && (
                  <p className="text-red-500 text-sm mb-2 -mt-2">
                    {signUpErrors.signUpEmail}
                  </p>
                )}
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
                    type={showSignUpPassword ? "text" : "password"}
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    placeholder="Mật khẩu"
                    className={`mb-4 peer w-full bg-transparent text-gray-700 font-sans font-normal outline-none focus:outline-none disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 border focus:border-2 border-t-gray-200 focus:border-t-primary placeholder:opacity-100 focus:placeholder:opacity-100 text-sm px-3 py-3 rounded-md border-gray-200 focus:border-gray-900 pl-10 `}
                  />
                  <span
                    onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                    className="absolute right-3 top-[38%] transform -translate-y-1/2 text-gray-700 cursor-pointer"
                  >
                    {showSignUpPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                {signUpErrors.signUpPassword && (
                  <p className="text-red-500 text-sm mb-2 -mt-2">
                    {signUpErrors.signUpPassword}
                  </p>
                )}
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
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Xác nhận mật khẩu"
                    className={`mb-4 peer w-full bg-transparent text-gray-700 font-sans font-normal outline-none focus:outline-none disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 border focus:border-2 border-t-gray-200 focus:border-t-primary placeholder:opacity-100 focus:placeholder:opacity-100 text-sm px-3 py-3 rounded-md border-gray-200 focus:border-gray-900 pl-10 `}
                  />
                  <span
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-[38%] transform -translate-y-1/2 text-gray-700 cursor-pointer"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                {signUpErrors.confirmPassword && (
                  <p className="text-red-500 text-sm mb-2 -mt-2">
                    {signUpErrors.confirmPassword}
                  </p>
                )}
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
                <Button className="w-full h-12 mb-6" type="submit">
                  Đăng ký
                </Button>
                <div className="space-y-4">
                  <Button
                    onClick={handleSignUpWithGoogle}
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
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SignInSignUp;
