import { Router } from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  getAllUsers,
  deleteUser,
} from "../controllers/userController.js";
import {
  authenticateUser,
  getUserOrAdmin,
  authorizeAdmin,
} from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
/* router.get("/profile", authenticateUser, (req, res) => {
  res.status(200).json({ user: req.user });
});
router.get("/admin", authenticateUser, authorizeAdmin, (req, res) => {
  res.status(200).json({ message: "Welcome Admin" });
}); */
// Route to get user profile (with role)
router.get("/profile", authenticateUser, getUserOrAdmin);
// ADMIN ONLY ROUTES
router.get("/admin", authenticateUser, authorizeAdmin, getAllUsers);
router.delete("/admin/:id", authenticateUser, authorizeAdmin, deleteUser);

export default router;
