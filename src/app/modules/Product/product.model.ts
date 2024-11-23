import { model } from "mongoose";
import { ProductInterface, ProductSchema } from "./product.interface";

// Model
export const ProductModel = model<ProductInterface>("Product", ProductSchema);
