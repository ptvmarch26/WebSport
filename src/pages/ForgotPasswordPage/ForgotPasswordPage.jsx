import { useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { motion } from "framer-motion";
import { Button } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoIosEye, IoIosEyeOff } from "react-icons/io";
import OTPComponent from "../../components/OTPComponent/OTPComponent";
import { useAuth } from "../../context/AuthContext";
import { usePopup } from "../../context/PopupContext";
import { useLoading } from "../../context/LoadingContext"

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const { handleSendOTP, handleResetPassword, handleVerifyOTP } = useAuth();
  const { setLoading } = useLoading();
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [otpError, setOtpError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
   const { showPopup } = usePopup();

  const handleSendOtp = async () => {
    if (!email.trim()) {
      setError("Vui lòng nhập Email");
      return;
    }
    setError("");
    setLoading(true, "Vui lòng chờ")
    const res = await handleSendOTP(email);
    if (res?.EM === "OTP sent successfully") {
      setStep(1);
    } else if (res?.EM === "User not found") {
      setError("Người dùng không tồn tại");
    } else {
      setError("Gửi mã OTP thất bại, vui lòng thử lại");
    }
    setLoading(false);
  };

  const handleVerifyOtp = async (otpArray) => {
    const otpString = otpArray.join("");

    if (!otpString.trim()) {
      setOtpError("Vui lòng nhập mã OTP");
      return;
    }

    setOtpError("");

    const res = await handleVerifyOTP(email, otpString);
    if (res?.EM === "OTP verified successfully") {
      setStep(2);
    } else if (res?.EM === "Invalid OTP") {
      setOtpError("Mã OTP không hợp lệ");
    }
  };

  const handleResetPasswordSubmit = async () => {
    let errors = {};

    if (!newPassword) {
      errors.newPassword = "Vui lòng nhập mật khẩu mới";
    }
    if (!confirmPassword) {
      errors.confirmPassword = "Vui lòng nhập lại mật khẩu";
    }
    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      errors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }

    setErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    const res = await handleResetPassword(email, newPassword);
    if (res?.EM === "Password reset successfully") {
      showPopup("Đổi mật khẩu thành công. Vui lòng đăng nhập lại", true, 1000);
      navigate("/sign-in");
    } else {
      showPopup("Đặt lại mật khẩu thất bại, vui lòng thử lại", false);
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
                  htmlFor="email"
                  className="min-w-[170px] block antialiased font-sans text-sm mb-1 leading-normal text-inherit font-medium text-gray-900"
                >
                  Tài khoản
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700" />
                  <input
                    id="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Số điện thoại/Email"
                    className={`peer w-full bg-transparent text-gray-700 font-sans font-normal outline-none focus:outline-none disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 border focus:border-2 border-t-gray-200 focus:border-t-primary placeholder:opacity-100 focus:placeholder:opacity-100 text-sm px-3 py-3 rounded-md border-gray-200 focus:border-gray-900 pl-10`}
                  />
                </div>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                <Button onClick={handleSendOtp} className="w-full h-12 mt-4">
                  Tiếp tục
                </Button>
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <OTPComponent
                newEmail={email}
                otpError={otpError}
                onVerify={handleVerifyOtp}
                onResend={handleSendOtp}
                height="h-12"
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

              <Button
                onClick={handleResetPasswordSubmit}
                className="w-full h-12"
              >
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
