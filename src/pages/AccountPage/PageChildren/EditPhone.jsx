import { Button } from "@material-tailwind/react";
import React, { useState } from "react";

const EditPhone = () => {
  const [currentPhone, setCurrentPhone] = useState("0123456789");
  const [newPhone, setNewPhone] = useState("");
  const [error, setError] = useState(""); // State to handle error messages

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const handleUpdatePhone = () => {
    if (!newPhone) {
      setError("Số điện thoại không được để trống");
      return;
    }

    if (!validatePhoneNumber(newPhone)) {
      setError("Số điện thoại không đúng định dạng");
      return;
    }

    setCurrentPhone(newPhone);
    setNewPhone("");
    setError("");
    alert("Cập nhật số điện thoại thành công!");
  };

  return (
    <div className="px-6 bg-white">
      <h1 className="text-[30px] font-semibold">Đổi số điện thoại</h1>

      <div className="space-y-5 mt-8">
        <div className="flex items-center">
          <label
            htmlFor="currentPhone"
            className="min-w-[150px] block antialiased font-sans text-sm leading-normal text-inherit font-medium text-gray-900"
          >
            Số điện thoại hiện tại
          </label>
          <input
            id="currentPhone"
            type="tel"
            value={currentPhone}
            disabled
            className={`cursor-not-allowed peer w-full bg-transparent text-gray-700 font-sans font-normal outline-none focus:outline-none disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 border focus:border-2 border-t-gray-200 focus:border-t-primary placeholder:opacity-0 focus:placeholder:opacity-100 text-sm px-3 py-3 rounded-md border-gray-200 focus:border-gray-900 `}
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center">
            <label
              htmlFor="newPhone"
              className="min-w-[150px] block antialiased font-sans text-sm leading-normal text-inherit font-medium text-gray-900"
            >
              Số điện thoại mới
            </label>
            <input
              id="newPhone"
              type="tel"
              placeholder="Nhập số điện thoại mới"
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              className={`peer w-full bg-transparent text-gray-700 font-sans font-normal outline-none focus:outline-none disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 border focus:border-2 border-t-gray-200 focus:border-t-primary placeholder:opacity-100 focus:placeholder:opacity-100 text-sm px-3 py-3 rounded-md border-gray-200 focus:border-gray-900 `}
            />
          </div>
          <div>
            {error && (
              <p className="text-red-500 text-sm ml-[155px] mt-2">{error}</p>
            )}
          </div>
        </div>
        <Button onClick={handleUpdatePhone} className="w-full">
          Đổi số Điện Thoại
        </Button>
      </div>
    </div>
  );
};

export default EditPhone;
