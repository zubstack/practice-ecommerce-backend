import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import keys from './config/keys.js';
import logger from './utils/logger.js';
import { unknownEndpoint, errorHandler } from './utils/middleware.js';
import routerApi from './routes/index.js';

const app = express();

const { env, database } = keys;

mongoose.set('strictQuery', false);

logger.info('Connecting to database..');

mongoose
  .connect(database[env])
  .then(() => {
    logger.info('Connected to MongoDB ✔');
  })
  .catch((error) => {
    logger.info('Error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.json());

if (env !== 'test') {
  app.use(morgan('dev'));
}

routerApi(app);

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
