import express from "express";
import {
  createPayment,
  paymentSuccess,
  paymentCancel,
} from "../controllers/paymentController.js";

import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", authenticateUser, createPayment);
router.get("/success", paymentSuccess);
router.get("/cancel", paymentCancel);

export default router;
