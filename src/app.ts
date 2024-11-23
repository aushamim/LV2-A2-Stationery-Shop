import express, { Request, Response } from "express";
import cors from "cors";
import { ProductRoutes } from "./app/modules/Product/product.routes";
import { OrderRoutes } from "./app/modules/Orders/order.routes";
const app = express();

// Parsers
app.use(express.json());
app.use(cors());

// App routes
app.use("/api/products", ProductRoutes);
app.use("/api/orders", OrderRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello! Welcome to Stationery Shop Server");
});

export default app;
