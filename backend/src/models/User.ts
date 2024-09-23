import { Schema, model } from "mongoose";
import { IUser } from "../interfaces/userInterface";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    isAdmin: { type: Boolean, default: false },
    phone: { type: String, require: true },
    accessToken: { type: String, require: true },
    refreshToken: { type: String, require: true },
  },
  { timestamps: true }
);

export default model<IUser>("User", userSchema);
