import { FaChevronLeft } from "react-icons/fa";

const BackComponent = ({ onClick, isDisabled, ...props }) => {
  return (
    <div
      onClick={isDisabled ? null : onClick} // Không click nếu bị disable
      style={{
        ...props,
        cursor: isDisabled ? "not-allowed" : "pointer",
        opacity: isDisabled ? 0.5 : 1, // Làm mờ nếu disable
      }}
    >
      <FaChevronLeft />
    </div>
  );
};

export default BackComponent;
