import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ Make sure to import useAuth

const Header = () => {
  const { user, logout } = useAuth(); // ✅ Get user and logout from context

  return (
    <header className="bg-gray-900 text-white p-4 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold">
        MyShop
      </Link>

      {/* Navigation */}
      <div className="flex items-center space-x-4">
        {/* Search Box */}
        {/*   <input
          type="text"
          placeholder="Search products..."
          className="p-2 rounded-md text-black"
        /> */}
        <Link to="/orders" className="hover:underline">
          Orders
        </Link>

        {/* Cart Link (always visible) */}
        <Link to="/cart" className="hover:underline">
          Cart
        </Link>

        {/* Dynamic Links based on user login */}
        {user ? (
          <>
            {/* Show Admin Dashboard link if user is admin */}
            {user.role === "admin" && (
              <Link
                to="/admin/dashboard"
                className="hover:underline text-purple-400"
              >
                Admin
              </Link>
            )}

            {/* Profile link */}
            <Link to="/profile" className="hover:underline">
              Profile
            </Link>

            {/* Logout Button */}
            <button onClick={logout} className="hover:underline text-red-400">
              Logout
            </button>
          </>
        ) : (
          <>
            {/* If no user, show Login/Register */}
            <Link to="/register" className="hover:underline">
              Register
            </Link>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
