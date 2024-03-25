import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';
import keys from './config/keys.js';
import { unknownEndpoint, errorHandler } from './utils/middleware.js';
import routerApi from './routes/index.js';
import setupDb from './utils/db.js';

const app = express();

const { env } = keys;

setupDb();

const whitelist = ['http://localhost:5173'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('No access allowed for this client'));
    }
  },
};

app.use(cors(options));
app.use(express.json());

if (env !== 'test') {
  app.use(morgan('dev'));
}

routerApi(app);

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
