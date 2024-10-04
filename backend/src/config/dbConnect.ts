import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI as string);
  } catch (err) {
    console.error("Error connecting DB", err);
  }
};

export default connectDB;
