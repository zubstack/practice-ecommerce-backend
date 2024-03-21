import { connection } from 'mongoose';
import supertest from 'supertest';
import app from '../app.js';
import {
  getNonExistingId,
  getProductExamples,
  initialProducts,
  initializeProducts,
  productsInDb,
} from './test_helper.js';

beforeEach(async () => {
  await initializeProducts();
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
    expect(response.body.content).toHaveLength(initialProducts.length);
  });

  test('check for specific product', async () => {
    const response = await api.get(productsUrl);
    const contents = response.body.content.map((product) => product.title);
    expect(contents).toContain('Mens Cotton Jacket');
  });

  test('get a specific product with id', async () => {
    const productsToStart = await productsInDb();
    const searchedProduct = productsToStart[0];
    const resultProduct = await api
      .get(`${productsUrl}/${searchedProduct.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    searchedProduct.category = searchedProduct.category.toString(); //we delivery as string
    expect(resultProduct.body.content).toStrictEqual(searchedProduct);
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
    const contents = productsAtEnd.map((product) => product.title);
    expect(productsAtEnd).toHaveLength(initialProducts.length + 1);
    expect(contents).toContain('New product');
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
    console.log('model', model);
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

  test('with invalid data', async () => {
    const newproduct = {
      bla: 6262,
    };
    await api.post(productsUrl).send(newproduct).expect(400);
    const productsAtEnd = await productsInDb();
    expect(productsAtEnd).toHaveLength(initialProducts.length);
  });
});

afterAll(async () => {
  await connection.close();
});
