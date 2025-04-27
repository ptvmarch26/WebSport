import { createContext, useContext, useState } from "react";
import {
  getAllCategory,
  createCategory,
  getDetailCategory,
  getSubCategory,
  updateCategory,
  deleteCategory,
} from "../services/api/CategoriesApi";

const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [categoryDetail, setCategoryDetail] = useState({});

  const fetchCategories = async () => {
    const response = await getAllCategory();
    if (response?.data?.EC === 0){
        setCategories(response?.data?.result);
    }
    return response;
  };

  const fetchCategoryDetail = async (id) => {
    const response = await getDetailCategory(id);
    setCategoryDetail(response?.data?.result);
    return response?.data?.result;
  };

  const fetchSubCategories = async (id) => {
    const response = await getSubCategory(id);
    return response;
  };

  const addCategory = async (categoryData) => {
      const res = await createCategory(categoryData);
      setCategories((prevCategories) => [...prevCategories, res.data]);
      return res;
  };

  const handleUpdateCategory = async (id, updateData) => {
    const res = await updateCategory(id, updateData);
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category._id === id ? res.data : category
      )
    );
    return res;
}

  const removeCategory = async (id) => {
      const res = await deleteCategory(id);
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category._id !== id)
      );
      return res;
  };

  return (
    <CategoriesContext.Provider value={{
      categories,
      categoryDetail,
      fetchCategories,
      fetchCategoryDetail,
      fetchSubCategories,
      handleUpdateCategory,
      addCategory,
      removeCategory,
    }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => useContext(CategoriesContext);
