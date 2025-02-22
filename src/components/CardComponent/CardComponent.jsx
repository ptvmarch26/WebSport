import React from "react";

const CardComponent = ({ image, type, onClick }) => {
  return (
    <div 
      className="relative px-2 cursor-pointer group" 
      onClick={onClick}
    >
      {/* Hình ảnh */}
      <img
        src={image}
        alt={type}
        className="w-full h-auto object-cover transition duration-300 group-hover:brightness-75 group-hover:saturate-150"
      />
      
      {/* Nền chữ */}
      <div className="absolute bottom-10 left-10 text-sm font-medium bg-white py-1 px-3 rounded-2xl shadow-lg transition duration-300 group-hover:brightness-75">
        {type}
      </div>
    </div>
  );
};

export default CardComponent;
