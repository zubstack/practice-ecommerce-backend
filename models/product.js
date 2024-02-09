/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';
import variantsSchema from './variant.js';
import productsData from '../data/products.js';
import logger from '../utils/logger.js';

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
});

// productSchema.pre('save', function (next) {
//   if (!this.item || !this.specifications) {
//     const error = new Error('Document incomplete');
//     return next(error);
//   }
//   next();
//   return undefined;
// });

// Formating the received data:
productSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Product = mongoose.model('Product', productSchema);

(async () => {
  try {
    await Product.deleteMany({});
    const productObjects = productsData.map((product) => new Product(product));
    const promiseArray = productObjects.map((product) => product.save());
    await Promise.all(promiseArray);
    logger.info('Succesfully products upload');
  } catch (error) {
    logger.error('Error: products uploading failed \n', error.message);
  }
})();

export default Product;
