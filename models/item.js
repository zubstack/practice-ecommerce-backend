import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 5,
    maxLength: 30,
    required: true,
  },
  brand: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true,
  },
  model: {
    type: String,
    minLength: 5,
    maxLength: 30,
    required: true,
  },
  description: {
    type: String,
    minLength: 5,
    maxLength: 200,
    required: true,
  },
  price: {
    type: Number,
    min: 1,
    max: 1000,
    required: true,
  },
  availability: {
    type: String,
    minLength: 5,
    maxLength: 20,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  image_url: {
    type: String,
    minLength: 5,
    maxLength: 300,
    required: true,
  },
});

export default itemSchema;
