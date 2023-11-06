import express from "express";
import bcrypt from "bcrypt";
import User from "../models/user.js";

const usersRouter = express.Router();

usersRouter.get("/", async (request, response) => {
  const users = await User.find({});
  const usersList = users.map((user) => user.toJSON());
  response.json(usersList);
});

usersRouter.post("/", async (request, response) => {
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

usersRouter.delete("/", async (request, response) => {
  await User.deleteMany({});
});
export default usersRouter;
