import { api } from "./api";
// 1. Create a new order
export const createOrder = (cartId, paymentDetails) =>
  api.post("/orders", { cartId, paymentDetails });

// 2. Get all orders (Admin only)
export const getAllOrders = () => api.get("/orders");

// 3. Get a single order by ID
export const getOrderById = (id) => api.get(`/orders/${id}`);

// 4. Get current logged-in user's orders
export const getMyOrders = () => api.get("/orders/myorders");

// 5. Update an order's status (Admin)
export const updateOrderStatus = (id, status) =>
  api.put(`/orders/${id}`, { status });

// 6. Delete an order (Admin)
export const deleteOrder = (id) => api.delete(`/orders/${id}`);
