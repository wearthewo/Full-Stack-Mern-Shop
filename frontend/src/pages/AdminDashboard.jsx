// pages/AdminDashboard.jsx
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return <div className="text-center mt-10 text-lg">Loading...</div>;
  }

  if (user.role !== "admin") {
    return (
      <div className="text-center mt-10 text-lg text-red-500">
        Not authorized
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/admin/users"
          className="p-6 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
        >
          Manage Users
        </Link>
        <Link
          to="/admin/products"
          className="p-6 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
        >
          Manage Products
        </Link>
        <Link
          to="/admin/orders"
          className="p-6 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600 transition"
        >
          Manage Orders
        </Link>
        {/* Add more admin panels here */}
      </div>
    </div>
  );
};

export default AdminDashboard;
