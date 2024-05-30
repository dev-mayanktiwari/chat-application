import express from "express";
import cookieParser from "cookie-parser";
const app = express();
import authRouter from "./routes/authRoutes.js";
import messagesRouter from "./routes/messagesRoutes.js";
import connecttoMongoDB from "./db/connecttoMongoDB.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/messages", messagesRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  connecttoMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
