import express from "express";
import orders from "../models/orders.js";

const ordersRouter = express.Router();

ordersRouter.get("/", (request, response) => {
  response.json(orders);
});
export default ordersRouter;
