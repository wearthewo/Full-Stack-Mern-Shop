import { useEffect, useState } from "react";
import { api } from "../utils/api";
//import { Link } from "react-router-dom";

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await api.get("/orders/admin");
      setOrders(data);
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await api.put(`/orders/admin/${orderId}`, { status: newStatus });
      fetchOrders(); // refresh list
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };

  const handleDelete = async (orderId) => {
    try {
      await api.delete(`/orders/admin/${orderId}`);
      fetchOrders(); // refresh list
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Orders</h1>
      {orders.map((order) => (
        <div key={order._id} className="border p-4 mb-4 rounded">
          <p>
            <b>Order ID:</b> {order._id}
          </p>
          <p>
            <b>Status:</b> {order.status}
          </p>
          <p>
            <b>Total:</b> ${order.totalAmount}
          </p>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => handleStatusUpdate(order._id, "Paid")}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Mark Paid
            </button>
            <button
              onClick={() => handleStatusUpdate(order._id, "Shipped")}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Mark Shipped
            </button>
            <button
              onClick={() => handleDelete(order._id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminOrdersPage;
