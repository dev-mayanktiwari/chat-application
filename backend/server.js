const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
