import express from 'express';
import productsRouter from './products.router.js';
import usersRouter from './users.router.js';
import categoriesRouter from './categories.router.js';
import cartsRouter from './carts.router.js';

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1/', router);
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);
  router.use('/categories', categoriesRouter);
  router.use('/carts', cartsRouter);
}

export default routerApi;
