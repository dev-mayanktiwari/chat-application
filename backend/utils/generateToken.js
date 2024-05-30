import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateTokenandCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("jwt", token, {
    expiresIn: "7d",
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });
};

export default generateTokenandCookie;
