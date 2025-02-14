import cors from "cors";
import express, { Request, Response } from "express";
import { OrderRoutes } from "./app/modules/Orders/order.routes";
import { ProductRoutes } from "./app/modules/Product/product.routes";
import { UserRoutes } from "./app/modules/Users/user.routes";
import { swaggerDocs } from "./app/utils/swagger";

const app = express();

swaggerDocs(app);

// Parsers
app.use(express.json());
app.use(cors());

// App routes
app.use("/api/products", ProductRoutes);
app.use("/api/orders", OrderRoutes);
app.use("/api/users", UserRoutes);

app.get("/", (req: Request, res: Response) => {
  const content = "<div><h1>Hello! Welcome to Stationery Shop Server</h1><h4>Read API documentation <a href='/docs'>here</a></h4></div>";
  res.send(content);
});

export default app;
