import express from "express";
import { ProductController } from "./product.controller";

const router = express.Router();

// Get all products
router.get("/", ProductController.getAll);

// Get a product
router.get("/:productId", ProductController.getOne);

// Create a product
router.post("/", ProductController.create);

// Update a product
router.put("/:productId?", ProductController.update);

// Delete a product
router.delete("/:productId?", ProductController.deleteOne);

export const ProductRoutes = router;
