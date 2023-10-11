import { connection } from "mongoose";
import supertest from "supertest";
import app from "../app.js";
import Product from "../models/product.js";
import { initialProducts, productsInDb } from "./test_helper.js";

// With the following we assure to test the DB with the exact content every time:
beforeEach(async () => {
  await Product.deleteMany({});

  const productObjects = initialProducts.map((product) => new Product(product));
  const promiseArray = productObjects.map((product) => product.save());
  // We will transform an array of promises into a unique one.
  await Promise.all(promiseArray);
});

const api = supertest(app);

describe("when there is initially some products saved", () => {
  test("products are returned as json", async () => {
    await api
      .get("/api/products")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
  test("all products are returned", async () => {
    const response = await api.get("/api/products");

    expect(response.body).toHaveLength(initialProducts.length);
  });

  test("a specific product is within the returned products", async () => {
    const response = await api.get("/api/products");
    const contents = response.body.map((product) => product.item.name);
    expect(contents).toContain("Techgamer Mechanical Keyboard");
  });
});

describe("viewing a specific product", () => {
  // Check if an specific product is received from API
  test("succeeds with a valid id", async () => {
    const productsToStart = await productsInDb();

    const searchedProduct = productsToStart[0];
    const resultProduct = await api
      .get(`/api/products/${searchedProduct.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(resultProduct.body).toStrictEqual(searchedProduct);
  });

  test("fails with statuscode 404 if product does not exist", async () => {
    const missingId = "650463c9bd4b2f3c6ca05c2e";
    await api.get(`/api/products/${missingId}`).expect(404);
  });
  test("fails with statuscode 400 if id is invalid", async () => {
    const invalidId = "invalid-id";
    await api.get(`/api/products/${invalidId}`).expect(400);
  });
});

describe("addition of a new note", () => {
  test("succeeds with valid data", async () => {
    const newProduct = {
      item: {
        name: "Marcio Tech Keyboard",
        brand: "Marvo",
        model: "XG-550",
        description:
          "A high-performance mechanical gaming keyboard with customizable RGB backlighting and programmable macro keys.",
        price: 35,
        availability: "In Stock",
        rating: 4,
        image_url:
          "https://images.unsplash.com/photo-1688966861542-600082fc6172?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjV8fGNvbXB1dGVyJTIwa2V5Ym9hcmRzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      },
      specifications: {
        keyboard_type: "Mechanical",
        switch_type: "Cherry MX Red",
        backlighting: "RGB",
        connectivity: "Wired (USB)",
        layout: "QWERTY",
        dimensions: "17.2 x 6.8 x 1.5 inches",
        weight: "2.2 pounds",
        additional_features: ["Detachable wrist rest", "Volume control wheel"],
        shipping_information: "Free standard shipping (5-7 business days)",
      },
    };

    await api
      .post("/api/products")
      .send(newProduct)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const productsAtEnd = await productsInDb();
    const contents = productsAtEnd.map((product) => product.item.name);

    expect(productsAtEnd).toHaveLength(initialProducts.length + 1);
    expect(contents).toContain("Marcio Tech Keyboard");
  });

  test("fails with status code 400 if data invalid", async () => {
    const newproduct = {
      bla: 6262,
    };

    await api.post("/api/products").send(newproduct).expect(400);

    const productsAtEnd = await productsInDb();

    expect(productsAtEnd).toHaveLength(initialProducts.length);
  });
});

describe("deletion of a note", () => {
  // Check if an specific product is deleted from API
  test("succeeds with status code 204 if id is valid", async () => {
    const productsToStart = await productsInDb();
    const { id } = productsToStart[0];

    await api.delete(`/api/products/${id}`).expect(204);
    await api.get(`/api/products/${id}`).expect(404);

    const productsAtEnd = await productsInDb();
    const ids = productsAtEnd.map((product) => product.id);

    expect(ids).not.toContain(id);
  });
});

afterAll(async () => {
  await connection.close();
});
