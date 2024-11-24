import { Express, Request, Response } from "express";
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
  apis: ["src/app/docs/*/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express) {
  // Docs Page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  //   app.get("docs.json", (req: Request, res: Response) => {
  //     res.setHeader("Content-Type", "application/json");
  //     res.send(swaggerSpec);
  //   });
}
export default swaggerDocs;
