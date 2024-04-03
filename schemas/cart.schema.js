import Joi from 'joi';

const product = Joi.string();
const quantity = Joi.number();
const remove = Joi.boolean();

const createCartSchema = Joi.object({
  product: product.required(),
  quantity: quantity.required(),
  remove: remove,
});

export { createCartSchema };
