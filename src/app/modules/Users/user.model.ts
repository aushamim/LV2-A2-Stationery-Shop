import bcrypt from "bcrypt";
import { model } from "mongoose";
import config from "../../config";
import { UserInterface, UserSchema } from "./user.interface";

// Hashing Password before saving to model
UserSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, Number(config.saltRounds));
});

// Model
export const UserModel = model<UserInterface>("User", UserSchema);
