import express from "express";
import {
  getCart,
  updateCartItem,
  clearCart,
  addToCart,
  removeFromCart,
} from "../controllers/cartController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/", authenticateUser, getCart);
router.post("/", authenticateUser, addToCart);
router.put("/", authenticateUser, updateCartItem);
router.delete("/", authenticateUser, removeFromCart);
router.delete("/clear", authenticateUser, clearCart);

export default router;
