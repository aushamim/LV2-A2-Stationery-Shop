import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errors/AppError";
import { ProductModel } from "../Product/product.model";
import QueryBuilder from "../Product/product.querybuilder";
import { UserModel } from "../Users/user.model";
import { PartialOrderInterface } from "./order.interface";
import { OrderModel } from "./order.model";
import { OrderUtils } from "./order.utils";

const create = async (user: JwtPayload, payload: { products: { product: string; quantity: number }[] }, client_ip: string) => {
  const dbUser = await UserModel.findOne({ email: user.email });

  if (!payload?.products?.length) {
    throw new AppError(StatusCodes.NOT_ACCEPTABLE, "Order must contain at least one product.");
  }

  let totalPrice = 0;

  const productIds = payload.products.map((p) => p.product);

  const dbProducts = await ProductModel.find({ _id: { $in: productIds } });

  const productMap = new Map(dbProducts.map((p) => [p._id.toString(), p]));

  // Check stock availability
  for (const { product, quantity } of payload.products) {
    const dbProduct = productMap.get(product);
    if (!dbProduct) {
      throw new AppError(StatusCodes.NOT_FOUND, `Product with ID ${product} not found!`);
    }
    if (dbProduct.quantity < quantity) {
      throw new AppError(StatusCodes.NOT_ACCEPTABLE, `Insufficient stock for ${dbProduct.name}. Available: ${dbProduct.quantity}`);
    }
  }

  // order placement
  const orderedProducts = payload.products.map(({ product, quantity }) => {
    const dbProduct = productMap.get(product)!;
    dbProduct.quantity -= quantity;
    dbProduct.inStock = dbProduct.quantity > 0;
    totalPrice += dbProduct.price * quantity;
    return { product, quantity };
  });

  // Save product stock updates
  await Promise.all(dbProducts.map((p) => p.save()));

  let order = await OrderModel.create({
    user: dbUser?._id,
    products: orderedProducts,
    totalPrice,
  });

  // payment integration
  const shurjopayPayload = {
    amount: totalPrice,
    order_id: order._id,
    currency: "BDT",
    customer_name: dbUser?.name,
    customer_address: dbUser?.address,
    customer_email: dbUser?.email,
    customer_phone: dbUser?.phone,
    customer_city: "N/A",
    client_ip,
  };

  const payment = await OrderUtils.makePaymentAsync(shurjopayPayload);

  if (payment?.transactionStatus) {
    order = await order.updateOne({
      transaction: {
        id: payment.sp_order_id,
        transactionStatus: payment.transactionStatus,
      },
    });
  }

  return payment?.checkout_url;
};

const getOrdersByEmail = async (email: string) => {
  const response = await OrderModel.find().populate<{ user: { email: string } }>("user").populate("products.product").sort({ createdAt: -1 });

  const filteredOrders = response.filter((order) => {
    if (order.user && typeof order.user === "object" && "email" in order.user) {
      return order.user.email === email;
    }
    return false;
  });

  return filteredOrders;
};

const getAll = async (searchTerm: Record<string, unknown>) => {
  const query = new QueryBuilder(OrderModel.find().populate("user", "name email").populate("products.product"), searchTerm)
    .search(["user.name"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await query.countTotal();
  const result = await query.modelQuery;

  return { meta, result };
};

const getOne = async (id: string) => {
  const result = await OrderModel.findById(id);
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, "Order not found!");
  }
  return result;
};

const updateOne = async (id: string, payload: PartialOrderInterface) => {
  const result = await OrderModel.findByIdAndUpdate(id, payload, { new: true });
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, "Order not found!");
  }
  return result;
};

const deleteOne = async (id: string) => {
  const result = await OrderModel.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, "Order not found!");
  }
  return result;
};

const verifyPayment = async (id: string) => {
  const verifiedPayment = await OrderUtils.verifyPaymentAsync(id);

  if (verifiedPayment.length) {
    let status = "";
    if (verifiedPayment[0].bank_status === "Success") {
      status = "Paid";
    } else if (verifiedPayment[0].bank_status === "Failed") {
      status = "Pending";
    } else if (verifiedPayment[0].bank_status === "Cancel") {
      status = "Cancelled";
    }

    await OrderModel.findOneAndUpdate(
      {
        "transaction.id": id,
      },
      {
        "transaction.bank_status": verifiedPayment[0].bank_status,
        "transaction.sp_code": verifiedPayment[0].sp_code,
        "transaction.sp_message": verifiedPayment[0].sp_message,
        "transaction.transactionStatus": verifiedPayment[0].transaction_status,
        "transaction.method": verifiedPayment[0].method,
        "transaction.date_time": verifiedPayment[0].date_time,
        status: status,
      },
    );
  }

  return verifiedPayment;
};

export const OrderDB = { create, getOrdersByEmail, getAll, getOne, updateOne, deleteOne, verifyPayment };
