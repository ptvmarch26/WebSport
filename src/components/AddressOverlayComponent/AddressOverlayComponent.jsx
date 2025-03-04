// import React, { useState, useEffect } from "react";
// import AddressFormComponent from "../AddressFormComponent/AddressFormComponent";
// import { Button } from "@material-tailwind/react";
// import { AiOutlineClose } from "react-icons/ai";

// const AddressOverlayComponent = ({
//   isOverlayOpen,
//   setIsOverlayOpen,
//   newAddress,
//   setNewAddress,
//   addresses,
//   editingIndex,
//   setEditingIndex,
//   handleSaveEditedAddress,
//   handleAddAddress,
//   handleEditAddress,
//   handleDeleteAddress,
//   handleSelectAddress,
// }) => {
//   const [isAnimating, setIsAnimating] = useState(false);
//   const [errors, setErrors] = useState({});

//   const handleTransitionEnd = () => {
//     if (!isOverlayOpen) {
//       setIsAnimating(false);
//     }
//   };

//   useEffect(() => {
//     if (isOverlayOpen) {
//       setIsAnimating(true);
//     }
//   }, [isOverlayOpen]);

//   const closeOverlay = () => {
//     setIsOverlayOpen(false);
//     setEditingIndex(null);
//     setNewAddress({
//       firstName: "",
//       lastName: "",
//       streetAddress: "",
//       province: "",
//       district: "",
//       ward: "",
//       phoneNumber: "",
//     });
//     setErrors({});
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     Object.keys(newAddress).forEach((key) => {
//       if (!newAddress[key]) {
//         newErrors[key] = "Trường này không được bỏ trống";
//       }
//     });
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   return (
//     <div
//       className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10 transition-opacity duration-300 ${
//         isOverlayOpen ? "opacity-100" : "opacity-0 pointer-events-none"
//       }`}
//       onClick={closeOverlay}
//       onTransitionEnd={handleTransitionEnd}
//     >
//       <div
//         className={`bg-white p-6 rounded-lg w-1/2 relative transition-transform duration-300 transform ${
//           isOverlayOpen ? "translate-y-0" : "-translate-y-40"
//         }`}
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="flex items-center justify-between mb-4">
//           <h3 className="text-lg text-black font-semibold">
//             {editingIndex !== null ? "Sửa địa chỉ" : "Quản lý địa chỉ"}
//           </h3>
//           <div
//             className="p-2 rounded-full hover:bg-[#d1d1d1] transition cursor-pointer"
//             onClick={closeOverlay}
//           >
//             <AiOutlineClose className="w-5 h-5" />
//           </div>
//         </div>

//         <AddressFormComponent
//           newAddress={newAddress}
//           setNewAddress={setNewAddress}
//           errors={errors}
//         />

//         <div className="flex justify-between mt-4">
//           {editingIndex !== null ? (
//             <Button onClick={() => validateForm() && handleSaveEditedAddress()}>Lưu địa chỉ</Button>
//           ) : (
//             <Button onClick={() => validateForm() && handleAddAddress()}>Thêm địa chỉ</Button>
//           )}
//         </div>

//         <ul className="mt-4">
//           {addresses.map((address, index) => (
//             <li
//               key={index}
//               className="flex justify-between p-2 border-b cursor-pointer hover:bg-gray-200 transition"
//               onClick={() => handleSelectAddress(index)}
//             >
//               <div>
//                 <p className="text-sm">
//                   {address.firstName} {address.lastName}
//                 </p>
//                 <p className="text-sm">
//                   {address.streetAddress}, {address.ward}, {address.district}, {address.province}
//                 </p>
//                 <p className="text-sm">{address.phoneNumber}</p>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     setEditingIndex(index);
//                     handleEditAddress(index);
//                   }}
//                   className="bg-white text-black border"
//                 >
//                   Sửa
//                 </Button>
//                 <Button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleDeleteAddress(index);
//                     closeOverlay();
//                   }}
//                   className="bg-red-500 text-white"
//                 >
//                   Xóa
//                 </Button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default AddressOverlayComponent;
