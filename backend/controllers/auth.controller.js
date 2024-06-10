import User from "../models/user.model.js";
import { UserType } from "../types/user.type.js";
import generateTokenandCookie from "../utils/generateToken.js";
import { compare } from "bcrypt";


export const signupUser = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    const result = UserType.safeParse({
      fullName,
      username,
      password,
      confirmPassword,
    });
    if (!result.success) {
      return res.status(400).json({ error: result.error.message });
    }
    if (password != confirmPassword) {
      return res
        .status(400)
        .json({ error: "Password and Confirm Password do not match" });
    }

    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    // TODO: Hash the password here before storing in database.

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = await User.create({
      fullName,
      username,
      password,
      gender,
      profilePicture: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      generateTokenandCookie(newUser._id, res);
      return res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePicture: newUser.profilePicture,
      });
    } else {
      res.status(400).json({
        error: "Invalid user data.",
      });
    }
  } catch (error) {
    console.log("Error signing up user", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    const isPasswordCorrect = await compare(password, user?.password || "");
    // console.log(isPasswordCorrect);
    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid credentials." });
    }

    generateTokenandCookie(user._id, res);
    return res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePicture: user.profilePicture,
    });
  } catch (error) {
    console.log("Error log in controller", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const logoutUser = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({ message: "Logged out successfully." });
  } catch (error) {
    console.log("Error log out controller", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};
