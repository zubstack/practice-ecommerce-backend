import express from "express";
import Product from "./product.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/api/products", (request, response) => {
  Product.find({}).then((products) => {
    response.json(products);
  });
});

// Error handling cases: Not found & Rejection from db
app.get("/api/products/:id", (request, response, next) => {
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
      // console.log(error);
      // // id must to have 12 characters.
      // response.status(400).send({ error: "malformatted id" });
      next(error);
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

app.delete("/api/products/:id", (request, response, next) => {
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

app.put("/api/products/:id", (request, response, next) => {
  const { id } = request.params;
  const body = request.body;
  // Use {new:true} to receive the updated version of this document
  Product.findByIdAndUpdate(id, body, { new: true })
    .then((updatedProduct) => {
      if (!updatedProduct) {
        response.status(404).end();
      }
      response.json(updatedProduct);
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

// handler of requests with unknown endpoint
app.use(unknownEndpoint);

// This function invokes the default error handler of express
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

// This has to be the last loaded middleware.
app.use(errorHandler);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
