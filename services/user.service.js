import boom from '@hapi/boom';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import keys from '../config/keys.js';

const { jwt: jwtKeys } = keys;

class UserService {
  constructor() {}

  async findAll() {
    return await User.find({});
  }

  async findOne(id) {
    const user = await User.findById(id);
    if (!user) {
      throw boom.notFound('User not found');
    }
    return user;
  }

  async login(payload) {
    const { email, password } = payload;
    const user = await User.findOne({ email: email }).select('+password');

    const passwordCorrect =
      user === null
        ? false
        : await bcrypt.compare(password.toString(), user.password);

    if (!(user && passwordCorrect)) {
      throw boom.unauthorized('Invalid email or password');
    }

    const userForToken = {
      email: user.email,
      id: user.id,
    };

    const token = jwt.sign(userForToken, jwtKeys.secret, {
      expiresIn: jwtKeys.expiresIn,
    });
    return { email, token };
  }

  async create(payload) {
    const { password } = payload;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ ...payload, password: passwordHash });
    const result = await newUser.save();
    result.password = null;
    return result;
  }

  async deleteById(id) {
    const result = await User.findByIdAndRemove(id);
    if (!result) {
      throw boom.notFound('User not found');
    }
    return result;
  }

  async update(id, body) {
    const result = await User.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
      context: 'query',
    });
    if (!result) {
      throw boom.notFound('User not found');
    }
    return result;
  }
}

export default UserService;
