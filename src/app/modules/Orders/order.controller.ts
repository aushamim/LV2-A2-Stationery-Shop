import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import { handleResponse } from "../../utils/response";
import { OrderDB } from "./order.service";

// Verify payment
const verifyPayment = catchAsync(async (req, res) => {
  const response = await OrderDB.verifyPayment(req.query.order_id as string);

  handleResponse(res, StatusCodes.CREATED, "Payment verified successfully", response);
});

// Create an order
const create = catchAsync(async (req, res) => {
  const user = req.user;
  const orderData = req.body;
  const response = await OrderDB.create(user, orderData, req.ip!);

  handleResponse(res, StatusCodes.CREATED, "Order placed successfully", response);
});

// Get my orders
const myOrders = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const response = await OrderDB.getOrdersByUserId(userId);

  handleResponse(res, StatusCodes.OK, "Orders retrieved successfully", response);
});

// Get all orders
const getAll = catchAsync(async (req, res) => {
  const response = await OrderDB.getAll(req.query);

  handleResponse(res, StatusCodes.OK, "Orders retrieved successfully", response);
});

// Get single order
const getOne = catchAsync(async (req, res) => {
  const { orderId } = req.params;
  const response = await OrderDB.getOne(orderId);

  handleResponse(res, StatusCodes.OK, "Order retrieved successfully", response);
});

// Update an order
const updateOne = catchAsync(async (req, res) => {
  const { orderId } = req.params;
  const orderData = req.body;
  const response = await OrderDB.updateOne(orderId, orderData);

  handleResponse(res, StatusCodes.OK, "Order updated successfully", response);
});

// delete an order
const deleteOne = catchAsync(async (req, res) => {
  const { orderId } = req.params;
  const response = await OrderDB.deleteOne(orderId);

  handleResponse(res, StatusCodes.OK, "Order deleted successfully", response);
});

export const OrderController = { verifyPayment, create, myOrders, getAll, getOne, updateOne, deleteOne };
