/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import mongoose from "mongoose";
import itemSchema from "./item.js";
import specificationsSchema from "./specifications.js";

const productSchema = new mongoose.Schema({
  item: itemSchema,
  specifications: specificationsSchema,
});

productSchema.pre("save", function (next) {
  if (!this.item || !this.specifications) {
    const error = new Error("Document incomplete");
    return next(error);
  }
  next();
  return undefined;
});

// Formating the received data:
productSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
