import React from "react";
import AccountInfoComponent from "../../components/AccountInfoComponent/AccountInfoComponent";
import voucherShipping from '../../assets/images/voucher_shipping.png';
import voucherProduct from '../../assets/images/voucher_product.png';

const vouchers = [
  {
    code: "SHIPFREE",
    type: "shipping",
    title: "Miễn phí vận chuyển",
    quantity: 10,
  },
  {
    code: "SALE50",
    type: "product",
    title: "Giảm 50% cho sản phẩm",
    quantity: 5,
  },
  {
    code: "DISCOUNT20",
    type: "product",
    title: "Giảm 20k cho đơn hàng",
    quantity: 20,
  },
  {
    code: "FREESHIP100",
    type: "shipping",
    title: "Miễn phí vận chuyển cho đơn từ 100k",
    quantity: 15,
  },
  {
    code: "SHIPFREE",
    type: "shipping",
    title: "Miễn phí vận chuyển",
    quantity: 10,
  },
  {
    code: "SALE50",
    type: "product",
    title: "Giảm 50% cho sản phẩm",
    quantity: 5,
  },
  {
    code: "DISCOUNT20",
    type: "product",
    title: "Giảm 20k cho đơn hàng",
    quantity: 20,
  },
  {
    code: "FREESHIP100",
    type: "shipping",
    title: "Miễn phí vận chuyển cho đơn từ 100k",
    quantity: 15,
  },
];

const VoucherCard = ({ voucher, image }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex gap-4">
      <img
        src={image}
        alt={voucher.title}
        className="w-28 h-28 object-cover rounded-md border mb-3 bg-gray-600 p-2"
      />
      <div className="space-y-2">
        <p className="text-lg">
          <span className="font-bold">{voucher.code}</span>
        </p>
        <p>{voucher.title}</p>
        <p className="text-md">x{voucher.quantity}</p>
      </div>
    </div>
  );
};

const VoucherPage = () => {
  const shippingVouchers = vouchers.filter((v) => v.type === "shipping");
  const productVouchers = vouchers.filter((v) => v.type === "product");

  const shippingImage = voucherShipping;

  const productImage = voucherProduct;

  return (
    <div className="res py-10">
      <div className="flex gap-6">
        <div>
          <AccountInfoComponent full_name="Dương Anh Vũ" user_name="rain494" />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold uppercase">Sản Phẩm</h2>
          <div className="grid grid-cols-2 gap-4 my-5">
            {productVouchers.map((voucher, index) => (
              <VoucherCard key={index} voucher={voucher} image={productImage} />
            ))}
          </div>
          <h2 className="text-xl font-semibold uppercase">Vận Chuyển</h2>
          <div className="grid grid-cols-2 gap-4 my-5">
            {shippingVouchers.map((voucher, index) => (
              <VoucherCard
                key={index}
                voucher={voucher}
                image={shippingImage}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoucherPage;
