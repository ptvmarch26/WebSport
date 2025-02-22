import { FaChevronLeft } from 'react-icons/fa'

const BackComponent = ({ onClick, currentSlide }) => {
  const isDisabled = currentSlide === 0; // Nếu đang ở slide đầu thì disable

  return (
    <div
      onClick={isDisabled ? null : onClick} // Không click nếu bị disable
      style={{
        position: "absolute",
        zIndex: 1,
        top: "50%",
        left: "10px",
        transform: "translateY(-50%)",
        fontSize: "2rem",
        color: "white",
        cursor: isDisabled ? "not-allowed" : "pointer",
        opacity: isDisabled ? 0.5 : 1, // Làm mờ nếu disable
      }}
    >
      <FaChevronLeft />
    </div>
  );
};



export default BackComponent