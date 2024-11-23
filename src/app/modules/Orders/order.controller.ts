import { Request, Response } from "express";
import { OrderDB } from "./order.service";
import { handleResponse } from "../../utils/response";
import { OrderValidationSchema } from "./order.interface";

// Create an order
const create = async (req: Request, res: Response) => {
  try {
    const order = req.body;
    const validatedOrder = OrderValidationSchema.parse(order);
    const result = await OrderDB.create(validatedOrder);
    handleResponse(res, 200, true, "Order created successfully", result);
  } catch (err) {
    handleResponse(res, 500, false, "Order creation failed", undefined, err);
  }
};

// Calculate revenue
const revenue = async (req: Request, res: Response) => {
  try {
    const result = await OrderDB.revenue();
    handleResponse(res, 200, true, "Revenue calculated successfully", result);
  } catch (err) {
    handleResponse(res, 500, false, "Revenue calculation failed", undefined, err);
  }
};

export const OrderController = { create, revenue };
