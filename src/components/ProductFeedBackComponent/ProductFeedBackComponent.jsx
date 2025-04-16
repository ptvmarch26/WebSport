import { useState, useEffect, useRef } from "react";
import { IoIosStar, IoIosStarHalf } from "react-icons/io";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import FeedbackComponent from "../FeedBackComponent/FeedBackComponent";
import PanigationComponent from "../PanigationComponent/PanigationComponent";
import { getAllFeedback } from "../../services/api/FeedbackApi";

const ProductFeedBackComponent = ({ product }) => {
  const [selectedStars, setSelectedStars] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const feedbacksPerPage = 5;
  const dropdownRef = useRef(null);
  const [feedbacks, setFeedbacks] = useState([]);

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

  console.log("fb", feedbacks);
  const indexOfLastFeedback = currentPage * feedbacksPerPage;
  const indexOfFirstFeedback = indexOfLastFeedback - feedbacksPerPage;

  const filteredFeedbacks =
    selectedStars.length > 0
      ? feedbacks.filter((feedback) => selectedStars.includes(feedback.rating))
      : feedbacks;

  const paginatedFeedbacks = filteredFeedbacks.slice(
    indexOfFirstFeedback,
    indexOfLastFeedback
  );

  const scrollToRef = useRef(null); // Tham chiếu phần tử đường gạch ngang trên chữ "Đánh giá"

  // Cuộn đến vị trí đường gạch ngang trên chữ "Đánh giá" khi thay đổi trang
  useEffect(() => {
    if (currentPage > 1 && scrollToRef.current) {
      scrollToRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPage]);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleStarClick = (starCount) => {
    setSelectedStars((prevSelected) =>
      prevSelected.includes(starCount)
        ? prevSelected.filter((star) => star !== starCount)
        : [...prevSelected, starCount]
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  console.log("product", product);

  return (
    <div className="">
      {/* Đặt ref vào phần tử đường gạch ngang */}
      <div
        ref={scrollToRef}
        className="border-t-2 border-[rgba(0, 0, 0, 0.1)] w-full mt-8 mb-4"
      ></div>

      <p className="text-xl font-semibold uppercase my-5">Đánh giá</p>
      <div className="flex justify-between flex-wrap">
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

        <div className="relative" ref={dropdownRef}>
          <ButtonComponent
            text="Lọc theo sao"
            onClick={toggleDropdown}
            color="white"
            className="uppercase"
          />
          {isDropdownOpen && (
            <div className="absolute right-0 top-[87%] bg-white shadow-md p-2 w-48 z-3">
              {[5, 4, 3, 2, 1].map((starCount) => (
                <div
                  key={starCount}
                  className={`p-2 cursor-pointer transition duration-200 rounded flex items-center gap-1 my-1
           ${selectedStars.includes(starCount) ? "bg-gray-100" : "bg-white"}`}
                  onClick={() => handleStarClick(starCount)}
                >
                  {[...Array(starCount)].map((_, index) => (
                    <IoIosStar
                      key={`yellow-${index}`}
                      className="text-yellow-400"
                    />
                  ))}
                  {[...Array(5 - starCount)].map((_, index) => (
                    <IoIosStar
                      key={`gray-${index}`}
                      className="text-gray-400"
                    />
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="p-4">
        {paginatedFeedbacks.map((feedback, index) => (
          <div key={feedback._id || index}>
            <FeedbackComponent feedback={feedback} />
          </div>
        ))}
      </div>

      {filteredFeedbacks.length > feedbacksPerPage && (
        <div className="flex justify-center mb-10">
          <PanigationComponent
            currentPage={currentPage}
            totalPages={Math.ceil(filteredFeedbacks.length / feedbacksPerPage)}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}
      {feedbacks.length === 0 && (
        <div className="flex flex-col items-center">
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
