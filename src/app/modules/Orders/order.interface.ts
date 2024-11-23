import { Schema } from "mongoose";
import { z } from "zod";

// Order interface
export interface OrderInterface {
  email      : string;
  product    : string;
  quantity   : number;
  totalPrice : number;
} // prettier-ignore

// Zod order validation schema
export const OrderValidationSchema = z.object({
  email      : z.string({ required_error: "Name is required", invalid_type_error: "Name must be a string" }),
  product    : z.string({ required_error: "Product ID is required", invalid_type_error: "Product ID must be a string" }),
  quantity   : z.number({ required_error: "Quantity is required", invalid_type_error: "Quantity must be a number" }),
  totalPrice : z.number({ required_error: "totalPrice is required", invalid_type_error: "totalPrice must be a number" }),
}); // prettier-ignore

// Model Schema
export const OrderSchema = new Schema<OrderInterface>(
  {
    email      : { type: String, required: true },
    product    : { type: String, required: true },
    quantity   : { type: Number, required: true },
    totalPrice : { type: Number, required: true },
  },
  { timestamps: true },
); // prettier-ignore
