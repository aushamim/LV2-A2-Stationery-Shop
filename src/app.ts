import express, { Request, Response } from "express";
import cors from "cors";
import { ProductRoutes } from "./app/modules/Product/product.routes";
const app = express();

// Parsers
app.use(express.json());
app.use(cors());

// App routes
app.use("/api/products", ProductRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
