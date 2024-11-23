> # TODO: Change Repo Visibility to Public

# Stationery Shop Backend

## Live Site: [Stationery Shop Backend](https://stationery-shop-backend-ten.vercel.app/)

## Project Structure

```
Stationery Shop
¦   .env
¦   .gitignore
¦   .prettierrc
¦   eslint.config.mjs
¦   package.json
¦   README.md
¦   tsconfig.json
¦   vercel.json
¦   yarn.lock
¦
+---src
    ¦   app.ts
    ¦   server.ts
    ¦
    +---app
        +---config
        ¦       index.ts
        ¦
        +---modules
        ¦   +---Orders
        ¦   ¦       order.controller.ts
        ¦   ¦       order.interface.ts
        ¦   ¦       order.model.ts
        ¦   ¦       order.routes.ts
        ¦   ¦       order.service.ts
        ¦   ¦
        ¦   +---Product
        ¦           product.controller.ts
        ¦           product.interface.ts
        ¦           product.model.ts
        ¦           product.routes.ts
        ¦           product.service.ts
        ¦
        +---utils
                response.ts
```
