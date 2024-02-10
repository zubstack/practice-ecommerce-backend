import logger from './logger.js';

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

// This function invokes the default error handler of express
const errorHandler = (error, request, response, next) => {
  logger.error(error.message);
  if (error.isBoom) {
    const { output } = error;
    return response.status(output.statusCode).json(output.payload);
  }
  if (error.message === 'Document incomplete') {
    return response.status(400).send({ error: 'document incomplete' });
  }
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
  return undefined;
};

export default { unknownEndpoint, errorHandler };
