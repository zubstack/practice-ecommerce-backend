import boom from '@hapi/boom';
import Customer from '../models/customer.model.js';
import UserService from '../services/user.service.js';

const userService = new UserService();

class CustomerService {
  constructor() {}

  async find() {
    return await Customer.find({});
  }

  async findOne(id) {
    const customer = await Customer.findOne({ _id: id });
    if (!customer) {
      throw boom.notFound('Customer not found');
    }
    return customer;
  }

  async create(payload) {
    if (Object.keys(payload).length === 0) {
      throw boom.badRequest('missing data');
    }
    const { user_id } = payload;
    const user = await userService.findOne(user_id);
    const newCustomer = await Customer.create(payload);
    user.customer_id = newCustomer.id;
    await newCustomer.save();
    await user.save();
    return user;
  }

  async deleteOne(id) {
    const result = await Customer.findByIdAndRemove(id);
    if (!result) {
      throw boom.notFound('Customer not found');
    }
    return result;
  }

  async update(id, body) {
    if (body === undefined) {
      throw boom.badRequest('missing data');
    }
    const result = await Customer.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
      context: 'query',
    });
    if (!result) {
      throw boom.notFound('Customer not found');
    }
    return result;
  }
}

export default CustomerService;
