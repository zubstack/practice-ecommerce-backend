import express from 'express';
import CategoryService from '../services/category.service.js';
import { createCategorySchema } from '../schemas/category.schema.js';
import { validatorSchemaHandler } from '../utils/middleware.js';

const categoriesRouter = express.Router();
const service = new CategoryService();

categoriesRouter.get('/', async (request, response) => {
  const { products: productsQuery } = request.query;
  let result;
  if (productsQuery) {
    result = await service.findAllWithProducts();
  } else {
    result = await service.findAll();
  }
  return response.status(200).json({ message: 'success', content: result });
});

categoriesRouter.post(
  '/',
  validatorSchemaHandler(createCategorySchema, 'body'),
  async (request, response) => {
    const { body } = request;
    const result = await service.create(body);
    return response.status(201).json({ message: 'created', content: result });
  }
);

categoriesRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const result = await service.deleteById(id);
  return response.status(204).json({ message: 'deleted', content: result });
});

export default categoriesRouter;
