import Joi from 'joi';

const email = Joi.string().email().required().max(100);
const firstname = Joi.string().max(50);
const lastname = Joi.string().max(50);
const city = Joi.string();
const street = Joi.string();
const number = Joi.number();
const zipcode = Joi.string();
const lat = Joi.string();
const long = Joi.string();
const password = Joi.string().required();
const phone = Joi.string();

const createUserSchema = Joi.object({
  email: email.required(),
  name: Joi.object({
    firstname: firstname,
    lastname: lastname,
  }),
  address: Joi.object({
    city: city,
    street: street,
    number: number,
    zipcode: zipcode,
    geolocation: Joi.object({
      lat: lat,
      long: long,
    }),
  }),
  password: password.required(),
  phone: phone,
});

export { createUserSchema };
