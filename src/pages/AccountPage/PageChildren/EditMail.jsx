import React, { useState } from "react";

const EditEmail = () => {
  const [currentEmail, setCurrentEmail] = useState("user@example.com");
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [serverCode, setServerCode] = useState("");
  const [step, setStep] = useState(1);
  
  const handleSendCode = () => {
    if (!newEmail || !password) return alert("Vui lòng nhập đầy đủ thông tin!");
    
    const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
    setServerCode(generatedCode);
    setIsCodeSent(true);
    setStep(2);
    alert(`Mã xác nhận của bạn là: ${generatedCode}`); // Xem thử nha Thông, test thử xem ok không, css lại giùm tui cái :))) xấu điên
  };

  const handleVerifyCode = () => {
    if (verificationCode === serverCode) {
      setCurrentEmail(newEmail);
      setNewEmail("");
      setPassword("");
      setVerificationCode("");
      setIsCodeSent(false);
      setStep(1);
      alert("Email đã được cập nhật thành công!");
    } else {
      alert("Mã xác nhận không đúng!");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-semibold text-gray-800 border-b pb-4 mb-4">
        Cập nhật Email
      </h2>

      {step === 1 && (
        <div>
          <p className="mb-4">Email hiện tại: <strong>{currentEmail}</strong></p>
          <input
            type="email"
            placeholder="Nhập email mới"
            className="w-full p-3 border rounded-lg mb-4"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Nhập mật khẩu"
            className="w-full p-3 border rounded-lg mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleSendCode}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Gửi mã xác nhận
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <p className="mb-4">Nhập mã xác nhận gửi tới <strong>{newEmail}</strong></p>
          <input
            type="text"
            placeholder="Nhập mã xác nhận"
            className="w-full p-3 border rounded-lg mb-4"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <button
            onClick={handleVerifyCode}
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
          >
            Xác nhận & Cập nhật Email
          </button>
        </div>
      )}
    </div>
  );
};

export default EditEmail;
