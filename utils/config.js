import dotenv from "dotenv";

dotenv.config();

// process.env is an object with all the keys:
const { PORT } = process.env;
// eslint-disable-next-line operator-linebreak
const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

export default { PORT, MONGODB_URI };
