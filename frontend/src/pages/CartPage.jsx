import { useEffect, useState } from "react";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../utils/cartApi"; // <-- import from your cartApi
import { PayButton } from "../components/PayButton"; // <-- import your PayButton component

const CartPage = () => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const { data } = await getCart();
      setCart(data);
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };

  const handleAdd = async (productId) => {
    try {
      await addToCart(productId, 1);
      loadCart();
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };

  const handleUpdate = async (productId, quantity) => {
    try {
      if (quantity <= 0) {
        await removeFromCart(productId);
      } else {
        await updateCartItem(productId, quantity);
      }
      loadCart();
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };

  const handleRemove = async (productId) => {
    try {
      await removeFromCart(productId);
      loadCart();
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };

  const handleClear = async () => {
    try {
      await clearCart();
      loadCart();
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };

  if (!cart) return <div>Loading Cart...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cart.items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          {cart.items.map((item) => (
            <div
              key={item.product._id}
              className="flex items-center justify-between border-b py-4"
            >
              <div className="flex items-center">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded mr-4"
                />
                <div>
                  <p className="font-semibold">{item.product.name}</p>
                  <p className="text-sm text-gray-600">€{item.product.price}</p>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  className="px-2 py-1 bg-gray-300 rounded"
                  onClick={() =>
                    handleUpdate(item.product._id, item.quantity - 1)
                  }
                >
                  -
                </button>
                <span className="px-4">{item.quantity}</span>
                <button
                  className="px-2 py-1 bg-gray-300 rounded"
                  onClick={() =>
                    handleUpdate(item.product._id, item.quantity + 1)
                  }
                >
                  +
                </button>
                <button
                  className="ml-4 text-red-500"
                  onClick={() => handleRemove(item.product._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="text-right mt-6">
            <h2 className="text-2xl font-bold">Total: €{cart.totalPrice}</h2>

            {/* PayPal Payment Button */}
            <PayButton amount={cart.totalPrice} orderId={cart._id} />

            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
              onClick={handleClear}
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
