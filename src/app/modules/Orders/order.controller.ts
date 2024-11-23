import { Request, Response } from "express";
import { OrderDB } from "./order.service";
import { handleResponse } from "../../utils/response";
import { OrderInterface, OrderValidationSchema } from "./order.interface";
import { ProductDB } from "../Product/product.service";
import { ProductInterface } from "../Product/product.interface";

// Order Utilities
const validatePrice = (order: OrderInterface, product: ProductInterface) => {
  const totalPrice = product.price * order.quantity;
  if (order.totalPrice !== totalPrice) {
    throw new Error(`Invalid input: Wrong total price. Expected { totalPrice : ${totalPrice}}`);
  }
  return true;
};

const validateStock = (order: OrderInterface, product: ProductInterface) => {
  if (!product.inStock || order.quantity > product.quantity) {
    throw new Error("Insufficient stock");
  }
  return true;
};

const buyProduct = async (order: OrderInterface, product: ProductInterface) => {
  const newProductQuantity = product.quantity - order.quantity;
  const updateData = { quantity: newProductQuantity, inStock: newProductQuantity > 0 };
  return await ProductDB.update(order.product, updateData);
};

const revertProduct = async (id: string, quantity: number) => {
  const updateData = { quantity: quantity, inStock: quantity > 0 };
  return await ProductDB.update(id, updateData);
};

// Create an order
const create = async (req: Request, res: Response) => {
  try {
    const order = req.body;
    const validatedOrder = OrderValidationSchema.parse(order);

    const product = await ProductDB.getOne(validatedOrder.product);
    if (!product) {
      throw new Error("Product not found");
    }

    if (validateStock(order, product) && validatePrice(order, product) && (await buyProduct(order, product)).acknowledged) {
      const result = await OrderDB.create(validatedOrder);
      handleResponse(res, 200, true, "Order created successfully", result);
    } else {
      revertProduct(product.id, product.quantity);
      handleResponse(res, 500, false, "Order creation failed. Transaction reverted", undefined, { error: "Unknown error" });
    }
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
