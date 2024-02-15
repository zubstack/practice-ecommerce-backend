import mongoose from 'mongoose';

const productsOrderSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  variant_name: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema({
  products: [productsOrderSchema], //The product an their quantity
  order_total: {
    type: Number,
    required: true,
  },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  order_status: {
    type: String,
    required: true,
  }, // pending, delivering, done
});

orderSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Order = mongoose.model('order', orderSchema);

// (async () => {
//   await Order.deleteMany({});
//   console.log('Successfuly orders updating');
// })();

export default Order;
