import express from 'express';
import UserService from '../services/user.service.js';
import { validatorSchemaHandler } from '../utils/middleware.js';
import {
  createUserSchema,
  loginUserSchema,
  updateUserSchema,
} from '../schemas/user.schema.js';
import authValidator from '../utils/auth.js';

const usersRouter = express.Router();
const service = new UserService();

// This route must to be only allowed to ADMIN role.
usersRouter.get('/list', async (request, response) => {
  const result = await service.findAll();
  return response.status(200).json({ message: 'success', content: result });
});

usersRouter.get('/', authValidator, async (request, response) => {
  const { id } = request.user;
  const result = await service.findOne(id);
  return response.status(200).json({ message: 'success', content: result });
});

usersRouter.post(
  '/',
  validatorSchemaHandler(createUserSchema, 'body'),
  async (request, response) => {
    const { body } = request;
    const result = await service.create(body);
    return response.status(201).json({ message: 'created', content: result });
  }
);

usersRouter.post(
  '/login',
  validatorSchemaHandler(loginUserSchema, 'body'),
  async (request, response) => {
    const { body } = request;
    const result = await service.login(body);
    return response.status(201).json({ message: 'success', content: result });
  }
);

usersRouter.delete('/', authValidator, async (request, response) => {
  const { id } = request.user;
  const result = await service.deleteById(id);
  return response.status(204).json({ message: 'deleted', content: result });
});

usersRouter.patch(
  '/',
  authValidator,
  validatorSchemaHandler(updateUserSchema, 'body'),
  async (request, response) => {
    const { id } = request.user;
    const { body } = request;
    const result = await service.update(id, body);
    return response.status(204).json({ message: 'updated', content: result });
  }
);

export default usersRouter;
