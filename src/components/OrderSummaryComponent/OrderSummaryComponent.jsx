import { useState, useEffect } from "react";
import { usePopup } from "../../context/PopupContext";

const OrderSummaryComponent = ({
  cart,
  productVouchers = [],
  shippingVouchers = [],
  onClick,
  handleApplyVoucher,
}) => {
    const { showPopup } = usePopup();
  const [vouchers, setVouchers] = useState({
    product: {
      code: "",
      isValid: false,
      showList: false,
      applied: false,
      selectedVoucher: null,
    },
    shipping: {
      code: "",
      isValid: false,
      showList: false,
      applied: false,
      selectedVoucher: null,
    },
  });

  useEffect(() => {
    if (handleApplyVoucher) {
      handleApplyVoucher(vouchers);
    }
  }, [vouchers]);

  const cartDetails = cart.map((item) => {
    const selectedColor = item?.product_id?.colors?.find(
      (color) => color.color_name === item.color_name
    );

    const selectedVariant = selectedColor?.variants?.find(
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

  const subtotal = cartDetails.reduce((acc, item) => {
    return acc + item.variantPrice * item.item.quantity;
  }, 0);

  const shippingCost = 50000;
  const [finalTotal, setFinalTotal] = useState(subtotal + shippingCost);

  useEffect(() => {
    let total = subtotal;

    // Giảm giá sản phẩm
    if (vouchers.product.applied && vouchers.product.selectedVoucher) {
      total =
        total * (1 - vouchers.product.selectedVoucher.discount_number / 100);
    }

    let shipping = shippingCost;

    // Giảm giá vận chuyển
    if (vouchers.shipping.applied && vouchers.shipping.selectedVoucher) {
      shipping =
        shipping *
        (1 - vouchers.shipping.selectedVoucher.discount_number / 100);
    }

    setFinalTotal(total + shipping);
  }, [vouchers.shipping.applied, vouchers.product.applied, subtotal]);

  const handleVoucherChange = (type, e) => {
    const value = e.target.value.trim().toUpperCase();

    setVouchers((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        code: value,
        isValid: value.length > 0,
        applied: false,
      },
    }));
  };

  const handleSelectVoucher = (type, voucher) => {
    setVouchers((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        code: voucher.discount_code,
        isValid: true,
        showList: false,
        applied: false,
        selectedVoucher: voucher,
      },
    }));
  };

  // Áp dụng voucher
  const applyVoucher = (type) => {
    if (type === "product") {
      const foundVoucher = productVouchers.find(
        (voucher) =>
          voucher.discount_code.toUpperCase() ===
          vouchers.product.code.toUpperCase()
      );

      if (foundVoucher) {
        setVouchers((prev) => ({
          ...prev,
          product: {
            ...prev.product,
            applied: true,
            showList: false,
            selectedVoucher: foundVoucher,
          },
        }));
      } else {
        showPopup("Mã giảm giá sản phẩm không tồn tại", false);
      }
    } else if (type === "shipping") {
      const foundVoucher = shippingVouchers.find(
        (voucher) =>
          voucher.discount_code.toUpperCase() ===
          vouchers.shipping.code.toUpperCase()
      );

      if (foundVoucher) {
        setVouchers((prev) => ({
          ...prev,
          shipping: {
            ...prev.shipping,
            applied: true,
            showList: false,
            selectedVoucher: foundVoucher,
          },
        }));
      } else {
        showPopup("Mã giảm giá vận chuyển không tồn tại", false);
      }
    }
  };

  // Hiển thị danh sách voucher
  const toggleVoucherList = (type) => {
    setVouchers((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        showList: !prev[type].showList,
      },
    }));
  };

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
                <p className="text-xs">
                  {item.item.color_name} - {item.item.variant_name}
                </p>
                <p className="text-xs">x{item.item.quantity}</p>
              </div>
              <div>
                <p className="text-sm">
                  {(item?.variantPrice * item.item.quantity).toLocaleString()}₫
                </p>
              </div>
            </div>
          </div>
          <div className="border-t-[1px] border-[rgba(0, 0, 0, 0.1)] w-full my-5"></div>
        </div>
      ))}
      <div>
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Chọn mã giảm giá</span>
            {productVouchers.length > 0 && (
              <span
                className="text-sm text-blue-600 cursor-pointer"
                onClick={() => toggleVoucherList("product")}
              >
                Xem tất cả
              </span>
            )}
          </div>
          <div className="relative w-full flex flex-nowrap lg:flex-wrap xl:flex-nowrap space-x-2 lg:space-x-0 xl:space-x-2">
            <input
              id="productVoucher"
              type="text"
              value={vouchers.product.code}
              onChange={(e) => handleVoucherChange("product", e)}
              className="flex-1 peer p-2 border rounded focus:ring-black"
              placeholder="Nhập mã giảm giá"
            />
            <button
              className={`p-3 text-sm w-[120px] lg:w-full xl:w-[120px] lg:mt-2 xl:mt-0 text-white rounded uppercase ${
                !vouchers.product.isValid || vouchers.product.applied
                  ? "bg-[rgb(246,246,246)] !text-[#ccc] cursor-not-allowed"
                  : "bg-black hover:opacity-80"
              }`}
              onClick={() => applyVoucher("product")}
              disabled={!vouchers.product.isValid || vouchers.product.applied}
            >
              Áp dụng
            </button>
          </div>
        </div>

        {/* Danh sách mã giảm giá sản phẩm */}
        {vouchers.product.showList && productVouchers.length > 0 && (
          <div className="bg-white border rounded shadow-lg p-3 mb-4 max-h-48 overflow-y-auto">
            <h3 className="text-sm font-semibold mb-2">
              Chọn mã giảm giá sản phẩm
            </h3>
            <ul>
              {productVouchers.map((voucher, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-gray-100 cursor-pointer border-b space-y-1"
                  onClick={() => handleSelectVoucher("product", voucher)}
                >
                  <div className="flex justify-between items-center">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">
                        {voucher.discount_code}
                      </p>
                      <p className="text-xs">
                        - {voucher.discount_number}% đơn hàng
                      </p>
                    </div>
                    {/* <p className="text-sm text-green-600">{voucher.description}</p> */}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Mã giảm phí vận chuyển */}
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Chọn mã vận chuyển</span>
            {shippingVouchers.length > 0 && (
              <span
                className="text-sm text-blue-600 cursor-pointer"
                onClick={() => toggleVoucherList("shipping")}
              >
                Xem tất cả
              </span>
            )}
          </div>
          <div className="relative w-full flex flex-nowrap lg:flex-wrap xl:flex-nowrap space-x-2 lg:space-x-0 xl:space-x-2">
            <input
              id="shippingVoucher"
              type="text"
              value={vouchers.shipping.code}
              onChange={(e) => handleVoucherChange("shipping", e)}
              className="flex-1 peer p-2 border rounded focus:ring-black"
              placeholder="Nhập mã vận chuyển"
            />
            <button
              className={`p-3 text-sm w-[120px] lg:w-full xl:w-[120px] lg:mt-2 xl:mt-0 text-white rounded uppercase ${
                !vouchers.shipping.isValid || vouchers.shipping.applied
                  ? "bg-[rgb(246,246,246)] !text-[#ccc] cursor-not-allowed"
                  : "bg-black hover:opacity-80"
              }`}
              onClick={() => applyVoucher("shipping")}
              disabled={!vouchers.shipping.isValid || vouchers.shipping.applied}
            >
              Áp dụng
            </button>
          </div>
        </div>

        {/* Danh sách mã giảm phí vận chuyển */}
        {vouchers.shipping.showList && shippingVouchers.length > 0 && (
          <div className="bg-white border rounded shadow-lg p-3 mb-4 max-h-48 overflow-y-auto">
            <h3 className="text-sm font-semibold mb-2">
              Chọn mã giảm phí vận chuyển
            </h3>
            <ul>
              {shippingVouchers.map((voucher, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-gray-100 cursor-pointer border-b"
                  onClick={() => handleSelectVoucher("shipping", voucher)}
                >
                  <div className="flex justify-between items-center">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">
                        {voucher.discount_code}
                      </p>
                      <p className="text-xs">
                        {" "}
                        - {voucher.discount_number}% phí vận chuyển
                      </p>
                    </div>
                    {/* <p className="text-sm text-green-600">{voucher.discount_number}%</p> */}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tổng tiền */}
        <div className="flex justify-between text-sm">
          <span>Tạm tính</span>
          <span>{subtotal.toLocaleString()}₫</span>
        </div>
        {vouchers.product.applied && vouchers.product.selectedVoucher && (
          <div className="flex justify-between text-sm mt-4">
            <span>Voucher sản phẩm</span>
            <span>
              -{" "}
              {(
                (subtotal * vouchers.product.selectedVoucher.discount_number) /
                100
              ).toLocaleString()}
              đ
            </span>
          </div>
        )}
        <div className="flex justify-between text-sm mt-4">
          <span>Tiền vận chuyển</span>
          <span>{shippingCost.toLocaleString()}đ</span>
        </div>
        {vouchers.shipping.applied && vouchers.shipping.selectedVoucher && (
          <div className="flex justify-between text-sm mt-4">
            <span>Voucher vận chuyển</span>
            <span>
              -{" "}
              {(
                (shippingCost *
                  vouchers.shipping.selectedVoucher.discount_number) /
                100
              ).toLocaleString()}
              đ
            </span>
          </div>
        )}
        <hr className="my-4" />
        <div className="flex justify-between text-md font-bold">
          <span>Tổng tiền</span>
          <span>{finalTotal.toLocaleString()}₫</span>
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
