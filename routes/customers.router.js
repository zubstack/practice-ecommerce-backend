import express from 'express';
import customerService from '../services/customer.service.js';

const customersRouter = express.Router();
const service = new customerService();

customersRouter.get('/', async (request, response) => {
  const { users: usersQuery } = request.query;
  let result;
  if (usersQuery) {
    result = await service.findAllWithUsers();
  } else {
    result = await service.findAll();
  }
  return response.status(200).json({ message: 'success', content: result });
});

customersRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  const result = await service.findById(id);
  return response.status(200).json({ message: 'success', content: result });
});

customersRouter.post('/', async (request, response) => {
  const { body } = request;
  const result = await service.create(body);
  return response.status(201).json({ message: 'created', content: result });
});

customersRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const result = await service.deleteById(id);
  return response.status(204).json({ message: 'deleted', content: result });
});

customersRouter.patch('/:id', async (request, response) => {
  const { id } = request.params;
  const { body } = request;
  const result = await service.update(id, body);
  return response.status(204).json({ message: 'updated', content: result });
});

export default customersRouter;
