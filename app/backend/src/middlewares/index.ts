import * as bcryptjs from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import Joi = require('joi');
import Model from '../repository/user.repository';

const UserModel = new Model();

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const loginJoi = Joi.object({
    email: Joi.string().email().required().messages({
      'any.required': 'All fields must be filled',
      'string.email': 'Incorrect email or password',
    }),
    password: Joi.string().required().messages({
      'any.required': 'All fields must be filled',
    }),
  });

  const { error } = loginJoi.validate(req.body);

  return error
    ? res.status(error.message.includes('filled') ? 400 : 401).json({ message: error.message })
    : next();
};

const validateHash = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password: reqPass } = req.body;

  const { password: userPass } = await UserModel.login(email);

  const valid = await bcryptjs.compare(reqPass, userPass);

  if (!valid) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }

  next();
};

export { validateLogin, validateHash };
