import { StatusCodes } from "http-status-codes";
import { Error } from "mongoose";
import { ErrorDataInterface } from "./error";

export const formatMongooseCastError = (err: Error.CastError): ErrorDataInterface => {
  const errorDetails = [{ message: err.message, path: err.path }];

  return {
    statusCode: StatusCodes.BAD_REQUEST,
    message: err.message,
    errorDetails: errorDetails,
  };
};
