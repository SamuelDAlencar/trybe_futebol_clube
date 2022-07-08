import jwt = require('jsonwebtoken');
import Interfaces = require('../interfaces');

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  algorithm: 'HS256',
};

const generateJwt = (payload: Interfaces.ILogin) => {
  const token = jwt.sign({ data: payload }, secret as string, jwtConfig as object);

  return token;
};

export default generateJwt;
