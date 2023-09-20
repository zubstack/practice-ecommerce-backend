import { connection } from "mongoose";
import supertest from "supertest";
import app from "../app.js";
import Product from "../models/product.js";

const initialProducts = [
  {
    item: {
      name: "Techgamer Mechanical Keyboard",
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
  },
];

// With the following we assure to test the DB with the exact content every time:
beforeEach(async () => {
  await Product.deleteMany({});
  const productObject = new Product(initialProducts[0]);
  await productObject.save();
});

const api = supertest(app);

test("products are returned as json", async () => {
  await api
    .get("/api/products")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("a specific product is within the returned products", async () => {
  const response = await api.get("/api/products");
  const contents = response.body.map((product) => product.item.name);
  expect(contents).toContain("Techgamer Mechanical Keyboard");
});

test("a valid product can be added", async () => {
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

  const response = await api.get("/api/products");

  const contents = response.body.map((product) => product.item.name);

  expect(response.body).toHaveLength(initialProducts.length + 1);
  expect(contents).toContain("Marcio Tech Keyboard");
});

afterAll(async () => {
  await connection.close();
});
