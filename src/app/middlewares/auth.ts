import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import AppError from "../errors/AppError";
import { UserController } from "../modules/Users/user.controller";
import { UserInterface } from "../modules/Users/user.interface";
import catchAsync from "../utils/catchAsync";

const auth = (...allowedRoles: UserInterface["role"][]) =>
  catchAsync(async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) throw new AppError(StatusCodes.UNAUTHORIZED, "You are not authorized");

    // Decode token
    let decodedUser = null;
    try {
      decodedUser = jwt.verify(token, config.jwtAccessSecret as string) as JwtPayload;
    } catch {
      throw new AppError(StatusCodes.UNAUTHORIZED, "You are not authorized");
    }

    // Check user's availability
    const user = await UserController.getUser({ _id: decodedUser?.userId });
    if (user?.inactive) throw new AppError(StatusCodes.FORBIDDEN, "User is inactive");

    // Check permission
    if (allowedRoles && !allowedRoles.includes(decodedUser?.role)) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "You are not authorized");
    }

    req.user = decodedUser;

    next();
  });

export default auth;
