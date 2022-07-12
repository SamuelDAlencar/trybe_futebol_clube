import jwt = require('jsonwebtoken');
import { TUser } from '../types';

const SECRET = process.env.JWT_SECRET;

const jwtConfig = {
  algorithm: 'HS256',
};

const generateJwt = (payload: TUser) => {
  const token = jwt.sign({ data: payload }, SECRET as string, jwtConfig as object);

  return token;
};

export default generateJwt;
