import React, { useState } from "react";
import { Button as MButton } from "@material-tailwind/react";
import AddressFormComponent from "../../../components/AddressFormComponent/AddressFormComponent";
import { FaTrash } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { Button } from "antd";
import { AiOutlineClose } from "react-icons/ai";
function MyAddress() {
  const [addresses, setAddresses] = useState([]);
  const [editingAddress, setEditingAddress] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const validateForm = (address) => {
    const errors = {};
    if (!address.firstName) errors.firstName = "Vui lòng nhập Họ";
    if (!address.lastName) errors.lastName = "Vui lòng nhập Tên";
    if (!address.phoneNumber)
      errors.phoneNumber = "Vui lòng nhập Số điện thoại";
    if (!address.streetAddress) errors.streetAddress = "Vui lòng nhập Địa chỉ";
    if (!address.province) errors.province = "Vui lòng chọn Tỉnh/Thành phố";
    if (!address.district) errors.district = "Vui lòng chọn Quận/Huyện";
    if (!address.ward) errors.ward = "Vui lòng chọn Phường/Xã";
    return errors;
  };

  const handleAddAddress = () => {
    setEditingAddress(null);
    setShowForm(true);
    setFormErrors({});
  };

  const handleEditAddress = (index) => {
    setEditingAddress({ ...addresses[index], index });
    setShowForm(true);
    setFormErrors({});
  };

  const handleSaveAddress = () => {
    const errors = validateForm(editingAddress || {});
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (editingAddress.index !== undefined) {
      const updatedAddresses = [...addresses];
      updatedAddresses[editingAddress.index] = {
        ...editingAddress,
        index: undefined,
      };
      setAddresses(updatedAddresses);
    } else {
      setAddresses([
        ...addresses,
        { ...editingAddress, isDefault: addresses.length === 0 },
      ]);
    }
    setShowForm(false);
  };

  const handleSetDefault = (index) => {
    setAddresses(
      addresses.map((addr, i) => ({ ...addr, isDefault: i === index }))
    );
  };

  const handleDeleteAddress = (index) => {
    setAddresses(addresses.filter((_, i) => i !== index));
  };

  return (
    <div className="lg:px-6 bg-white">
      <div className="flex flex-wrap justify-between items-center">
        <h1 className="text-3xl font-semibold">Địa chỉ của tôi</h1>
        <MButton onClick={handleAddAddress} className="">
          Thêm địa chỉ mới
        </MButton>
      </div>
      <div className="space-y-5 mt-8">
        <ul>
          {addresses.map((address, index) => (
            <li key={index} className="p-2 border-b py-8">
              <div className="flex flex-wrap items-center gap-5">
                <div className="space-y-3">
                  <p>
                    {address.firstName} {address.lastName}
                  </p>
                  <p>
                    {address.streetAddress}, {address.ward}, {address.district},{" "}
                    {address.province}
                  </p>
                  <p>{address.phoneNumber}</p>
                </div>
                {address.isDefault && (
                  <MButton color="white" disabled className="h-full !shadow-lg">
                    Mặc định
                  </MButton>
                )}
              </div>
              <div className="flex flex-wrap space-x-5">
                <Button
                  type="link"
                  icon={<FaRegEdit />}
                  onClick={() => handleEditAddress(index)}
                  key="edit"
                >
                  Cập nhật
                </Button>
                <Button
                  type="link"
                  icon={<FaTrash />}
                  danger
                  onClick={() => handleDeleteAddress(index)}
                  key="delete"
                >
                  Xóa
                </Button>
                {!address.isDefault && (
                  <Button
                    type="link"
                    icon={<IoSettingsSharp />}
                    onClick={() => handleSetDefault(index)}
                    key="setDefault"
                  >
                    Thiết lập mặc định
                  </Button>
                )}
              </div>
            </li>
          ))}
        </ul>
        {showForm && (
          <div
            className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10 transition-opacity duration-300 ${
              showForm ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setShowForm(false)}
          >
            <div
              className={`bg-white p-6 rounded-lg w-[80%] lg:w-1/2 relative transition-transform duration-300 transform ${
                showForm ? "translate-y-0" : "-translate-y-40"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg text-black font-semibold">
                  Thêm địa chỉ mới
                </h3>
                <div
                  className="p-2 rounded-full hover:bg-[#d1d1d1] transition cursor-pointer"
                  onClick={() => setShowForm(false)}
                >
                  <AiOutlineClose className="w-5 h-5" />
                </div>
              </div>
              <AddressFormComponent
                newAddress={editingAddress || {}}
                setNewAddress={setEditingAddress}
                formErrors={formErrors}
                setFormErrors={setFormErrors}
              />
              <MButton onClick={handleSaveAddress} className="mt-2 w-full">
                Thêm địa chỉ
              </MButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyAddress;
