import AppError from "./AppError";
import { ErrorDataInterface } from "./error";

export const formatAppError = (err: AppError): ErrorDataInterface => {
  return {
    statusCode: err.statusCode,
    message: err.message,
    errorDetails: [{ message: err.message, path: "" }],
  };
};
