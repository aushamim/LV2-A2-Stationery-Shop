import { OrderInterface } from "./order.interface";
import { OrderModel } from "./order.model";

const create = async (product: OrderInterface) => {
  return await OrderModel.create(product);
};

const revenue = async () => {
  const totalRevenue = await OrderModel.aggregate([
    {
      $group: {
        _id          : null,
        totalRevenue : { $sum: "$totalPrice" },
      },
    },
  ]);
  return { totalRevenue: totalRevenue.length > 0 ? totalRevenue[0].totalRevenue : 0 };
};

export const OrderDB = { create, revenue };
