import { StatusCodes } from "http-status-codes";
import { Error } from "mongoose";
import { ErrorDataInterface } from "./error";

export const formatMongooseValidationError = (err: Error.ValidationError): ErrorDataInterface => {
  const errorDetails = Object.values(err.errors).map((x) => {
    if (x instanceof Error.ValidatorError) {
      return { message: x.message, path: x.properties.path };
    } else {
      return { message: x.message, path: x.path };
    }
  });

  return {
    statusCode: StatusCodes.BAD_REQUEST,
    message: err.message,
    errorDetails: errorDetails,
  };
};
