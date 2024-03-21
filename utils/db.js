import mongoose from 'mongoose';
import logger from './logger.js';
import keys from '../config/keys.js';

const { database, env } = keys;

async function setupDb() {
  try {
    logger.info('Connecting to database..');
    mongoose.set('strictQuery', false);
    await mongoose.connect(database[env], {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //   useFindAndModify: false,
    });
    logger.info('Connected to MongoDB ✔');
  } catch (error) {
    logger.info('Error connecting to MongoDB:', error.message);
  }
}

export default setupDb;
