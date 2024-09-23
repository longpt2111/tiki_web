import { Schema, model } from "mongoose";
import { IProduct } from "../interfaces/productInterface";

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, require: true, unique: true },
    image: { type: String, require: true },
    type: { type: String, require: true },
    price: { type: Number, require: true },
    countInStock: { type: Number, require: true },
    rating: { type: Number, require: true },
    description: { type: String, require: true },
  },
  { timestamps: true }
);

export default model<IProduct>("Product", productSchema);
