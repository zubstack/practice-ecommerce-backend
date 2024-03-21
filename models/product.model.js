import mongoose from 'mongoose';
// import Category from './category.model.js';
// import initialProducts from '../data/products.js';
// import logger from '../utils/logger.js';

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 5,
    maxLength: 100,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Each product must to specify its category'],
  },
  description: {
    type: String,
    minLength: 5,
    required: true,
  },
  image: {
    type: String,
    required: true,
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
//     const productObjects = initialProducts.map((product) => {
//       product.category = firstCategory._id;
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
