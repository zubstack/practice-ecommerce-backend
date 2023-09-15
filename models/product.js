/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */

import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  item: Object,
  specifications: Object,
});
// price: Number,
//   brand: {
//     type: String,
//     minLength: 2,
//     required: true,
//   },
//   categories: {
//     type: String,
//     minLength: 5,
//     required: true,
//   },
//   images: Array,
//   name: {
//     type: String,
//     minLength: 5,
//     required: true,
//   },
//   weight: String,
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
