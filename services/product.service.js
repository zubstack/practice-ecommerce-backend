import boom from '@hapi/boom';
import Product from '../models/product.model.js';
import Category from '../models/category.model.js';

class ProductService {
  constructor() {}

  async findAll() {
    return await Product.find({});
  }
  async findAllWithCategory() {
    return await Product.find({}).populate('category', {
      name: 1,
      id: 1,
    });
  }

  async findById(id) {
    const product = await Product.findById(id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    return product;
  }

  async findCategoryByProductId(id) {
    const productWithCategory = await Product.findById(id).populate(
      'category',
      {
        name: 1,
        id: 1,
      }
    );
    if (!productWithCategory) {
      throw boom.notFound('productWithCategory not found');
    }
    const category = await Category.findById(productWithCategory.category._id);

    return category;
  }

  async create(body) {
    if (body === undefined) {
      throw boom.badRequest('missing data');
    }
    const { category: category_id } = body;
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

  async deleteById(id) {
    const productCategory = await this.findCategoryByProductId(id);
    const result = await Product.findByIdAndRemove(id);
    if (!result) {
      throw boom.notFound('product not found');
    }
    await this.updateCategoryAfterDelete(productCategory, id);
    return result;
  }

  async updateCategoryAfterDelete(productCategory, productId) {
    productCategory.products = productCategory.products.filter(
      (product) => product._id.toString() !== productId
    );
    await productCategory.save();
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

  async deleteAll() {
    return await Product.deleteMany({});
  }
}

export default ProductService;
