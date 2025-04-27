import { Button } from "@material-tailwind/react";
import { useState } from "react";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { useUser } from "../../../context/UserContext";
import { usePopup } from "../../../context/PopupContext";

const EditPassword = () => {
  const { handleChangePassword } = useUser();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [failChangePassword, setFailChangePassword] = useState("");
  const { showPopup } = usePopup();

  const handleSubmitChangePassword = async () => {
    setErrors({});
    let newErrors = {};
    if (!oldPassword)
      newErrors.oldPassword = "Vui lòng nhập mật khẩu hiện tại.";
    if (!newPassword) newErrors.newPassword = "Vui lòng nhập mật khẩu mới.";
    if (!confirmPassword)
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu mới.";

    if (newPassword && newPassword.length < 6) {
      newErrors.newPassword = "Mật khẩu mới phải có ít nhất 6 ký tự.";
    }

    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const response = await handleChangePassword(oldPassword, newPassword);
    if (response?.EC === 0) {
      showPopup(response?.EM);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      showPopup(response?.EM, false);
    }
  };

  return (
    <div className="lg:px-6 bg-white">
      <h1 className="text-3xl font-semibold">Đổi mật khẩu</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmitChangePassword();
        }}
      >
        <div className="space-y-5 mt-8">
          <div className="flex flex-col">
            <div className="flex items-center">
              <label
                htmlFor="oldPassword"
                className="min-w-[170px] block antialiased font-sans text-sm leading-normal text-inherit font-medium text-gray-900"
              >
                Mật khẩu hiện tại
              </label>
              <div className="relative w-full">
                <input
                  id="oldPassword"
                  type={showOldPassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu hiện tại"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className={`peer w-full bg-transparent text-gray-700 font-sans font-normal outline-none focus:outline-none disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 border focus:border-2 border-t-gray-200 focus:border-t-primary placeholder:opacity-100 focus:placeholder:opacity-100 text-sm px-3 py-3 rounded-md border-gray-200 focus:border-gray-900 `}
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showOldPassword ? (
                    <IoIosEyeOff className="w-5 h-5 text-gray-500" />
                  ) : (
                    <IoIosEye className="w-5 h-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>
            <div>
              {errors && (
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
              <div className="relative w-full">
                <input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu mới"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={`peer w-full bg-transparent text-gray-700 font-sans font-normal outline-none focus:outline-none disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 border focus:border-2 border-t-gray-200 focus:border-t-primary placeholder:opacity-100 focus:placeholder:opacity-100 text-sm px-3 py-3 rounded-md border-gray-200 focus:border-gray-900 `}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
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
              {errors && (
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
              <div className="relative w-full">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Xác nhận mật khẩu mới"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`peer w-full bg-transparent text-gray-700 font-sans font-normal outline-none focus:outline-none disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 border focus:border-2 border-t-gray-200 focus:border-t-primary placeholder:opacity-100 focus:placeholder:opacity-100 text-sm px-3 py-3 rounded-md border-gray-200 focus:border-gray-900 `}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
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
              {errors && (
                <p className="text-red-500 text-sm ml-[175px] mt-2">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          <Button type="submit" className="w-full">
            Đổi mật khẩu
          </Button>
          {failChangePassword && (
            <p className="text-red-500 text-sm mt-3 text-center">
              {failChangePassword}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default EditPassword;
