import { UserGetInterface, UserInterface } from "./user.interface";
import { UserModel } from "./user.model";

const getOne = async (payload: UserGetInterface) => {
  return await UserModel.findOne(payload);
};

const create = async (user: UserInterface) => {
  return await UserModel.create(user);
};

export const UserDB = { getOne, create };
