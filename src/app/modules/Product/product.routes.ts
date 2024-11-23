import express from "express";
import { createProduct, DeleteProduct, getAllProducts, getProduct, UpdateProduct } from "./product.controller";

const router = express.Router();

// Get all products
router.get("/", getAllProducts);

// Get a product
router.get("/:productId", getProduct);

// Create a product
router.post("/", createProduct);

// Update a product
router.put("/:productId?", UpdateProduct);

// Delete a product
router.delete("/:productId?", DeleteProduct);

export const ProductRoutes = router;
