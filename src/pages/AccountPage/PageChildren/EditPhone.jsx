import React, { useState } from "react";

const EditPhone = () => {
  const [currentPhone, setCurrentPhone] = useState("0123456789"); // Số hiện tại
  const [newPhone, setNewPhone] = useState(""); // Số mới
  const [otp, setOtp] = useState(""); // Nhập mã OTP
  const [serverOtp, setServerOtp] = useState(""); // Mã OTP từ server
  const [step, setStep] = useState(1); 

  const handleSendOtp = () => {
    if (!newPhone) return alert("Vui lòng nhập số điện thoại mới!");
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setServerOtp(generatedOtp);
    setStep(2);
    alert(`Mã OTP của bạn: ${generatedOtp}`); // Trong thực tế, mã này sẽ được gửi qua SMS
  };

  // Xác thực OTP
  const handleVerifyOtp = () => {
    if (otp === serverOtp) {
      setCurrentPhone(newPhone);
      setNewPhone("");
      setOtp("");
      setServerOtp("");
      setStep(1);
      alert("Cập nhật số điện thoại thành công!");
    } else {
      alert("Mã OTP không đúng!");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-semibold text-gray-800 border-b pb-4 mb-4">Cập nhật Số Điện Thoại</h2>

      {step === 1 && (
        <div>
          <p className="mb-4">Số hiện tại: <strong>{currentPhone}</strong></p>
          <input
            type="tel"
            placeholder="Nhập số điện thoại mới"
            className="w-full p-3 border rounded-lg mb-4"
            value={newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
          />
          <button
            onClick={handleSendOtp}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Gửi mã OTP
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <p className="mb-4">Nhập mã OTP đã gửi tới <strong>{newPhone}</strong></p>
          <input
            type="text"
            placeholder="Nhập mã OTP"
            className="w-full p-3 border rounded-lg mb-4"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button
            onClick={handleVerifyOtp}
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
          >
            Xác nhận & Cập nhật Số Điện Thoại
          </button>
        </div>
      )}
    </div>
  );
};

export default EditPhone;
