import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import { OrderRoutes } from "./app/modules/Orders/order.routes";
import { ProductRoutes } from "./app/modules/Product/product.routes";
import { UserRoutes } from "./app/modules/Users/user.routes";
import { swaggerDocs } from "./app/utils/swagger";

const app = express();

swaggerDocs(app);

// Parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));

// App routes
app.use("/api", ProductRoutes);
app.use("/api", OrderRoutes);
app.use("/api", UserRoutes);

// Global Error Handling
app.use(globalErrorHandler);

// Root Route
app.get("/", (req: Request, res: Response) => {
  const content = "<div><h1>Hello! Welcome to Stationery Shop Server</h1><h4>Read API documentation <a href='/docs'>here</a></h4></div>";
  res.send(content);
});

// Route Not Found
app.use(notFound);

export default app;
