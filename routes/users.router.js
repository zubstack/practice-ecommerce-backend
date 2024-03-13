import express from 'express';
import UserService from '../services/user.service.js';

const usersRouter = express.Router();
const service = new UserService();

usersRouter.get('/', async (request, response) => {
  const { customers: customersQuery } = request.query;
  let result;
  if (customersQuery) {
    result = await service.findAllWithCustomers();
  } else {
    result = await service.findAll();
  }
  // const usersList = result.map((user) => user.toJSON());
  return response.status(200).json({ message: 'success', content: result });
});

usersRouter.post('/', async (request, response) => {
  const { email } = request.body;
  const result = await service.create({ email });
  return response.status(201).json({ message: 'created', content: result });
});

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
