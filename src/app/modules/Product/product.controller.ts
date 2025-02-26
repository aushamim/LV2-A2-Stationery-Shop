import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import { handleResponse } from "../../utils/response";
import { ProductDB } from "./product.service";

// Get all products
const getAll = catchAsync(async (req, res) => {
  const result = await ProductDB.getAll(req.query);

  handleResponse(res, StatusCodes.OK, "Products retrieved successfully", { products: result.result, meta: result.meta });
});

// Get a single product
const getOne = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await ProductDB.getOne(productId);

  handleResponse(res, StatusCodes.OK, "Product retrieved successfully", result);
});

// Create a product
const create = catchAsync(async (req, res) => {
  const result = await ProductDB.create(req.body);

  handleResponse(res, StatusCodes.OK, "Product created successfully", result);
});

// Update a product
const update = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await ProductDB.update(productId, req.body);

  handleResponse(res, StatusCodes.OK, "Product updated successfully", result);
});

// Delete a product
const deleteOne = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await ProductDB.deleteOne(productId);

  handleResponse(res, StatusCodes.OK, "Product deleted successfully", result);
});

export const ProductController = { getAll, getOne, create, update, deleteOne };
