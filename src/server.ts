/* eslint-disable no-console */
import mongoose from "mongoose";
import config from "./app/config";
import app from "./app";

async function main() {
  try {
    // Connect DB
    await mongoose.connect(config.dbUrl as string);

    // Start API
    app.listen(config.port, () => {
      console.log(`Stationary Shop listening on port ${config.port} \nURL: http://localhost:${config.port}/`);
    });
  } catch (err) {
    console.log(err);
  }
}
main();
