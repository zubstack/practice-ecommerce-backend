import mongoose from 'mongoose';
import logger from '../utils/logger.js';
import customersData from '../data/customers.js';

const customerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: true,
  },
  phone_number: {
    type: String,
    unique: true,
    maxLength: 100,
  },
  name: {
    type: String,
    maxLength: 100,
  },
  lastname: {
    type: String,
    maxLength: 100,
  },
  address: {
    type: String,
    maxLength: 100,
  },

  shoppingCart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ShoppingCartItem',
    },
  ],
});

customerSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Customer = mongoose.model('Customer', customerSchema);

// (async () => {
//   try {
//     await Customer.deleteMany({});
//     const customerObjects = customersData.map((customer) => {
//       return new customer(customer);
//     });
//     const customersPromiseArray = customerObjects.map((customer) => customer.save());

//     await Promise.all(customersPromiseArray);
//     logger.info('Succesfully customers upload');
//   } catch (error) {
//     logger.error('Error: customers uploading failed \n', error.message);
//   }
// })();

export default Customer;
