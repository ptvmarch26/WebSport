import React, { useState } from "react";

const EditPassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      return alert("Vui lòng nhập đầy đủ thông tin!");
    }
    if (newPassword !== confirmPassword) {
      return alert("Mật khẩu mới không khớp!");
    }
    if (newPassword.length < 6) {
      return alert("Mật khẩu mới phải có ít nhất 6 ký tự!");
    }

    alert("Mật khẩu đã được cập nhật thành công!");
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-semibold text-gray-800 border-b pb-4 mb-4">
        Đổi mật khẩu
      </h2>

      <input
        type="password"
        placeholder="Nhập mật khẩu cũ"
        className="w-full p-3 border rounded-lg mb-4"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Nhập mật khẩu mới"
        className="w-full p-3 border rounded-lg mb-4"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Xác nhận mật khẩu mới"
        className="w-full p-3 border rounded-lg mb-4"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <button
        onClick={handleChangePassword}
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
      >
        Đổi mật khẩu
      </button>
    </div>
  );
};

export default EditPassword;
