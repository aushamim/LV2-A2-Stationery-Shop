import { ErrorDataInterface } from "../error";
import AppError from "./AppError";

export const formatAppError = (err: AppError): ErrorDataInterface => {
  return {
    statusCode   : err.statusCode,
    message      : err.message,
    errorDetails : [{ message: err.message, path: "" }],
  };
};
