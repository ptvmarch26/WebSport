import { useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { motion } from "framer-motion";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { IoIosArrowBack, IoIosEye, IoIosEyeOff } from "react-icons/io";
import OTPComponent from "../../components/OTPComponent/OTPComponent";

const ForgotPasswordPage = () => {
  const [step, setStep] = useState(0);
  const [userName, setUserName] = useState("");
  const [otpError, setOtpError] = useState("");
  const [error, setError] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleContinue = () => {
    if (!userName.trim()) {
      setError("Vui lòng nhập Số điện thoại hoặc Email");
      return;
    }
    setStep(1);
  };

  const handleSubmitOtp = (otp) => {
    const enteredOtp = otp.join("");
    if (enteredOtp === "123456") {
      setStep(2);
    } else {
      setOtpError("Mã OTP không hợp lệ hoặc đã hết hạn");
    }
  };

  const handleResetPassword = () => {
    let validationErrors = {};

    if (!newPassword.trim()) {
      validationErrors.newPassword = "Vui lòng nhập mật khẩu mới";
    }

    if (!confirmPassword.trim()) {
      validationErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
    } else if (confirmPassword !== newPassword) {
      validationErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    } else {
      setErrors({});
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  };

  return (
    <div className="bg-white py-14 px-2">
      <div className="relative max-w-[1200px] py-20 lg:py-40 mx-auto flex flex-col items-center">
        <p className="text-lg absolute left-0 md:left-[10%] lg:left-[20%] ;g:top-[200px]">
          <Link
            to="/sign-in"
            className="flex items-center hover:opacity-80 transition duration-300 transform hover:scale-105 text-gray-600 hover:text-black"
          >
            <IoIosArrowBack className="w-6 h-6 mr-2" />
            <span>Quay lại</span>
          </Link>
        </p>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-full w-[500px] py-10"
        >
          {step === 0 && (
            <div>
              <div className="flex flex-col">
                <label
                  htmlFor="userName"
                  className="min-w-[170px] block antialiased font-sans text-sm mb-1 leading-normal text-inherit font-medium text-gray-900"
                >
                  Tài khoản
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700" />
                  <input
                    id="userName"
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Số điện thoại/Email"
                    className={`peer w-full bg-transparent text-gray-700 font-sans font-normal outline-none focus:outline-none disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 border focus:border-2 border-t-gray-200 focus:border-t-primary placeholder:opacity-100 focus:placeholder:opacity-100 text-sm px-3 py-3 rounded-md border-gray-200 focus:border-gray-900 pl-10`}
                  />
                </div>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                <Button onClick={handleContinue} className="w-full h-12 mt-4">
                  Tiếp tục
                </Button>
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <OTPComponent
                newEmail={userName}
                otpError={otpError}
                onVerify={handleSubmitOtp}
                onResend={() => setOtpError("")}
              />
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="flex flex-col">
                <div className="">
                  <label
                    htmlFor="newPassword"
                    className="min-w-[170px] block antialiased font-sans text-sm mb-1 leading-normal text-inherit font-medium text-gray-900"
                  >
                    Mật khẩu mới
                  </label>
                  <div className="relative w-full">
                    <FaLock className="absolute left-3 top-[37%] transform -translate-y-1/2 text-gray-700" />
                    <input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Nhập mật khẩu mới"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className={`mb-4 peer w-full bg-transparent text-gray-700 font-sans font-normal outline-none focus:outline-none disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 border focus:border-2 border-t-gray-200 focus:border-t-primary placeholder:opacity-100 focus:placeholder:opacity-100 text-sm px-3 py-3 rounded-md border-gray-200 focus:border-gray-900 pl-10 `}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-[37%] transform -translate-y-1/2"
                    >
                      {showNewPassword ? (
                        <IoIosEyeOff className="w-5 h-5 text-gray-500" />
                      ) : (
                        <IoIosEye className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>
                <div>
                  {errors.newPassword && (
                    <p className="text-red-500 text-sm mb-2 -mt-2">
                      {errors.newPassword}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col">
                <div className="">
                  <label
                    htmlFor="confirmPassword"
                    className="min-w-[170px] block antialiased font-sans text-sm mb-1 leading-normal text-inherit font-medium text-gray-900"
                  >
                    Xác nhận mật khẩu mới
                  </label>
                  <div className="relative w-full">
                    <FaLock className="absolute left-3 top-[37%] transform -translate-y-1/2 text-gray-700" />
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Xác nhận mật khẩu mới"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`mb-4 peer w-full bg-transparent text-gray-700 font-sans font-normal outline-none focus:outline-none disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 border focus:border-2 border-t-gray-200 focus:border-t-primary placeholder:opacity-100 focus:placeholder:opacity-100 text-sm px-3 py-3 rounded-md border-gray-200 focus:border-gray-900 pl-10 `}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-[37%] transform -translate-y-1/2"
                    >
                      {showConfirmPassword ? (
                        <IoIosEyeOff className="w-5 h-5 text-gray-500" />
                      ) : (
                        <IoIosEye className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>
                <div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mb-2 -mt-2">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              <Button onClick={handleResetPassword} className="w-full h-12">
                Đổi mật khẩu
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
