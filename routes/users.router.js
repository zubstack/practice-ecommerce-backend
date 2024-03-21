import express from 'express';
import UserService from '../services/user.service.js';
import { validatorHandler } from '../utils/middleware.js';
import { createUserSchema } from '../schemas/user.schema.js';

const usersRouter = express.Router();
const service = new UserService();

usersRouter.get('/', async (request, response) => {
  let result;

  result = await service.findAll();

  // const usersList = result.map((user) => user.toJSON());
  return response.status(200).json({ message: 'success', content: result });
});

usersRouter.post(
  '/',
  validatorHandler(createUserSchema, 'body'),
  async (request, response) => {
    const { body } = request;
    const result = await service.create(body);
    return response.status(201).json({ message: 'created', content: result });
  }
);

usersRouter.post('/login', async (request, response) => {
  const { email } = request.body;
  const result = await service.login({ email });
  return response.status(201).json({ message: 'success', content: result });
});

usersRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const result = await service.deleteById(id);
  return response.status(204).json({ message: 'deleted', content: result });
});

usersRouter.patch('/:id', async (request, response) => {
  const { id } = request.params;
  const { body } = request;
  const result = await service.update(id, body);
  return response.status(204).json({ message: 'updated', content: result });
});

export default usersRouter;
