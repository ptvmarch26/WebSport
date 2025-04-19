import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NotificationBanner = ({ unreadCount }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (unreadCount > 0) {
      setShow(true);

      const timer = setTimeout(() => {
        setShow(false);
      }, 3000); // Tự ẩn sau 3 giây

      return () => clearTimeout(timer);
    }
  }, [unreadCount]);

  const handleClose = () => {
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="absolute top-full right-0 w-auto bg-yellow-100 text-yellow-800 px-4 py-2 shadow-md text-sm z-50 flex justify-center items-center"
        >
          <span>🛎️ Bạn có {unreadCount} thông báo chưa xem</span>
          <button
            onClick={handleClose}
            className="relative right-0 top-1/2 ml-2 text-yellow-800 hover:text-yellow-600 text-lg font-bold"
            aria-label="Đóng thông báo"
          >
            &times;
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationBanner;
