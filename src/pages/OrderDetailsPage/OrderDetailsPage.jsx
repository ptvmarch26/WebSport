import { useLocation, useParams } from "react-router-dom";
import { useOrder } from "../../context/OrderContext";
import { useEffect } from "react";
import { useUser } from "../../context/UserContext";
const OrderDetailsPage = () => {
  const { id } = useParams();

  const { fetchOrderDetail, orderDetails } = useOrder();

  useEffect(() => {
    fetchOrderDetail(id);
  },[]);

  console.log("orderDetails ", orderDetails);

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
        </p>
        <p>
          <strong className="text-sm inline-block font-semibold min-w-[100px]">
            Địa chỉ:{" "}
          </strong>{" "}
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
          {orderDetails?.order_payment_method === "cod"
            ? "Thanh toán khi nhận hàng" : ""}
        </p>
      </div>
      <div className="bg-[#f6f6f6] rounded-lg mb-4 p-5 space-y-2">
        <h3 className="text-lg uppercase font-semibold">Thông tin đơn hàng</h3>
        {orderDetails?.products.map((product, index) => (
          <div key={index} className="flex items-center gap-4 py-4 last:mb-0">
            <img
              src={product.product_id.product_img.image_main}
              alt={product.product_id.product_title}
              className="w-16 h-16 object-cover border border-gray-300 rounded"
            />
            <div className="flex-1">
              <p className="text-sm font-semibold line-clamp-1">{product.product_id.product_title}</p>
              {/* <p className="text-sm text-gray-500">{product.size}</p> */}
              <p className="text-sm">x{product.product_id.quantity}</p>
            </div>
            <div className="flex space-x-2">
              {product.product_id.product_percent_discount !=="0" && (
                <p className="text-[#9ca3af] line-through">
                  {product.product_id.product_price.toLocaleString()}đ
                </p>
              )}
              <p className="font-medium text-[#ba2b20]">
                {(product.product_id.product_price * (1- product.product_id.product_percent_discount /100)).toLocaleString()}đ
              </p>
            </div>
          </div>
        ))}
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
