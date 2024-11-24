import { version } from "../../../package.json";
import swaggerJsdoc from "swagger-jsdoc";
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
