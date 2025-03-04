import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@material-tailwind/react";
import { useNavigate, useLocation } from "react-router-dom";

const OrderStatusPage = () => {
  const [activeTab, setActiveTab] = useState("all");  // Sử dụng 'all' để hiển thị tất cả
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

  const orders = [
    {
      id: 1,
      status: "Hủy hàng", 
      products: [
        {
          name: "Gel vệ sinh răng miệng đánh bay mảng bám cao răng",
          size: "14.8ml",
          quantity: 1,
          price: 83100,
          oldPrice: 10000,
          image:
            "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/403542/01/sv01/fnd/PNA/fmt/png/ST-Miler-Camo-Sneakers",
        },
      ],
    },
    {
      id: 2,
      status: "Hoàn thành", 
      products: [
        {
          name: "Dầu gội dưỡng ẩm cho thú cưng",
          size: "250ml",
          quantity: 1,
          price: 129000,
          oldPrice: 150000,
          image:
            "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/403542/01/sv01/fnd/PNA/fmt/png/ST-Miler-Camo-Sneakers",
        },
        {
          name: "Bàn chải đánh răng cho thú cưng",
          size: "M",
          quantity: 2,
          price: 50000,
          oldPrice: 60000,
          image:
            "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/403542/01/sv01/fnd/PNA/fmt/png/ST-Miler-Camo-Sneakers",
        },
      ],
    },
    {
      id: 3,
      status: "Chờ xác nhận", 
      products: [
        {
          name: "Bàn chải đánh răng cho thú cưng",
          size: "M",
          quantity: 2,
          price: 50000,
          oldPrice: 60000,
          image:
            "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/403542/01/sv01/fnd/PNA/fmt/png/ST-Miler-Camo-Sneakers",
        },
        {
          name: "Bàn chải đánh răng cho thú cưng",
          size: "M",
          quantity: 2,
          price: 50000,
          oldPrice: 60000,
          image:
            "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/403542/01/sv01/fnd/PNA/fmt/png/ST-Miler-Camo-Sneakers",
        },
      ],
    },
  ];

  // Lọc đơn hàng theo trạng thái, nếu chọn "Tất cả" thì không lọc
  const filteredOrders =
    activeTab === "all"
      ? orders
      : orders.filter((order) => order.status === activeTab);

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
  }

  return (
    <div className="res py-10">
      <div className="min-h-[400px] p-6 bg-white text-black border border-gray-300 rounded-lg">
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

        {filteredOrders.map((order) => (
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
                  <p className="text-sm font-semibold">{product.name}</p>
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
                    className="w-[150px] h-[40px] text-white !bg-black rounded font-medium"
                    onClick={() => handleFeedback(order)}
                  >
                    Đánh giá
                  </Button>
                  <Button
                    variant="filled"
                    color="white"
                    className="w-[150px] h-[40px] text-black border rounded font-medium"
                  >
                    Mua lại
                  </Button>
                </>
              )}
              {(order.status === "Hủy hàng" || order.status === "Hoàn hàng") && (
                <Button
                  variant="filled"
                  color="black"
                  className="w-[150px] h-[40px] text-white !bg-black rounded font-medium"
                >
                  Mua lại
                </Button>
              )}
              {order.status === "Chờ xác nhận" && (
                <Button
                  variant="filled"
                  color="black"
                  className="w-[150px] h-[40px] text-white !bg-black rounded font-medium"
                >
                  Hủy đơn
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderStatusPage;
