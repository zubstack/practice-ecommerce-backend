import { connection } from 'mongoose';
import supertest from 'supertest';
import app from '../app.js';
import Product from '../models/product.model.js';
import {
  getFirstCategory,
  getNonExistingId,
  getProductExamples,
  initialProducts,
  initializeCategories,
  productsInDb,
} from './test_helper.js';

beforeEach(async () => {
  await Product.deleteMany({});
  await initializeCategories();
  const firstCategory = await getFirstCategory();
  const productObjects = initialProducts.map((product) => {
    product.category_id = firstCategory._id;
    return new Product(product);
  });
  const promiseArray = productObjects.map((product) => product.save());
  productObjects.map(
    (product) =>
      (firstCategory.products = firstCategory.products.concat(product._id))
  );
  await firstCategory.save();
  await Promise.all(promiseArray);
});

const api = supertest(app);
const productsUrl = '/api/v1/products';

describe('Getters: /products', () => {
  test('products are returned as json', async () => {
    await api
      .get(productsUrl)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
  test('all products are returned', async () => {
    const response = await api.get(productsUrl);

    expect(response.body).toHaveLength(initialProducts.length);
  });
  test('check for specific product', async () => {
    const response = await api.get(productsUrl);
    const contents = response.body.map((product) => product.name);
    expect(contents).toContain('Speed X');
  });
  test('get a specific product with id', async () => {
    const productsToStart = await productsInDb();
    const searchedProduct = productsToStart[0];
    const resultProduct = await api
      .get(`${productsUrl}/${searchedProduct.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    searchedProduct.category_id = searchedProduct.category_id.toString(); //we delivery as string
    expect(resultProduct.body).toStrictEqual(searchedProduct);
  });
});

describe('Setters: /products', () => {
  test('create new product', async () => {
    const { model } = await getProductExamples();
    await api
      .post(productsUrl)
      .send(model)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    const productsAtEnd = await productsInDb();
    const contents = productsAtEnd.map((product) => product.name);
    expect(productsAtEnd).toHaveLength(initialProducts.length + 1);
    expect(contents).toContain('Harden Vol 7 - Grey');
  });
  test('delete a product', async () => {
    const productsToStart = await productsInDb();
    const { id } = productsToStart[0];
    await api.delete(`${productsUrl}/${id}`).expect(204);
    await api.get(`${productsUrl}/${id}`).expect(404);
    const productsAtEnd = await productsInDb();
    const ids = productsAtEnd.map((product) => product.id);
    expect(ids).not.toContain(id);
  });
});

describe('Failue: /products', () => {
  test('with non existing id', async () => {
    const non_existing_id = await getNonExistingId();
    const { model } = await getProductExamples();
    await api.get(`${productsUrl}/${non_existing_id}`).expect(404);
    await api.delete(`${productsUrl}/${non_existing_id}`).expect(404);
    await api
      .patch(`${productsUrl}/${non_existing_id}`)
      .send(model)
      .expect(404);
  });
  test('with invalid id', async () => {
    const invalidId = 'invalid-id';
    await api.get(`${productsUrl}/${invalidId}`).expect(400);
    await api.delete(`${productsUrl}/${invalidId}`).expect(400);
    await api.patch(`${productsUrl}/${invalidId}`).expect(400);
  });

  // test('with invalid data, async () => {
  //   const newproduct = {
  //     bla: 6262,
  //   };
  //   await api.post(productsUrl).send(newproduct).expect(400);
  //   const productsAtEnd = await productsInDb();
  //   expect(productsAtEnd).toHaveLength(initialProducts.length);
  // });
});

afterAll(async () => {
  await connection.close();
});
