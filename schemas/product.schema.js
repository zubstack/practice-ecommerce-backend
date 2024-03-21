import Joi from 'joi';

const title = Joi.string().min(3).max(100);
const price = Joi.number();
const category = Joi.string();
const description = Joi.string().min(5);
const image = Joi.string();

const createProductSchema = Joi.object({
  title: title.required(),
  price: price.required(),
  category: category.required(),
  description: description.required(),
  image: image.required(),
});
const updateProductSchema = Joi.object({
  title: title,
  price: price,
  category: category,
  description: description,
  image: image,
});

export { createProductSchema, updateProductSchema };
