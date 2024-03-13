import boom from '@hapi/boom';
import User from '../models/user.model.js';

class UserService {
  constructor() {}

  async findAll() {
    return await User.find({});
  }

  async findAllWithCustomers() {
    return await User.find({}).populate('customer');
  }

  async findOne(id) {
    const user = await User.findById(id);
    if (!user) {
      throw boom.notFound('User not found');
    }
    return user;
  }

  async login({ email }) {
    if (email === undefined) {
      throw boom.badRequest('missing data');
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      const newUser = await this.create({ email });
      return newUser;
    }
    return user;
  }

  async create({ email }) {
    if (email === undefined) {
      throw boom.badRequest('missing data');
    }
    const newUser = new User({ email });
    const result = await newUser.save();
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
