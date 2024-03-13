import boom from '@hapi/boom';
import Product from '../models/product.model.js';
import Category from '../models/category.model.js';

class ProductService {
  constructor() {}

  async find() {
    return await Product.find({}).populate('category', {
      category_name: 1,
      id: 1,
    });
  }

  async findOne(id) {
    const product = await Product.findOne({ _id: id });
    if (!product) {
      throw boom.notFound('product not found');
    }
    return product;
  }

  async create(body) {
    if (body === undefined) {
      throw boom.badRequest('missing data');
    }
    const { category_id } = body;
    const category = await Category.findById(category_id);
    if (!category) {
      throw boom.notFound('Category not found');
    }
    const newProduct = { ...body, category: category.id };
    const product = new Product(newProduct);
    category.products = category.products.concat(product._id);
    const result = await product.save();
    await category.save();
    return result;
  }

  async deleteOne(id) {
    const result = await Product.findByIdAndRemove(id);
    if (!result) {
      throw boom.notFound('product not found');
    }
    return result;
  }

  async update(id, body) {
    if (body === undefined) {
      throw boom.badRequest('missing data');
    }
    const result = await Product.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
      context: 'query',
    });
    if (!result) {
      throw boom.notFound('product not found');
    }
    return result;
  }
}

export default ProductService;
