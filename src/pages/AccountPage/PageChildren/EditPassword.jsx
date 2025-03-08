import { Button } from "@material-tailwind/react";
import React, { useState } from "react";

const EditPassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleChangePassword = () => {
    setErrors({});

    let errorMessages = {};

    if (!oldPassword) {
      errorMessages.oldPassword = "Mật khẩu hiện tại không được để trống";
    }
    if (!newPassword && !confirmPassword) {
      errorMessages.confirmPassword = "Mật khẩu mới không được để trống";
    }
    if (newPassword !== confirmPassword) {
      errorMessages.confirmPassword = "Mật khẩu không trùng khớp";
    }

    if (Object.keys(errorMessages).length > 0) {
      setErrors(errorMessages);
      return;
    }

    setErrors({});
    alert("Mật khẩu đã được cập nhật thành công!");
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="px-6 bg-white">
      <h1 className="text-[30px] font-semibold">Đổi mật khẩu</h1>
      <div className="space-y-5 mt-8">
        <div className="flex flex-col">
          <div className="flex items-center">
            <label
              htmlFor="oldPassword"
              className="min-w-[170px] block antialiased font-sans text-sm leading-normal text-inherit font-medium text-gray-900"
            >
              Mật khẩu hiện tại
            </label>
            <input
              id="oldPassword"
              type="text"
              placeholder="Nhập mật khẩu hiện tại"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className={`peer w-full bg-transparent text-gray-700 font-sans font-normal outline-none focus:outline-none disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 border focus:border-2 border-t-gray-200 focus:border-t-primary placeholder:opacity-100 focus:placeholder:opacity-100 text-sm px-3 py-3 rounded-md border-gray-200 focus:border-gray-900 `}
            />
          </div>
          <div>
            {errors.oldPassword && (
              <p className="text-red-500 text-sm ml-[175px] mt-2">
                {errors.oldPassword}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center">
            <label
              htmlFor="newPassword"
              className="min-w-[170px] block antialiased font-sans text-sm leading-normal text-inherit font-medium text-gray-900"
            >
              Mật khẩu mới
            </label>
            <input
              id="newPassword"
              type="text"
              placeholder="Nhập mật khẩu mới"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={`peer w-full bg-transparent text-gray-700 font-sans font-normal outline-none focus:outline-none disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 border focus:border-2 border-t-gray-200 focus:border-t-primary placeholder:opacity-100 focus:placeholder:opacity-100 text-sm px-3 py-3 rounded-md border-gray-200 focus:border-gray-900 `}
            />
          </div>
          <div>
            {errors.newPassword && (
              <p className="text-red-500 text-sm ml-[175px] mt-2">
                {errors.newPassword}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center">
            <label
              htmlFor="confirmPassword"
              className="min-w-[170px] block antialiased font-sans text-sm leading-normal text-inherit font-medium text-gray-900"
            >
              Xác nhận mật khẩu mới
            </label>
            <input
              id="confirmPassword"
              type="text"
              placeholder="Xác nhận mật khẩu mới"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`peer w-full bg-transparent text-gray-700 font-sans font-normal outline-none focus:outline-none disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 border focus:border-2 border-t-gray-200 focus:border-t-primary placeholder:opacity-100 focus:placeholder:opacity-100 text-sm px-3 py-3 rounded-md border-gray-200 focus:border-gray-900 `}
            />
          </div>
          <div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm ml-[175px] mt-2">
                {errors.confirmPassword}
              </p>
            )}
          </div>
        </div>

        <Button
          onClick={handleChangePassword}
          className="w-full"
        >
          Đổi mật khẩu
        </Button>
      </div>
    </div>
  );
};

export default EditPassword;
