import mongoose from 'mongoose';
import logger from '../utils/logger.js';
import usersData from '../data/users.js';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    maxLength: 100,
  },
  name: {
    firstname: {
      type: String,
      maxLength: 50,
    },
    lastname: {
      type: String,
      maxLength: 50,
    },
  },
  address: {
    city: String,
    street: String,
    number: Number,
    zipcode: String,
    geolocation: {
      lat: String,
      long: String,
    },
  },
  password: {
    type: String,
    required: true,
  },
  phone: String,
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const User = mongoose.model('User', userSchema);

// (async () => {
//   try {
//     await User.deleteMany({});
//     const userObjects = usersData.map((user) => {
//       return new User(user);
//     });
//     const usersPromiseArray = userObjects.map((user) => user.save());

//     await Promise.all(usersPromiseArray);
//     logger.info('Succesfully users upload');
//   } catch (error) {
//     logger.error('Error: users uploading failed \n', error.message);
//   }
// })();

export default User;
