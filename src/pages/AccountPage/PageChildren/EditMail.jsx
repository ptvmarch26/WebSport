import React, { useState } from "react";
import OTPComponent from "../../../components/OTPComponent/OTPComponent";
import { Button } from "@material-tailwind/react";

const EditEmail = () => {
  const [currentEmail, setCurrentEmail] = useState("user@example.com");
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [serverCode, setServerCode] = useState("");
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [otpError, setOtpError] = useState("");

  const handleSendCode = () => {
    // Reset errors before validation
    setErrors({});

    if (!newEmail || !password) {
      // Set error message if fields are empty
      setErrors((prev) => ({
        ...prev,
        email: !newEmail ? "Email không được để trống" : "",
        password: !password ? "Mật khẩu không được để trống" : "",
      }));
      return;
    }

    const generatedCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    setServerCode(generatedCode);
    setStep(2);
    alert(`Mã xác nhận của bạn là: ${generatedCode}`);
  };

  const handleVerifyCode = (otp) => {
    const enteredCode = otp.join("");
    if (enteredCode === serverCode) {
      setCurrentEmail(newEmail);
      setNewEmail("");
      setPassword("");
      setServerCode("");
      setStep(1);
      alert("Email đã được cập nhật thành công!");
    } else {
      setOtpError("Mã OTP không hợp lệ hoặc đã hết hạn");
    }
  };

  return (
    <div className="px-6 bg-white">
      <h1 className="text-[30px] font-semibold">Đổi Email</h1>

      {step === 1 && (
        <div className="space-y-5 mt-8">
          <div className="flex items-center">
            <label
              htmlFor="currentEmail"
              className="min-w-[100px] block antialiased font-sans text-sm leading-normal text-inherit font-medium text-gray-900"
            >
              Email hiện tại
            </label>
            <input
              id="currentEmail"
              type="email"
              value={currentEmail}
              disabled
              className={`cursor-not-allowed peer w-full bg-transparent text-gray-700 font-sans font-normal outline-none focus:outline-none disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 border focus:border-2 border-t-gray-200 focus:border-t-primary placeholder:opacity-0 focus:placeholder:opacity-100 text-sm px-3 py-3 rounded-md border-gray-200 focus:border-gray-900 `}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center">
              <label
                htmlFor="newEmail"
                className="min-w-[100px] block antialiased font-sans text-sm leading-normal text-inherit font-medium text-gray-900"
              >
                Email mới
              </label>
              <input
                id="newEmail"
                type="email"
                placeholder="Nhập email mới"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className={`peer w-full bg-transparent text-gray-700 font-sans font-normal outline-none focus:outline-none disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 border focus:border-2 border-t-gray-200 focus:border-t-primary placeholder:opacity-100 focus:placeholder:opacity-100 text-sm px-3 py-3 rounded-md border-gray-200 focus:border-gray-900 `}
              />
            </div>
            <div>
              {errors.email && (
                <p className="text-red-500 text-sm ml-[105px] mt-2">
                  {errors.email}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center">
              <label
                htmlFor="password"
                className="min-w-[100px] block antialiased font-sans text-sm leading-normal text-inherit font-medium text-gray-900"
              >
                Mật khẩu
              </label>
              <input
                id="password"
                type="text"
                placeholder="Nhập mật khẩu"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                className={`peer w-full bg-transparent text-gray-700 font-sans font-normal outline-none focus:outline-none disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 border focus:border-2 border-t-gray-200 focus:border-t-primary placeholder:opacity-100 focus:placeholder:opacity-100 text-sm px-3 py-3 rounded-md border-gray-200 focus:border-gray-900 `}
              />
            </div>
            <div>
              {errors.password && (
                <p className="text-red-500 text-sm ml-[105px] mt-2">
                  {errors.password}
                </p>
              )}
            </div>
          </div>
          <Button onClick={handleSendCode} className="w-full">
            Tiếp tục
          </Button>
        </div>
      )}

      {step === 2 && (
        <div>
          <OTPComponent
            onVerify={handleVerifyCode}
            newEmail={newEmail}
            otpError={otpError}
          />
        </div>
      )}
    </div>
  );
};

export default EditEmail;
