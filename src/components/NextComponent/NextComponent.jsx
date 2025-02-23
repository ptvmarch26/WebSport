import { FaChevronRight } from "react-icons/fa";

const NextComponent = ({ onClick, currentSlide, slideCount, slidesToShow }) => {
  const isDisabled = currentSlide >= slideCount - slidesToShow; 

  return (
    <div
      onClick={isDisabled ? null : onClick} // Không click nếu bị disable
      style={{
        position: "absolute",
        zIndex: 1,
        top: "50%",
        right: "10px",
        transform: "translateY(-50%)",
        fontSize: "2rem",
        color: "white",
        cursor: isDisabled ? "not-allowed" : "pointer",
        opacity: isDisabled ? 0.5 : 1, // Làm mờ nếu disable
      }}
    >
      <FaChevronRight />
    </div>
  );
};

export default NextComponent;
