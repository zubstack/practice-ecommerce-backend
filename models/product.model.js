import mongoose from 'mongoose';

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

export default Product;
