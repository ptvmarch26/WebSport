import React, { useState } from "react";

const OrderSummaryComponent = ({
  cart,
  subtotal,
  voucherProduct,
  setVoucherProduct,
  handleApplyVoucherProduct,
  voucherShipping,
  setVoucherShipping,
  handleApplyVoucherShipping,
  onClick,
}) => {
  const [isVoucherProductValid, setIsVoucherProductValid] = useState(false);
  const [isVoucherShippingValid, setIsVoucherShippingValid] = useState(false);

  const handleVoucherProductChange = (e) => {
    const value = e.target.value.trim().toUpperCase();
    setVoucherProduct(value);
    setIsVoucherProductValid(value.length > 0);
  };

  const handleVoucherShippingChange = (e) => {
    const value = e.target.value.trim().toUpperCase();
    setVoucherShipping(value);
    setIsVoucherShippingValid(value.length > 0);
  };
  const cartDetails = cart.map((item) => {
    const selectedColor = item?.product_id?.colors.find(
      (color) => color.color_name === item.color_name
    );

    const selectedVariant = selectedColor?.variants.find(
      (variant) => variant.variant_size === item.variant_name
    );

    const imageToDisplay =
      selectedVariant?.imgs?.img_main ||
      selectedColor?.imgs?.img_main ||
      item?.product_id?.product_img;

    const variantPrice = selectedVariant?.variant_price;

    return {
      item,
      imageToDisplay,
      variantPrice,
    };
  });

  console.log("cart", cartDetails);

  return (
    <div className="space-y-4 lg:sticky lg:top-24">
      {cartDetails.map((item, index) => (
        <div key={index}>
          <div className="flex justify-between items-center">
            <div>
              <img
                src={item?.imageToDisplay}
                alt={item?.item.product_id?.product_title}
                className="w-16 h-16 object-cover"
              />
            </div>
            <div className="flex justify-between items-center flex-1 mx-4 space-x-2">
              <div>

                <h4 className="text-sm line-clamp-1">
                  {item?.item?.product_id?.product_title}
                </h4>
                {/* <p className="text-xs">Size: {item.size}</p> */}
                <p className="text-xs">
                  {item.item.color_name} - {item.item.variant_name}
                </p>
                <p className="text-xs">x{item.item.quantity}</p>
              </div>
              <div>
                <p className="text-sm">
                  {(
                    item?.variantPrice *
                    (1 - item.item.product_id?.product_percent_discount / 100)
                  ).toLocaleString()}
                  ₫
                </p>
              </div>
            </div>
          </div>
          <div className="border-t-[1px] border-[rgba(0, 0, 0, 0.1)] w-full my-5"></div>
        </div>
      ))}
      <div>
        <div className="flex items-center my-4 space-x-2">
          <div className="relative w-full mb-3 flex flex-nowrap lg:flex-wrap xl:flex-nowrap space-x-2 lg:space-x-0 xl:space-x-2 gap-y-2">
            <input
              id="voucher"
              type="text"
              value={voucherProduct}
              onChange={handleVoucherProductChange}
              className="flex-1 peer p-2 border rounded focus:ring-black placeholder-transparent"
              placeholder="Mã giảm giá"
            />
            <label
              htmlFor="voucher"
              className="absolute !text-sm bg-white px-1 left-1.5 top-3 text-black transition-all transform origin-left peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-focus:-top-3 peer-focus:left-1.5 peer-[&:not(:placeholder-shown)]:-top-3 peer-[&:not(:placeholder-shown)]:left-1.5 peer-focus:text-xs peer-focus:text-black peer-focus:scale-90 cursor-text peer-not-placeholder-shown:opacity-0"
            >
              Mã giảm giá
            </label>
            <button
              className={`p-3 text-sm w-[150px] lg:w-full text-white rounded uppercase ${
                !isVoucherProductValid
                  ? "bg-[rgb(246,246,246)] !text-[#ccc] cursor-not-allowed"
                  : "bg-black hover:opacity-80"
              }`}
              onClick={handleApplyVoucherProduct}
              disabled={!isVoucherProductValid}
            >
              Áp dụng
            </button>
          </div>
          
        </div>
        <div className="flex items-center my-4 space-x-2">
          <div className="relative w-full mb-3 flex flex-nowrap lg:flex-wrap xl:flex-nowrap space-x-2 lg:space-x-0 xl:space-x-2 gap-y-2">
            <input
              id="voucher"
              type="text"
              value={voucherShipping}
              onChange={handleVoucherShippingChange}
              className="flex-1 peer p-2 border rounded focus:ring-black placeholder-transparent"
              placeholder="Mã vận chuyển"
            />
            <label
              htmlFor="voucher"
              className="absolute !text-sm bg-white px-1 left-1.5 top-3 text-black transition-all transform origin-left peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-focus:-top-3 peer-focus:left-1.5 peer-[&:not(:placeholder-shown)]:-top-3 peer-[&:not(:placeholder-shown)]:left-1.5 peer-focus:text-xs peer-focus:text-black peer-focus:scale-90 cursor-text peer-not-placeholder-shown:opacity-0"
            >
              Mã vận chuyển
            </label>
            <button
              className={`p-3 text-sm w-[150px] lg:w-full text-white rounded uppercase ${
                !isVoucherShippingValid
                  ? "bg-[rgb(246,246,246)] !text-[#ccc] cursor-not-allowed"
                  : "bg-black hover:opacity-80"
              }`}
              onClick={handleApplyVoucherShipping}
              disabled={!isVoucherShippingValid}
            >
              Áp dụng
            </button>
          </div>
          
        </div>
        <div className="flex justify-between text-sm">
          <span>Tạm tính</span>
          <span>{subtotal.toLocaleString()}₫</span>
        </div>
        <div className="flex justify-between text-sm mt-4">
          <span>Tiền vận chuyển</span>
          <span>Free</span>
        </div>
        <hr className="my-4" />
        <div className="flex justify-between text-md font-bold">
          <span>Tổng tiền</span>
          <span>{subtotal.toLocaleString()}₫</span>
        </div>
        <button
          onClick={onClick}
          className="mt-4 p-3 bg-black hover:opacity-80 text-white w-full rounded uppercase"
        >
          Đặt hàng
        </button>
      </div>
    </div>
  );
};

export default OrderSummaryComponent;
