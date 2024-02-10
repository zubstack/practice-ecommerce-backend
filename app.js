import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './utils/config.js';
import logger from './utils/logger.js';
import { unknownEndpoint, errorHandler } from './utils/middleware.js';
import routerApi from './routes/index.js';
import morgan from 'morgan';

const app = express();

mongoose.set('strictQuery', false);

logger.info('Connecting to database..');

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB ✔');
  })
  .catch((error) => {
    logger.info('Error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.json());

if (config.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

routerApi(app);

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
