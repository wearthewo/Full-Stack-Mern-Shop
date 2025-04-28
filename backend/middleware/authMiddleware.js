import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const authenticateUser = async (req, res, next) => {
  try {
    let token =
      req.cookies
        .access_token; /* || req.headers.authorization?.split(" ")[1]; */
    console.log("Token:", token);
    console.log("Headers:", req.headers);
    console.log("Cookies:", req.cookies);
    if (!token)
      return res.status(401).json({ message: "Not authorized, no token" });

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log("Token:", token);
    console.log("SECRET_KEY:", process.env.SECRET_KEY);
    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

export const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Not authorized, user is not an admin" });
  }
  next();
};

export const getUserOrAdmin = async (req, res) => {
  try {
    // We already have the user from the authenticateUser middleware
    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Get the username and role (admin or user) from the authenticated user
    const { username, role } = req.user;

    res.status(200).json({ username, role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
