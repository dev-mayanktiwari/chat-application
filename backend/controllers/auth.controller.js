import User from "../models/user.model.js";
import { UserType } from "../types/user.type.js";

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
      return res.status(400).json({ error: result.error.errors[0].message });
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

    return res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      profilePicture: newUser.profilePicture,
    });
  } catch (error) {
    console.log("Error signing up user", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export const loginUser = (req, res) => {
  console.log("loginUser");
};

export const logoutUser = (req, res) => {
  console.log("logoutUser");
};
