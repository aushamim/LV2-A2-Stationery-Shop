import { Response } from "express";

export const handleResponse = <TD>(res: Response, statusCode: number, message: string, data: TD) => {
  res.status(statusCode).json({
    success: true,
    message,
    statusCode,
    ...(data && { data }),
  });
};
