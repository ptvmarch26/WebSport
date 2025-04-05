import { useState, useEffect, use } from "react";
import { motion } from "framer-motion";
import { Button } from "@material-tailwind/react";
import { useNavigate, useLocation } from "react-router-dom";
import AccountInfoComponent from "../../components/AccountInfoComponent/AccountInfoComponent";
import { useOrder } from "../../context/OrderContext";
const OrderStatusPage = () => {
  const [activeTab, setActiveTab] = useState("all"); // Sử dụng 'all' để hiển thị tất cả
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { id: "all", label: "Tất cả" },
    { id: "Chờ xác nhận", label: "Chờ xác nhận" },
    { id: "Đang giao", label: "Đang giao" },
    { id: "Hoàn thành", label: "Hoàn thành" },
    { id: "Hủy hàng", label: "Hủy hàng" },
    { id: "Hoàn hàng", label: "Hoàn hàng" },
  ];

  const { orders, fetchOrdersByUser } = useOrder();
  useEffect(() => {
    fetchOrdersByUser();
  }, []);
  console.log("orders", orders);

  
  // Lọc đơn hàng theo trạng thái, nếu chọn "Tất cả" thì không lọc
  const filteredOrders =
    activeTab === "all"
      ? orders
      : orders.filter((order) => order.order_status === activeTab);

  const calculateTotalPrice = (products) => {
    return products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get("tab");
    if (tab) {
      setActiveTab(tabs[tab - 1]?.id || "all");
    }
  }, [location]);

  const handleTabChange = (tabId, index) => {
    setActiveTab(tabId);
    navigate(`/orders?tab=${index + 1}`);
  };

  const handleProductClick = (order) => {
    const totalPrice = calculateTotalPrice(order.products);

    navigate(`order-details`, {
      state: {
        products: order.products,
        totalPrice: totalPrice,
        orderStatus: order.status,
      },
    });
  };

  const handleFeedback = (order) => {
    navigate("order-feedback", {
      state: {
        products: order.products,
      },
    });
  };

  return (
    <div className="xl:max-w-[1200px] container mx-auto py-10 px-2">
      <div className="lg:flex justify-between gap-6">
        <div className="lg:block pb-10 lg:pb-0">
          <AccountInfoComponent/>
        </div>
        <div className="min-h-[400px] flex-1 p-6 bg-white text-black border border-gray-300 rounded-lg">
          <div className="flex border-b border-gray-300 relative">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                className={`px-4 py-2 text-sm font-medium relative transition-colors duration-300 ${
                  activeTab === tab.id
                    ? "text-black"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => handleTabChange(tab.id, index)}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="underline"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-0 left-0 h-0.5 bg-black"
                  />
                )}
              </button>
            ))}
          </div>

          {/* {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="p-4 my-5 border border-gray-300 rounded-md"
            >
              <p className="text-end uppercase text-sm font-semibold">
                {order.status}
              </p>
              {order.products.map((product, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 py-4 last:mb-0 cursor-pointer"
                  onClick={() => handleProductClick(order)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover border border-gray-300 rounded"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold line-clamp-2">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.size}</p>
                    <p className="text-sm">x{product.quantity}</p>
                  </div>
                  <div className="flex space-x-2">
                    {product.oldPrice && (
                      <p className="text-[#9ca3af] line-through">
                        {product.oldPrice.toLocaleString()}đ
                      </p>
                    )}
                    <p className="font-medium text-[#ba2b20]">
                      {product.price.toLocaleString()}đ
                    </p>
                  </div>
                </div>
              ))}
              <div className="flex justify-end space-x-4">
                <p className="font-medium">Thành tiền:</p>
                <p className="font-bold text-[#ba2b20]">
                  {calculateTotalPrice(order.products).toLocaleString()}đ
                </p>
              </div>

              <div className="mt-4 text-right space-x-2">
                {order.status === "Hoàn thành" && (
                  <>
                    <Button
                      variant="filled"
                      color="black"
                      className="w-[100px] h-[30px] sm:w-[150px] sm:h-[40px] text-white !bg-black rounded font-medium"
                      onClick={() => handleFeedback(order)}
                    >
                      Đánh giá
                    </Button>
                    <Button
                      variant="filled"
                      color="white"
                      className="w-[100px] h-[30px] sm:w-[150px] sm:h-[40px] text-black border rounded font-medium"
                    >
                      Mua lại
                    </Button>
                  </>
                )}
                {(order.status === "Hủy hàng" ||
                  order.status === "Hoàn hàng") && (
                  <Button
                    variant="filled"
                    color="black"
                    className="w-[100px] h-[30px] sm:w-[150px] sm:h-[40px] text-white !bg-black rounded font-medium"
                  >
                    Mua lại
                  </Button>
                )}
                {order.status === "Chờ xác nhận" && (
                  <Button
                    variant="filled"
                    color="black"
                    className="w-[100px] h-[30px] sm:w-[150px] sm:h-[40px] text-white !bg-black rounded font-medium"
                  >
                    Hủy đơn
                  </Button>
                )}
              </div>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default OrderStatusPage;
