import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import AppError from "../errors/AppError";
import { UserInterface } from "../modules/Users/user.interface";
import catchAsync from "../utils/catchAsync";

const auth = (...allowedRoles: UserInterface["role"][]) =>
  catchAsync(async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) throw new AppError(StatusCodes.UNAUTHORIZED, "You are not authorized");

    jwt.verify(token, config.jwtAccessSecret as string, function (err, decoded) {
      if (err) throw new AppError(StatusCodes.UNAUTHORIZED, "You are not authorized");

      console.log("🚀 ~ decoded:", decoded);

      req.user = decoded as JwtPayload;
    });

    next();
  });

export default auth;
