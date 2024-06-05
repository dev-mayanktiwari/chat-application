import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.model.js";
dotenv.config();

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    // console.log("Token:", token); // Log the token

    if (!token) {
      return res.status(401).json({
        error: "Unauthorized. No token provided.",
      });
    }

    // Verify the JWT token
    let decoded;
    try {
      const secretKey = process.env.JWT_SECRET;
      decoded = jwt.verify(token, secretKey);
    } catch (error) {
      console.log("Token verification error:", error); // Log token verification errors
      return res.status(401).json({
        error: "Unauthorized. Invalid token.",
      });
    }

    // console.log("Decoded:", decoded); // Log the decoded token

    // Extract user ID from decoded token
    const userId = decoded.userId; // Ensure this matches the property in your JWT
    // console.log("User ID:", userId); // Log the user ID

    // Fetch user from the database
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    // Attach user object to request for further middleware/routes to access
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute Middleware", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};
