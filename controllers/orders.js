import express from "express";
import orders from "../models/order.js";

const ordersRouter = express.Router();

ordersRouter.get("/", (request, response) => {
  response.json(orders);
});
export default ordersRouter;
