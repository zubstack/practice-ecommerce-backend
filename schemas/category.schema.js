import Joi from 'joi';

const name = Joi.string().alphanum().min(3).max(30);

const createCategorySchema = Joi.object({
  name: name.required(),
});

export { createCategorySchema };
