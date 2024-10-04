import { Schema, model } from "mongoose";
import {
  IProduct,
  IProductInstanceMethods,
  IProductModel,
  IProductQueryHelpers,
  IProductVirtuals,
} from "../interfaces/productInterface";

const productSchema = new Schema<
  IProduct,
  IProductModel,
  IProductInstanceMethods,
  IProductQueryHelpers,
  IProductVirtuals
>(
  {
    name: { type: String, require: true, unique: true },
    image: { type: String, require: true },
    type: { type: String, require: true },
    price: { type: Number, require: true, min: 0 },
    countInStock: { type: Number, require: true, min: [0, "Store is out of stock"] },
    rating: { type: Number, require: true, min: 1, max: 5 },
    description: { type: String, require: true },
  },
  { timestamps: true }
);

productSchema.methods.findSimilarTypes = function (cb: (err: any, products: IProduct[]) => void) {
  return model<IProduct>("Product").find({ type: this.type }, cb);
};

productSchema.statics.findByName = function (name: string) {
  return this.find({ name: new RegExp(name, "i") });
};

productSchema.query.byRating = function (rate: number) {
  return this.where({ rating: rate });
};

productSchema.virtual("isProductAvailable").get(function () {
  return this.countInStock > 0;
});

export default model<IProduct, IProductModel>("Product", productSchema);
