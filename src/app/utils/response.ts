import { Response } from "express";
import { MongooseError } from "mongoose";
import { ZodError } from "zod";

export const handleResponse = <TD, TE>(res: Response, statusCode: number, success: boolean, message: string, data?: TD, error?: TE) => {
  const errorResponse = error && (error instanceof MongooseError || error instanceof ZodError) ? error : { message: (error as Error)?.message };
  const stack = error && typeof error === "object" && "stack" in error ? error.stack : undefined;
  res.status(statusCode).json({
    success,
    message,
    ...(data && { data }),
    ...(error && { error: errorResponse }),
    stack,
  });
};
