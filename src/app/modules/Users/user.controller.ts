import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import jwt, { SignOptions } from "jsonwebtoken";
import { HydratedDocument } from "mongoose";
import config from "../../config";
import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import { handleResponse } from "../../utils/response";
import { USER_ROLE, UserGetInterface, UserInterface, UserPartialInterface } from "./user.interface";
import { UserDB } from "./user.service";

const getUser = async (payload: UserGetInterface): Promise<HydratedDocument<UserInterface>> => {
  try {
    const user = await UserDB.getOne(payload);
    if (!user) throw new AppError(StatusCodes.UNAUTHORIZED, "User not found");
    return user;
  } catch {
    throw new AppError(StatusCodes.UNAUTHORIZED, "User not found");
  }
};

// Register
const register = catchAsync(async (req, res) => {
  const user = req.body;
  const response = await UserDB.createOne(user);
  const { _id, name, email } = response;
  handleResponse(res, StatusCodes.CREATED, "User registered successfully", { _id, name, email });
});

// Login
const login = catchAsync(async (req, res) => {
  const user = req.body;

  const payload = { email: user.email };
  const response = await getUser(payload);

  if (!response) throw new AppError(StatusCodes.NOT_FOUND, "User not found");
  if (response?.inactive) throw new AppError(StatusCodes.FORBIDDEN, "User is blocked");

  const isPasswordMatched = await bcrypt.compare(user.password, response.password);
  if (!isPasswordMatched) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid credentials");
  }

  // token generation
  const jwtData = { userId: response._id, role: response.role };
  const accessToken = jwt.sign(jwtData, config.jwtAccessSecret as string, { expiresIn: config.jwtAccessExpire as string } as SignOptions);
  const refreshToken = jwt.sign(jwtData, config.jwtRefreshSecret as string, { expiresIn: config.jwtRefreshExpire as string } as SignOptions);

  res.cookie("refreshToken", refreshToken, { secure: config.production, httpOnly: true });

  handleResponse(res, StatusCodes.OK, "User logged in successfully", { token: accessToken });
});

// Update User Data
const updateUser = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const authUser = req.user;

  if (authUser.role === USER_ROLE.ADMIN || authUser.userId === userId) {
    const payload = req.body;
    const response = await UserDB.updateOne(userId, payload);
    if (response) {
      const { name, email, address, phone } = response;
      handleResponse(res, StatusCodes.OK, "Updated the user", { name, email, address, phone });
    } else {
      throw new AppError(StatusCodes.NOT_FOUND, "User not found. Update failed.");
    }
  } else {
    throw new AppError(StatusCodes.UNAUTHORIZED, "You are not authorized");
  }
});

// Update User Password
const changePass = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const authUser = req.user;

  if (authUser.userId === userId) {
    const { oldPassword, newPassword } = req.body;
    const user = await getUser({ _id: authUser.userId });

    const isPasswordMatched = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordMatched) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid credentials");
    }

    //Hash new password
    const newHashedPassword = await bcrypt.hash(newPassword, Number(config.saltRounds));
    await UserDB.updateOne(userId, { password: newHashedPassword });

    handleResponse(res, StatusCodes.OK, "Password changed successfully");
  } else {
    throw new AppError(StatusCodes.UNAUTHORIZED, "You are not authorized");
  }
});

// Activate User
const activateUser = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const payload: UserPartialInterface = { inactive: false };
  await UserDB.updateOne(userId, payload);

  handleResponse(res, StatusCodes.OK, "Activated the user");
});

// Deactivate User
const deactivateUser = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const payload: UserPartialInterface = { inactive: true };
  await UserDB.updateOne(userId, payload);

  handleResponse(res, StatusCodes.OK, "Deactivated the user");
});

export const UserController = { getUser, register, login, updateUser, changePass, activateUser, deactivateUser };
