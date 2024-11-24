import { Express, Request, Response } from "express";
import path from "path";

// import swaggerUi from "swagger-ui-express";
// import { version } from "../../../package.json";
// import swaggerJsdoc from "swagger-jsdoc";

// const options: swaggerJsdoc.Options = {
//   definition: {
//     openapi: "3.0.3",
//     info: {
//       title: "Stationery Shop API Docs",
//       version,
//     },
//   },
//   apis: ["dist/app/docs/*.yml"],
// };

// const swaggerSpec = swaggerJsdoc(options);

export function swaggerDocs(app: Express) {
  // Docs JSON
  app.get("/docs.json", (req: Request, res: Response) => {
    const combinedDoc = path.join(__dirname, "../docs/combined_doc.json");
    res.setHeader("Content-Type", "application/json");
    res.sendFile(combinedDoc);
  });

  // Docs Page
  app.get("/docs", (req: Request, res: Response) => {
    const swaggerFile = path.join(__dirname, "../docs/swagger.html");
    res.sendFile(swaggerFile, (err) => {
      if (err) {
        res.status(500).send("Failed to load Swagger UI.");
      }
    });
  });
}
