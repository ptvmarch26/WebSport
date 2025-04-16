import { createContext, useContext, useEffect, useState } from "react";
import { getAllProducts, createProduct, updateProduct, deleteProduct, getDetailsProduct } from "../services/api/ProductApi";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [productDetails, setProductDetails] = useState(null); 

  const fetchProducts = async (filters = {}) => {
    const res = await getAllProducts(filters);
    if (res?.EM === "Lấy danh sách sản phẩm thành công") {
        setProducts(res.result.products);
    } else {
        console.error(res);
    }
    return res;
  };

  const fetchProductDetails = async (productId) => {
    const res = await getDetailsProduct(productId);
    if (res?.EC === 0) {
        setProductDetails(res.result);
    } else {
        console.error(res?.EM || "Lỗi khi lấy thông tin sản phẩm");
    }
    return res.result;
    
  };

  const addProduct = async (productData) => {
    const res = await createProduct(productData);
    setProducts((prev) => [...prev, res.data]);
    return res;
  };

  const editProduct = async (productId, updatedData) => {
    const res = await updateProduct(productId, updatedData);
    
    setProducts((prev) =>
      prev.map((product) =>
        product._id === productId ? res.data : product
      )
    );

    return res;
  };

  const removeProduct = async (productId) => {
    const res = await deleteProduct(productId);
    setProducts((prev) => prev.filter((p) => p._id !== productId));
    return res;
  };

  

  return (
    <ProductContext.Provider 
      value={{ 
        products,
        productDetails,
        setProducts,
        setProductDetails,
        fetchProducts, 
        fetchProductDetails, 
        addProduct, 
        editProduct, 
        removeProduct 
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  return useContext(ProductContext);
};
