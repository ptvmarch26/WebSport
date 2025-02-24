import { FaChevronRight } from "react-icons/fa";

const NextComponent = ({ onClick, isDisabled, ...props }) => {
  return (
    <div
      onClick={isDisabled ? null : onClick} // Không click nếu bị disable
      style={{
        ...props,
        cursor: isDisabled ? "not-allowed" : "pointer",
        opacity: isDisabled ? 0.5 : 1, // Làm mờ nếu disable
      }}
    >
      <FaChevronRight />
    </div>
  );
};

export default NextComponent;
