// MODULE IMPORTS
import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

// Initialize dotenv before using environment variables
dotenv.config();

// ROUTER IMPORTS
import authRouter from "./routes/authRoutes.js";
import messagesRouter from "./routes/messagesRoutes.js";
import userRouter from "./routes/userRoutes.js";
import { app, server } from "./socket/socket.js";

// DATABASE CONNECT
import connecttoMongoDB from "./db/connecttoMongoDB.js";

// Use `__dirname` correctly to resolve paths
const __dirname = path.resolve();

const PORT = process.env.PORT || 4000;

// Middleware setup
app.use(express.json());
app.use(cookieParser());

// Route setup
app.use("/api/auth", authRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/users", userRouter);

// Static file serving
app.use(express.static(path.join(__dirname, "frontend", "dist")));

// Catch-all route to serve the frontend's index.html for SPA
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// Start the server and connect to MongoDB
server.listen(PORT, () => {
  connecttoMongoDB().then(() => {
    console.log(`Connected to MongoDB`);
  }).catch((err) => {
    console.error(`Failed to connect to MongoDB: ${err.message}`);
  });
  console.log(`Server is running on port ${PORT}`);
});
