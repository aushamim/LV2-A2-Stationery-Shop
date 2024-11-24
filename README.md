# Stationery Shop Backend

### Live Site: [Stationery Shop Backend](https://stationery-shop-backend-ten.vercel.app/)

### Docs: [Stationery Shop Backend Docs](https://stationery-shop-backend-ten.vercel.app/docs)

## Guide

1. Clone this repository.
2. Create a `.env` file in the project root containing these;
   ```sh
   PORT=5000
   DB_URL=<mongodb url>
   ```
3. Run `yarn install` or `npm install` to install dependencies.
4. Run `yarn dev` or `npm run dev` to start project on development environment.
5. Run `yarn build` or `npm run build` then `yarn start` or `npm start` to start project.

- ### More Commands
- `yarn lint` : Run eslint
- `yarn lint:fix` : Run eslint formatter
- `yarn format` : Run prettier code formatter
- `yarn deploy` : Deploy project in vercel
- `yarn release` : Chained commands: `format -> lint:fix -> lint -> build -> deploy`

## API Endpoints

- ### Products
- `/api/products` : `GET` : Get all products
- `/api/products/?searchTerm=term` : `GET` : Get all products matching `searchTerm` in name, brand or categry.
- `/api/products` : `POST` : Create a new product
- `/api/products/:productID` : `GET` : Get a product by ID
- `/api/products/:productID` : `PUT` : Update a product by ID
- `/api/products/:productID` : `DELETE` : Delete a product by ID
- ### Orders
- `/api/orders` : `POST` : Create a new order.
- `/api/orders/revenue` : `GET` : Calculate total order revenue.

- > You can get more detailed examples of API endpoints [here](https://stationery-shop-backend-ten.vercel.app/docs)

## Project Structure

```
Stationery Shop
├── src
│   ├── app
│   │   ├── config
│   │   │   └── index.ts
│   │   ├── docs
│   │   │   ├── order_doc.yml
│   │   │   └── product_doc.yml
│   │   ├── modules
│   │   │   ├── Orders
│   │   │   │   ├── order.controller.ts
│   │   │   │   ├── order.interface.ts
│   │   │   │   ├── order.model.ts
│   │   │   │   ├── order.routes.ts
│   │   │   │   └── order.service.ts
│   │   │   └── Product
│   │   │       ├── product.controller.ts
│   │   │       ├── product.interface.ts
│   │   │       ├── product.model.ts
│   │   │       ├── product.routes.ts
│   │   │       └── product.service.ts
│   │   └── utils
│   │       ├── response.ts
│   │       └── swagger.ts
│   ├── app.ts
│   └── server.ts
├── eslint.config.mjs
├── package.json
├── README.md
├── tsconfig.json
├── vercel.json
└── yarn.lock
```
