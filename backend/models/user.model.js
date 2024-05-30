import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Fixed typo: should be minlength, not minLenght
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female"],
  },
  profilePicture: {
    type: String,
    default: "",
  },
});

// Middleware to hash password before saving
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(11);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

async function hashPassword(next) {
  const update = this.getUpdate();
  if (update.password) {
    try {
      const salt = await bcrypt.genSalt(11);
      update.password = await bcrypt.hash(update.password, salt);
      this.setUpdate(update);
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
}

// Middleware to hash password before update
userSchema.pre("findOneAndUpdate", hashPassword);
userSchema.pre("updateOne", hashPassword);

const User = mongoose.model("User", userSchema);

export default User;
