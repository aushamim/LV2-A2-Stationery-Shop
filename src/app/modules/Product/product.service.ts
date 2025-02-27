import QueryBuilder from "../../QueryBuilder/QueryBuildter";
import { PartialProductInterface, ProductInterface } from "./product.interface";
import { ProductModel } from "./product.model";

const getAll = async (searchTerm: Record<string, unknown>) => {
  const query = new QueryBuilder(ProductModel.find(), searchTerm).search(["name", "brand", "category"]).filter().sort().paginate().fields();

  const meta = await query.countTotal();
  const result = await query.modelQuery;

  return { meta, result };
};

const getOne = async (id: string) => {
  return await ProductModel.findOne({ _id: id });
};

const create = async (product: ProductInterface) => {
  return await ProductModel.create(product);
};

const update = async (id: string, product: PartialProductInterface) => {
  return await ProductModel.findByIdAndUpdate(id, product, { new: true });
};

const deleteOne = async (id: string) => {
  return await ProductModel.findByIdAndDelete(id);
};

export const ProductDB = { getAll, getOne, create, update, deleteOne };
