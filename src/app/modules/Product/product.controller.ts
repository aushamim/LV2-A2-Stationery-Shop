import { Request, Response } from "express";
import { createProductIntoDB } from "./product.service";

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    const result = await createProductIntoDB(product);

    res.status(200).json({
      success : true,
      message : "Product Created Successfully",
      data    : result,
    });
  } catch (err) {
    res.status(200).json({
      success : false,
      message : "Product Creation Failed: " + err.message,
    });
  }
};

export { createProduct };
