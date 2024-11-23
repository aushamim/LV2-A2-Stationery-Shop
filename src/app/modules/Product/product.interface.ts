import { Schema } from "mongoose";
import { z } from "zod";

// Product interface
export interface ProductInterface {
  name        : string;
  brand       : string;
  description : string;
  category    : "Writing" | "Office Supplies" | "Art Supplies" | "Educational" | "Technology";
  price       : number;
  quantity    : number;
  inStock?    : boolean;
} // prettier-ignore

// Partial product interface/type
export type PartialProductInterface = Partial<ProductInterface>;

// Model Schema
export const ProductSchema = new Schema<ProductInterface>(
  {
    name        : { type: String, required: true },
    brand       : { type: String, required: true },
    description : { type: String, required: true },
    category    : { type: String, enum: ["Writing", "Office Supplies", "Art Supplies", "Educational", "Technology"], required: true },
    price       : { type: Number, required: true },
    quantity    : { type: Number, required: true },
    inStock     : { type: Boolean },
  },
  { timestamps: true },
); // prettier-ignore

// Zod product validation schema
export const ProductValidationSchema = z.object({
  name        : z.string({ required_error: "Name is required", invalid_type_error: "Name must be a string" }),
  brand       : z.string({ required_error: "Brand is required", invalid_type_error: "Brand must be a string" }),
  description : z.string({ required_error: "Description is required", invalid_type_error: "Description must be a string" }),
  category    : z.enum(["Writing", "Office Supplies", "Art Supplies", "Educational", "Technology"], { required_error: "Category is required" }),
  price       : z.number({ required_error: "Price is required", invalid_type_error: "Price must be a number" }),
  quantity    : z.number({ required_error: "Quantity is required", invalid_type_error: "Quantity must be a number" }),
  inStock     : z.boolean({ required_error: "inStock is required", invalid_type_error: "inStock must be a either true or false" }).optional(),
}); // prettier-ignore

// Zod partial product validation schema
export const PartialProductValidationSchema = ProductValidationSchema.partial();
