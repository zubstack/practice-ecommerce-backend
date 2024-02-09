/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';
import variantsSchema from './variant.js';
import productsData from '../data/products.js';
import logger from '../utils/logger.js';
import Category from './category.js';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 5,
    maxLength: 100,
    required: true,
  },
  brand: {
    type: String,
    minLength: 2,
    maxLength: 100,
    required: true,
  },
  variants: [variantsSchema],
  available: {
    type: Boolean,
    required: true,
  },
  description: {
    type: String,
    minLength: 5,
    required: true,
  },
  details: [String],
  categorory_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Each product must to specify its category'],
  },
});

// Formating the received data:
productSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Product = mongoose.model('Product', productSchema);

// (async () => {
//   try {
//     await Product.deleteMany({});
//     const categories = await Category.find({});
//     const firstCategory = categories[0];
//     const productObjects = productsData.map((product) => {
//       product.categorory_id = firstCategory._id.toString();
//       return new Product(product);
//     });
//     const productsPromiseArray = productObjects.map((product) =>
//       product.save()
//     );
//     productObjects.map((product) => {
//       firstCategory.products = firstCategory.products.concat(product._id);
//     });
//     await firstCategory.save();
//     await Promise.all(productsPromiseArray);
//     logger.info('Succesfully products upload');
//   } catch (error) {
//     logger.error('Error: products uploading failed \n', error.message);
//   }
// })();

export default Product;
