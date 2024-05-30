import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connecttoMongoDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_DATABASE_URI);
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
};

export default connecttoMongoDB;
