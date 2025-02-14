import { ErrorRequestHandler } from "express";
import { handleError } from "../errors/error";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  handleError(res, 500, "Something went wrong!", err);
};

export default globalErrorHandler;
