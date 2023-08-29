import mongoose from "mongoose";
import dotenv from "dotenv";

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
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
