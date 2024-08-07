import dotenv from 'dotenv';

dotenv.config();

const keys = {
  app: {
    name: 'ecommerce-api',
  },
  port: process.env.PORT || 3000,
  database: {
    production: process.env.MONGODB_URI,
    development: process.env.DEV_MONGODB_URI,
    test: process.env.TEST_MONGODB_URI,
  },
  env: process.env.NODE_ENV,
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: `${process.env.EXPIRES_IN} days`,
  },
};

export default keys;
