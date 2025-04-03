import { AiOutlineEdit } from "react-icons/ai";
import { IoTrashOutline } from "react-icons/io5";
import { Link } from "react-router-dom";


const FavoriteItemComponent = ({ productDetails, onRemove, categoryDetail }) => {
  return (
    <div>
      <div className="flex gap-10 mt-10 sm:my-10">
        <Link to={"/"}>
          <img
            src={productDetails.product_img.image_main}
            alt={productDetails.title}
            className="max-w-[128px] w-[128px] h-[128px] sm:max-w-[256px] sm:w-52 sm:h-52 md:w-64 md:h-64 object-cover"
          />
        </Link>
        <div className="w-full">
          <h2 className="font-semibold line-clamp-2">{productDetails.product_title}</h2>
          <p className="text-sm my-1">
            Loại: 
            {categoryDetail && categoryDetail.length > 0 ? (
              categoryDetail
                .filter(category => category._id === productDetails.product_category)
                .map(category => category.category_type)
            ) : "Không xác định"}
          </p>
          <div className="flex productDetailss-center">
            <p className="text-md font-weight text-[#9ca3af] line-through mr-4">
              {productDetails.product_price.toLocaleString()}₫
            </p>
            <p className="text-md font-bold text-[#ba2b20] mr-4">
              {(productDetails.product_price*(1-productDetails.product_percent_discount/100)).toLocaleString()}₫
            </p>
          </div>
          <div className="flex flex-col">
            <div>
              <button className="p-2 hover:bg-gray-200 transition-all duration-300 hover:rounded-full">
                <AiOutlineEdit className="text-2xl" />
              </button>
              <button
                className="p-2 hover:bg-gray-200 transition-all duration-300 hover:rounded-full"
                onClick={() => onRemove(productDetails._id)} // Gọi hàm xóa khi nhấn
              >
                <IoTrashOutline className="text-2xl text-red-500" />
              </button>
            </div>
            <button className="flex-1 mt-4 p-3 bg-black hover:opacity-80 text-white rounded uppercase hidden sm:block">
              Thêm vào giỏ
            </button>
          </div>
        </div>
      </div>
      <button className="flex-1 w-full mt-4 p-3 bg-black hover:opacity-80 text-white rounded uppercase sm:hidden">
        Thêm vào giỏ
      </button>
    </div>
  );
};

export default FavoriteItemComponent;
