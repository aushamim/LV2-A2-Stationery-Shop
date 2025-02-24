import express from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../Users/user.interface";
import { OrderController } from "./order.controller";

const router = express.Router();

// Verify order
router.get("/orders/verify-payment", auth(USER_ROLE.USER, USER_ROLE.ADMIN), OrderController.verifyPayment);

// Create an order
router.post("/orders", auth(USER_ROLE.USER, USER_ROLE.ADMIN), OrderController.create);

// Get my orders
router.get("/orders/my-orders", auth(USER_ROLE.USER, USER_ROLE.ADMIN), OrderController.myOrders);

// Get all orders
router.get("/orders", auth(USER_ROLE.ADMIN), OrderController.getAll);

// Get single order
router.get("/orders/:orderId", auth(USER_ROLE.ADMIN, USER_ROLE.ADMIN), OrderController.getOne);

// Update an order
router.patch("/orders/:orderId", auth(USER_ROLE.ADMIN), OrderController.updateOne);

// Delete an order
router.delete("/orders/:orderId", auth(USER_ROLE.ADMIN), OrderController.deleteOne);

export const OrderRoutes = router;
