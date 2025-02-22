import ProductComponent from "../ProductComponent/ProductComponent";

const MoreProductsComponent = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {/* Giới hạn chỉ hiển thị 8 sản phẩm */}
      {products.slice(0, 8).map((product, index) => (
        <ProductComponent key={index} {...product} />
    ))}
    </div>
  );
};

export default MoreProductsComponent;
