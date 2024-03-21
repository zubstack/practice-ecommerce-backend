import { default as initialProducts } from '../data/products.js';
import { default as initialCategories } from '../data/categories.js';
import Product from '../models/product.model.js';
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
  const category = await getCategoryByName('clothing');
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
  const product = new Product(model);
  await product.save();
  await product.deleteOne();

  return product._id.toString();
};

const getProductExamples = async () => {
  const category = await getCategoryByName('clothing');

  return {
    model: {
      title: 'New product',
      price: 22.3,
      description: 'Slim-fitting style',
      category: category.id,
      image:
        'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
    },
    bad: {},
  };
};

export {
  initialProducts,
  productsInDb,
  getNonExistingId,
  initializeCategories,
  initializeProducts,
  getCategoryByName,
  getProductExamples,
};
