import { Types } from "mongoose";
import { z } from "zod";

// Order interface
export interface OrderInterface {
  user: Types.ObjectId;
  products: { product: Types.ObjectId; quantity: number }[];
  totalPrice: number;
  status: "Pending" | "Paid" | "Shipped" | "Completed" | "Cancelled";
  eta?: string;
  transaction: {
    id: string;
    transactionStatus: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
  };
}

// Partial order interface/type
export type PartialOrderInterface = Partial<OrderInterface>;

// Zod order validation schema
export const OrderValidationSchema = z.object({
  user: z.string({ required_error: "User ID is required", invalid_type_error: "Invalid User ID" }),
  products: z.array(
    z.object({
      product: z.string({ required_error: "Product ID is required", invalid_type_error: "Invalid Product ID" }),
      quantity: z
        .number({ required_error: "Product quantity is required", invalid_type_error: "Invalid quantity" })
        .int()
        .positive({ message: "Quantity must be a positive number" }),
    }),
  ),
  totalPrice: z.number({ required_error: "Total price is required", invalid_type_error: "Invalid total price" }),
  status: z.enum(["Pending", "Paid", "Shipped", "Completed", "Cancelled"], {
    errorMap: () => ({ message: "Status must be one of Pending, Paid, Shipped, Completed, Cancelled" }),
  }),
  eta: z.string({ invalid_type_error: "Invalid eta date-time" }).optional(),
  transaction: z.object({
    id: z.string({ required_error: "Transaction ID is required", invalid_type_error: "Invalid Transaction ID" }),
    transactionStatus: z.string(),
    bank_status: z.string(),
    sp_code: z.string(),
    sp_message: z.string(),
    method: z.string(),
    date_time: z.string(),
  }),
});
