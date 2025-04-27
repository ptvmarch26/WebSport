import { useState, useEffect } from "react";
import AddressFormComponent from "../../components/AddressFormComponent/AddressFormComponent";
import OrderSummaryComponent from "../../components/OrderSummaryComponent/OrderSummaryComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import SelectionComponent from "../../components/SelectionComponent/SelectionComponent";
import { Button } from "@material-tailwind/react";
import { AiOutlineClose } from "react-icons/ai";
import { useCart } from "../../context/CartContext";
import { useDiscount } from "../../context/DiscountContext";
import { useUser } from "../../context/UserContext";
import { useOrder } from "../../context/OrderContext";
import { useProduct } from "../../context/ProductContext";
import { useNavigate } from "react-router-dom";
import { useParams, useSearchParams, useLocation } from "react-router-dom";
import { usePopup } from "../../context/PopupContext";
import { handleCancelPayment } from "../../services/api/OrderApi";

const shippingMethods = [
  { id: "standard", label: "Giao hàng tiêu chuẩn", price: "50.000 đ" },
];

const paymentMethods = [
  { id: "Cod", label: "Phương thức thanh toán khi nhận hàng (COD)" },
  { id: "Paypal", label: "Phương Thức Chuyển Khoản" },
  { id: "Momo", label: "Phương Thức Momo" },
];

function CheckoutPage() {
  const [searchParams] = useSearchParams();
  const { showPopup } = usePopup();
  const quantity = searchParams.get("quantity");
  const color = searchParams.get("color");
  const size = searchParams.get("size");
  const { id: productId } = useParams();
  const { fetchProductDetails, productDetails } = useProduct();
  const { fetchCart, cart, setCart } = useCart();
  const location = useLocation();

  const { fetchDiscountForOrder, discounts } = useDiscount();

  const [newAddress, setNewAddress] = useState({
    name: "",
    phone: "",
    home_address: "",
    province: "",
    district: "",
    ward: "",
    is_default: "false",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    phone: "",
    home_address: "",
    province: "",
    district: "",
    ward: "",
    is_default: "",
  });
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [selectedShipping, setSelectedShipping] = useState(
    shippingMethods[0].id
  );
  const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0].id);

  useEffect(() => {
    fetchUser();
    const query = new URLSearchParams(window.location.search);
    const code = query.get("code");
    const status = query.get("status");
    const cancel = query.get("cancel") === "true";

    if (code === "00" && status === "CANCELLED" && cancel) {
      showPopup(
        "Xin lỗi quý khách, đơn hàng của quý khách đã bị hủy do thanh toán không thành công",
        false,
        5000
      );
      const orderCode = query.get("orderCode");
      if (orderCode) {
        handleCancelPayment(orderCode);
      }
      return;
    }
  }, []);
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    const initCart = async () => {
      if (productId) {
        await fetchProductDetails(productId);
      } else {
        await fetchCart();
      }
    };

    initCart();
  }, [productId]);

  useEffect(() => {
    if (productId && productDetails?._id) {
      setCartItems([
        {
          product_id: {
            ...productDetails,
          },
          quantity: Number(quantity) || 1,
          color_name: color,
          variant_name: size,
        },
      ]);
    }
  }, [productDetails]);

  useEffect(() => {
    if (location.state?.fromBuyAgain) {
      const buyAgainItems = location.state.fromBuyAgain || [];

      const convertedItems = buyAgainItems.map((item) => ({
        ...item,
        color_name: item.color, // rename
        variant_name: item.variant, // rename
      }));

      setCartItems(convertedItems);
      return;
    }
    if (!productId && cart?.products) {
      setCartItems(cart.products);
    }
  }, [cart, productId]);

  useEffect(() => {
    if (cartItems.length > 0) {
      fetchDiscountForOrder(cartItems.map((item) => item.product_id._id));
    }
  }, [cartItems]);

  const shippingVouchers = discounts?.filter(
    (discount) => discount.discount_type === "shipping"
  );
  const productVouchers = discounts?.filter(
    (discount) => discount.discount_type === "product"
  );

  const {
    selectedUser,
    fetchUser,
    handleAddAddress,
    handleUpdateAddress,
    handleDeleteAddress,
  } = useUser();

  useEffect(() => {
    if (!selectedUser) return;

    const addressesUser = selectedUser?.addresses || [];
    setAddresses(addressesUser);

    if (!selectedAddress && addressesUser.length > 0) {
      const defaultAddress = addressesUser.find(
        (address) => address.is_default
      );
      if (defaultAddress) setSelectedAddress(defaultAddress);
    }
  }, [selectedUser]);

  const handleAddAddresss = async () => {
    if (validateForm()) {
      newAddress.is_default = addresses.length === 0;
      setAddresses([...addresses, newAddress]);
      await handleAddAddress(newAddress);
      setNewAddress({
        name: "",
        phone: "",
        home_address: "",
        province: "",
        district: "",
        ward: "",
        is_default: "",
      });
    }
  };

  const handleDeleteAddresss = async (index) => {
    const isDefaultAddress = addresses[index]?.is_default;

    const updatedAddresses = addresses.filter((_, i) => i !== index);

    if (isDefaultAddress && updatedAddresses.length > 0) {
      updatedAddresses[0].is_default = true;
    }

    await handleDeleteAddress(index);
    setAddresses(updatedAddresses);

    if (updatedAddresses.length === 0) {
      setSelectedAddress(null);
    } else {
      setSelectedAddress(
        updatedAddresses.find((address) => address.is_default)
      );
    }

    setFormErrors({
      name: "",
      phone: "",
      home_address: "",
      province: "",
      district: "",
      ward: "",
      is_default: "",
    });
  };

  const handleSelectAddress = (index) => {
    setSelectedAddress(addresses[index]);
    setIsOverlayOpen(false);
  };

  const handleEditAddress = (index) => {
    setNewAddress(addresses[index]);
    setEditingIndex(index);
    setIsOverlayOpen(true);
  };

  const handleSaveEditedAddress = async () => {
    if (validateForm()) {
      const updatedAddresses = [...addresses];
      updatedAddresses[editingIndex] = newAddress;
      await handleUpdateAddress(editingIndex, newAddress);
      setAddresses(updatedAddresses);
      setNewAddress({
        name: "",
        phone: "",
        home_address: "",
        province: "",
        district: "",
        ward: "",
        is_default: "",
      });
      setEditingIndex(null);
    }
  };

  const [selectedVouchers, setSelectedVouchers] = useState([]);
  const handleApplyVoucher = (vouchers) => {
    const newVouchers = [];

    if (vouchers.product.applied)
      newVouchers.push(vouchers.product.selectedVoucher._id);

    if (vouchers.shipping.applied)
      newVouchers.push(vouchers.shipping.selectedVoucher._id);

    setSelectedVouchers(
      [
        vouchers.product.applied ? vouchers.product.selectedVoucher._id : null,
        vouchers.shipping.applied
          ? vouchers.shipping.selectedVoucher._id
          : null,
      ].filter(Boolean)
    );
  };

  const closeOverlay = () => setIsOverlayOpen(false);

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!newAddress.name) {
      errors.name = "Bạn chưa nhập Họ và Tên";
      isValid = false;
    }
    if (!newAddress.home_address) {
      errors.home_address = "Bạn chưa nhập Địa chỉ";
      isValid = false;
    }
    if (!newAddress.province) {
      errors.province = "Bạn chưa nhập Tỉnh/Thành phố";
      isValid = false;
    }
    if (!newAddress.district) {
      errors.district = "Bạn chưa nhập Quận/Huyện";
      isValid = false;
    }
    if (!newAddress.ward) {
      errors.ward = "Bạn chưa nhập Phường/Xã";
      isValid = false;
    }
    if (!newAddress.phone) {
      errors.phone = "Bạn chưa nhập Số điện thoại";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const { handleCreateOrder } = useOrder();

  const navigate = useNavigate();

  const validateAddressBeforeOrder = () => {
    if (selectedAddress) return true;

    if (addresses.length === 0) {
      return validateForm();
    }

    return false;
  };

  const CreateOrder = async () => {
    if (!validateAddressBeforeOrder()) {
      showPopup("Vui lòng nhập đầy đủ thông tin địa chỉ giao hàng", false);
      return;
    }

    if (selectedPayment === "Momo") {
      showPopup(
        "Chức năng thanh toán Momo đang được phát triển, vui lòng chọn phương thức khác",
        false,
        5000
      );
      return;
    }
    const orderData = {
      shipping_address: selectedAddress || newAddress,
      products: cartItems.map((item) => ({
        product_id: item?.product_id?._id || item?._id,
        quantity: item.quantity || quantity,
        color_name: item.color_name || color,
        variant_name: item.variant_name || size,
      })),
      order_payment_method: selectedPayment,
      order_note: "",
      discount_ids: selectedVouchers,
    };

    const res = await handleCreateOrder(orderData);
    if (res?.EC === 0 && selectedPayment === "Paypal") {
      showPopup("Đặt hàng thành công, chuyển hướng tới trang thanh toán");
      setTimeout(() => {
        window.location.href = res.result.resultPayOS.checkoutUrl;
      }, 2000);
      return;
    }
    if (res?.EC === 0) {
      setCart([]);
      navigate(
        `/orders/order-details/${res.result._id}?code=00&status=SUCCESS&cancel=false`
      );
      return;
    }
    showPopup(res.EM, false, 5000);
  };

  return (
    <div className="xl:max-w-[1200px] container mx-auto">
      <div className="px-2 lg:p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-8">
          <div className="col-span-2 lg:pr-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold uppercase mb-4">Giao hàng</h2>
              {addresses.length > 0 && (
                <ButtonComponent
                  onClick={() => setIsOverlayOpen(true)}
                  text="Thay đổi địa chỉ"
                  color="white"
                  className="uppercase"
                />
              )}
            </div>
            <h2 className="text-lg font-semibold mb-2">Địa chỉ</h2>
            {addresses.length === 0 && (
              <AddressFormComponent
                newAddress={newAddress}
                setNewAddress={setNewAddress}
                formErrors={formErrors}
                setFormErrors={setFormErrors}
              />
            )}
            {selectedAddress && (
              <div className="px-4 rounded-lg space-y-3">
                <p className="text-[#757575]">{selectedAddress.name}</p>
                <p className="text-[#757575]">
                  {selectedAddress.home_address}, {selectedAddress.ward},{" "}
                  {selectedAddress.district}, {selectedAddress.province}
                </p>
                <p className="text-[#757575]">{selectedAddress.phone}</p>
              </div>
            )}
            <SelectionComponent
              title="Phương thức vận chuyển"
              options={shippingMethods}
              selected={selectedShipping}
              setSelected={setSelectedShipping}
            />
            <SelectionComponent
              title="Thanh toán"
              options={paymentMethods}
              selected={selectedPayment}
              setSelected={setSelectedPayment}
            />
            <div className="my-10 flex justify-center">
              {/* <QRComponent amount={100000} orderId="123456aa8666" /> */}
            </div>
          </div>
          <div className="col-span-1 pb-20 lg:pb-0 lg:min-h-[1000px]">
            <h2 className="lg:hidden text-xl font-bold uppercase mb-4">
              Tổng quan đơn hàng
            </h2>{" "}
            <OrderSummaryComponent
              cart={cartItems}
              productVouchers={productVouchers}
              shippingVouchers={shippingVouchers}
              onClick={CreateOrder}
              handleApplyVoucher={handleApplyVoucher}
            />
          </div>
        </div>

        <div
          className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10 transition-opacity duration-300 ${
            isOverlayOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={closeOverlay}
        >
          <div
            className={`bg-white p-6 rounded-lg w-[80%] lg:w-1/2 relative transition-transform duration-300 transform ${
              isOverlayOpen ? "translate-y-0" : "-translate-y-40"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg text-black font-semibold">
                {editingIndex !== null ? "Sửa địa chỉ" : "Quản lý địa chỉ"}
              </h3>
              <div
                className="p-2 rounded-full hover:bg-[#d1d1d1] transition cursor-pointer"
                onClick={closeOverlay}
              >
                <AiOutlineClose className="w-5 h-5" />
              </div>
            </div>
            <AddressFormComponent
              newAddress={newAddress}
              setNewAddress={setNewAddress}
              formErrors={formErrors}
              setFormErrors={setFormErrors}
            />
            <div className="flex justify-between mt-4">
              {editingIndex !== null ? (
                <Button onClick={handleSaveEditedAddress}>Lưu địa chỉ</Button>
              ) : (
                <Button onClick={handleAddAddresss}>Thêm địa chỉ</Button>
              )}
            </div>
            <ul className="mt-4">
              {addresses.map((address, index) => (
                <li
                  key={index}
                  className="flex justify-between p-2 border-b cursor-pointer hover:bg-gray-200 transition"
                  onClick={() => handleSelectAddress(index)}
                >
                  <div>
                    <p className="text-sm">{address.name}</p>
                    <p className="text-sm">
                      {address.home_address}, {address.ward}, {address.district}
                      , {address.province}
                    </p>
                    <p className="text-sm">{address.phone}</p>
                  </div>
                  <div className="flex flex-col md:flex-row items-center gap-2">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingIndex(index);
                        handleEditAddress(index);
                      }}
                      className="bg-white text-black border"
                    >
                      Sửa
                    </Button>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteAddresss(index);
                        closeOverlay();
                      }}
                      className="bg-red-500 text-white"
                    >
                      Xóa
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
