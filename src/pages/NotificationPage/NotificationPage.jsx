import clsx from "clsx";
import { Button } from "@material-tailwind/react";
import AccountInfoComponent from "../../components/AccountInfoComponent/AccountInfoComponent";
import { IoTrashOutline } from "react-icons/io5";
import { useNotifications } from "../../context/NotificationContext";
import { readNotification, deleteNotification } from "../../services/api/NotificationApi";
import { usePopup } from "../../context/PopupContext";
import { useNavigate } from "react-router-dom";

const NotificationPage = () => {
  const { notifications, setNotifications } = useNotifications();
  const { showPopup } = usePopup();
  const navigate = useNavigate();
  const markAllAsRead = async () => {
    const unreadNotifications = notifications.filter((n) => !n.isRead);

    const updatedNotifications = [...notifications]; // tạo bản sao

    await Promise.all(
      unreadNotifications.map(async (n) => {
        const res = await readNotification(n._id);
        if (res.EC === 0) {
          const index = updatedNotifications.findIndex(
            (item) => item._id === n._id
          );
          if (index !== -1) {
            updatedNotifications[index].isRead = true;
          }
        }
      })
    );

    setNotifications(updatedNotifications);
  };

  const handleNotificationClick = async (notification) => {
    const res = await readNotification(notification._id);
    if (res.EC === 0) {
      setNotifications(
        notifications.map((n) =>
          n._id === notification._id ? { ...n, isRead: true } : n
        )
      );
      if (notification.order_id)
      navigate(`/orders/order-details/${notification.order_id}`);
    } else showPopup(res.EM, false);
  };

  const handleDeleteNotification = async (id, e) => {
    e.stopPropagation();
    const res = await deleteNotification(id);
    if (res.EC === 0)
    {
      setNotifications(
        notifications.filter((notification) => notification._id !== id)
      );
      showPopup(res.EM);
    } else showPopup(res.EM, false);
  };

  return (
    <div className="xl:max-w-[1200px] container mx-auto py-10 px-2">
      <div className="lg:flex justify-between gap-6">
        <div className="lg:block pb-10 lg:pb-0">
          <AccountInfoComponent />
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
                <div key={notification._id} className="mb-2">
                  <div
                    className={clsx(
                      "p-4 mb-2 shadow-sm rounded-md cursor-pointer border border-gray-300 transition-all duration-300 relative",
                      {
                        "bg-[#e8eaed] hover:bg-gray-200": !notification.isRead,
                        "bg-white": notification.isRead,
                      }
                    )}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700 cursor-pointer p-2"
                      onClick={(e) =>
                        handleDeleteNotification(notification._id, e)
                      }
                    >
                      <IoTrashOutline size={20} />
                    </div>

                    <div className="flex items-center gap-4">
                      <img
                        src={notification.img}
                        alt={notification.notify_type}
                        className="w-20 h-20 rounded-md object-cover border"
                      />
                      <div>
                        <h6 className="font-semibold mr-10 sm:mr-0">
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
