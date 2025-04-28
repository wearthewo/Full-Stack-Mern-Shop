import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import {
  authenticateUser,
  authorizeAdmin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getProducts); // Get all products
router.get("/:id", getProductById); // Get product by ID
router.post("/admin", authenticateUser, authorizeAdmin, createProduct); // Create a new product (admin only)
router.put("/admin/:id", authenticateUser, authorizeAdmin, updateProduct); // Update product (admin only)
router.delete("/admin/:id", authenticateUser, authorizeAdmin, deleteProduct); // Delete product (admin only)

export default router;
