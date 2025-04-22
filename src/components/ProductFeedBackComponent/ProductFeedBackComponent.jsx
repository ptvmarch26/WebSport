import { useState, useEffect, useRef } from "react";
import { IoIosStar, IoIosStarHalf } from "react-icons/io";
import FeedbackComponent from "../FeedBackComponent/FeedBackComponent";
import PanigationComponent from "../PanigationComponent/PanigationComponent";
import { getAllFeedback } from "../../services/api/FeedbackApi";

const ProductFeedBackComponent = ({ product }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const feedbacksPerPage = 5;
  const [feedbacks, setFeedbacks] = useState([]);
  const scrollToRef = useRef(null);

  const averageRating =
    feedbacks.length > 0
      ? feedbacks.reduce((sum, fb) => sum + fb.rating, 0) / feedbacks.length
      : 0;

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const data = await getAllFeedback(product._id);
      if (data?.EC === 0) {
        setFeedbacks(data.result);
      }
    };

    if (product?._id) {
      fetchFeedbacks();
    }
  }, [product?._id]);

  const indexOfLastFeedback = currentPage * feedbacksPerPage;
  const indexOfFirstFeedback = indexOfLastFeedback - feedbacksPerPage;
  const paginatedFeedbacks = feedbacks.slice(indexOfFirstFeedback, indexOfLastFeedback);

  useEffect(() => {
    if (currentPage > 1 && scrollToRef.current) {
      scrollToRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPage]);

  return (
    <div>
      <div
        ref={scrollToRef}
        className="border-t-2 border-[rgba(0, 0, 0, 0.1)] w-full mt-8 mb-4"
      ></div>

      <p className="text-xl font-semibold uppercase my-5">Đánh giá</p>
      <div className="flex items-center mb-2">
        {[...Array(5)].map((_, index) => {
          if (index < Math.floor(averageRating)) {
            return (
              <IoIosStar
                key={index}
                className="text-yellow-400 text-xl sm:text-5xl"
              />
            );
          } else if (
            index === Math.floor(averageRating) &&
            averageRating % 1 !== 0
          ) {
            return (
              <IoIosStarHalf
                key={index}
                className="text-yellow-400 text-xl sm:text-5xl"
              />
            );
          } else {
            return (
              <IoIosStar
                key={index}
                className="text-gray-400 text-xl sm:text-5xl"
              />
            );
          }
        })}
        <span className="ml-2 text-xl font-medium">
          {averageRating.toFixed(1)}
        </span>
      </div>

      <div className="p-4">
        {paginatedFeedbacks.map((feedback, index) => (
          <div key={feedback._id || index}>
            <FeedbackComponent feedback={feedback} />
          </div>
        ))}
      </div>

      {feedbacks.length > feedbacksPerPage && (
        <div className="flex justify-center mb-10">
          <PanigationComponent
            currentPage={currentPage}
            totalPages={Math.ceil(feedbacks.length / feedbacksPerPage)}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}

      {feedbacks.length === 0 && (
        <div className="flex flex-col items-center mb-5">
          <img
            src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/shoprating/7d900d4dc402db5304b2.png"
            alt="No Feedback"
            className="w-[150px] h-[150px]"
          />
          <p>Hiện không có đánh giá nào</p>
        </div>
      )}
    </div>
  );
};

export default ProductFeedBackComponent;
