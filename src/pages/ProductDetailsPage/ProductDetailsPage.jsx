import ProductComponent from "../../components/ProductComponent/ProductComponent";
import ProductFeedBackComponent from "../../components/ProductFeedBackComponent/ProductFeedBackComponent";
import ProductInfoComponent from "../../components/ProductInfoComponent/ProductInfoComponent";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProduct } from "../../context/ProductContext";
import AnimationScroll from "../../components/AnimationScroll/AnimationScroll";

const ProductDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { fetchProductDetails, productDetails, fetchProducts, products } =
    useProduct();

  useEffect(() => {
    const fetchData = async () => {
      await fetchProductDetails(id);
    }
    fetchData();
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchProducts();
    }
    fetchData();

    
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsToShow(8); 
      } else {
        setItemsToShow(6); 
      }
    };

    handleResize(); 
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  },[]);

  const [itemsToShow, setItemsToShow] = useState(6);

  const relatedProducts = products
  .filter((p) => {
    if (!p || !p.product_category || !productDetails || !productDetails.product_category) return false;
    return (
      p._id !== productDetails._id &&
      p.product_category.category_type === productDetails.product_category.category_type &&
      p.product_category.category_gender === productDetails.product_category.category_gender
    );
  })
  .slice(0, itemsToShow);


  return (
    <div className="container mx-auto px-2">
      <ProductInfoComponent product={productDetails} />
      <ProductFeedBackComponent product={productDetails} />
      <div className="mb-20">
        <div className="border-t-2 border-[rgba(0, 0, 0, 0.1)] w-full mb-4"></div>
        <p className="text-xl font-semibold uppercase my-8">
          Sản phẩm liên quan
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {relatedProducts.map((product) => (
            <AnimationScroll key={product?._id} type="fadeUp" delay={0.1}>
              <ProductComponent
                item={product}
                onClick={() => navigate(`/product/${product?._id}`)}
              />
            </AnimationScroll>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;