import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.model.js';

const usersRouter = express.Router();

usersRouter.get('/', async (request, response) => {
  const users = await User.find({});
  const usersList = users.map((user) => user.toJSON());
  response.json(usersList);
});

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
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
