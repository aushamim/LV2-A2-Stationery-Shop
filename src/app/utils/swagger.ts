import { Express, Request, Response } from "express";
import { version } from "../../../package.json";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import config from "../config";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi : "3.1.0",
    info    : {
      title: "Stationery Shop API Docs",
      version,
    },
  },
  apis: [config.production ? "dist/app/docs/*.yml" : "src/app/docs/*.yml"],
};

export const swaggerSpec = swaggerJsdoc(options);

export function swaggerDocs(app: Express) {
  // Docs Page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.get("/docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}
