import { Request, Response } from "express";
import { ProductDB } from "./product.service";
import { handleResponse } from "../../utils/response";
import { PartialProductValidationSchema, ProductValidationSchema } from "./product.interface";

// Get all products
const getAll = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm;
    const result = await ProductDB.getAll(searchTerm as string | undefined);

    if (!result || result.length === 0) {
      handleResponse(res, 404, false, "Failed to get product", undefined, { message: "Product not found" });
    } else {
      handleResponse(res, 200, true, "Products retrieved successfully", result);
    }
  } catch (err) {
    handleResponse(res, 404, false, "Failed to get products", undefined, err);
  }
};

// Get a single product
const getOne = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    const result = await ProductDB.getOne(id);

    if (!result) {
      handleResponse(res, 404, false, "Failed to get product", undefined, { message: "Product not found" });
    } else {
      handleResponse(res, 200, true, "Product retrieved successfully", result);
    }
  } catch (err) {
    handleResponse(res, 404, false, "Failed to get product", undefined, err);
  }
};

// Create a product
const create = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    const validatedProduct = ProductValidationSchema.parse(product);
    const result = await ProductDB.create(validatedProduct);
    handleResponse(res, 200, true, "Product created successfully", result);
  } catch (err) {
    handleResponse(res, 500, false, "Product creation failed", undefined, err);
  }
};

// Update a product
const update = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    if (!id) {
      throw new Error("Product ID is not given");
    }

    const product = req.body;
    const validatedProduct = PartialProductValidationSchema.parse(product);
    const result = await ProductDB.update(id, validatedProduct);
    handleResponse(res, 200, true, "Product updated successfully", result);
  } catch (err) {
    handleResponse(res, 500, false, "Failed to update the product", undefined, err);
  }
};

// Delete a product
const deleteOne = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    if (!id) {
      throw new Error("Product ID is not given");
    }

    const result = await ProductDB.deleteOne(id);
    handleResponse(res, 200, true, "Product deleted successfully", result);
  } catch (err) {
    handleResponse(res, 500, false, "Failed to delete the product", undefined, err);
  }
};

export const ProductController = { getAll, getOne, create, update, deleteOne };
