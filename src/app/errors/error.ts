import { Response } from "express";
import { Error } from "mongoose";
import { ZodError } from "zod";
import config from "../config";
import AppError from "./AppError";
import { formatAppError } from "./formatAppError";
import { formatMongoDuplicateKeyError } from "./formatMongoDuplicateKeyError";
import { formatMongooseCastError } from "./formatMongooseCastError";
import { formatMongooseValidationError } from "./formatMongooseValidationError";
import { formatZodError } from "./formatZodError";

export interface ErrorDataInterface {
  statusCode: number;
  message: string;
  errorDetails: { message: string; path: string | number | undefined }[];
}

export const handleError = (res: Response, statusCode: number, message: string, err: unknown) => {
  let errorData: ErrorDataInterface = {
    statusCode: statusCode,
    message: message,
    errorDetails: [{ message: "Something went wrong!", path: "" }],
  };

  if (err instanceof ZodError) {
    errorData = formatZodError(err) ?? errorData;
  }

  if (err instanceof Error.ValidationError) {
    errorData = formatMongooseValidationError(err) ?? errorData;
  }

  if (err instanceof Error.CastError) {
    errorData = formatMongooseCastError(err) ?? errorData;
  }

  if (err instanceof AppError) {
    errorData = formatAppError(err) ?? errorData;
  }

  if (typeof err === "object" && err !== null && "code" in err && err?.code === 11000) {
    errorData = formatMongoDuplicateKeyError(err) ?? errorData;
  }

  const stack = !config.production && err && typeof err === "object" && "stack" in err ? err.stack : undefined;

  res.status(errorData.statusCode).json({
    success: false,
    message: errorData.message,
    statusCode: errorData.statusCode,
    error: { details: errorData.errorDetails },
    stack,
  });
};
