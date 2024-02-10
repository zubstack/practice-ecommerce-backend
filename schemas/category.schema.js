import Joi from 'joi';

const name = Joi.string().alphanum().min(3).max(30);

const createCategorySchema = Joi.object({
  category_name: name.required(),
});

export { createCategorySchema };
