import express from "express";
import Product from "./product.js";

const app = express();
app.use(express.json());

app.get("/api/products", (request, response) => {
  Product.find({}).then((notes) => {
    response.json(notes);
  });
});

app.post("/api/products", (request, response) => {
  const body = request.body;

  console.log(body);

  if (body === undefined) {
    return response.status(400).json({ error: "content missing" });
  }
  const product = new Product({
    price: body.price,
    brand: body.brand,
    categories: body.categories,
    images: body.images,
    name: body.name,
    weight: body.weight,
  });

  product.save().then((savedProduct) => {
    response.json("Data saved on db");
    console.log("POST", savedProduct);
  });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
