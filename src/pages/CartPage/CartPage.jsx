import { useEffect } from "react";
import CartItemComponent from "../../components/CartItemComponent/CartItemComponent";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { Button } from "@material-tailwind/react";

const CartPage = () => {
  const {
    cart,
    setCart,
    handleRemoveFromCart,
    handleDecreaseQuantity,
    fetchCart,
    handleAddToCart,
    handleClearCart,
  } = useCart();

  useEffect(() => {
    fetchCart();
  }, []);

  console.log("cart", cart);

  const cartItems = cart?.products || [];
  const navigate = useNavigate();

  const subtotal =
    cartItems?.reduce((acc, item) => {
      const selectedColor = item?.product_id?.colors.find(
        (color) => color.color_name === item.color_name
      );

      const selectedVariant = selectedColor?.variants.find(
        (variant) => variant.variant_size === item.variant_name
      );

      return acc + selectedVariant.variant_price * item.quantity;
    }, 0) || 0;

  const handleNavigateCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="xl:max-w-[1200px] container mx-auto min-h-[500px]">
      <div className="px-2 py-5 lg:p-5 grid grid-cols-1 lg:grid-cols-3 gap-y-8 lg:gap-8">
        <div className="col-span-2">
          <div className="flex justify-between mb-4">
            <h1 className="text-2xl font-bold uppercase">Giỏ hàng</h1>
            <Button
              color="red"
              className="rounded-none"
              onClick={() => {
                handleClearCart();
                setCart([]);
              }}
            >
              Xóa tất cả
            </Button>
          </div>
          {cartItems?.length === 0 ? (
            <p className="text-center uppercase text-xl font-semibold text-gray-600">
              Hiện không có sản phẩm nào trong giỏ
            </p>
          ) : (
            cartItems?.map((item) => (
              <CartItemComponent
                key={item.product_id?._id}
                item={item}
                onRemove={() => {
                  handleRemoveFromCart(
                    item?.product_id?._id,
                    item?.color_name,
                    item?.variant_name
                  );
                  setCart((prevCart) => ({
                    ...prevCart,
                    products: prevCart.products.filter(
                      (cartItem) =>
                        !(
                          cartItem.product_id._id === item.product_id._id &&
                          cartItem.color_name === item.color_name &&
                          cartItem.variant_name === item.variant_name
                        )
                    ),
                  }));
                }}
                onDecrease={() => {
                  const newQuantity = item.quantity - 1;
                  if (newQuantity > 0) {
                    handleDecreaseQuantity(
                      item?.product_id?._id,
                      item?.color_name,
                      item?.variant_name
                    );
                    console.log(
                      item?.product_id?._id,
                      item?.color_name,
                      item?.variant_name
                    );
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
                  handleAddToCart(
                    item?.product_id._id,
                    item?.color_name,
                    item?.variant_name
                  );
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
          )}
        </div>
        <div>
          <div className="flex justify-between text-xl font-bold">
            <span>Tổng tiền</span>
            <span>{subtotal.toLocaleString()}₫</span>
          </div>
          <button
            className={`mt-4 p-3 bg-black hover:opacity-80 text-white w-full rounded uppercase ${
              cart?.length === 0 ? "cursor-not-allowed " : ""
            }`}
            onClick={handleNavigateCheckout}
            disabled={cart?.length === 0}
          >
            Thanh toán
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
