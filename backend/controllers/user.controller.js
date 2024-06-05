import User from "../models/user.model.js";

export const getUsers = async (req, res) => {
  try {
    console.log("first")
    const currentUser = req.user._id;
    console.log(currentUser);
    const userList = await User.find({ _id: { $ne: currentUser } });
    console.log(userList);
    if (!userList) {
      return res.status(401).json({
        error: "Error in accessing users. Try again later.",
      });
    }
    return res.status(201).json({
      users: userList,
    });
  } catch (error) {
    console.log("Error in userController", error.message);
    return res.status(500).json({
      error: "Internal server gateway.",
    });
  }
};

export const searchUser = async (req, res) => {
  try {
    const search = req.query.search || "";
    const filteredUsers = await User.find({
      $or: [
        {
          username: {
            $regex: search,
            $options: "i",
          },
        },
        {
          fullName: {
            $regex: search,
            $options: "i",
          },
        },
      ],
    });

    if (!filteredUsers) {
      return res.status(401).json({
        error: "Error in finding user. Try again later.",
      });
    }

    return res.status(201).json({
      users: filteredUsers,
    });
  } catch (error) {
    console.log("Error in searchUser controller", error.message);
    return res.status(500).json({
      error: "Internal server error.",
    });
  }
};
