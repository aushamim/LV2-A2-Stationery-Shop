import { PartialProductInterface, ProductInterface } from "./product.interface";
import { ProductModel } from "./product.model";

const getAllProductsFromDB = async (searchTerm: string | null = null) => {
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

const getProductFromDB = async (id: string) => {
  return await ProductModel.findOne({ _id: id });
};

const createProductInDB = async (product: ProductInterface) => {
  return await ProductModel.create(product);
};

const updateProductInDB = async (id: string, product: PartialProductInterface) => {
  return await ProductModel.updateOne({ _id: id }, product);
};

const deleteProductFromDB = async (id: string) => {
  return await ProductModel.deleteOne({ _id: id });
};

export { getAllProductsFromDB, getProductFromDB, createProductInDB, updateProductInDB, deleteProductFromDB };
