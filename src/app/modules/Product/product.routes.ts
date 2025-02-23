import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLE } from "../Users/user.interface";
import { ProductController } from "./product.controller";
import { PartialProductValidationSchema, ProductValidationSchema } from "./product.interface";

const router = express.Router();

// Get all products
router.get("/products", ProductController.getAll);

// Get a product
router.get("/products/:productId", ProductController.getOne);

// Create a product
router.post("/products", auth(USER_ROLE.ADMIN), validateRequest(ProductValidationSchema), ProductController.create);

// Update a product
router.patch("/products/:productId", auth(USER_ROLE.ADMIN), validateRequest(PartialProductValidationSchema), ProductController.update);

// Delete a product
router.delete("/products/:productId", auth(USER_ROLE.ADMIN), ProductController.deleteOne);

export const ProductRoutes = router;
