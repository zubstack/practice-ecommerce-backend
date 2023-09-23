import express from "express";
import Product from "../models/product.js";
import logger from "../utils/logger.js";

const productsRouter = express.Router();

productsRouter.get("/", async (request, response) => {
  const products = await Product.find({});
  response.json(products);
});

// Error handling cases: Not found & Rejection from db
productsRouter.get("/:id", async (request, response, next) => {
  const { id } = request.params;
  try {
    const product = await Product.findOne({ _id: id });
    if (product) {
      response.json(product);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

productsRouter.post("/", async (request, response, next) => {
  try {
    const { body } = request;

    // logger.info(body);
    if (body === undefined) {
      return response.status(400).json({ error: "content missing" });
    }
    const product = new Product({
      item: body.item,
      specifications: body.specifications,
    });
    const savedProduct = await product.save();
    response.status(201).json("Data saved on db");
    logger.info("POST", savedProduct);
  } catch (error) {
    next(error);
  }

  return undefined;
});

productsRouter.delete("/:id", async (request, response, next) => {
  const { id } = request.params;
  try {
    const result = await Product.findByIdAndRemove(id);
    if (!result) {
      response.status(404).end();
    }
    response.status(204).end();
  } catch (error) {
    next(error);
  }
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
