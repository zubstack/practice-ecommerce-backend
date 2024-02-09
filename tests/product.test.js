import { connection } from 'mongoose';
import supertest from 'supertest';
import app from '../app.js';
import Product from '../models/product.js';
import { initialProducts, productsInDb } from './test_helper.js';

beforeEach(async () => {
  await Product.deleteMany({});
  const productObjects = initialProducts.map((product) => new Product(product));
  const promiseArray = productObjects.map((product) => product.save());
  await Promise.all(promiseArray);
});

const api = supertest(app);
const productsUrl = '/api/v1/products';

describe('when there is initially some products saved', () => {
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

  test('a specific product is within the returned products', async () => {
    const response = await api.get(productsUrl);
    const contents = response.body.map((product) => product.name);
    expect(contents).toContain('Speed X');
  });
});

describe('viewing a specific product', () => {
  // Check if an specific product is received from API
  test('succeeds with a valid id', async () => {
    const productsToStart = await productsInDb();

    const searchedProduct = productsToStart[0];
    const resultProduct = await api
      .get(`${productsUrl}/${searchedProduct.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(resultProduct.body).toStrictEqual(searchedProduct);
  });

  test('fails with statuscode 404 if product does not exist', async () => {
    const non_existing_id = '650463c9bd4b2f3c6ca05c2e';
    await api.get(`${productsUrl}/${non_existing_id}`).expect(404);
  });
  test('fails with statuscode 400 if id is invalid', async () => {
    const invalidId = 'invalid-id';
    await api.get(`${productsUrl}/${invalidId}`).expect(400);
  });
});

describe('addition of a new product', () => {
  test('succeeds with valid data', async () => {
    const newProduct = {
      name: 'Harden Vol 7 - Grey',
      brand: 'adidas',
      variants: [
        {
          variant_name: 'default',
          size: ['39', '42', '43', '43,5', '44', '47,5'],
          price: 135,
          images: [
            'https://static.basketballstore.net/image/cache/catalog/basketball%20store/scarpe/basket/adidas/IE9257-adidas-harden-vol-7-grey-scarpe-basket-0-638x638.jpg',
          ],
        },
      ],
      available: true,
      description:
        'The adidas Harden Vol. 7 basketball shoe is the seventh signature installment from the Philadelphia Seventy Sixers star.From his lethal stepback to his love of luxury fashion, there is no doubt that James Harden has style both on and off the court. With his new signature adidas Basketball shoes, it all comes into play. The upper takes inspiration from the bold look of his flashy down jackets, and the details support his explosive movements on the court. A hybrid BOOST and Lightstrike midsole provides lightweight energy while the outsole pattern supports every jump, cut or change of direction giving you maximum traction.',
      details: [
        'BOOST midsole',
        'Lightstrike cushioning',
        'Lace-up closure',
        'Textile upper',
        'Regular fit',
        'Rubber outsole',
        'Weight: 474gr (9US)',
      ],
    };

    await api
      .post(productsUrl)
      .send(newProduct)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const productsAtEnd = await productsInDb();
    const contents = productsAtEnd.map((product) => product.name);

    expect(productsAtEnd).toHaveLength(initialProducts.length + 1);
    expect(contents).toContain('Harden Vol 7 - Grey');
  });

  test('fails with status code 400 if data invalid', async () => {
    const newproduct = {
      bla: 6262,
    };

    await api.post(productsUrl).send(newproduct).expect(400);

    const productsAtEnd = await productsInDb();

    expect(productsAtEnd).toHaveLength(initialProducts.length);
  });
});

describe('deletion of a product', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const productsToStart = await productsInDb();
    const { id } = productsToStart[0];

    await api.delete(`${productsUrl}/${id}`).expect(204);
    await api.get(`${productsUrl}/${id}`).expect(404);

    const productsAtEnd = await productsInDb();
    const ids = productsAtEnd.map((product) => product.id);

    expect(ids).not.toContain(id);
  });
});

afterAll(async () => {
  await connection.close();
});
