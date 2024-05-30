import { User } from "../models/user.model.js";

export const signupUser = (req, res) => {
  try {
    const {
      fullName,
      email: username,
      password,
      confirmPassword,
      gender,
    } = req.body;
    const result = userType.safeParse({
      fullName,
      username,
      password,
      confirmPassword,
      profilePicture,
    });
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    if (password != confirmPassword) {
      return res
        .status(400)
        .json({ error: "Password and Confirm Password do not match" });
    }

    const user = new User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    // TODO: Hash the password here before storing in database.

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User.create({
      fullName,
      username,
      password,
      profilePicture,
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
