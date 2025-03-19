import React, { useState, useEffect, useRef } from "react";
import { IoIosStar, IoIosStarHalf } from "react-icons/io";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import FeedbackComponent from "../FeedBackComponent/FeedBackComponent";
import PanigationComponent from "../PanigationComponent/PanigationComponent";

const ProductFeedBackComponent = ({ product }) => {
  const [selectedStars, setSelectedStars] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const feedbacksPerPage = 5;
  const dropdownRef = useRef(null);

  const feedbacks = [
    {
      id: 1,
      name: "MissMaccy",
      rating: 4,
      content: {
        title: "Good fit",
        text: "Got lots of compliments and they are a good fit. Love the colour combo.",
      },
      images: [
        "data:image/jpeg;base64,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",
      ],
      time: "2025-02-08T00:00:00Z",
      location: "London",
    },
    {
      id: 2,
      name: "JohnDoe",
      rating: 5,
      content: {
        title: "Perfect shoes!",
        text: "These are the best shoes I've ever bought. Super comfortable and stylish!",
      },
      images: [
        "data:image/jpeg;base64,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",
        "/images/shoes3.jpg",
      ],
      time: "2025-01-15T00:00:00Z",
      location: "New York",
    },
    {
      id: 3,
      name: "EmilyR",
      rating: 3,
      content: {
        title: "Okay, but not great",
        text: "The design is nice, but they run a bit small. Had to exchange for a bigger size.",
      },
      images: [],
      time: "2025-02-01T00:00:00Z",
      location: "Paris",
    },
    {
      id: 4,
      name: "MichaelB",
      rating: 2,
      content: {
        title: "Not satisfied",
        text: "Quality isn't what I expected. The sole wore out after just a month.",
      },
      images: ["/images/shoes4.jpg"],
      time: "2025-01-20T00:00:00Z",
      location: "Berlin",
    },
    {
      id: 5,
      name: "SophiaL",
      rating: 5,
      content: {
        title: "Love these shoes!",
        text: "Amazing quality, very comfy and stylish. Will buy again!",
      },
      images: ["/images/shoes5.jpg"],
      time: "2025-02-10T00:00:00Z",
      location: "Tokyo",
    },
    {
      id: 6,
      name: "SophiaL",
      rating: 5,
      content: {
        title: "Love these shoes!",
        text: "Amazing quality, very comfy and stylish. Will buy again!",
      },
      images: ["/images/shoes5.jpg"],
      time: "2025-02-10T00:00:00Z",
      location: "Tokyo",
    },
  ];

  const indexOfLastFeedback = currentPage * feedbacksPerPage;
  const indexOfFirstFeedback = indexOfLastFeedback - feedbacksPerPage;
  const paginatedFeedbacks = feedbacks.slice(
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

  return (
    <div className="">
      {/* Đặt ref vào phần tử đường gạch ngang */}
      <div
        ref={scrollToRef}
        className="border-t-2 border-[rgba(0, 0, 0, 0.1)] w-full mt-8 mb-4"
      ></div>

      <p className="text-xl font-semibold uppercase my-5">Đánh giá</p>

      <div className="flex justify-between flex-wrap">
        {/* Hiển thị đánh giá sao */}
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, index) => {
            if (index < Math.floor(product.star)) {
              return (
                <IoIosStar key={index} className="text-yellow-400 text-xl sm:text-5xl" />
              );
            } else if (
              index === Math.floor(product.star) &&
              product.star % 1 !== 0
            ) {
              return (
                <IoIosStarHalf
                  key={index}
                  className="text-yellow-400 text-xl sm:text-5xl"
                />
              );
            } else {
              return (
                <IoIosStar key={index} className="text-gray-400 text-xl sm:text-5xl" />
              );
            }
          })}
          <span className="ml-2 text-xl font-medium">
            {product.star.toFixed(1)}
          </span>
        </div>

        {/* Dropdown để lọc theo số sao */}
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

      {/* Hiển thị feedbacks theo trang */}
      <div className="p-4">
        {paginatedFeedbacks.map((feedback, index) => (
          <div key={index}>
            <FeedbackComponent {...feedback} />
          </div>
        ))}
      </div>

      {/* Phân trang */}
      {feedbacks.length > 5 && (
        <div className="flex justify-center">
          <PanigationComponent
            currentPage={currentPage}
            totalPages={Math.ceil(feedbacks.length / feedbacksPerPage)}
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
