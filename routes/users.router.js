import express from 'express';
import User from '../models/user.model.js';
import UserService from '../services/user.service.js';

const usersRouter = express.Router();
const service = new UserService();

usersRouter.get('/', async (request, response) => {
  const users = await User.find({});
  const usersList = users.map((user) => user.toJSON());
  response.json(usersList);
});

usersRouter.post('/', async (request, response) => {
  const { email } = request.body;
  const result = await service.create({ email });
  response.status(201).json({ message: 'created', body: result });
});

usersRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const result = await User.findOneAndRemove({
    _id: id,
  });

  if (!result) {
    response.status(201).json('User NOT_FOUND').end();
  } else {
    response.status(404).json(result).end();
  }
});

usersRouter.patch('/:id', async (request, response) => {
  const { id } = request.params;
  const { body } = request;
  const result = await service.update(id, body);
  return response.status(204).json(result);
});

usersRouter.post('/login', async (request, response) => {
  const { email } = request.body;
  const result = await service.login({ email });
  response.json({ user: result }).status(200);
});

export default usersRouter;
