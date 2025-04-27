import { useState } from "react";
import OTPComponent from "../../../components/OTPComponent/OTPComponent";
import { Button } from "@material-tailwind/react";
import { useUser } from "../../../context/UserContext";
import { useAuth } from "../../../context/AuthContext";

const EditEmail = () => {
  // const { t } = useTranslation();
  const { selectedUser, handleUpdateUser, fetchUser } = useUser();
  const { handleSendOTP, handleVerifyOTP } = useAuth();

  const [newEmail, setNewEmail] = useState("");
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [otpError, setOtpError] = useState("");

  const handleSend = async () => {
    setErrors({});

    if (!newEmail) {
      setErrors((prev) => ({
        ...prev,
        email: !newEmail ? "Email không được để trống" : "",
      }));
      return;
    }
    await handleSendOTP(selectedUser?.email);
    setStep(2);
  };

  const handleVerifyCode = async (otp) => {
    const enteredCode = otp.join("");
    const res = await handleVerifyOTP(selectedUser?.email, enteredCode);
    if (res?.EC === 0) {
      await handleUpdateUser({ email: newEmail });
      await fetchUser();
      setNewEmail("");
      setStep(1);
    } else {
      setOtpError("Mã OTP không hợp lệ hoặc đã hết hạn");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    handleSend(); 
  };

  return (
    <div className="lg:px-6 bg-white">
      <h1 className="text-3xl font-semibold">Đổi Email</h1>
      <form onSubmit={handleSubmit}>
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
                value={selectedUser?.email || ""}
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
            <Button type="submit" className="w-full">
              Tiếp tục
            </Button>
          </div>
        )}
      </form>

      {step === 2 && (
        <div>
          <OTPComponent
            onVerify={handleVerifyCode}
            newEmail={selectedUser?.email}
            otpError={otpError}
            onResend={handleSend}
          />
        </div>
      )}
    </div>
  );
};

export default EditEmail;
