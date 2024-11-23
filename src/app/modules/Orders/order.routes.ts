import express from "express";
import { OrderController } from "./order.controller";

const router = express.Router();

// Create an order
router.post("/", OrderController.create);

// Get order revenue
router.get("/revenue", OrderController.revenue);

export const OrderRoutes = router;
