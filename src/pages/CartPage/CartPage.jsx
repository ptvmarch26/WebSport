import { useEffect, useState } from "react";
import CartItemComponent from "../../components/CartItemComponent/CartItemComponent";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import ConfirmDialogComponent from "../../components/ConfirmDialogComponent/ConfirmDialogComponent";

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

  const [selectedItemToRemove, setSelectedItemToRemove] = useState(null);
  const [openClearAllDialog, setOpenClearAllDialog] = useState(false);

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

      return acc + selectedVariant?.variant_price * item.quantity;
    }, 0) || 0;

  const handleNavigateCheckout = () => {
    navigate("/checkout");
  };

  // Xóa từng item
  const confirmRemoveItem = () => {
    const item = selectedItemToRemove;
    if (item) {
      handleRemoveFromCart(
        item.product?._id,
        item.color_name,
        item.variant_name
      );
      setCart((prevCart) => ({
        ...prevCart,
        products: prevCart.products.filter(
          (cartItem) =>
            !(
              cartItem.product_id?._id === item.product_id?._id &&
              cartItem.color_name === item.color_name &&
              cartItem.variant_name === item.variant_name
            )
        ),
      }));
    }
    setSelectedItemToRemove(null);
  };

  // Xóa all item
  const confirmClearAll = () => {
    handleClearCart();
    setCart([]);
    setOpenClearAllDialog(false);
  };

  return (
    <div className="xl:max-w-[1200px] container mx-auto min-h-[500px]">
      <div className="px-2 py-5 lg:p-5 grid grid-cols-1 lg:grid-cols-3 gap-y-8 lg:gap-8">
        <div className="col-span-2">
          <div className="flex justify-between mb-4">
            <h1 className="text-2xl font-bold uppercase">Giỏ hàng</h1>
            <button
              className={`px-5 py-2 bg-red-500 hover:opacity-80 text-white rounded uppercase
                ${
                  (cart?.products?.length ?? 0) === 0
                    ? "bg-red-500 cursor-not-allowed opacity-50"
                    : ""
                }`}
              disabled={(cart?.products?.length ?? 0) === 0}
              onClick={() => setOpenClearAllDialog(true)}
            >
              Xóa tất cả
            </button>
          </div>
          {cartItems?.length === 0 ? (
            <p className="text-center uppercase text-xl font-semibold text-gray-600">
              Hiện không có sản phẩm nào trong giỏ
            </p>
          ) : (
            cartItems?.map((item, index) => (
              <CartItemComponent
                key={index}
                item={item}
                onRemove={() => setSelectedItemToRemove(item)}
                onDecrease={() => {
                  const newQuantity = item.quantity - 1;
                  if (newQuantity > 0) {
                    handleDecreaseQuantity(
                      item?.product_id?._id,
                      item?.color_name,
                      item?.variant_name
                    );
                    setCart((prevCart) => ({
                      ...prevCart,
                      products: prevCart.products.map((cartItem) =>
                        cartItem.product_id?._id === item.product_id?._id &&
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
                    item?.product_id?._id,
                    item?.color_name,
                    item?.variant_name
                  );
                  setCart((prevCart) => ({
                    ...prevCart,
                    products: prevCart.products.map((cartItem) =>
                      cartItem.product_id?._id === item.product_id?._id &&
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
              (cart?.products?.length ?? 0) === 0
                ? "cursor-not-allowed opacity-50"
                : ""
            }`}
            onClick={handleNavigateCheckout}
            disabled={(cart?.products?.length ?? 0) === 0}
          >
            Thanh toán
          </button>
        </div>
      </div>
      {/* Dialog xác nhận xóa từng sản phẩm */}
      <ConfirmDialogComponent
        open={!!selectedItemToRemove}
        onClose={() => setSelectedItemToRemove(null)}
        onConfirm={confirmRemoveItem}
        title="Xác nhận xóa"
        message={`Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?`}
      />

      {/* Dialog xác nhận xóa toàn bộ */}
      <ConfirmDialogComponent
        open={openClearAllDialog}
        onClose={() => setOpenClearAllDialog(false)}
        onConfirm={confirmClearAll}
        title="Xác nhận xóa tất cả"
        message="Bạn có chắc chắn muốn xóa toàn bộ sản phẩm trong giỏ hàng không?"
      />
    </div>
  );
};

export default CartPage;
