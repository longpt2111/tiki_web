import { Schema } from "mongoose";

export interface IOrderItem {
  name: string;
  amount: number;
  image: string;
  price: number;
  product: Schema.Types.ObjectId;
}

export interface IShippingAddress {
  fullName: string;
  address: string;
  city: string;
  phone: number;
}

export interface IOrder extends Document {
  orderItems: IOrderItem[];
  shippingAddress: IShippingAddress;
  paymentMethod: string;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  user: Schema.Types.ObjectId;
  isPaid: boolean;
  paidAt?: Date;
  isDelivered: boolean;
  deliveredAt?: Date;
}
