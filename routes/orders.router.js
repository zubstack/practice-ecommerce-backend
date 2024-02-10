import express from 'express';
import orders from '../models/order.model.js';

const ordersRouter = express.Router();

ordersRouter.get('/', (request, response) => {
  response.json(orders);
});
export default ordersRouter;
