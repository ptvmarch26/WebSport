import { useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import success from "../../assets/images/success.png";
import fail from "../../assets/images/fail.png";

const PopupComponent = ({
  message,
  timeout = 2000,
  onClose,
  isSuccess = true,
}) => {
  useEffect(() => {
    if (timeout) {
      const timer = setTimeout(onClose, timeout);
      return () => clearTimeout(timer);
    }
  }, [timeout, onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[1000]">
      {/* Overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black bg-opacity-50"
      ></div>

      {/* Popup */}
      <div className="relative bg-white rounded-lg shadow-lg w-96 max-w-full p-6 flex flex-col items-center animate-fadeIn">
        <img
          src={isSuccess ? success : fail}
          alt="Status"
          className="w-12 h-12"
        />
        <p className="mt-3 text-center text-gray-700 text-sm">
          {message || "Đã xảy ra lỗi, vui lòng thử lại."}
        </p>
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
          onClick={onClose}
        >
          <IoMdClose />
        </button>
      </div>
    </div>
  );
};

export default PopupComponent;
