import { Model, Query } from "mongoose";

export interface IProduct {
  name: string;
  image: string;
  type: string;
  price: number;
  countInStock: number;
  rating: number;
  description: string;
}

export interface IProductQueryHelpers extends Query<any, IProduct> {
  byRating(rate: number): this;
}

export interface IProductInstanceMethods {
  findSimilarTypes(cb: (err: any, products: IProduct[]) => void): void;
}

export interface IProductStatics {
  findByName(name: string): Query<IProduct[], IProduct, IProductQueryHelpers>;
}

export interface IProductVirtuals {
  isProductAvailable(): boolean;
}

export interface IProductModel
  extends Model<IProduct, IProductQueryHelpers, IProductInstanceMethods, IProductVirtuals>,
    IProductStatics {}
