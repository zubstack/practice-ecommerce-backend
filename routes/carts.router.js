import express from 'express';
import CartService from '../services/cart.service.js';
import { createCartSchema } from '../schemas/cart.schema.js';
import { validatorSchemaHandler } from '../utils/middleware.js';
import authValidator from '../utils/auth.js';
import ProductService from '../services/product.service.js';

const cartsRouter = express.Router();
const cartService = new CartService();
const productService = new ProductService();

cartsRouter.get('/', async (request, response) => {
  let result = await cartService.findAll();
  return response.status(200).json({ message: 'success', content: result });
});

cartsRouter.post(
  '/',
  authValidator,
  validatorSchemaHandler(createCartSchema, 'body'),
  async (request, response) => {
    const { body, user } = request;
    const product = await productService.findById(body.product);
    if (body.remove) {
      let result = await cartService.removeCartItem(user.id, product.id);
      return response.status(201).json({ message: 'removed', content: result });
    }
    let cart = await cartService.findWithUserId(user.id);
    if (!cart) {
      let newCart = await cartService.create(
        body.quantity,
        user.id,
        product.id,
        product.price
      );
      return response
        .status(201)
        .json({ message: 'created', content: newCart });
    }
    let result = await cartService.updateCart(
      body.quantity,
      user.id,
      product.id,
      product.price
    );

    return response.status(201).json({ message: 'updated', content: result });
  }
);

export default cartsRouter;
