import { useState, useEffect } from "react";
import { FaChevronUp } from "react-icons/fa";

const ScrollToTopComponent = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Hàm xử lý khi cuộn trang
  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsVisible(true); // Hiển thị nút khi cuộn xuống 200px
    } else {
      setIsVisible(false);
    }
  };

  // Cuộn lên đầu trang khi nhấn nút
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Dùng useEffect để lắng nghe sự kiện cuộn
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Cleanup sự kiện khi component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      onClick={scrollToTop}
      className={`fixed bottom-20 lg:bottom-5 right-10 z-40 p-4 bg-primary hover:opacity-80 text-white cursor-pointer transition-opacity ${
        isVisible ? "opacity-100" : "opacity-0"
      } rounded-full w-12 h-12 flex justify-center items-center shadow-[0_4px_8px_0_rgba(255,255,255,0.3)]`}
    >
      <FaChevronUp />
    </div>
  );
};

export default ScrollToTopComponent;
