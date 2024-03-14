import { default as initialProducts } from '../data/products.js';
import { default as initialCategories } from '../data/categories.js';
import Product from '../models/product.model.js';
import User from '../models/user.model.js';
import ProductService from '../services/product.service.js';
import CategoryService from '../services/category.service.js';

const productService = new ProductService();
const categoryService = new CategoryService();

const productsInDb = async () => {
  const products = await productService.findAll();
  return products.map((product) => product.toJSON());
};

const initializeProducts = async () => {
  await productService.deleteAll();
  await initializeCategories();
  const category = await getCategoryByName('shoes');
  const productObjects = initialProducts.map((product) => {
    product.category = category._id;
    return new Product(product);
  });
  const promiseArray = productObjects.map((product) => product.save());
  productObjects.map(
    (product) => (category.products = category.products.concat(product._id))
  );
  await category.save();
  await Promise.all(promiseArray);
};

const initializeCategories = async () => {
  await categoryService.deleteAll();
  const promiseArray = initialCategories.map(
    async (category) => await categoryService.create(category)
  );
  return await Promise.all(promiseArray);
};

const getCategoryByName = async (categoryName) => {
  const result = await categoryService.findAll();
  return result.find((category) => category.name === categoryName);
};

const getNonExistingId = async () => {
  const { model } = await getProductExamples();
  const product = new Product({ ...model, category: model.category_id });
  await product.save();
  await product.deleteOne();

  return product._id.toString();
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

const getProductExamples = async () => {
  const category = await getCategoryByName('shoes');

  return {
    model: {
      name: 'Amazing shoe',
      brand: 'adidas',
      variants: [
        {
          variant_name: 'default',
          size: ['39', '42'],
          price: 135,
          images: ['https://static.basketballstore.net/image.jpg'],
        },
      ],
      available: true,
      description: 'This shoes are awsome',
      details: ['description1', 'description2'],
      category_id: category._id,
    },
    bad: {},
  };
};

export {
  initialProducts,
  productsInDb,
  getNonExistingId,
  usersInDb,
  initializeCategories,
  initializeProducts,
  getCategoryByName,
  getProductExamples,
};
