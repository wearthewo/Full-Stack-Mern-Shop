import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  getMyOrders,
  deleteOrder,
  updateOrderStatus,
} from "../utils/ordersApi";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const { data } = await getMyOrders();
      setOrders(data);
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };

  const handleDelete = async (orderId) => {
    try {
      await deleteOrder(orderId);
      loadOrders();
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      loadOrders();
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-8 text-center">My Orders</h1>

      <div className="space-y-4">
        {orders.map((order, index) => (
          <motion.div
            key={order._id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="p-4 border rounded shadow-sm"
          >
            <p>
              <strong>Order ID:</strong> {order._id}
            </p>
            <p>
              <strong>Status:</strong> {order.status}
            </p>
            <p>
              <strong>Total:</strong> €{order.totalAmount}
            </p>

            <div className="mt-2 flex gap-4">
              <button
                onClick={() => handleStatusUpdate(order._id, "Shipped")}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Mark as Shipped
              </button>
              <button
                onClick={() => handleDelete(order._id)}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Delete Order
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OrderPage;
