import { Button } from "@material-tailwind/react";
import { useState, useRef, useEffect } from "react";

const OTPComponent = ({ newEmail, otpError, onVerify, onResend, height }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(30);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleChange = (index, event) => {
    const value = event.target.value.replace(/[^0-9]/g, "");

    if (!value) return;

    setOtp((prevOtp) => {
      const newOtp = [...prevOtp];
      newOtp[index] = value;
      return newOtp;
    });

    setTimeout(() => {
      if (index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }, 50);
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    onVerify(otp);
  };

  const handleResend = () => {
    onResend();
    setTimeLeft(30);
    setOtp(["", "", "", "", "", ""]);
  };

  return (
    <div className="flex flex-col items-center my-6 bg-white">
      <h2 className="text-2xl font-bold mb-2">Nhập mã xác nhận</h2>
      <p className="text-gray-500 text-sm text-center mb-4">
        Mã xác minh đã được gửi đến
        <br /> <strong>{newEmail}</strong>
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleVerify();
        }}
        className="w-full flex flex-col"
      >
        <div className="flex justify-center gap-2 mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-xl border-2 border-[#ccc] rounded focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
            />
          ))}
        </div>
        <p className="text-gray-500 text-center text-sm mb-4">
          {timeLeft > 0 ? `Vui lòng chờ ${timeLeft} giây để gửi lại.` : ""}
        </p>
        {timeLeft === 0 && (
          <button
            onClick={handleResend}
            className="text-center mb-3 -mt-4 text-black text-sm"
          >
            Gửi lại mã
          </button>
        )}
        {otpError && <p className="text-red-500 text-center text-sm mb-2">{otpError}</p>}
        <Button type="submit" className={`w-full ${height}`}>
          Xác nhận
        </Button>
      </form>
    </div>
  );
};

export default OTPComponent;
