import express from 'express';
import ProductService from '../services/product.service.js';
import { validatorSchemaHandler } from '../utils/middleware.js';
import {
  createProductSchema,
  updateProductSchema,
} from '../schemas/product.schema.js';

const productsRouter = express.Router();
const service = new ProductService();

productsRouter.get('/', async (request, response) => {
  const { category: categoryQuery } = request.query;
  let result;
  if (categoryQuery) {
    result = await service.findAllWithCategory();
  } else {
    result = await service.findAll();
  }
  return response.status(200).json({ message: 'success', content: result });
});

productsRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  const result = await service.findById(id);
  return response.status(200).json({ message: 'success', content: result });
});

productsRouter.post(
  '/',
  validatorSchemaHandler(createProductSchema, 'body'),
  async (request, response) => {
    const { body } = request;
    const result = await service.create(body);
    return response.status(201).json({ message: 'created', content: result });
  }
);

productsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const result = await service.deleteById(id);
  return response.status(204).json({ message: 'deleted', content: result });
});

productsRouter.patch(
  '/:id',
  validatorSchemaHandler(updateProductSchema, 'body'),
  async (request, response) => {
    const { id } = request.params;
    const { body } = request;
    const result = await service.update(id, body);
    return response.status(204).json({ message: 'updated', content: result });
  }
);

export default productsRouter;
