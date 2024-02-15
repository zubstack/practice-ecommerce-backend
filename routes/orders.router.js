import express from 'express';
import OrderService from '../services/order.service.js';

const ordersRouter = express.Router();
const service = new OrderService();

ordersRouter.get('/', async (request, response) => {
  const result = await service.find();
  response.json(result);
});

ordersRouter.post('/', async (request, response) => {
  const { body } = request;
  console.log('body', body);
  const result = await service.create({ ...body });
  response.json(result);
});

export default ordersRouter;
