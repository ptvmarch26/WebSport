import React from "react";
import { IoTrashOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";

const CartItemComponent = ({ item, onRemove, onIncrease, onDecrease }) => {
  const decreaseQuantity = () => {
    if (item.quantity > 1) {
      onDecrease(item._id, item.quantity - 1);
    }
  };

  const increaseQuantity = () => {
    onIncrease(item.id, item.quantity + 1);
  };

  return (
    <>
      <div className="flex gap-4">
        <img
          src={item?.product_id?.product_img?.image_main}
          alt={item?.product_id?.product_title}
          className="w-28 h-28 object-cover"
        />
        <div className="flex-1">
          <h2 className="font-semibold line-clamp-2">{item?.product_id?.product_title}</h2>
          <div className="flex items-center">
            <p className="text-md font-weight text-[#9ca3af] line-through mr-4">
              {item.product_id?.product_price.toLocaleString()}₫
            </p>
            <p className="text-md font-bold text-[#ba2b20] mr-4">
              {(item.product_id?.product_price*(1-item.product_id?.product_percent_discount/100)).toLocaleString()}₫
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <button className="p-2 hover:bg-gray-200 transition-all duration-300 hover:rounded-full">
              <FaRegHeart className="text-xl" />
            </button>
            <button
              onClick={onRemove}
              className="p-2 hover:bg-gray-200 transition-all duration-300 hover:rounded-full"
            >
              <IoTrashOutline className="text-xl text-red-500" />
            </button>
          </div>
          <div className="inline-flex items-center w-auto border border-[#a1a8af]">
            <button
              className="px-4 py-2 hover:bg-white hover:text-black"
              onClick={decreaseQuantity}
            >
              -
            </button>
            <input
              type="text"
              value={item.quantity}
              className="w-12 text-center text-black"
              readOnly
            />
            <button
              className="px-4 py-2 hover:bg-white hover:text-black"
              onClick={increaseQuantity}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="border-t-2 border-[rgba(0, 0, 0, 0.1)] w-full my-6"></div>
    </>
  );
};

export default CartItemComponent;
