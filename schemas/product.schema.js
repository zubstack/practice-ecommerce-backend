import Joi from 'joi';

const name = Joi.string().min(3).max(100);
const brand = Joi.string().min(1).max(100);
const variants = Joi.array();
const available = Joi.boolean();
const description = Joi.string().min(5);
const details = Joi.array();
const category = Joi.string();

const createProductSchema = Joi.object({
  name: name.required(),
  brand: brand.required(),
  variants: variants.required(),
  available: available.required(),
  description: description.required(),
  details: details.required(),
  category_id: category.required(),
});
const updateProductSchema = Joi.object({
  name: name,
  brand: brand,
  variants: variants,
  available: available,
  description: description,
  details: details,
  category_id: category,
});

export { createProductSchema, updateProductSchema };
