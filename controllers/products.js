import express from 'express';
import Product from '../models/product.js';
import logger from '../utils/logger.js';

const productsRouter = express.Router();

productsRouter.get('/', async (request, response) => {
  const products = await Product.find({});
  response.json(products);
});

productsRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  const product = await Product.findOne({ _id: id });
  if (product) {
    response.json(product);
  } else {
    response.status(404).end();
  }
});

productsRouter.post('/', async (request, response) => {
  const { body } = request;

  if (body === undefined) {
    return response.status(400).json({ error: 'content missing' });
  }
  const product = new Product(body);
  const savedProduct = await product.save();
  response.status(201).json('Data saved on db');
  logger.info('POST', savedProduct);
  return undefined;
});

productsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const result = await Product.findByIdAndRemove(id);
  if (!result) {
    response.status(404).end();
  }
  response.status(204).end();
});

productsRouter.put('/:id', (request, response, next) => {
  const { id } = request.params;
  const { body } = request;
  // Use {new:true} to receive the updated version of this document
  // Use {runValidators: true} because they doesn't run by default.
  Product.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedProduct) => {
      if (!updatedProduct) {
        response.status(404).end();
      }
      response.json(updatedProduct);
    })
    .catch((error) => next(error));
});

export default productsRouter;
