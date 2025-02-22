const ButtonComponent = ({
  text = "Xem thêm",
  width = "w-auto",
  height = "h-auto",
  color = "black", // Default color is black
  onClick,
}) => {
  return (
    <button
      className={`px-6 py-2 border ${
        color === "black"
          ? "border-white text-white bg-black hover:opacity-80"
          : "border-black text-black bg-white hover:bg-black hover:text-white"
      } transition duration-300 ${width} ${height}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default ButtonComponent;
