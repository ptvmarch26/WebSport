import clsx from "clsx";
import React, { useState } from "react";
import order_img from "../../assets/images/order_img.jpg";
import product_img from "../../assets/images/product_img.jpg";
import voucher_img from "../../assets/images/voucher_img.jpg";
import user_img from "../../assets/images/user_img.jpg";
import not_found_img from "../../assets/images/not_found_img.jpg";
import { Button } from "@material-tailwind/react";
import AccountInfoComponent from "../../components/AccountInfoComponent/AccountInfoComponent";

const fakeNotifications = [
  {
    id: 1,
    notify_type: "Tình trạng đơn hàng",
    notify_title: "Đơn hàng đã được xác nhận",
    notify_desc: "Đơn hàng #12345 của bạn đã được xác nhận.",
    isRead: false,
  },
  {
    id: 2,
    notify_type: "Khuyến mãi",
    notify_title: "Giảm giá đặc biệt!",
    notify_desc: "Nhận ngay ưu đãi giảm 20% cho đơn hàng tiếp theo.",
    isRead: true,
  },
  {
    id: 3,
    notify_type: "Sản phẩm",
    notify_title: "Đơn hàng đang giao",
    notify_desc: "Đơn hàng #12345 đang trên đường giao đến bạn.",
    isRead: false,
  },
  {
    id: 44,
    notify_type: "Tài khoảnn",
    notify_title: "Đơn hàng đang giao",
    notify_desc: "Đơn hàng #12345 đang trên đường giao đến bạn.",
    isRead: false,
  }
];

const getNotificationImage = (type) => {
  switch (type) {
    case "Tình trạng đơn hàng":
      return order_img;
    case "Khuyến mãi":
      return voucher_img;
    case "Sản phẩm":
      return product_img;
    case "Tài khoản":
      return user_img;
    default:
      return not_found_img;
  }
};

const NotificationPage = () => {
  const [notifications, setNotifications] = useState(fakeNotifications);

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
  };

  const handleNotificationClick = (notification) => {
    setNotifications(
      notifications.map((n) =>
        n.id === notification.id ? { ...n, isRead: true } : n
      )
    );
  };

  return (
    <div className="res py-10">
      <div className="flex gap-6">
        <div>
        <AccountInfoComponent
          full_name="Dương Anh Vũ"
          user_name="rain494"
          // src_img=""
        />
        </div>
        <div className="flex-1">
          <div className="flex justify-end mb-4">
            <Button
              onClick={markAllAsRead}
              disabled={notifications.every((n) => n.isRead)}
            >
              Đánh dấu tất cả đã đọc
            </Button>
          </div>

          <div className="space-y-2">
            {notifications.length === 0 ? (
              <p className="text-center uppercase text-xl font-semibold text-gray-600">
                Hiện không có thông báo nào
              </p>
            ) : (
              notifications.map((notification) => (
                <div key={notification.id} className="mb-2">
                  <div
                    className={clsx(
                      "p-4 mb-2 shadow-sm rounded-md cursor-pointer border border-gray-300 transition-all duration-300",
                      {
                        "bg-[#e8eaed] hover:bg-gray-200": !notification.isRead,
                        "bg-white": notification.isRead,
                      }
                    )}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={getNotificationImage(notification.notify_type)}
                        alt={notification.notify_type}
                        className="w-20 h-20 rounded-md object-cover border"
                      />
                      <div>
                        <h6 className="font-semibold">
                          {notification.notify_title}
                        </h6>
                        <p className="text-sm text-gray-600">
                          {notification.notify_desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
