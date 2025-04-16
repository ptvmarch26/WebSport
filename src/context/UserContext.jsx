import { createContext, useContext, useState } from "react";
import { getUser, getAllUsers, updateUser, changePassword, addAddress, updateAddress, deleteAddress, getDiscount, deleteSearch, getChatHistory, deleteChatHistory} from "../services/api/UserApi";
import { message } from "antd";
// import { useAuth } from "./AuthContext";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [discounts, setDiscounts] = useState([]);
  // const {token } = useAuth();
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

  const fetchUser = async () => {
    const data = await getUser();
    if (data?.EC === 0) {
      setSelectedUser(data?.result);
    } else {
      message.error("Không tìm thấy thông tin người dùng!");
    }
    return data;
  };

  const handleUpdateUser = async (userData) => {
    const updatedUser = await updateUser(userData);
    console.log("updatedUser", updatedUser);
    setSelectedUser((prev) => ({
      ...prev,
      ...updatedUser.data,
    }));
    return updatedUser;
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
  
  const handleDeleteAddress = async (index) => {
    return await deleteAddress(index);
  };

  const handleGetDiscount = async () => {
    const data = await getDiscount();
    if (data?.EC === 0) {
      setDiscounts(data?.result);
    } else {
      message.error("Không tìm thấy thông tin giảm giá!");
    }
    return data;
  }

  const handleDeteleSearch = async(index) => {
    return await deleteSearch(index);
  }

  const handleGetChatHistory = async () => {
    return await getChatHistory();
  }

  const handleDeleteChatHistory = async () => {
    return await deleteChatHistory();
  }

  return (
    <UserContext.Provider
      value={{
        users,
        selectedUser,
        discounts,
        fetchUsers,
        fetchUser,
        handleUpdateUser,
        handleChangePassword,
        handleAddAddress,
        handleUpdateAddress,
        handleDeleteAddress,
        handleGetDiscount,
        handleDeteleSearch,
        handleGetChatHistory,
        handleDeleteChatHistory,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
