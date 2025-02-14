import { StatusCodes } from "http-status-codes";
import { ZodError, ZodIssue } from "zod";
import { ErrorDataInterface } from "./error";

export const formatZodError = (err: ZodError): ErrorDataInterface => {
  const errorDetails = err?.issues?.map((issue: ZodIssue) => {
    return { message: issue.message, path: issue.path[issue.path.length - 1] };
  });

  return {
    statusCode: StatusCodes.BAD_REQUEST,
    message: "Zod validation error",
    errorDetails: errorDetails,
  };
};
