import boom from '@hapi/boom';
import Product from '../models/product.js';
import Category from '../models/category.js';

class ProductService {
  constructor() {}

  async find() {
    return await Product.find({});
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
      throw boom.notFound('category_id not found');
    }
    const newProduct = { ...body, category_id: category._id };
    const product = new Product(newProduct);
    category.products = category.products.concat(product._id);
    await category.save();
    const result = await product.save();
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
