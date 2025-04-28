// src/api/cartApi.js
import { api } from "./api"; // your pre-configured Axios instance

export const getCart = () => api.get("/cart");

export const addToCart = (productId, quantity = 1) =>
  api.post("/cart", { productId, quantity });

export const updateCartItem = (productId, quantity) =>
  api.put("/cart", { productId, quantity });

export const removeFromCart = (productId) =>
  api.delete("/cart", { data: { productId } });

export const clearCart = () => api.delete("/cart/clear");
