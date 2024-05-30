import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateTokenandCookie = (userId, response) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  response.cookie("jwt", token, {
    expiresIn: "7d",
    httpOnly: true,
    sameSite: "strict",
  });
};

export default generateTokenandCookie;
