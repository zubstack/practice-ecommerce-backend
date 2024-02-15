import boom from '@hapi/boom';
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';

class UserService {
  constructor() {}

  async find() {
    return await User.find({});
  }

  async findOne(id) {
    const user = await User.findOne({ _id: id });
    if (!User) {
      throw boom.notFound('User not found');
    }
    return user;
  }

  async create(payload) {
    if (payload === undefined) {
      throw boom.badRequest('missing data');
    }
    const { email_address, phone_number, password } = payload;
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      email_address,
      phone_number,
      password_hash,
    });
    const result = await newUser.save();
    return result;
  }

  async deleteOne(id) {
    const result = await User.findByIdAndRemove(id);
    if (!result) {
      throw boom.notFound('User not found');
    }
    return result;
  }

  async update(id, body) {
    if (body === undefined) {
      throw boom.badRequest('missing data');
    }
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
