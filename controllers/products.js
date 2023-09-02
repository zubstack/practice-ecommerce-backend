import express from "express";
import Product from "../models/product.js";

const productsRouter = express.Router();

productsRouter.get("/", (request, response) => {
  Product.find({}).then((products) => {
    response.json(products);
  });
});

// Error handling cases: Not found & Rejection from db
productsRouter.get("/:id", (request, response, next) => {
  const { id } = request.params;
  Product.findOne({ _id: id })
    .then((product) => {
      if (product) {
        response.json(product);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      // // Good pratice: log the faulty object that caused this error
      next(error);
    });
});

productsRouter.post("", (request, response, next) => {
  const { body } = request;

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

  product
    .save()
    .then((savedProduct) => {
      response.json("Data saved on db");
      console.log("POST", savedProduct);
    })
    .catch((error) => {
      next(error);
    });
  return undefined;
});

productsRouter.delete("/:id", (request, response, next) => {
  const { id } = request.params;

  Product.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        response.status(404).end();
      }
      response.status(204).end();
    })
    .catch((error) => {
      next(error);
    })
    .catch((error) => next(error));
});

productsRouter.put("/:id", (request, response, next) => {
  const { id } = request.params;
  const { body } = request;
  // Use {new:true} to receive the updated version of this document
  // Use {runValidators: true} because they doesn't run by default.
  Product.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedProduct) => {
      if (!updatedProduct) {
        response.status(404).end();
      }
      response.json(updatedProduct);
    })
    .catch((error) => next(error));
});

export default productsRouter;
