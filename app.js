import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import config from "./utils/config.js";
import productsRouter from "./controllers/products.js";
import logger from "./utils/logger.js";
import middleware from "./utils/middleware.js";
import ordersRouter from "./controllers/orders.js";

const app = express();

mongoose.set("strictQuery", false);

logger.info("Connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((error) => {
    logger.info("Error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/products", productsRouter);
app.use("/api/orders", ordersRouter);

// handler of requests with unknown endpoint
app.use(middleware.unknownEndpoint);
// This has to be the last loaded middleware.
app.use(middleware.errorHandler);

export default app;
