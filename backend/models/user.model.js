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
    minLenght: 6,
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

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  try {
  const saltround = await bcrypt.genSalt(11);
  const hashedPassword = await bcrypt.hash(user.password, saltround);
  user.password = hashedPassword;
  next();
  } catch (error) {
    return next(error);
  }
)};

async function hashPassword(next) {
const update = this.getUpdate();
if (update.password) {
  try {
  const saltround = 11;
  const salt = bcrypt.genSalt(saltround);
  update.password = await bcrypt.hash(update.password, salt);
  this.setUpdate(update);
  next();
  } catch(error) {
  next(error);
  }
}

userSchema.pre("findOneAndUpdate", hashPassword);
userSchema.pre("updateOne", hashPassword);

const User = mongoose.model("User", userSchema);

export default User;
