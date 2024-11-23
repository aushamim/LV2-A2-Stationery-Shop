import { PartialProductInterface, ProductInterface } from "./product.interface";
import { ProductModel } from "./product.model";

const getAll = async (searchTerm: string | null = null) => {
  const query = searchTerm
    ? {
        $or: [
          { name: { $regex: searchTerm, $options: "i" } },
          { brand: { $regex: searchTerm, $options: "i" } },
          { category: { $regex: searchTerm, $options: "i" } },
        ],
      }
    : {};
  return await ProductModel.find(query);
};

const getOne = async (id: string) => {
  return await ProductModel.findOne({ _id: id });
};

const create = async (product: ProductInterface) => {
  return await ProductModel.create(product);
};

const update = async (id: string, product: PartialProductInterface) => {
  return await ProductModel.updateOne({ _id: id }, product);
};

const deleteOne = async (id: string) => {
  return await ProductModel.deleteOne({ _id: id });
};

export const ProductDB = { getAll, getOne, create, update, deleteOne };
