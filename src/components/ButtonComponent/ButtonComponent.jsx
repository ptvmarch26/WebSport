const ButtonComponent = ({
  text = "Xem thêm",
  width = "w-auto",
  height = "h-auto",
  color = "black", // Mặc định là màu đen
  icon,
  className,
  onClick,
}) => {
  return (
    <button
      className={`px-6 py-2 border flex items-center justify-center gap-2 ${className} ${
        color === "black"
          ? "border-white text-white bg-black hover:opacity-80"
          : "border-[#a1a8af] text-black bg-white hover:border-black hover:text-black active:border-black active:text-black focus:border-black focus:text-black"
      } transition duration-300 ${width} ${height}`}
      onClick={onClick}
    >
      {text}
      {icon && icon}
    </button>
  );
};

export default ButtonComponent;
