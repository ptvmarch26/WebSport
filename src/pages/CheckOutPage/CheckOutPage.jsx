import React, { useState, useEffect, use } from "react";
import AddressFormComponent from "../../components/AddressFormComponent/AddressFormComponent";
import OrderSummaryComponent from "../../components/OrderSummaryComponent/OrderSummaryComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import SelectionComponent from "../../components/SelectionComponent/SelectionComponent";
import { Button } from "@material-tailwind/react";
import { AiOutlineClose } from "react-icons/ai";
import { useCart } from "../../context/CartContext";
import { useDiscount } from "../../context/DiscountContext";
import { Button as MButton } from "@material-tailwind/react";
import { useUser } from "../../context/UserContext";
import { useOrder } from "../../context/OrderContext";
import { useNavigate } from "react-router-dom";

const shippingMethods = [
  { id: "standard", label: "Giao hàng tiêu chuẩn", price: "35.000 đ" },
  {
    id: "express",
    label: "Giao hàng hoả tốc 4H-6H (Chỉ nội thành TP.HCM)",
    price: "60.000 đ",
  },
];

const paymentMethods = [
  { id: "cod", label: "Thanh toán khi nhận hàng (COD)" },
  { id: "bank-transfer", label: "Phương Thức Chuyển Khoản" },
  { id: "Momo", label: "Phương Thức Momo" },
];

function CheckoutPage() {
  const { cart, fetchCart, setCart } = useCart();
  const { fetchDiscounts, discounts} = useDiscount();

  useEffect(() => {
    fetchCart(); 
    fetchDiscounts();
  },[]);

  useEffect(() => {
    const addressesUser = cart?.user_id?.addresses || [];
    setAddresses(addressesUser);
  }, [cart]);
  
  const cartItems = cart?.products || [];

  const subtotal = cartItems.reduce((acc, item) => {
    const discountedPrice = item.product_id.product_price * (1 - item.product_id.product_percent_discount / 100);
    return acc + discountedPrice * item.quantity;
  }, 0) || 0;

  const [newAddress, setNewAddress] = useState({
    name: "",
    phone: "",
    home_address: " ",
    province: "Tỉnh/Thành phố",
    district: "Quận/Huyện",
    ward: "Phường/Xã",
    is_default: "false",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    phone: "",
    home_address: "",
    province:  "",
    district: "",
    ward: "",
    is_default: "",
  });
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [voucher, setVoucher] = useState("");
  const [selectedShipping, setSelectedShipping] = useState(
    shippingMethods[0].id
  );
  const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0].id);

  useEffect(() => {
    if (!selectedAddress && addresses.length > 0) {
      const defaultAddress = addresses.find((address) => address.is_default);
      if (defaultAddress) {
        setSelectedAddress(defaultAddress);
      }
    }
  }, [addresses]);

  const { handleAddAddress, fetchUser, handleUpdateAddress, handleDeleteAddress } = useUser(); 

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
    };

    await handleDeleteAddress(index);
    setAddresses(updatedAddresses);

    if (updatedAddresses.length === 0) {
      setSelectedAddress(null);
    }
    else {
      setSelectedAddress(updatedAddresses.find((address) => address.is_default));

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

  // const handleApplyVoucher = () => {
  //   discounts.map((discount) => {
  //     if (discount.discount_code === voucher) {
  //       alert("Mã giảm giá hợp lệ");
  //       subtotal = subtotal - discount.discount_value;
  //     }
  //   });
  // };

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

  const CreateOrder = async () => {
    const orderData = {
      shipping_address: selectedAddress,
      products: cartItems.map((item) => ({
        product_id: item.product_id._id,
        quantity: item.quantity,
      })),
      order_payment_method: selectedPayment,
      order_note: " ",
      discount_ids: [], 
    };

    const res = await handleCreateOrder(orderData);
    console.log(res);
    if (res.EC === 0 ){
      setCart([]);
      navigate(`/orders/order-details/${res.result._id}`);
    }
    else {
      alert(res.EM);
    }
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
                <p className="text-[#757575]">
                  {selectedAddress.name} 
                </p>
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
            </h2>
            <OrderSummaryComponent
              cart={cartItems}
              subtotal={subtotal}
              voucher={voucher}
              setVoucher={setVoucher}
              // handleApplyVoucher={handleApplyVoucher}
              onClick={CreateOrder}
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
                    <p className="text-sm">
                      {address.name} 
                    </p>
                    <p className="text-sm">
                      {address.home_address}, {address.ward},{" "}
                      {address.district}, {address.province}
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
