import boom from '@hapi/boom';
import Order from '../models/order.model.js';
import User from '../models/user.model.js';

class OrderService {
  constructor() {}

  async find() {
    return await Order.find({});
  }

  async findOne(id) {
    const order = await Order.findOne({ _id: id });
    if (!order) {
      throw boom.notFound('Order not found');
    }
    return order;
  }

  async create(payload) {
    if (payload === undefined) {
      throw boom.badRequest('missing data');
    }
    const { user_id } = payload;
    const user = await User.findById(user_id);
    if (!user) {
      throw boom.notFound('User not found');
    }
    const newOrder = {
      ...payload,
      order_status: 'pending',
    };
    const order = new Order(newOrder);
    user.orders = user.orders.concat(order._id);
    await user.save();
    const result = await order.save();
    return result;
  }
}

export default OrderService;
