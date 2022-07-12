import * as jwt from 'jsonwebtoken';
import * as bcryptjs from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import Joi = require('joi');
import Model from '../repository/user.repository';

const MISSING_FIELDS = 'All fields must be filled';
const INCORRECT_FIELDS = 'Incorrect email or password';
const secret = process.env.JWT_SECRET;

const UserModel = new Model();

// Jois  --------------------------------------
const loginJoi = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': MISSING_FIELDS,
    'string.email': INCORRECT_FIELDS,
    'string.empty': MISSING_FIELDS,
  }),
  password: Joi.string().required().messages({
    'any.required': MISSING_FIELDS,
    'string.empty': MISSING_FIELDS,
  }),
});
// ---------------------------------------

const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { error } = loginJoi.validate(req.body);

  if (error) {
    return res.status(error.message.includes('filled') ? 400 : 401)
      .json({ message: error.message });
  }

  const { email, password: reqPass } = req.body;

  const user = await UserModel.findOneByEmail(email);

  if (!user) {
    return res.status(401).json({ message: INCORRECT_FIELDS });
  }

  const valid = await bcryptjs.compare(reqPass, user.password);

  if (!valid) {
    return res.status(401).json({ message: INCORRECT_FIELDS });
  }

  next();
};

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization as string;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoding = jwt.verify(token as string, secret as string) as jwt.JwtPayload;

    const user = await UserModel.findOneByEmail(decoding.data.email);

    if (!user) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  } catch (err) {
    console.log(err);

    return res.status(401).json({ message: 'Invalid or expired token' });
  }

  next();
};

export { validateLogin, validateToken };
