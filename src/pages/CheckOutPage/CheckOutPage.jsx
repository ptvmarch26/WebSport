import React, { useState } from "react";
import AddressFormComponent from "../../components/AddressFormComponent/AddressFormComponent";
import { useLocation } from "react-router-dom";
import OrderSummaryComponent from "../../components/OrderSummaryComponent/OrderSummaryComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import SelectionComponent from "../../components/SelectionComponent/SelectionComponent";
import { Button } from "@material-tailwind/react";
import { AiOutlineClose } from "react-icons/ai";

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
  const { state } = useLocation();
  const [cart, setCart] = useState(state?.cart || []);
  const subtotal = state?.subtotal || 0;
  const [newAddress, setNewAddress] = useState({
    firstName: "",
    lastName: "",
    streetAddress: "",
    province: "",
    district: "",
    ward: "",
    phoneNumber: "",
  });
  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    streetAddress: "",
    province: "",
    district: "",
    phoneNumber: "",
  });
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [addresses, setAddresses] = useState([
    {
      firstName: "Phi",
      lastName: "Thong",
      streetAddress: "HCM",
      province: "TPHCM",
      district: "Linh Trung",
      ward: "Thu Duc",
      phoneNumber: "0909",
    },
  ]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [voucher, setVoucher] = useState("");
  const [selectedShipping, setSelectedShipping] = useState(
    shippingMethods[0].id
  );
  const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0].id);

  React.useEffect(() => {
    if (addresses.length > 0 && !selectedAddress) {
      setSelectedAddress(addresses[0]);
    }
  }, [addresses, selectedAddress]);

  const handleAddAddress = () => {
    if (validateForm()) {
      setAddresses([...addresses, newAddress]);
      setNewAddress({
        firstName: "",
        lastName: "",
        streetAddress: "",
        province: "",
        district: "",
        ward: "",
        phoneNumber: "",
      });
    }
  };

  const handleDeleteAddress = (index) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(updatedAddresses);

    if (updatedAddresses.length === 0) {
      setSelectedAddress(null);
    }
    // Reset form để không bị lỗi trước đó khi xóa form
    setFormErrors({
      firstName: "",
      lastName: "",
      streetAddress: "",
      province: "",
      district: "",
      phoneNumber: "",
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

  const handleSaveEditedAddress = () => {
    if (validateForm()) {
      const updatedAddresses = [...addresses];
      updatedAddresses[editingIndex] = newAddress;
      setAddresses(updatedAddresses);
      setNewAddress({
        firstName: "",
        lastName: "",
        streetAddress: "",
        province: "",
        district: "",
        ward: "",
        phoneNumber: "",
      });
      setEditingIndex(null);
    }
  };

  const handleApplyVoucher = () => {
    if (voucher === "SALE10") {
      alert("Áp dụng mã giảm giá thành công! Giảm 10% tổng tiền.");
    } else {
      alert("Mã giảm giá không hợp lệ!");
    }
  };

  const closeOverlay = () => setIsOverlayOpen(false);

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!newAddress.firstName) {
      errors.firstName = "Bạn chưa nhập Họ";
      isValid = false;
    }
    if (!newAddress.lastName) {
      errors.lastName = "Bạn chưa nhập Tên";
      isValid = false;
    }
    if (!newAddress.streetAddress) {
      errors.streetAddress = "Bạn chưa nhập Địa chỉ";
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
    if (!newAddress.phoneNumber) {
      errors.phoneNumber = "Bạn chưa nhập Số điện thoại";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
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
            {addresses.length > 0 && !selectedAddress && (
              <div className="p-4 rounded-lg space-y-3">
                <p className="text-[#757575]">
                  {addresses[0].firstName} {addresses[0].lastName}
                </p>
                <p className="text-[#757575]">
                  {addresses[0].streetAddress}, {addresses[0].ward},{" "}
                  {addresses[0].district}, {addresses[0].province}
                </p>
                <p className="text-[#757575]">{addresses[0].phoneNumber}</p>
              </div>
            )}
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
                  {selectedAddress.firstName} {selectedAddress.lastName}
                </p>
                <p className="text-[#757575]">
                  {selectedAddress.streetAddress}, {selectedAddress.ward},{" "}
                  {selectedAddress.district}, {selectedAddress.province}
                </p>
                <p className="text-[#757575]">{selectedAddress.phoneNumber}</p>
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
          </div>
          <div className="col-span-1 pb-20 lg:pb-0 lg:min-h-[1000px]">
            <h2 className="lg:hidden text-xl font-bold uppercase mb-4">
              Tổng quan đơn hàng
            </h2>
            <OrderSummaryComponent
              cart={cart}
              subtotal={subtotal}
              voucher={voucher}
              setVoucher={setVoucher}
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
                <Button onClick={handleAddAddress}>Thêm địa chỉ</Button>
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
                      {address.firstName} {address.lastName}
                    </p>
                    <p className="text-sm">
                      {address.streetAddress}, {address.ward},{" "}
                      {address.district}, {address.province}
                    </p>
                    <p className="text-sm">{address.phoneNumber}</p>
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
                        handleDeleteAddress(index);
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
