import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { FaRegStar, FaStar } from "react-icons/fa";

const ratings = [1, 2, 3, 4, 5];

const OrderFeedbackPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { products } = location.state || { products: [] };

  const [feedback, setFeedback] = useState(
    products.map((product) => ({
      id: product.name,
      rating: 0,
      comment: "",
      images: [],
      videos: [],
    }))
  );

  const handleRating = (index, rating) => {
    const updatedFeedback = [...feedback];
    updatedFeedback[index].rating = rating;
    setFeedback(updatedFeedback);
  };

  const handleCommentChange = (index, comment) => {
    const updatedFeedback = [...feedback];
    updatedFeedback[index].comment = comment;
    setFeedback(updatedFeedback);
  };

  const handleFileUpload = (index, event, type) => {
    const files = Array.from(event.target.files);
    const updatedFeedback = [...feedback];
    if (type === "image") {
      updatedFeedback[index].images = files;
    } else if (type === "video") {
      updatedFeedback[index].videos = files;
    }
    setFeedback(updatedFeedback);
  };

  const handleSubmit = () => {
    console.log("Submitted Feedback:", feedback);
    // navigate("/orders");
  };

  const handleCancel = () => {
    navigate("/orders");
  };

  return (
    <div className="xl:max-w-[1200px] container mx-auto py-10 px-2">
      <div className="min-h-[400px] p-6 bg-white text-black border border-gray-300 rounded-lg">
        <h1 className="text-2xl font-bold uppercase mb-4">Đánh giá đơn hàng</h1>
        {products.map((product, index) => (
          <div key={index} className="pb-4 mb-4 space-y-3">
            <div className="flex items-center gap-4 py-4 last:mb-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 object-cover border border-gray-300 rounded"
              />
              <div className="flex-1">
                <p className="text-sm font-semibold line-clamp-1">{product.name}</p>
                <p className="text-sm text-gray-500">{product.size}</p>
                <p className="text-sm">x{product.quantity}</p>
              </div>
              <div className="flex space-x-2">
                {product.oldPrice && (
                  <p className="text-[#9ca3af] line-through">
                    {product.oldPrice.toLocaleString()}đ
                  </p>
                )}
                <p className="font-medium text-[#ba2b20]">
                  {product.price.toLocaleString()}đ
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
                    {feedback[index].rating >= star ? (
                      <FaStar />
                    ) : (
                      <FaRegStar />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
            <div className="w-1/2 space-y-2">
              <label
                htmlFor="image"
                className="text-sm font-medium cursor-pointer"
              >
                Thêm ảnh:
              </label>
              <input
                id="image"
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleFileUpload(index, e, "image")}
                className="block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-black file:text-white file:cursor-pointer hover:file:bg-gray-800 file:disabled:opacity-50 file:disabled:pointer-events-none cursor-pointer"
              />
              <div className="flex gap-2 mt-2">
                {feedback[index].images.map((image, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={URL.createObjectURL(image)}
                    alt="Uploaded"
                    className="w-16 h-16 object-cover border border-gray-300 rounded"
                  />
                ))}
              </div>
            </div>
            <div className="w-1/2 space-y-2">
              <label
                htmlFor="video"
                className="text-sm font-medium cursor-pointer"
              >
                Thêm video:
              </label>
              <input
                id="video"
                type="file"
                accept="video/*"
                multiple
                onChange={(e) => handleFileUpload(index, e, "video")}
                className="block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-black file:text-white file:cursor-pointer hover:file:bg-gray-800 file:disabled:opacity-50 file:disabled:pointer-events-none cursor-pointer"
              />
              <div className="flex gap-2 ">
                {feedback[index].videos.map((video, vidIndex) => (
                  <video
                    key={vidIndex}
                    src={URL.createObjectURL(video)}
                    controls
                    className="w-32 h-32 border border-gray-300 rounded"
                  />
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Nhận xét của bạn:</p>
              <motion.textarea
                className="w-full h-32 border-2 border-[#b0bec5] rounded-md p-4 focus:outline-none"
                placeholder="Nhập đánh giá của bạn ở đây..."
                value={feedback[index].comment}
                onChange={(e) => handleCommentChange(index, e.target.value)}
                initial={{ borderColor: "#D1D5DB" }}
                whileFocus={{
                  borderColor: "#000000",
                  transition: { duration: 0.2 },
                }}
              ></motion.textarea>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="filled"
                color="white"
                className="w-[100px] h-[30px] sm:w-[150px] sm:h-[40px] text-black border rounded font-medium"
                onClick={handleCancel}
              >
                Hủy
              </Button>
              <Button
                variant="filled"
                color="black"
                className="w-[100px] h-[30px] sm:w-[150px] sm:h-[40px] text-white !bg-black rounded font-medium"
                onClick={handleSubmit}
              >
                Đánh giá
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderFeedbackPage;
