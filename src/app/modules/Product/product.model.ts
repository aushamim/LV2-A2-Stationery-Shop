import { model, Schema } from "mongoose";
import { ProductInterface } from "./product.interface";

// Model Schema
export const ProductSchema = new Schema<ProductInterface>(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, enum: ["Writing", "Office Supplies", "Art Supplies", "Educational", "Technology"], required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    imgUrl: { type: String, required: true },
    inStock: { type: Boolean, required: true },
  },
  { timestamps: true },
);

// Model
export const ProductModel = model<ProductInterface>("Product", ProductSchema);
