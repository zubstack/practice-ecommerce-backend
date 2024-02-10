/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */

import mongoose from 'mongoose';

const variantsSchema = new mongoose.Schema({
  variant_name: {
    type: String,
    maxLength: 100,
    required: true,
  },
  size: [String],

  price: {
    type: Number,
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not a valid integer.',
    },
    min: 1,
    max: 1000,
    required: true,
  },

  images: [String],
});

variantsSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default variantsSchema;
