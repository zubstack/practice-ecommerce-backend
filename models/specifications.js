/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import mongoose from "mongoose";

const specificationsSchema = new mongoose.Schema({
  keyboard_type: {
    type: String,
    minLength: 5,
    maxLength: 100,
    required: true,
  },
  switch_type: {
    type: String,
    minLength: 5,
    maxLength: 100,
    required: true,
  },
  backlighting: {
    type: String,
    maxLength: 100,
    required: true,
  },
  connectivity: {
    type: String,
    minLength: 5,
    maxLength: 100,
    required: true,
  },
  layout: {
    type: String,
    minLength: 5,
    maxLength: 100,
    required: true,
  },
  dimensions: {
    type: String,
    minLength: 5,
    maxLength: 100,
    required: true,
  },
  weight: {
    type: String,
    minLength: 5,
    maxLength: 100,
    required: true,
  },
  additional_features: Array,
  shipping_information: {
    type: String,
    minLength: 5,
    maxLength: 100,
    required: true,
  },
});

specificationsSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default specificationsSchema;
