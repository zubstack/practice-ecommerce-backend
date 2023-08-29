import mongoose from "mongoose";
import dotenv from "dotenv";
import crypto from "crypto";

//UTILS

function generateRandomHash() {
  return crypto.randomBytes(16).toString("hex");
}

dotenv.config();

const url = process.env.DATABASE_URL;

console.log("Connecting to", url);

mongoose.set("strictQuery", false);
mongoose
  .connect(url)
  .then((result) => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error.message);
  });

const productSchema = new mongoose.Schema({
  price: Number,
  brand: String,
  categories: String,
  images: Array,
  name: String,
  weight: String,
});

//Formating the received data:

productSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = generateRandomHash();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
