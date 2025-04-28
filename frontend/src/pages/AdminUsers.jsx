import { useEffect, useState } from "react";
import { api } from "../utils/api";
//import { Link } from "react-router-dom";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const { data } = await api.get("/admin/users");
      setUsers(data);
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await api.delete(`/admin/users/${id}`);
        loadUsers(); // refresh users
      } catch (error) {
        console.error(error.response?.data?.message || error.message);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Manage Users</h1>

      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border-b p-2 text-left">Username</th>
            <th className="border-b p-2 text-left">Email</th>
            <th className="border-b p-2 text-left">Role</th>
            <th className="border-b p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="border-b p-2">{user.username}</td>
              <td className="border-b p-2">{user.email}</td>
              <td className="border-b p-2">
                {user.isAdmin ? "Admin" : "User"}
              </td>
              <td className="border-b p-2">
                <button
                  onClick={() => handleDelete(user._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
                {/* Optional: Promote user to admin button here */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsersPage;
