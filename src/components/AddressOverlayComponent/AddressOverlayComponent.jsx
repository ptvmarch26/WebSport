import React from "react";
import AddressFormComponent from "../AddressFormComponent/AddressFormComponent";
import { Button } from "@material-tailwind/react";
import { AiOutlineClose } from "react-icons/ai";

const AddressOverlayComponent = ({
  isOverlayOpen,
  setIsOverlayOpen,
  newAddress,
  setNewAddress,
  addresses,
  editingIndex,
  setEditingIndex, // Thêm hàm cập nhật trạng thái
  handleSaveEditedAddress,
  handleAddAddress,
  handleEditAddress,
  handleDeleteAddress,
  handleSelectAddress,
}) => {
  if (!isOverlayOpen) return null;

  const closeOverlay = () => {
    setIsOverlayOpen(false);
    setEditingIndex(null); // Reset về "Quản lý địa chỉ" khi đóng overlay
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10"
      onClick={closeOverlay} // Bấm ngoài overlay để đóng
    >
      <div
        className="bg-white p-6 rounded-lg w-1/2 relative"
        onClick={(e) => e.stopPropagation()} // Ngăn đóng khi bấm bên trong
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg text-black font-semibold">
            {editingIndex !== null ? "Sửa địa chỉ" : "Quản lý địa chỉ"}
          </h3>
          {/* Dấu X để đóng */}
          <div
            className="p-2 rounded-full hover:bg-[#d1d1d1] transition cursor-pointer"
            onClick={closeOverlay} // Đóng overlay khi nhấn X
          >
            <AiOutlineClose className="w-5 h-5" />
          </div>
        </div>

        <AddressFormComponent
          newAddress={newAddress}
          setNewAddress={setNewAddress}
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
                  {address.streetAddress}, {address.ward}, {address.district},{" "}
                  {address.province}
                </p>
                <p className="text-sm">{address.phoneNumber}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingIndex(index); // Đặt editingIndex khi nhấn "Sửa"
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
                    closeOverlay(); // Đóng overlay sau khi xóa
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
  );
};

export default AddressOverlayComponent;
