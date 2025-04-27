import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@material-tailwind/react";
import { useOrder } from "../../context/OrderContext";
import { useNavigate, useLocation } from "react-router-dom";
import AccountInfoComponent from "../../components/AccountInfoComponent/AccountInfoComponent";
import ConfirmDialogComponent from "../../components/ConfirmDialogComponent/ConfirmDialogComponent";
import { usePopup } from "../../context/PopupContext";

const OrderStatusPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();
  const location = useLocation();
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [openRequireRefundDialog, setOpenRequireRefundDialog] = useState(false);
  const [openCancelRequireRefundDialog, setOpenCancelRequireRefundDialog] =
    useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { showPopup } = usePopup();
  const { orders, setOrders, fetchOrdersByUser, handleUpdateOrderStatus } =
    useOrder();

  useEffect(() => {
    fetchOrdersByUser();
  }, []);

  const tabs = [
    { id: "all", label: "Tất cả" },
    { id: "Chờ xác nhận", label: "Chờ xác nhận" },
    { id: "Đang chuẩn bị hàng", label: "Đang chuẩn bị hàng" },
    { id: "Đang giao", label: "Đang giao" },
    { id: "Hoàn thành", label: "Hoàn thành" },
    { id: "Yêu cầu hoàn", label: "Yêu cầu hoàn" },
    { id: "Hoàn hàng", label: "Hoàn hàng" },
    { id: "Hủy hàng", label: "Hủy hàng" },
  ];
  const filteredOrders = useMemo(() => {
    const sorted = [...(orders || [])].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    return activeTab === "all"
      ? sorted
      : sorted.filter((order) => order.order_status === activeTab);
  }, [orders, activeTab]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get("tab");
    if (tab) {
      setActiveTab(tabs[tab - 1]?.id || "all");
    }
  }, [location]);

  const handleTabChange = (tabId, index) => {
    navigate(`/orders?tab=${index + 1}`);
    setActiveTab(tabId);
  };

  const confirmCancelOrder = async () => {
    if (selectedOrder) {
      const result = await handleUpdateOrderStatus(selectedOrder, "Hủy hàng");
      if (result.EC === 0) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === selectedOrder
              ? { ...order, order_status: "Hủy hàng" }
              : order
          )
        );
        if (
          result.result.order_payment_method === "Paypal" &&
          result.result.is_paid
        )
          showPopup(result.EM);
        else showPopup("Hủy đơn hàng thành công");
      } else showPopup(result.EM, false);
    }
    setOpenCancelDialog(false);
    setSelectedOrder(null);
  };

  const confirmRequireRefund = async () => {
    if (selectedOrder) {
      const result = await handleUpdateOrderStatus(
        selectedOrder,
        "Yêu cầu hoàn"
      );
      if (result.EC === 0) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === selectedOrder
              ? { ...order, order_status: "Yêu cầu hoàn" }
              : order
          )
        );
        showPopup(result.EM);
      } else showPopup(result.EM, false);
    }
    setOpenRequireRefundDialog(false);
    setSelectedOrder(null);
  };

  const confirmCancelRequireRefund = async () => {
    if (selectedOrder) {
      const result = await handleUpdateOrderStatus(selectedOrder, "Hoàn thành");
      if (result.EC === 0) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === selectedOrder
              ? { ...order, order_status: "Hoàn thành" }
              : order
          )
        );
        showPopup(result.EM);
      } else showPopup(result.EM, false);
    }
    setOpenCancelRequireRefundDialog(false);
    setSelectedOrder(null);
  };

  // Hàm tìm giá variant và hình ảnh dựa vào màu sắc và kích thước
  const findProductDetails = (product) => {
    const colorOption = product.product_id?.colors.find(
      (c) => c.color_name === product.color
    );

    let variantPrice = product.product_id?.product_price;
    let productImage = product.product_id?.product_img;

    if (colorOption) {
      productImage = colorOption.imgs.img_main;

      // Tìm biến thể tương ứng
      const variantOption = colorOption.variants.find(
        (v) => v.variant_size === product.variant
      );

      if (variantOption) {
        variantPrice = variantOption.variant_price;
      }
    }

    return { variantPrice, productImage };
  };

  const handleProductClick = (order) => {
    navigate(`order-details/${order._id}`);
  };

  const handleFeedback = (order) => {
    navigate(`order-feedback/${order._id}`);
  };

  return (
    <div className="xl:max-w-[1200px] container mx-auto py-10 px-2">
      <div className="lg:flex justify-between gap-6">
        <div className="lg:block pb-10 lg:pb-0">
          <AccountInfoComponent />
        </div>
        <div className="min-h-[400px] w-full overflow-x-auto custom-scroll flex-1 p-6 bg-white text-black border border-gray-300 rounded-lg">
          <div className="border-b border-gray-300 relative overflow-x-auto">
            <div className="flex whitespace-nowrap">
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
          </div>

          {filteredOrders?.map((order) => (
            <div
              key={order._id}
              className="p-4 my-5 border border-gray-300 rounded-md"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm font-semibold text-end sm:text-start gap-1 sm:gap-4">
                <p className="uppercase">{order.order_status}</p>
                <p className="uppercase">
                  <span
                    className={
                      order.is_paid ? "text-green-600" : "text-red-600"
                    }
                  >
                    {order.order_status === "Hoàn hàng"
                      ? "Đã hoàn tiền"
                      : `${
                          order.is_paid ? "Đã thanh toán" : "Chưa thanh toán"
                        } (${order.order_payment_method})`}
                  </span>
                </p>
              </div>
              {order.products.map((product, index) => {
                const { variantPrice, productImage } =
                  findProductDetails(product);
                const discountedPrice =
                  product.product_id?.product_percent_discount > 0
                    ? (variantPrice *
                        (100 - product.product_id?.product_percent_discount)) /
                      100
                    : variantPrice;

                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 py-4 last:mb-0 cursor-pointer"
                    onClick={() => handleProductClick(order)}
                  >
                    <img
                      src={productImage}
                      alt={product.product_id?.product_title}
                      className="w-16 h-16 object-cover border border-gray-300 rounded"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-semibold line-clamp-2">
                        {product.product_id?.product_title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {product.color} - {product.variant}
                      </p>
                      <p className="text-sm">x{product.quantity}</p>
                    </div>
                    <div className="flex space-x-2">
                      {discountedPrice &&
                        product.product_id?.product_percent_discount > 0 && (
                          <p className="text-[#9ca3af] line-through">
                            {discountedPrice?.toLocaleString()}đ
                          </p>
                        )}
                      <p className="font-medium text-[#ba2b20]">
                        {variantPrice?.toLocaleString()}đ
                      </p>
                    </div>
                  </div>
                );
              })}
              <div className="flex justify-end space-x-4">
                <p className="font-medium">Thành tiền:</p>
                <p className="font-bold text-[#ba2b20]">
                  {order.order_total_final?.toLocaleString()}đ
                </p>
              </div>

              <div className="mt-4 text-right space-x-2">
                {order.order_status === "Hoàn thành" && (
                  <>
                    {!order.is_require_refund && (
                      <Button
                        variant="filled"
                        color="blue"
                        className="w-[120px] h-[30px] sm:w-[150px] sm:h-[40px] rounded font-medium"
                        onClick={() => {
                          const receivedDate = new Date(order.received_date);
                          const now = new Date();
                          const diffInDays = Math.floor(
                            (now - receivedDate) / (1000 * 60 * 60 * 24)
                          );

                          if (diffInDays > 3) {
                            showPopup(
                              "Không thể hoàn đơn hàng đã quá 3 ngày kể từ ngày nhận hàng",
                              false
                            );
                          } else {
                            setSelectedOrder(order._id);
                            setOpenRequireRefundDialog(true);
                          }
                        }}
                      >
                        Yêu cầu hoàn
                      </Button>
                    )}
                    {!order.is_feedback && (
                      <Button
                        variant="filled"
                        color="black"
                        className="w-[100px] h-[30px] sm:w-[150px] sm:h-[40px] text-white !bg-black rounded font-medium"
                        onClick={() => handleFeedback(order)}
                      >
                        Đánh giá
                      </Button>
                    )}
                    <Button
                      variant="filled"
                      color="white"
                      className="w-[100px] h-[30px] sm:w-[150px] sm:h-[40px] text-black border rounded font-medium"
                      onClick={() => {
                        navigate("/checkout", {
                          state: { fromBuyAgain: order.products },
                        });
                      }}
                    >
                      Mua lại
                    </Button>
                  </>
                )}
                {order.order_status === "Yêu cầu hoàn" && (
                  <Button
                    variant="filled"
                    color="black"
                    className="w-[100px] h-[30px] sm:w-[150px] sm:h-[40px] rounded font-medium border transition duration-200 bg-yellow-100 text-yellow-700 border-yellow-400 hover:brightness-110"
                    onClick={() => {
                      setSelectedOrder(order._id);
                      setOpenCancelRequireRefundDialog(true);
                    }}
                  >
                    Hủy yêu cầu
                  </Button>
                )}
                {order.order_status === "Hủy hàng" && (
                  <>
                    <Button
                      variant="filled"
                      color="black"
                      className="w-[100px] h-[30px] sm:w-[150px] sm:h-[40px] text-white !bg-black rounded font-medium"
                      onClick={() => {
                        navigate("/checkout", {
                          state: { fromBuyAgain: order.products },
                        });
                      }}
                    >
                      Mua lại
                    </Button>
                  </>
                )}
                {order.order_status === "Hoàn hàng" && (
                  <Button
                    variant="filled"
                    color="black"
                    className="w-[100px] h-[30px] sm:w-[150px] sm:h-[40px] text-white !bg-black rounded font-medium"
                    onClick={() => {
                      navigate("/checkout", {
                        state: { fromBuyAgain: order.products },
                      });
                    }}
                  >
                    Mua lại
                  </Button>
                )}
                {order.order_status === "Chờ xác nhận" && (
                  <div className="flex flex-wrap gap-2 justify-end">
                    {!order.is_paid &&
                      order.order_payment_method === "Paypal" &&
                      order.checkoutUrl && (
                        <Button
                          variant="filled"
                          color="blue"
                          className="w-[150px] h-[30px] sm:h-[40px] rounded font-medium"
                          onClick={() => {
                            if (!order.checkoutUrl)
                              showPopup(
                                "Lỗi khi thực hiện thanh toán lại",
                                false
                              );
                            else {
                              showPopup("Chuyển hướng tới trang thanh toán");
                              setTimeout(() => {
                                window.location.href = order.checkoutUrl;
                              }, 2000);
                            }
                          }}
                        >
                          Thanh toán lại
                        </Button>
                      )}
                    <Button
                      variant="filled"
                      color="black"
                      className="w-[100px] h-[30px] sm:w-[150px] sm:h-[40px] text-white !bg-black rounded font-medium"
                      onClick={() => {
                        setSelectedOrder(order._id);
                        setOpenCancelDialog(true);
                      }}
                    >
                      Hủy đơn
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <ConfirmDialogComponent
        open={openCancelDialog}
        onClose={() => {
          setOpenCancelDialog(false);
          setSelectedOrder(null);
        }}
        onConfirm={confirmCancelOrder}
        title="Xác nhận hủy đơn"
        message="Bạn có chắc chắn muốn hủy đơn hàng này không?"
      />
      <ConfirmDialogComponent
        open={openRequireRefundDialog}
        onClose={() => {
          setOpenRequireRefundDialog(false);
          setSelectedOrder(null);
        }}
        onConfirm={confirmRequireRefund}
        title={"Xác nhận yêu cầu hoàn hàng"}
        message={"Bạn có chắc chắn muốn yêu cầu hoàn đơn hàng này không?"}
      />
      <ConfirmDialogComponent
        open={openCancelRequireRefundDialog}
        onClose={() => {
          setOpenCancelRequireRefundDialog(false);
          setSelectedOrder(null);
        }}
        onConfirm={confirmCancelRequireRefund}
        title={"Xác nhận hủy yêu cầu hoàn hàng"}
        message={"Bạn có chắc chắn muốn hủy yêu cầu hoàn đơn hàng này không?"}
      />
    </div>
  );
};

export default OrderStatusPage;
