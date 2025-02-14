import { UserGetInterface, UserInterface, UserPartialInterface } from "./user.interface";
import { UserModel } from "./user.model";

const getOne = async (payload: UserGetInterface) => {
  return await UserModel.findOne(payload);
};

const createOne = async (user: UserInterface) => {
  return await UserModel.create(user);
};

const updateOne = async (id: string, userData: UserPartialInterface) => {
  return await UserModel.findByIdAndUpdate({ _id: id }, userData, { new: true });
};

export const UserDB = { getOne, createOne, updateOne };
