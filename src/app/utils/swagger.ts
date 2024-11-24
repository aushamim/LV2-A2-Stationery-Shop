import { Express } from "express";
import { version } from "../../../package.json";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Stationery Shop API Docs",
      version,
    },
  },
  apis: ["src/app/docs/*.yml"],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express) {
  // Docs Page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
export default swaggerDocs;
