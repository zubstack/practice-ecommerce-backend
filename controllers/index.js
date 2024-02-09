import express from 'express';
import productsRouter from './products.js';
import ordersRouter from './orders.js';
import usersRouter from './user.js';

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1/', router);
  router.use('/products', productsRouter);
  router.use('/orders', ordersRouter);
  router.use('/users', usersRouter);
}

export default routerApi;
