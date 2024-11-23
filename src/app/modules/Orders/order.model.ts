import { model } from "mongoose";
import { OrderInterface, OrderSchema } from "./order.interface";

// Model
export const OrderModel = model<OrderInterface>("Order", OrderSchema);
