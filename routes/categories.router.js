import express from 'express';
import Category from '../models/category.model.js';
import { createCategorySchema } from '../schemas/category.schema.js';
import { validatorHandler } from '../utils/middleware.js';

const categoriesRouter = express.Router();

categoriesRouter.get('/', async (request, response) => {
  const categories = await Category.find({}).populate('products', {
    name: 1,
    brand: 1,
    id: 1,
  });
  const categoriesList = categories.map((category) => category.toJSON());
  return response.json(categoriesList);
});

categoriesRouter.post(
  '/',
  validatorHandler(createCategorySchema, 'body'),
  async (request, response) => {
    const { body } = request;
    const newItem = new Category(body);
    const result = await newItem.save();
    return response.status(201).json(result);
  }
);

categoriesRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const result = await Category.findOneAndRemove({
    _id: id,
  });

  if (!result) {
    return response.status(404).json('Category NOT_FOUND');
  } else {
    return response.status(204).json(result);
  }
});

export default categoriesRouter;
