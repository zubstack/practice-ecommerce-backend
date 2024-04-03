import Mongoose, { model } from 'mongoose';

const { Schema } = Mongoose;

const CartSchema = new Schema(
  {
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
        },
        quantity: Number,
        totalPrice: {
          type: Number,
          default: 0,
        },
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const Cart = model('Cart', CartSchema);

export default Cart;
