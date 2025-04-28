import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./db/configDB.js";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import path from "path";

//import userRoutes from "./routes/userRoutes.js";
//import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
console.log("Client URL:", process.env.CLIENT_URL);

const app = express();
// Static folder setup
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/backend/uploads")));
//app.use("/uploads", express.static(path.join(__dirname, "/backend/uploads")));
// Serve static files from the uploads directory
//app.use(`/uploads`, express.static(`uploads`)); // Serve static files from the uploads directory

// Connect Database
connectDB();

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
/* app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
); */

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/orders", orderRoutes);

// Error Handling
/* app.use(notFound);
app.use(errorHandler); */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
