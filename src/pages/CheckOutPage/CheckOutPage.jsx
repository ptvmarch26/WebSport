// import { useState, useEffect } from "react";

// const CheckoutPage = ({ user }) => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     address: "",
//     email: "",
//     phone: "",
//   });

//   useEffect(() => {
//     if (user) {
//       setFormData({
//         firstName: user.firstName || "",
//         lastName: user.lastName || "",
//         address: user.address || "",
//         email: user.email || "",
//         phone: user.phone || "",
//       });
//     }
//   }, [user]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Gửi thông tin thanh toán và địa chỉ lên server hoặc DB
//   };

//   return (
//     <div className="flex justify-between p-8">
//       <div className="w-1/2">
//         <h2 className="text-2xl font-bold mb-4">Delivery</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block">First Name</label>
//             <input
//               type="text"
//               name="firstName"
//               value={formData.firstName}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block">Last Name</label>
//             <input
//               type="text"
//               name="lastName"
//               value={formData.lastName}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block">Address</label>
//             <input
//               type="text"
//               name="address"
//               value={formData.address}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block">Phone Number</label>
//             <input
//               type="text"
//               name="phone"
//               value={formData.phone}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white p-2 rounded"
//           >
//             Complete Order
//           </button>
//         </form>
//       </div>

//       <div className="w-1/3">
//         <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
//         <div className="bg-gray-100 p-4 rounded">
//           <p>Subtotal: 2,929,000đ</p>
//           <p>Delivery/Shipping: 250,000đ</p>
//           <p>Total: 3,179,000đ</p>
//           <img
//             src="/path/to/shoe-image.png"
//             alt="Nike LD-1000"
//             className="w-full mt-4"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;
