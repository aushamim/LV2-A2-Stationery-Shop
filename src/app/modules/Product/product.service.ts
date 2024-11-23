import { ProductInterface } from "./product.interface";
import { ProductModel } from "./product.model";

const createProductIntoDB = async (product: ProductInterface) => {
  return await ProductModel.create(product);
};

export { createProductIntoDB };
