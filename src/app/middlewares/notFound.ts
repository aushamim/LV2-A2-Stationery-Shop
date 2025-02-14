import { RequestHandler } from "express";
import { handleError } from "../errors/error";

const notFound: RequestHandler = (req, res) => {
  handleError(res, 404, "API route not found!", {});
};

export default notFound;
