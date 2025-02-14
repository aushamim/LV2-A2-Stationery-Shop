/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from "http-status-codes";
import { ErrorDataInterface } from "./error";

export const formatMongoDuplicateKeyError = (err: any): ErrorDataInterface => {
  return {
    statusCode: StatusCodes.CONFLICT,
    message: "Duplicate key error",
    errorDetails: [{ message: err.errorResponse.errmsg, path: Object.keys(err.keyValue)[0] }],
  };
};
