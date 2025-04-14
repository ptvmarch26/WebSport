import AxiosInstance from "./axiosInstance";

export const createProduct = async (productData) => {
  const formData = new FormData();

  // Thông tin cơ bản của sản phẩm
  formData.append("product_title", productData.product_title);
  formData.append("product_brand", productData.product_brand);
  formData.append("product_price", productData.product_price);
  formData.append("product_selled", productData.product_selled || 0);
  formData.append(
    "product_percent_discount",
    productData.product_percent_discount || 0
  );
  formData.append("product_rate", productData.product_rate || 0);
  formData.append("product_description", productData.product_description);
  formData.append("product_category", productData.product_category);
  formData.append("product_display", productData.product_display);
  formData.append("product_famous", productData.product_famous);

  // Ảnh chính của sản phẩm
  if (productData.product_img && productData.product_img[0]) {
    const imageFile =
      productData.product_img[0].originFileObj || productData.product_img[0];
    if (imageFile instanceof File) {
      formData.append("product_img", imageFile);
    } else {
      console.error("Ảnh sản phẩm không hợp lệ");
    }
  } else {
    console.error("Không có ảnh sản phẩm");
  }

  // Xử lý danh sách màu sắc
  if (productData.colors && productData.colors.length > 0) {
    // Tạo một bản sao của dữ liệu màu để gửi dưới dạng JSON
    const colorsPayload = productData.colors.map((color, colorIndex) => {
      // Chuẩn bị dữ liệu màu sắc (không bao gồm file ảnh)
      return {
        color_name: color.color_name,
        variants: color.variants || [],
      };
    });

    // Thêm thông tin màu sắc dưới dạng JSON
    formData.append("colors", JSON.stringify(colorsPayload));

    // Xử lý riêng các file hình ảnh cho từng màu
    productData.colors.forEach((color, colorIndex) => {
      // Xử lý ảnh chính của màu
      if (color.imgs?.img_main?.[0]) {
        const mainImageFile =
          color.imgs.img_main[0].originFileObj || color.imgs.img_main[0];
        if (mainImageFile instanceof File) {
          formData.append(`color_img_${colorIndex}_main`, mainImageFile);
        }
      }

      // Xử lý các ảnh phụ của màu
      if (color.imgs?.img_subs?.length > 0) {
        color.imgs.img_subs.forEach((subImg, subIndex) => {
          const subImageFile = subImg.originFileObj || subImg;
          if (subImageFile instanceof File) {
            formData.append(`color_img_${colorIndex}_subs`, subImageFile);
          }
        });
      }
    });
  }

  formData.entries().forEach(([key, value]) => {
    console.log(`Key: ${key}, Value: ${value}`);
  });

  try {
    const response = await AxiosInstance.post("/product/create", formData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Hàm cập nhật sản phẩm
export const updateProduct = async (productId, productData) => {
  console.log("productId", productId);
  const formData = new FormData();
  // Thông tin cơ bản của sản phẩm
  formData.append("product_title", productData.product_title);
  formData.append("product_brand", productData.product_brand);
  formData.append("product_price", productData.product_price);
  formData.append("product_selled", productData.product_selled || 0);
  formData.append(
    "product_percent_discount",
    productData.product_percent_discount || 0
  );
  formData.append("product_rate", productData.product_rate || 0);
  formData.append("product_description", productData.product_description);
  formData.append("product_category", productData.product_category);
  formData.append("product_display", productData.product_display);
  formData.append("product_famous", productData.product_famous);

  // Ảnh chính của sản phẩm
  if (productData.product_img && productData.product_img[0]) {
    const imageFile =
      productData.product_img[0].originFileObj || productData.product_img[0];
    if (imageFile instanceof File) {
      formData.append("product_img", imageFile);
    } else {
      console.error("Ảnh sản phẩm không hợp lệ");
    }
  } else {
    console.error("Không có ảnh sản phẩm");
  }

  // Xử lý danh sách màu sắc
  if (productData.colors && productData.colors.length > 0) {
    // Tạo một bản sao của dữ liệu màu để gửi dưới dạng JSON
    const colorsPayload = productData.colors.map((color, colorIndex) => {
      // Chuẩn bị dữ liệu màu sắc (không bao gồm file ảnh)
      return {
        color_name: color.color_name,
        variants: color.variants || [],
      };
    });

    // Thêm thông tin màu sắc dưới dạng JSON
    formData.append("colors", JSON.stringify(colorsPayload));

    // Xử lý riêng các file hình ảnh cho từng màu
    productData.colors.forEach((color, colorIndex) => {
      // Xử lý ảnh chính của màu
      if (color.imgs?.img_main?.[0]) {
        const mainImageFile =
          color.imgs.img_main[0].originFileObj || color.imgs.img_main[0];
        if (mainImageFile instanceof File) {
          formData.append(`color_img_${colorIndex}_main`, mainImageFile);
        }
      }

      // Xử lý các ảnh phụ của màu
      if (color.imgs?.img_subs?.length > 0) {
        color.imgs.img_subs.forEach((subImg, subIndex) => {
          const subImageFile = subImg.originFileObj || subImg;
          if (subImageFile instanceof File) {
            formData.append(`color_img_${colorIndex}_subs`, subImageFile);
          }
        });
      }
    });
  }

  formData.entries().forEach(([key, value]) => {
    console.log(`Key: ${key}, Value: ${value}`);
  });

  try {
    const response = await AxiosInstance.patch(
      `/product/update/${productId}`,
      formData
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getDetailsProduct = async (productId) => {
  try {
    const res = await AxiosInstance.get(`/product/get-details/${productId}`);
    return res.data;
  } catch (error) {
    console.error("Lỗi khi lấy thông tin sản phẩm:", error);
    return null;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const res = await AxiosInstance.delete(`/product/delete/${productId}`);
    return res.data;
  } catch (error) {
    console.error("Lỗi khi xóa sản phẩm:", error);
    return null;
  }
};

export const getAllProducts = async (filters) => {
  if (typeof filters === "string") {
    filters = JSON.parse(filters);
  }
  try {
    const response = await AxiosInstance.get("/product/get-all", {
      params: filters,
    });
    return response.data;
  } catch (error) {
    return (
      error.response?.data || {
        EC: 1,
        EM: "Lỗi khi lấy danh sách sản phẩm",
        filters,
      }
    );
  }
};
