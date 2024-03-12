import express from 'express';
import Customer from '../models/customer.model.js';
import customerService from '../services/customer.service.js';

const customersRouter = express.Router();
const service = new customerService();

customersRouter.get('/', async (request, response) => {
  const customers = await Customer.find({});
  const customersList = customers.map((customer) => customer.toJSON());
  response.json(customersList);
});

customersRouter.post('/', async (request, response) => {
  const { body } = request;
  const result = await service.create(body);
  response.status(201).json({ message: 'created', body: result });
});

customersRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const result = await Customer.findOneAndRemove({
    _id: id,
  });

  if (!result) {
    response.status(201).json('customer NOT_FOUND').end();
  } else {
    response.status(404).json(result).end();
  }
});

customersRouter.patch('/:id', async (request, response) => {
  const { id } = request.params;
  const { body } = request;
  const result = await service.update(id, body);
  return response.status(204).json(result);
});

export default customersRouter;
