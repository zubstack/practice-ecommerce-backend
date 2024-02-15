import express from 'express';
import bcrypt from 'bcrypt';
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
  const { email_address, phone_number, password } = request.body;
  const result = await service.create({
    email_address,
    phone_number,
    password,
  });
  response.status(201).json(result);
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
export default usersRouter;
