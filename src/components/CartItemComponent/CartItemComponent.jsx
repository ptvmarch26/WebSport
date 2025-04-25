import { useEffect, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getFavourite, updateFavourite } from "../../services/api/FavouriteApi";

const CartItemComponent = ({ item, onRemove, onIncrease, onDecrease }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();
  const decreaseQuantity = () => {
    if (item.quantity > 1) {
      onDecrease(item?._id, item.quantity - 1);
    }
  };

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      const favouritesData = await getFavourite();

      if (favouritesData && favouritesData.result) {
        setIsFavorite(favouritesData.result.includes(item.product_id?._id));
      }
    };

    fetchFavoriteStatus();
  }, [item.product_id?._id]);

  const toggleFavorite = async () => {
    setIsFavorite(!isFavorite);
    await updateFavourite(item.product_id?._id);
  };

  const increaseQuantity = () => {
    onIncrease(item?._id, item.quantity + 1);
  };

  const selectedColor = item?.product_id?.colors.find(
    (color) => color.color_name === item.color_name
  );

  const selectedVariant = selectedColor?.variants.find(
    (variant) => variant.variant_size === item.variant_name
  );

  const imageToDisplay =
    selectedVariant?.imgs?.img_main ||
    selectedColor?.imgs?.img_main ||
    item?.product_id?.product_img;

  return (
    <>
      <div
        onClick={() => navigate(`/product/${item.product_id?._id}`)}
        className="flex gap-4 cursor-pointer"
      >
        <img
          src={imageToDisplay}
          alt={item?.product_id?.product_title}
          className="w-28 h-28 object-cover"
        />
        <div className="flex-1 space-y-2">
          <h2 className="font-semibold line-clamp-2">
            {item?.product_id?.product_title}
          </h2>
          <div className="flex items-center">
            {item.product_id?.product_percent_discount > 0 ? (
              <div>
                <p className="text-md font-bold text-[#ba2b20] mr-4">
                  {selectedVariant.variant_price?.toLocaleString()}₫
                </p>
                <p className="text-md font-weight text-[#9ca3af] line-through mr-4">
                  {(
                    selectedVariant.variant_price /
                    (1 - item.product_id?.product_percent_discount / 100)
                  ).toLocaleString()}
                  đ
                </p>
              </div>
            ) : (
              <p className="text-md font-bold text-[#ba2b20] mr-4">
                {(
                  selectedVariant?.variant_price /
                  (1 - item.product_id?.product_percent_discount / 100)
                ).toLocaleString()}
                đ
              </p>
            )}
          </div>
          <p className="text-md">
            {selectedColor?.color_name} - Size {selectedVariant?.variant_size}{" "}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <button
              className="p-2 hover:bg-gray-200 transition-all duration-300 hover:rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite();
              }}
            >
              {isFavorite ? (
                <FaHeart className="text-red-500 text-xl" />
              ) : (
                <FaRegHeart className="text-xl" />
              )}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              className="p-2 hover:bg-gray-200 transition-all duration-300 hover:rounded-full"
            >
              <IoTrashOutline className="text-xl text-red-500" />
            </button>
          </div>
          <div className="inline-flex items-center w-auto border border-[#a1a8af]">
            <button
              className="px-4 py-2 hover:bg-white hover:text-black"
              onClick={(e) => {
                e.stopPropagation();
                decreaseQuantity();
              }}
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
              onClick={(e) => {
                e.stopPropagation();
                increaseQuantity();
              }}
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
