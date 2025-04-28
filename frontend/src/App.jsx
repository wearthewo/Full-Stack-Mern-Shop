import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./index.css";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import UserProfile from "./pages/UserProfile";
import AdminDashboard from "./pages/AdminDashboard";
import UserRoute from "./components/UserRoute";
import AdminRoute from "./components/AdminRoute";
import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrderPage";
import Payment from "./pages/Payment";
import AdminUsers from "./pages/AdminUsers";
import AdminProduct from "./pages/AdminProduct";
import AdminOrders from "./pages/AdminOrders";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 container mx-auto p-4">
            {/* ✅ Only one Routes */}
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />

              {/* Protected User Routes */}
              <Route
                path="/profile"
                element={
                  <UserRoute>
                    <UserProfile />
                  </UserRoute>
                }
              />
              <Route
                path="/cart"
                element={
                  <UserRoute>
                    <CartPage />
                  </UserRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  <UserRoute>
                    <OrderPage />
                  </UserRoute>
                }
              />
              <Route
                path="/payment"
                element={
                  <UserRoute>
                    <Payment />
                  </UserRoute>
                }
              />

              {/* Protected Admin Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />
              <Route
                path="/users/admin"
                element={
                  <AdminRoute>
                    <AdminUsers />
                  </AdminRoute>
                }
              />
              <Route
                path="/products/admin"
                element={
                  <AdminRoute>
                    <AdminProduct />
                  </AdminRoute>
                }
              />
              <Route
                path="/orders/admin"
                element={
                  <AdminRoute>
                    <AdminOrders />
                  </AdminRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
