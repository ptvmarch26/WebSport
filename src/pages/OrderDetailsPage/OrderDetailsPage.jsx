import { useLocation } from "react-router-dom";

const OrderDetailsPage = () => {
  const location = useLocation();
  const { products, totalPrice, orderStatus } =
    location.state || {};

  return (
    <div className="res py-10">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold uppercase mb-4">Chi tiết đơn hàng</h1>
        <p className="text-sm font-semibold">{orderStatus}</p>
      </div>
      <div className="bg-[#f6f6f6] rounded-lg mb-4 p-5 space-y-2">
        <h3 className="text-lg uppercase font-semibold">Thông tin nhận hàng</h3>
        <p>
          <strong className="text-sm inline-block font-semibold min-w-[100px]">
            Người nhận:{" "}
          </strong>
          Phi Thông
        </p>
        <p>
          <strong className="text-sm inline-block font-semibold min-w-[100px]">
            Số điện thoại:{" "}
          </strong>
          0909
        </p>
        <p>
          <strong className="text-sm inline-block font-semibold min-w-[100px]">
            Địa chỉ:{" "}
          </strong>{" "}
          KTX KHU A DHQG
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
          Khi nhận hàng
        </p>
      </div>
      <div className="bg-[#f6f6f6] rounded-lg mb-4 p-5 space-y-2">
        <h3 className="text-lg uppercase font-semibold">Thông tin nhận hàng</h3>
        {products.map((product, index) => (
          <div key={index} className="flex items-center gap-4 py-4 last:mb-0">
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
          <p className="font-medium">Tổng tiền:</p>
          <p className="font-bold text-[#ba2b20]">
            {totalPrice.toLocaleString()}đ
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
