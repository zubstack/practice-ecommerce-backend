import dotenv from "dotenv";

dotenv.config();

// process.env is an object with all the keys:
const { PORT, DATABASE_URL } = process.env;
export default { PORT, DATABASE_URL };
