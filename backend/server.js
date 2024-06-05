// MODULE IMPORTS
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

// ROUTER IMPORTS
import authRouter from "./routes/authRoutes.js";
import messagesRouter from "./routes/messagesRoutes.js";
import userRouter from "./routes/userRoutes.js";

// DATABASE CONNECT
import connecttoMongoDB from "./db/connecttoMongoDB.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/users", userRouter);

app.listen(PORT, () => {
  connecttoMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
