import { Schema } from "mongoose";
import { z } from "zod";

export const USER_ROLE = {
  ADMIN: "admin",
  USER: "user",
} as const;

export interface UserInterface {
  name: string;
  email: string;
  password: string;
  address?: string;
  phone?: string;
  role?: (typeof USER_ROLE)[keyof typeof USER_ROLE];
  inactive?: boolean;
}

// Zod product validation schema
export const UserValidationSchema = z.object({
  name: z.string({ required_error: "Name is required", invalid_type_error: "Name must be a string" }),
  email: z
    .string({ required_error: "Email is required", invalid_type_error: "Brand must be a string" })
    .email({ message: "Please enter a valid email." }),
  password: z.string({ required_error: "Password is required", invalid_type_error: "Password must be a string" }),
  address: z.string({ invalid_type_error: "Address must be a string" }).optional(),
  phone: z.string({ invalid_type_error: "Phone no. must be a string" }).optional(),
});

export interface UserLoginInterface {
  email: string;
  password: string;
}

export interface UserGetInterface {
  _id?: string;
  email?: string;
}

// Model Schema
export const UserSchema = new Schema<UserInterface>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String },
    role: { type: String, enum: [USER_ROLE.ADMIN, USER_ROLE.USER], default: USER_ROLE.USER },
    address: { type: String },
    inactive: { type: Boolean, default: false },
  },
  { timestamps: true },
);
