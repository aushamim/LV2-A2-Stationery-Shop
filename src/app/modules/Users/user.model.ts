import bcrypt from "bcrypt";
import { model, Schema } from "mongoose";
import config from "../../config";
import { USER_ROLE, UserInterface } from "./user.interface";

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

// Hashing Password before saving to model
UserSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, Number(config.saltRounds));
});

// Model
export const UserModel = model<UserInterface>("User", UserSchema);
