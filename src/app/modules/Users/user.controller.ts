import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt, { SignOptions } from "jsonwebtoken";
import config from "../../config";
import { handleResponse } from "../../utils/response";
import { UserInterface, UserLoginInterface, UserValidationSchema } from "./user.interface";
import { UserDB } from "./user.service";

// Register
const register = async (req: Request, res: Response) => {
  try {
    const user: UserInterface = req.body;
    const validatedUser = UserValidationSchema.parse(user);

    const existingUser = await UserDB.getOne({ email: validatedUser.email });
    if (existingUser) {
      handleResponse(res, StatusCodes.CONFLICT, false, "User with the same email already exists.");
    } else {
      const { name, email, phone, address } = await UserDB.create(validatedUser);
      handleResponse(res, StatusCodes.OK, true, "User registered successfully", { name, email, phone, address });
    }
  } catch (err) {
    handleResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, false, "User registration failed", undefined, err);
  }
};

// Register
const login = async (req: Request, res: Response) => {
  try {
    const user: UserLoginInterface = req.body;
    const response = await UserDB.getOne({ email: user.email });

    if (response && !response.inactive) {
      const isPasswordMatched = await bcrypt.compare(user.password, response.password);

      if (!isPasswordMatched) {
        handleResponse(res, StatusCodes.UNAUTHORIZED, false, "Invalid credentials");
      }

      // token generation
      const jwtData = { userId: response._id, role: response.role };
      const accessToken = jwt.sign(jwtData, config.jwtAccessSecret as string, { expiresIn: config.jwtAccessExpire as string } as SignOptions);
      const refreshToken = jwt.sign(jwtData, config.jwtRefreshSecret as string, { expiresIn: config.jwtRefreshExpire as string } as SignOptions);

      res.cookie("refreshToken", refreshToken, { secure: config.production, httpOnly: true });

      handleResponse(res, StatusCodes.OK, true, "User logged in successfully", { accessToken });
    } else {
      handleResponse(res, StatusCodes.OK, true, "User not found");
    }
  } catch (err) {
    handleResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, false, "User registration failed", undefined, err);
  }
};

// Deactivate User
const deactivateUser = async (req: Request, res: Response) => {
  try {
    const user: UserLoginInterface = req.body;
    const response = await UserDB.getOne({ email: user.email });

    if (response && !response.inactive) {
      const isPasswordMatched = await bcrypt.compare(user.password, response.password);

      if (!isPasswordMatched) {
        handleResponse(res, StatusCodes.UNAUTHORIZED, false, "Invalid credentials");
      }

      // token generation
      const jwtData = { userId: response._id, role: response.role };
      const accessToken = jwt.sign(jwtData, config.jwtAccessSecret as string, { expiresIn: config.jwtAccessExpire as string } as SignOptions);
      const refreshToken = jwt.sign(jwtData, config.jwtRefreshSecret as string, { expiresIn: config.jwtRefreshExpire as string } as SignOptions);

      res.cookie("refreshToken", refreshToken, { secure: config.production, httpOnly: true });

      handleResponse(res, StatusCodes.OK, true, "User logged in successfully", { accessToken });
    } else {
      handleResponse(res, StatusCodes.OK, true, "User not found");
    }
  } catch (err) {
    handleResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, false, "User registration failed", undefined, err);
  }
};

export const UserController = { register, login };
