import app from './app.js';
import keys from './config/keys.js';
import logger from './utils/logger.js';

const { port } = keys;

app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});
