import React, { useState } from "react";
import AddressFormComponent from "../../components/AddressFormComponent/AddressFormComponent";
import { useLocation } from "react-router-dom";
import OrderSummaryComponent from "../../components/OrderSummaryComponent/OrderSummaryComponent";
import AddressOverlayComponent from "../../components/AddressOverlayComponent/AddressOverlayComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import SelectionComponent from "../../components/SelectionComponent/SelectionComponent";

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
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [addresses, setAddresses] = useState([
    {
      firstName: "tt",
      lastName: "tt",
      streetAddress: "ttt",
      province: "ttt",
      district: "",
      ward: "",
      phoneNumber: "",
    },
  ]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [voucher, setVoucher] = useState("");
  const [selectedShipping, setSelectedShipping] = useState(
    shippingMethods[0].id
  );
  const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0].id);

  // Mặc định chọn địa chỉ đầu tiên nếu chưa có địa chỉ nào được chọn
  React.useEffect(() => {
    if (addresses.length > 0 && !selectedAddress) {
      setSelectedAddress(addresses[0]);
    }
  }, [addresses, selectedAddress]);

  const handleAddAddress = () => {
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
  };

  const handleDeleteAddress = (index) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(updatedAddresses);

    // Nếu tất cả địa chỉ bị xóa, đặt lại selectedAddress thành null
    if (updatedAddresses.length === 0) {
      setSelectedAddress(null);
    }
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
  };

  const handleApplyVoucher = () => {
    if (voucher === "SALE10") {
      alert("Áp dụng mã giảm giá thành công! Giảm 10% tổng tiền.");
    } else {
      alert("Mã giảm giá không hợp lệ!");
    }
  };

  return (
    <div className="res">
      <div className="p-4">
        <div className="flex">
          <div className="w-2/3 pr-4">
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

            {/* Phương thức thanh toán */}
            <SelectionComponent
              title="Thanh toán"
              options={paymentMethods}
              selected={selectedPayment}
              setSelected={setSelectedPayment}
            />
          </div>

          <div className="w-1/3 min-h-[1000px]">
            <OrderSummaryComponent
              cart={cart}
              subtotal={subtotal}
              voucher={voucher}
              setVoucher={setVoucher}
              handleApplyVoucher={handleApplyVoucher}
            />
          </div>
        </div>

        <AddressOverlayComponent
          isOverlayOpen={isOverlayOpen}
          setIsOverlayOpen={setIsOverlayOpen}
          newAddress={newAddress}
          setNewAddress={setNewAddress}
          addresses={addresses}
          editingIndex={editingIndex}
          setEditingIndex={setEditingIndex}
          handleSaveEditedAddress={handleSaveEditedAddress}
          handleAddAddress={handleAddAddress}
          handleEditAddress={handleEditAddress}
          handleDeleteAddress={handleDeleteAddress}
          handleSelectAddress={handleSelectAddress}
        />
      </div>
    </div>
  );
}

export default CheckoutPage;
