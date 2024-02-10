import logger from './logger.js';
import boom from '@hapi/boom';

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const validatorHandler = (schema, property) => {
  return (request, response, next) => {
    const data = request[property];
    const { error } = schema.validate(data);
    if (error) {
      next(boom.badRequest(error.message));
    }
    next();
  };
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
  if (error.code === 11000) {
    return response.status(400).json({ error: error.message });
  }

  next(error);
  return undefined;
};

export { unknownEndpoint, errorHandler, validatorHandler };
