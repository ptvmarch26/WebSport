import { useEffect } from "react";
import AccountInfoComponent from "../../components/AccountInfoComponent/AccountInfoComponent";
import voucherShipping from "../../assets/images/voucher_shipping.png";
import voucherProduct from "../../assets/images/voucher_product.png";
import { useUser } from "../../context/UserContext";



const VoucherCard = ({ voucher, image }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex gap-4">
      <img
        src={image}
        alt={voucher.discount_title}
        className="w-28 h-28 object-cover rounded-md border mb-3 bg-gray-600 p-2"
      />
      <div className="space-y-2">
        <p className="text-lg">
          <span className="font-bold">{voucher.discount_code}</span>
        </p>
        <p className="line-clamp-1 md:line-clamp-2">{voucher.discount_title}</p>
        <p className="line-clamp-1 md:line-clamp-2">{voucher.description}</p>
      </div>
    </div>
  );
};

const VoucherPage = () => {
  const { handleGetDiscount, discounts } = useUser();
  useEffect(() => {
    handleGetDiscount();
  }, []);

  const shippingVouchers = discounts.filter((v) => v.discount_type === "shipping");
  const productVouchers = discounts.filter((v) => v.discount_type === "product");

  const shippingImage = voucherShipping;

  const productImage = voucherProduct;

  return (
    <div className="xl:max-w-[1200px] container mx-auto py-10 px-2">
      <div className="lg:flex justify-between gap-6">
        <div className="lg:block pb-10 lg:pb-0">
          <AccountInfoComponent />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold uppercase">Sản Phẩm</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-5">
            {productVouchers.length > 0 ? (
              productVouchers.map((voucher, index) => (
                <VoucherCard key={index} voucher={voucher} image={productImage} />
              ))
            ) : (
              <p className="text-gray-500">Bạn không có mã giảm giá sản phẩm</p>
            )}
          </div>
          <h2 className="text-xl font-semibold uppercase">Vận Chuyển</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-5">
            {shippingVouchers.length > 0 ? (
              shippingVouchers.map((voucher, index) => (
                <VoucherCard key={index} voucher={voucher} image={shippingImage} />
              ))
            ) : (
              <p className="text-gray-500">Bạn không có mã giảm giá vận chuyển</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoucherPage;
