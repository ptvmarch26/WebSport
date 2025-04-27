import { createContext, useState, useContext } from "react";
import {
  getAllDiscounts,
  getDetailDiscount,
  createDiscount,
  updateDiscount,
  deleteDiscount,
  getDiscountForOrder
} from "../services/api/DiscountApi";

const DiscountContext = createContext();

export const DiscountProvider = ({ children }) => {
  const [discounts, setDiscounts] = useState([]);
  const [discountDetail, setDiscountDetail] = useState(null);
  
  const fetchDiscounts = async () => {
    const response = await getAllDiscounts();
    if (response?.EC === 0) {
      setDiscounts(response.result);
    } else {
      return;
    }
  };

  // Lấy chi tiết mã giảm giá
  const fetchDiscountDetail = async (discountId) => {
    const response = await getDetailDiscount(discountId);
    setDiscountDetail(response.data);

  };

  // Tạo mã giảm giá mới
  const handleCreateDiscount = async (discountData) => {

    const response = await createDiscount(discountData);
    setDiscounts((prevDiscounts) => [...prevDiscounts, response.data]);
    return response;
  };

  // Cập nhật mã giảm giá
  const handleUpdateDiscount = async (discountId, discountData) => {
   
    const response = await updateDiscount(discountId, discountData);
    setDiscounts((prevDiscounts) =>
    prevDiscounts.map((discount) =>
        discount._id === discountId ? response.data : discount
    )
    );
    return response;
  };

  // Xóa mã giảm giá
  const handleDeleteDiscount = async (discountId) => {
    const res = await deleteDiscount(discountId);
    setDiscounts((prevDiscounts) =>
    prevDiscounts.filter((discount) => discount._id !== discountId)
    );
    return res;
  };
  
  const fetchDiscountForOrder = async (product_id) => {
    const response = await getDiscountForOrder(product_id);
    setDiscounts(response?.result);
    return response;
  }

  return (
    <DiscountContext.Provider
      value={{
        discounts,
        discountDetail,
        fetchDiscounts,
        setDiscounts,
        fetchDiscountDetail,
        handleCreateDiscount,
        handleUpdateDiscount,
        handleDeleteDiscount,
        fetchDiscountForOrder,
      }}
    >
      {children}
    </DiscountContext.Provider>
  );
};

export const useDiscount = () =>  useContext(DiscountContext);