import { createContext, useContext, useState, useEffect } from "react";
import { getAllUsers, updateUser, changePassword, addAddress, updateAddress } from "../services/api/UserApi";
import { message } from "antd";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
  
      if (data?.EM === "Get all users successfully" && Array.isArray(data.result)) {
      const processedUsers = data.result.map(user => ({
        ...user,
        status: user.deleted_at ? "Đã khóa" : "Hoạt động", 
      }));

      setUsers(processedUsers);
      } else {
        message.error("Không thể tải danh sách người dùng!");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      message.error("Không thể tải danh sách người dùng!");
    } 
  };

  const fetchUser = async (userId) => {
    try {
      const data = await getUser(userId);
      if (data?.EC === 0) {
        setSelectedUser(data.user);
      } else {
        message.error("Không tìm thấy thông tin người dùng!");
      }
    } catch (error) {
      console.error("Lỗi khi lấy thông tin người dùng:", error);
      message.error("Không thể lấy thông tin người dùng!");
    } 
  };
  const handleUpdateUser = async (userData) => {
    const updatedUser = await updateUser(userData).catch((error) => null);
  
    if (updatedUser) {
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === updatedUser.id ? updatedUser : u))
      );
      message.success("Cập nhật thông tin người dùng thành công!");
    } else {
      message.error("Cập nhật thất bại!");
    }
  };
  

  const handleChangePassword = async (oldPassword, newPassword) => {
    return await changePassword(oldPassword, newPassword);
  };

  const handleAddAddress = async (addressData) => {
    return await addAddress(addressData);
  };

  const handleUpdateAddress = async (index, updateData) => {
    return await updateAddress(index, updateData);
  };

  return (
    <UserContext.Provider
      value={{
        users,
        fetchUsers,
        fetchUser,
        handleUpdateUser,
        handleChangePassword,
        handleAddAddress,
        handleUpdateAddress,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
