import { useParams } from "react-router-dom";
import { useOrder } from "../../context/OrderContext";
import { useEffect } from "react";
import { usePopup } from "../../context/PopupContext";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const { fetchOrderDetail, orderDetails } = useOrder();
  const { showPopup } = usePopup();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const code = query.get("code");
    const status = query.get("status");
    const cancel = query.get("cancel") === "true";
    if (code === "00" && status === "PAID" && !cancel) {
      showPopup(
        "Thanh toán đơn hàng thành công, cảm ơn quý khách đã sử dụng dịch vụ tại WTM Sport",
        true,
        5000
      );
    } else if (code === "00" && status === "SUCCESS" && !cancel) {
      showPopup(
        "Đặt hàng thành công, cảm ơn quý khách đã sử dụng dịch vụ tại WTM Sport"
      ),
        true,
        5000;
    }

    fetchOrderDetail(id);
  }, [id]);

  // Hàm tìm giá variant và hình ảnh dựa vào màu sắc và kích thước
  const findProductDetails = (product) => {
    const colorOption = product.product_id.colors.find(
      (c) => c.color_name === product.color
    );

    let variantPrice = product.product_id.product_price;
    let productImage = product.product_id.product_img;

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

  return (
    <div className="xl:max-w-[1200px] container mx-auto py-10 px-2">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold uppercase mb-4">Chi tiết đơn hàng</h1>
        <p className="text-sm font-semibold">{orderDetails?.order_status}</p>
      </div>
      <div className="bg-[#f6f6f6] rounded-lg mb-4 p-5 space-y-2">
        <h3 className="text-lg uppercase font-semibold">Thông tin nhận hàng</h3>
        <p>
          <strong className="text-sm inline-block font-semibold min-w-[100px]">
            Người nhận:{" "}
          </strong>
          {orderDetails?.shipping_address?.name}
        </p>
        <p>
          <strong className="text-sm inline-block font-semibold min-w-[100px]">
            Số điện thoại:{" "}
          </strong>
          {orderDetails?.shipping_address?.phone}
        </p>{" "}
        <p>
          <strong className="text-sm inline-block font-semibold min-w-[100px]">
            Địa chỉ:{" "}
          </strong>
          {orderDetails?.shipping_address?.home_address},{" "}
          {orderDetails?.shipping_address?.ward},{" "}
          {orderDetails?.shipping_address?.district},{" "}
          {orderDetails?.shipping_address?.province}
        </p>
      </div>
      <div className="bg-[#f6f6f6] rounded-lg mb-4 p-5 space-y-2">
        <h3 className="text-lg uppercase font-semibold">
          Phương thức thanh toán
        </h3>
        <p>
          <strong className="text-sm inline-block font-semibold min-w-[100px]">
            Thanh toán:{" "}
          </strong>
          {orderDetails?.order_payment_method === "Cod"
            ? "Thanh toán khi nhận hàng"
            : orderDetails?.order_payment_method}
        </p>
        <p>
          <strong className="text-sm inline-block font-semibold min-w-[100px]">
            Trạng thái:{" "}
          </strong>
          {orderDetails?.order_status === "Hoàn hàng"
            ? "Đã hoàn tiền"
            : orderDetails?.is_paid
            ? "Đã thanh toán"
            : "Chưa thanh toán"}
        </p>
        {orderDetails?.estimated_delivery_date && (
          <p>
            <strong className="text-sm inline-block font-semibold min-w-[100px]">
              Dự kiến giao:{" "}
            </strong>
            {new Date(orderDetails.estimated_delivery_date).toLocaleDateString(
              "vi-VN"
            )}
          </p>
        )}
        {orderDetails?.received_date && (
          <p>
            <strong className="text-sm inline-block font-semibold min-w-[100px]">
              Đã nhận hàng:{" "}
            </strong>
            {new Date(orderDetails.received_date).toLocaleDateString("vi-VN")}
          </p>
        )}
      </div>
      <div className="bg-[#f6f6f6] rounded-lg mb-4 p-5 space-y-2">
        <h3 className="text-lg uppercase font-semibold">Thông tin đơn hàng</h3>
        {orderDetails?.products.map((product, index) => {
          const { variantPrice, productImage } = findProductDetails(product);
          const discountedPrice =
            product.product_id.product_percent_discount > 0
              ? (variantPrice *
                  (100 - product.product_id.product_percent_discount)) /
                100
              : variantPrice;

          return (
            <div key={index} className="flex items-center gap-4 py-4 last:mb-0">
              <img
                src={productImage}
                alt={product.product_id.product_title}
                className="w-16 h-16 object-cover border border-gray-300 rounded"
              />
              <div className="flex-1">
                <p className="text-sm font-semibold line-clamp-1">
                  {product.product_id.product_title}
                </p>
                <p className="text-sm text-gray-500">
                  {product.color} - {product.variant}
                </p>
                <p className="text-sm">x{product.quantity}</p>
              </div>
              <div className="flex space-x-2">
                {product.product_id.product_percent_discount > 0 && (
                  <p className="text-[#9ca3af] line-through">
                    {variantPrice.toLocaleString()}đ
                  </p>
                )}
                <p className="font-medium text-[#ba2b20]">
                  {discountedPrice.toLocaleString()}đ
                </p>
              </div>
            </div>
          );
        })}
        <div className="flex justify-end space-x-4">
          <p className="font-medium">Tổng tiền:</p>
          <p className="font-bold text-[#ba2b20]">
            {orderDetails?.order_total_final.toLocaleString()}đ
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
