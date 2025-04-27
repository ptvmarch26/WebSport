import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { FaRegStar, FaStar, FaTimesCircle } from "react-icons/fa";
import { useOrder } from "../../context/OrderContext";
import { usePopup } from "../../context/PopupContext";
import { createFeedback } from "../../services/api/FeedbackApi";
import ConfirmDialogComponent from "../../components/ConfirmDialogComponent/ConfirmDialogComponent";

const ratings = [1, 2, 3, 4, 5];

const OrderFeedbackPage = () => {
  const { id } = useParams();
  const { fetchOrderDetail, orderDetails } = useOrder();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showPopup } = usePopup();

  useEffect(() => {
    fetchOrderDetail(id);
  }, [id]);

  const [feedbackInitialized, setFeedbackInitialized] = useState(false);
  const [feedback, setFeedback] = useState([]);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  useEffect(() => {
    if (
      orderDetails &&
      orderDetails.products &&
      orderDetails.products.length > 0 &&
      !feedbackInitialized
    ) {
      setFeedback(
        orderDetails.products.map((product) => ({
          product_id: product.product_id._id,
          color: product.color,
          variant: product.variant,
          order_id: orderDetails._id,
          user_id: orderDetails.user_id,
          content: "",
          rating: 0,
          images: [],
          videos: [],
        }))
      );
      setFeedbackInitialized(true);
    }
  }, [orderDetails, feedbackInitialized]);

  // Hàm tìm giá variant và hình ảnh dựa vào màu sắc và kích thước
  const findProductDetails = (product) => {
    const colorOption = product.product_id.colors.find(
      (c) => c.color_name === product.color
    );

    let variantPrice = product.product_id.product_price;
    let productImage = product.product_id.product_img;

    if (colorOption) {
      productImage = colorOption.imgs.img_main;

      const variantOption = colorOption.variants.find(
        (v) => v.variant_size === product.variant
      );

      if (variantOption) {
        variantPrice = variantOption.variant_price;
      }
    }

    return { variantPrice, productImage };
  };

  const handleRating = (index, rating) => {
    const updatedFeedback = [...feedback];
    updatedFeedback[index].rating = rating;
    setFeedback(updatedFeedback);
  };

  const handleContentChange = (index, content) => {
    const updatedFeedback = [...feedback];
    updatedFeedback[index].content = content;
    setFeedback(updatedFeedback);
  };

  const handleFileUpload = (index, event, type) => {
    const files = Array.from(event.target.files);
    const updatedFeedback = [...feedback];

    if (type === "image") {
      updatedFeedback[index].images = [
        ...updatedFeedback[index].images,
        ...files,
      ];
    } else if (type === "video") {
      updatedFeedback[index].videos = [
        ...updatedFeedback[index].videos,
        ...files,
      ];
    }

    setFeedback(updatedFeedback);
    event.target.value = "";
  };

  const handleDeleteFile = (index, fileIndex, type) => {
    const updatedFeedback = [...feedback];

    if (type === "image") {
      const newImages = [...updatedFeedback[index].images];
      newImages.splice(fileIndex, 1);
      updatedFeedback[index].images = newImages;
    } else if (type === "video") {
      const newVideos = [...updatedFeedback[index].videos];
      newVideos.splice(fileIndex, 1);
      updatedFeedback[index].videos = newVideos;
    }

    setFeedback(updatedFeedback);
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      const invalidFeedback = feedback.find(
        (item) => !item.rating || !item.content
      );
      if (invalidFeedback) {
        showPopup(
          "Vui lòng nhập đánh giá và nhận xét cho tất cả sản phẩm",
          false
        );
        setIsSubmitting(false);
        return;
      }

      for (const item of feedback) {
        const formData = new FormData();
        formData.append("product_id", item.product_id);
        formData.append("order_id", id);
        formData.append("content", item.content);
        formData.append("rating", item.rating);
        formData.append("color", item.color);
        formData.append("variant", item.variant);

        item.images.forEach((image) => {
          formData.append("files", image);
        });

        item.videos.forEach((video) => {
          formData.append("files", video);
        });

        const result = await createFeedback(formData);

        if (!result || result.EC !== 0) {
          showPopup(result?.EM || "Có lỗi xảy ra khi gửi đánh giá", false);
          setIsSubmitting(false);
          return;
        }
      }

      showPopup("Đánh giá sản phẩm thành công", true);
      navigate("/orders");
    } catch {
      showPopup("Có lỗi xảy ra khi gửi đánh giá", false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelClick = () => {
    setOpenConfirmDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenConfirmDialog(false);
  };

  const handleConfirmCancel = () => {
    setOpenConfirmDialog(false);
    navigate("/orders");
  };
  if (!orderDetails || !orderDetails.products) {
    return (
      <div className="xl:max-w-[1200px] container mx-auto py-10 px-2">
        <div className="min-h-[400px] p-6 bg-white text-black border border-gray-300 rounded-lg flex items-center justify-center">
          <p className="text-lg">Đang tải thông tin đơn hàng...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="xl:max-w-[1200px] container mx-auto py-10 px-2">
      <div className="min-h-[400px] p-6 bg-white text-black border border-gray-300 rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold uppercase">Đánh giá đơn hàng</h1>
        </div>
        {orderDetails.products.map((product, index) => {
          const { variantPrice, productImage } = findProductDetails(product);
          const discountedPrice =
            product.product_id.product_percent_discount > 0
              ? (variantPrice *
                  (100 - product.product_id.product_percent_discount)) /
                100
              : variantPrice;

          return (
            <div
              key={index}
              className="pb-6 mb-6 border-b border-gray-200 last:border-none space-y-3"
            >
              <div className="flex items-center gap-4 py-4">
                <img
                  src={productImage}
                  alt={product.product_id.product_title}
                  className="w-16 h-16 object-cover border border-gray-300 rounded"
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold line-clamp-1">
                    {product.product_id.product_title}
                  </p>
                  <p className="text-sm text-gray-500">
                    {product.color} - {product.variant}
                  </p>
                  <p className="text-sm">x{product.quantity}</p>
                </div>
                <div className="flex space-x-2">
                  {product.product_id.product_percent_discount > 0 && (
                    <p className="text-[#9ca3af] line-through">
                      {variantPrice.toLocaleString()}đ
                    </p>
                  )}
                  <p className="font-medium text-[#ba2b20]">
                    {discountedPrice.toLocaleString()}đ
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium">Chất lượng sản phẩm:</p>
                <div className="flex gap-2">
                  {ratings.map((star) => (
                    <motion.button
                      key={star}
                      whileHover={{ scale: 1.2 }}
                      className="text-yellow-500 text-2xl cursor-pointer"
                      onClick={() => handleRating(index, star)}
                    >
                      {feedback[index]?.rating >= star ? (
                        <FaStar />
                      ) : (
                        <FaRegStar />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-2">
                <label
                  htmlFor={`image-${index}`}
                  className="text-sm font-medium cursor-pointer"
                >
                  Thêm ảnh:
                </label>
                <input
                  id={`image-${index}`}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleFileUpload(index, e, "image")}
                  className="block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-black file:text-white file:cursor-pointer hover:file:bg-gray-800 file:disabled:opacity-50 file:disabled:pointer-events-none cursor-pointer"
                />
                <div className="flex gap-2 mt-2 flex-wrap">
                  {feedback[index]?.images.map((image, imgIndex) => (
                    <div key={imgIndex} className="relative group">
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Uploaded"
                        className="w-16 h-16 object-cover border border-gray-300 rounded"
                      />
                      <button
                        className="absolute -top-[6px] -right-2 bg-white rounded-full text-red-500 shadow-md opacity-80 group-hover:opacity-100 transition-opacity"
                        onClick={() =>
                          handleDeleteFile(index, imgIndex, "image")
                        }
                        title="Xóa ảnh"
                      >
                        <FaTimesCircle size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-2">
                <label
                  htmlFor={`video-${index}`}
                  className="text-sm font-medium cursor-pointer"
                >
                  Thêm video:
                </label>
                <input
                  id={`video-${index}`}
                  type="file"
                  accept="video/*"
                  multiple
                  onChange={(e) => handleFileUpload(index, e, "video")}
                  className="block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-black file:text-white file:cursor-pointer hover:file:bg-gray-800 file:disabled:opacity-50 file:disabled:pointer-events-none cursor-pointer"
                />
                <div className="flex gap-2 flex-wrap">
                  {feedback[index]?.videos.map((video, vidIndex) => (
                    <div key={vidIndex} className="relative group">
                      <video
                        key={vidIndex}
                        src={URL.createObjectURL(video)}
                        controls
                        className="w-32 h-32 border border-gray-300 rounded"
                      />
                      <button
                        className="absolute -top-2 -right-2 bg-white rounded-full text-red-500 shadow-md opacity-80 group-hover:opacity-100 transition-opacity"
                        onClick={() =>
                          handleDeleteFile(index, vidIndex, "video")
                        }
                        title="Xóa video"
                      >
                        <FaTimesCircle size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Nhận xét của bạn:</p>
                <motion.textarea
                  className="w-full h-32 border-2 border-[#b0bec5] rounded-md p-4 focus:outline-none"
                  placeholder="Nhập đánh giá của bạn ở đây..."
                  value={feedback[index]?.content || ""}
                  onChange={(e) => handleContentChange(index, e.target.value)}
                  initial={{ borderColor: "#D1D5DB" }}
                  whileFocus={{
                    borderColor: "#000000",
                    transition: { duration: 0.2 },
                  }}
                ></motion.textarea>
              </div>
            </div>
          );
        })}

        <div className="flex justify-end space-x-2 mt-6">
          <Button
            variant="filled"
            color="white"
            className="w-[100px] h-[30px] sm:w-[150px] sm:h-[40px] text-black border rounded font-medium"
            onClick={handleCancelClick}
            disabled={isSubmitting}
          >
            Hủy
          </Button>
          <Button
            variant="filled"
            color="black"
            className="w-[100px] h-[30px] sm:w-[150px] sm:h-[40px] text-white !bg-black rounded font-medium"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Đang gửi..." : "Đánh giá"}
          </Button>
        </div>
      </div>
      <ConfirmDialogComponent
        open={openConfirmDialog}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmCancel}
        title="Xác nhận hủy đánh giá"
        message="Bạn có chắc chắn muốn hủy đánh giá? Tất cả thông tin đánh giá sẽ không được lưu"
      />
    </div>
  );
};

export default OrderFeedbackPage;
