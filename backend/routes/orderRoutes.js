import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  getMyOrders,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/orderController.js";
import {
  authenticateUser,
  authorizeAdmin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authenticateUser, createOrder);
router.get("/admin", authenticateUser, authorizeAdmin, getAllOrders);
router.get("/myorders", authenticateUser, getMyOrders);
router.get("/:id", authenticateUser, getOrderById);
router.put("/admin:id", authenticateUser, authorizeAdmin, updateOrderStatus);
router.delete("/admin:id", authenticateUser, authorizeAdmin, deleteOrder);

export default router;
