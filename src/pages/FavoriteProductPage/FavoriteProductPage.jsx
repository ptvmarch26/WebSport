import { useState, useEffect } from "react";
import {
  getFavourite,
  updateFavourite,
  clearFavourites,
} from "../../services/api/FavouriteApi"; // import API
import FavoriteItemComponent from "../../components/FavoriteItemComponent/FavoriteItemComponent";
import { useProduct } from "../../context/ProductContext";
import { useCategories } from "../../context/CategoriesContext";
import { Button } from "@material-tailwind/react";

const FavoriteProductPage = () => {
  const fetchFavourites = async () => {
    const favourites = await getFavourite();
    if (favourites?.EC === 0) {
      setCart(favourites.result);
    }
  };
  const [cart, setCart] = useState([]);
  const { fetchProductDetails } = useProduct();
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    fetchFavourites();
  }, []);

  useEffect(() => {
    const fetchAllProductDetails = async () => {
      const productDetails = await Promise.all(
        cart.map(async (item) => {
          return await fetchProductDetails(item);
        })
      );
      setProducts(productDetails);
    };

    if (cart.length > 0) {
      fetchAllProductDetails();
    }
  }, [cart]);


  const handleRemove = async (id) => {
    const updatedFavourites = await updateFavourite(id);
    if (updatedFavourites) {
      setCart(updatedFavourites);
      setProducts((prevProducts) =>
        prevProducts.filter((item) => item._id !== id)
      );
    }
  };

  const handleClearAll = async () => {
    const result = await clearFavourites();
    console.log("result", result);
    if (result) {
      setCart([]);
      setProducts([]);
    }
  };

  return (
    <div className="xl:max-w-[1200px] container mx-auto py-10 px-2">
      <div className="border rounded-lg p-10">
        <div className="flex justify-between gap-2 flex-wrap">
          <h2 className="uppercase text-xl font-semibold">
            Danh sách sản phẩm yêu thích
          </h2>
          <p>{products.length} sản phẩm</p>
        </div>
        <div className="border-t-2 border-[rgba(0, 0, 0, 0.1)] w-full my-8"></div>

        {products.length === 0 ? (
          <p className="text-center uppercase text-xl font-semibold text-gray-600">
            Hiện không có sản phẩm nào trong danh sách
          </p>
        ) : (
          products.map((item, index) => (
            <FavoriteItemComponent
              key={index}
              productDetails={item}
              onRemove={handleRemove}
            />
          ))
        )}
      </div>

      {products.length > 0 && (
        <Button
          onClick={handleClearAll}
          className="mt-6 w-full rounded"
          color="red"
        >
          Xóa tất cả sản phẩm yêu thích
        </Button>
      )}
    </div>
  );
};

export default FavoriteProductPage;
