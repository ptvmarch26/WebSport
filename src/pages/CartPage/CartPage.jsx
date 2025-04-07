import React, {useEffect} from "react";
import CartItemComponent from "../../components/CartItemComponent/CartItemComponent";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const CartPage = () => {
  const { cart, setCart, handleRemoveFromCart, handleDecreaseQuantity, fetchCart, handleAddToCart, handleClearCart } = useCart();

  useEffect(() => {
    fetchCart();
  }, []); 

  console.log("cart", cart);

  const cartItems = cart?.products || [];
  const navigate = useNavigate();

  const subtotal = cartItems?.reduce((acc, item) => {
    const discountedPrice = item.product_id.product_price * (1 - item.product_id.product_percent_discount / 100);
    return acc + discountedPrice * item.quantity;
  }, 0) || 0;

  const handleNavigateCheckout = () => {
    navigate("/checkout"); 
  };

  return (
    <div className="xl:max-w-[1200px] container mx-auto min-h-[500px]">
      <div className="px-2 py-5 lg:p-5 grid grid-cols-1 lg:grid-cols-3 gap-y-8 lg:gap-8">
        <div className="col-span-2">
          <h1 className="text-2xl font-bold uppercase mb-4">Giỏ hàng</h1>
          {
              cartItems?.length === 0 ? (
                <p className="text-center uppercase text-xl font-semibold text-gray-600">
                  Hiện không có sản phẩm nào trong giỏ
                </p>
              ) : (
                cartItems?.map((item) => (
                  <CartItemComponent
                    key={`${item.product_id?._id}-${item.color_name}-${item.variant_name}`}
                    item={item}
                    onRemove={() => {
                      handleRemoveFromCart(item?.product_id?._id, item?.color_name, item?.variant_name);
                      setCart((prevCart) => ({
                        ...prevCart,
                        products: prevCart.products.filter((cartItem) => 
                          !(cartItem.product_id._id === item.product_id._id &&
                            cartItem.color_name === item.color_name &&
                            cartItem.variant_name === item.variant_name
                          )
                        ),
                      }));
      
                    }}
                    onDecrease={() => {
                      const newQuantity = item.quantity - 1;
                      if (newQuantity > 0) {
                        handleDecreaseQuantity(item?.product_id?._id, item?.color_name, item?.variant_name);
                        console.log(item?.product_id?._id, item?.color_name, item?.variant_name);
                        setCart((prevCart) => ({
                          ...prevCart,
                          products: prevCart.products.map((cartItem) =>
                            cartItem.product_id._id === item.product_id._id &&
                            cartItem.color_name === item.color_name &&
                            cartItem.variant_name === item.variant_name
                              ? { ...cartItem, quantity: newQuantity }
                              : cartItem
                          ),
                        }));
                      }
                    }}
                    onIncrease={() => {
                      const newQuantity = item.quantity + 1;
                      handleAddToCart(item?.product_id._id, item?.color_name, item?.variant_name);
                      setCart((prevCart) => ({
                        ...prevCart,
                        products: prevCart.products.map((cartItem) =>
                          cartItem.product_id._id === item.product_id._id &&
                          cartItem.color_name === item.color_name &&
                          cartItem.variant_name === item.variant_name
                            ? { ...cartItem, quantity: newQuantity }
                            : cartItem
                        ),
                      }));
                    }}
                  />
                ))
              )
            }

        </div>
        <div>
          <h2 className="text-xl font-semibold uppercase mb-4">Tổng kết</h2>
          <div className="flex justify-between text-lg">
            <span>Tạm tính</span>
            <span>{subtotal.toLocaleString()}₫</span>
          </div>
          <div className="flex justify-between text-lg mt-2">
            <span>Tiền vận chuyển</span>
            <span>Free</span>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between text-xl font-bold">
            <span>Tổng tiền</span>
            <span>{subtotal.toLocaleString()}₫</span>
          </div>
          <button
            className={`mt-4 p-3 bg-black hover:opacity-80 text-white w-full rounded uppercase ${
              cart?.length === 0? "cursor-not-allowed " : ""
            }`}
            onClick={handleNavigateCheckout}
            disabled={cart?.length === 0}
          >
            Thanh toán
          </button>
          <button onClick={() => {
            handleClearCart();
            setCart([]);
          }
          }>
            Xóa tất cả
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
