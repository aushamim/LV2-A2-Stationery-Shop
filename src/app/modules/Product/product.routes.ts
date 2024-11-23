import express from "express";
import { createProduct } from "./product.controller";

const router = express.Router();

// Create a product
router.post("/", createProduct);

export const ProductRoutes = router;
