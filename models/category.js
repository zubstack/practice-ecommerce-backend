import mongoose from 'mongoose';
import logger from '../utils/logger.js';
import categoriesData from '../data/categories.js';

const categorySchema = new mongoose.Schema({
  category_name: {
    type: String,
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
});

categorySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Category = mongoose.model('category', categorySchema);

// (async () => {
//   try {
//     await Category.deleteMany({});
//     const CategoryObjects = categoriesData.map(
//       (category) => new Category(category)
//     );
//     const promiseArray = CategoryObjects.map((category) => category.save());
//     await Promise.all(promiseArray);
//     logger.info('Succesfully categories upload');
//   } catch (error) {
//     logger.error('Error: categories uploading failed \n', error.message);
//   }
// })();

export default Category;
