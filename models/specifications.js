import mongoose from "mongoose";

const specificationsSchema = new mongoose.Schema({
  keyboard_type: {
    type: String,
    minLength: 5,
    maxLength: 20,
    required: true,
  },
  switch_type: {
    type: String,
    minLength: 5,
    maxLength: 20,
    required: true,
  },
  backlighting: {
    type: String,
    maxLength: 20,
    required: true,
  },
  connectivity: {
    type: String,
    minLength: 5,
    maxLength: 30,
    required: true,
  },
  layout: {
    type: String,
    minLength: 5,
    maxLength: 20,
    required: true,
  },
  dimensions: {
    type: String,
    minLength: 5,
    maxLength: 40,
    required: true,
  },
  weight: {
    type: String,
    minLength: 5,
    maxLength: 20,
    required: true,
  },
  additional_features: Array,
  shipping_information: {
    type: String,
    minLength: 5,
    maxLength: 70,
    required: true,
  },
});

export default specificationsSchema;
