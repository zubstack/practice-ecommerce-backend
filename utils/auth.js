import boom from '@hapi/boom';
import jwt from 'jsonwebtoken';
import keys from '../config/keys.js';
import User from '../models/user.model.js';

const { jwt: jwtKeys } = keys;

const authValidator = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer')) {
    throw boom.unauthorized('Unauthorized');
  }
  try {
    const token = authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, jwtKeys.secret);
    req.user = await User.findById(decodedToken.id);
    if (!req.user) throw Error('invalid token');
    next();
  } catch (error) {
    throw boom.unauthorized(`Unauthorized: ${error.message}`);
  }
};

export default authValidator;
