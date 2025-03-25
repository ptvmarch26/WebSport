import { createContext, useContext, useEffect, useState } from "react";
import { getAllProducts, createProduct, updateProduct, deleteProduct, getDetailsProduct } from "../services/api/ProductApi";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [productDetails, setProductDetails] = useState(null); 

  const fetchProducts = async () => {
    const res = await getAllProducts();
    if (res?.EM === "Lấy danh sách sản phẩm thành công") {
        setProducts(res.result.products);
    } else {
        console.error(res?.EM || "Lỗi khi lấy danh sách sản phẩm");
    }
  };
  
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProductDetails = async (productId) => {
    const res = await getDetailsProduct(productId);
    if (res?.EC === 0) {
        setProductDetails(res.data);
    } else {
        console.error(res?.EM || "Lỗi khi lấy thông tin sản phẩm");
    }
    
  };

  const addProduct = async (productData) => {
    const res = await createProduct(productData);
    return res;
  };

  const editProduct = async (productId, updatedData) => {
    const res = await updateProduct(productId, updatedData);
    
    if (res?.EC === 0) {
        setProducts(products.map((p) => (p._id === productId ? res.data : p)));
    }

    return res;
  };

  const removeProduct = async (productId) => {
    const res = await deleteProduct(productId);
    
    if (res?.EC === 0) {
        setProducts(products.filter((p) => p._id !== productId));
    }

    return res;
  };

  

  return (
    <ProductContext.Provider 
      value={{ 
        products,
        productDetails,
        setProducts,
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
