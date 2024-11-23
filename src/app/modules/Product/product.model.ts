import { Schema, model } from "mongoose";
import { ProductInterface } from "./product.interface";

// Schema
const ProductSchema = new Schema<ProductInterface>(
  {
    name        : { type: String, required: true },
    brand       : { type: String, required: true },
    description : { type: String, required: true },
    category    : ["Writing", "Office Supplies", "Art Supplies", "Educational", "Technology"],
    price       : { type: Number, required: true },
    quantity    : { type: Number, required: true },
    inStock     : { type: Boolean },
  },
  { timestamps: true },
); // prettier-ignore

// Model
export const ProductModel = model<ProductInterface>("Product", ProductSchema);
