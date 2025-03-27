import axios from "axios";

const API_URL = "http://localhost:5000/product";

const getToken = () => localStorage.getItem("accessToken");

export const createProduct = async (productData) => {
  const formData = new FormData();
  
  formData.append("product_title", productData.product_title);
  formData.append("product_brand", productData.product_brand);
  formData.append("product_price", productData.product_price);
  formData.append("product_countInStock", productData.product_countInStock);
  formData.append("product_selled", productData.product_selled);
  formData.append("product_percent_discount", productData.product_percent_discount);
  formData.append("product_rate", productData.product_rate);
  formData.append("product_description", productData.product_description);
  formData.append("product_category", productData.product_category);
  formData.append("product_display", productData.product_display);
  formData.append("product_famous", productData.product_famous);

  if (productData.product_main_img && productData.product_main_img[0]) {
    const imageFile = productData.product_main_img[0].originFileObj || productData.product_main_img[0];

    if (imageFile instanceof File) {
      formData.append("product_main_img", imageFile);
    } else {
      console.error("Không phải là file");
    }
  } else {
    console.error("Không có hình ảnh chính");
  }

  if (productData.product_subs_img && productData.product_subs_img.length > 0) {
    productData.product_subs_img.forEach((fileItem, index) => {
      const subImageFile = fileItem.originFileObj || fileItem;
      if (subImageFile instanceof File) {
        formData.append("product_subs_img", subImageFile); 
      } else {
        console.warn(`Ảnh phụ ở vị trí ${index} không hợp lệ`);
      }
    });
  }

  if (productData.variants && productData.variants.length > 0) {
    const variantsPayload = [];
  
    productData.variants.forEach((variant, index) => {
      const variantData = {
        variant_color: variant.variant_color,
        variant_size: variant.variant_size,
        variant_price: variant.variant_price,
        variant_countInStock: variant.variant_countInStock,
        variant_percent_discount: variant.variant_percent_discount || 0, // fallback nếu không có
      };
  
      // Ảnh chính
      if (
        variant.variant_img &&
        variant.variant_img.image_main &&
        variant.variant_img.image_main[0]
      ) {
        const mainImage = variant.variant_img.image_main[0].originFileObj || variant.variant_img.image_main[0];
        if (mainImage instanceof File) {
          formData.append("image_main", mainImage);
        }
      }
  
      // Ảnh phụ
      if (
        variant.variant_img &&
        variant.variant_img.image_subs &&
        variant.variant_img.image_subs.length > 0
      ) {
        variantData.image_sub_fields = []; // danh sách key ảnh phụ
        variant.variant_img.image_subs.forEach((subImage, subIdx) => {
          const subFile = subImage.originFileObj || subImage;
          if (subFile instanceof File) {
            const subFieldKey = "image_subs";
            formData.append(subFieldKey, subFile);
          }
        });
      }
  
      variantsPayload.push(variantData);
    });
  
    formData.append("variants", JSON.stringify(variantsPayload));
  }

  formData.forEach((value, key) => {
    console.log(key, value);
  });
  
  try {
    
    const response = await axios.post(`${API_URL}/create`, formData, {
      headers: { 
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Hàm cập nhật sản phẩm
export const updateProduct = async (productId, productData) => {
  const formData = new FormData();
  
  // Thêm các trường văn bản vào FormData
  Object.keys(productData).forEach(key => {
    if (key !== 'product_img' && key !== 'variants') {
      formData.append(key, productData[key]);
    }
  });

  // Xử lý hình ảnh chính
  if (productData.product_img?.image_main) {
    formData.append('image_main', productData.product_img.image_main);
  }

  // Xử lý hình ảnh phụ
  if (productData.product_img?.image_subs && productData.product_img.image_subs.length > 0) {
    productData.product_img.image_subs.forEach((img) => {
      formData.append('image_subs', img);
    });
  }

  // Xử lý variants
  if (productData.variants && productData.variants.length > 0) {
    formData.append('variants', JSON.stringify(productData.variants));

    // Xử lý hình ảnh variants
    productData.variants.forEach((variant, variantIndex) => {
      if (variant.variant_img?.image_main) {
        formData.append(`variant_image_main_${variantIndex}`, variant.variant_img.image_main);
      }

      if (variant.variant_img?.image_subs && variant.variant_img.image_subs.length > 0) {
        variant.variant_img.image_subs.forEach((img, imgIndex) => {
          formData.append(`variant_image_subs_${variantIndex}_${imgIndex}`, img);
        });
      }
    });
  }

  try {
    const response = await axios.put(`${API_URL}/update/${productId}`, formData, {
      headers: { 
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'multipart/form-data' 
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};


export const getDetailsProduct = async (productId) => {
  try {
    const res = await axios.get(`${API_URL}/details/${productId}`);
    return res.data;
  } catch (error) {
    console.error("Lỗi khi lấy thông tin sản phẩm:", error);
    return null;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const res = await axios.delete(`${API_URL}/delete/${productId}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return res.data;
  } catch (error) {
    console.error("Lỗi khi xóa sản phẩm:", error);
    return null;
  }
};

export const getAllProducts = async (limit, page, filters) => {
  try {
    const response = await axios.get(`${API_URL}/get-all`, {
      params: { limit, page, ...filters },
    });
    return response.data;
  } catch (error) {
    return error.response?.data || { EC: 1, EM: "Lỗi khi lấy danh sách sản phẩm" };
  }
};