/* eslint-disable no-underscore-dangle */
import Product from "../models/product.js";
import User from "../models/user.js";

const initialProducts = [
  {
    item: {
      name: "Techgamer Mechanical Keyboard",
      brand: "Marvo",
      model: "XG-550",
      description:
        "A high-performance mechanical gaming keyboard with customizable RGB backlighting and programmable macro keys.",
      price: 35,
      availability: "In Stock",
      rating: 4,
      image_url:
        "https://images.unsplash.com/photo-1688966861542-600082fc6172?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjV8fGNvbXB1dGVyJTIwa2V5Ym9hcmRzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    },
    specifications: {
      keyboard_type: "Mechanical",
      switch_type: "Cherry MX Red",
      backlighting: "RGB",
      connectivity: "Wired (USB)",
      layout: "QWERTY",
      dimensions: "17.2 x 6.8 x 1.5 inches",
      weight: "2.2 pounds",
      additional_features: ["Detachable wrist rest", "Volume control wheel"],
      shipping_information: "Free standard shipping (5-7 business days)",
    },
  },
  {
    item: {
      name: "Marcio Special Keyboard",
      brand: "Marvo",
      model: "XG-550",
      description:
        "A high-performance mechanical gaming keyboard with customizable RGB backlighting and programmable macro keys.",
      price: 35,
      availability: "In Stock",
      rating: 4,
      image_url:
        "https://images.unsplash.com/photo-1688966861542-600082fc6172?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjV8fGNvbXB1dGVyJTIwa2V5Ym9hcmRzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    },
    specifications: {
      keyboard_type: "Mechanical",
      switch_type: "Cherry MX Red",
      backlighting: "RGB",
      connectivity: "Wired (USB)",
      layout: "QWERTY",
      dimensions: "17.2 x 6.8 x 1.5 inches",
      weight: "2.2 pounds",
      additional_features: ["Detachable wrist rest", "Volume control wheel"],
      shipping_information: "Free standard shipping (5-7 business days)",
    },
  },
];

// For creating a database object ID that does not belong to any note object in the database.
const nonExistingId = async () => {
  const product = new Product({ content: "willremovethissoon" });
  await product.save();
  await product.deleteOne();

  return product._id.toString();
};

// Checking the notes stored in the database
const productsInDb = async () => {
  const products = await Product.find({});
  return products.map((product) => product.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

export { initialProducts, productsInDb, nonExistingId, usersInDb };
