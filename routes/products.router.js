import express from 'express';
import ProductService from '../services/product.service.js';

const productsRouter = express.Router();
const service = new ProductService();

productsRouter.get('/', async (request, response) => {
  const products = await service.find({});
  return response.json(products);
});

productsRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  const result = await service.findOne({ _id: id });
  return response.status(200).json(result);
});

productsRouter.post('/', async (request, response) => {
  const { body } = request;
  const result = await service.create(body);
  return response.status(201).json(result);
});

productsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const result = await service.deleteOne(id);
  return response.status(204).json(result);
});

productsRouter.patch('/:id', async (request, response) => {
  const { id } = request.params;
  const { body } = request;
  const result = await service.update(id, body);
  return response.json(result);
});

export default productsRouter;
