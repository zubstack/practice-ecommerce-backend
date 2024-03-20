import dotenv from 'dotenv';

dotenv.config();

const keys = {
  app: {
    name: 'Basquet Ecommerce',
  },
  port: process.env.PORT || 3000,
  database: {
    production: process.env.MONGO_URI,
    development: process.env.DEV_MONGODB_URI,
    test: process.env.TEST_MONGODB_URI,
  },
  env: process.env.NODE_ENV,
};

export default keys;
