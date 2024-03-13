import boom from '@hapi/boom';
import Category from '../models/category.model.js';

class CategoryService {
  constructor() {}

  async findAll() {
    return await Category.find({});
  }
  async findAllWithProducts() {
    return await Category.find({}).populate('products');
  }

  async findById(id) {
    const result = await Category.findById(id);
    if (!result) {
      throw boom.notFound('Category not found');
    }
    return result;
  }

  async create(body) {
    if (body === undefined) {
      throw boom.badRequest('missing data');
    }
    const category = new Category(body);
    const result = await category.save();
    return result;
  }

  async deleteById(id) {
    const result = await Category.findByIdAndRemove(id);
    if (!result) {
      throw boom.notFound('category not found');
    }
    return result;
  }

  async update(id, body) {
    if (body === undefined) {
      throw boom.badRequest('missing data');
    }
    const result = await Category.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
      context: 'query',
    });
    if (!result) {
      throw boom.notFound('category not found');
    }
    return result;
  }

  async deleteAll() {
    return await Category.deleteMany({});
  }
}

export default CategoryService;
