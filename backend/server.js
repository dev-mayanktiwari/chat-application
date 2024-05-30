import express from "express";
const app = express();
import authRouter from "./routes/authRoutes.js";
import connecttoMongoDB from "./db/connecttoMongoDB.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  connecttoMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
