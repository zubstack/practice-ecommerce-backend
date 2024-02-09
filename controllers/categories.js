import express from 'express';
import Category from '../models/category.js';

const categoriesRouter = express.Router();

categoriesRouter.get('/', async (request, response) => {
  const categories = await Category.find({});
  const categoriesList = categories.map((category) => category.toJSON());
  response.json(categoriesList);
});

categoriesRouter.post('/', async (request, response) => {
  const { body } = request;
  const newItem = new Category(body);
  const rta = await newItem.save();
  response.status(201).json(rta);
});

categoriesRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const rta = await Category.findOneAndRemove({
    _id: id,
  });

  if (!rta) {
    response.status(201).json('Category NOT_FOUND').end();
  } else {
    response.status(404).json(rta).end();
  }
});

export default categoriesRouter;
