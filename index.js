import express from "express";
import Product from "./product.js";

const app = express();

app.get("/api/products", (request, response) => {
  Product.find({}).then((notes) => {
    response.json(notes);
  });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
