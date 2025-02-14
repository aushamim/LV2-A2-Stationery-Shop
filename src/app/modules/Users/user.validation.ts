import { z } from "zod";

// Zod product validation schema
export const UserValidationSchema = z.object({
  name: z.string({ required_error: "Name is required", invalid_type_error: "Name must be a string" }),
  email: z
    .string({ required_error: "Email is required", invalid_type_error: "Email must be a string" })
    .email({ message: "Please enter a valid email." }),
  password: z.string({ required_error: "Password is required", invalid_type_error: "Password must be a string" }),
  address: z.string({ invalid_type_error: "Address must be a string" }).optional(),
  phone: z.string({ invalid_type_error: "Phone no. must be a string" }).optional(),
});

export const UserUpdateValidationSchema = z
  .object({
    name: z.string({ invalid_type_error: "Name must be a string" }).optional(),
    email: z.string({ invalid_type_error: "Email must be a string" }).email({ message: "Please enter a valid email." }).optional(),
    address: z.string({ invalid_type_error: "Address must be a string" }).optional(),
    phone: z.string({ invalid_type_error: "Phone no. must be a string" }).optional(),
  })
  .strict();

// User login validation schema
export const UserLoginValidationSchema = z.object({
  email: z.string({ invalid_type_error: "Email must be a string" }).email({ message: "Invalid email" }),
  password: z.string({ invalid_type_error: "Password must be a string" }),
});

// Password update validation schema
export const PasswordUpdateValidationSchema = z.object({
  oldPassword: z.string({ invalid_type_error: "Old password must be a string" }),
  newPassword: z.string({ invalid_type_error: "New password must be a string" }),
});
