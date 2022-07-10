import * as bcryptjs from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import Joi = require('joi');
import Model from '../repository/user.repository';

const MISSING_FIELDS = 'All fields must be filled';
const INCORRECT_FIELDS = 'Incorrect email or password';

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

  const user = await UserModel.login(email);

  if (!user) {
    return res.status(401).json({ message: INCORRECT_FIELDS });
  }

  const valid = await bcryptjs.compare(reqPass, user.password);

  if (!valid) {
    return res.status(401).json({ message: INCORRECT_FIELDS });
  }

  next();
};

export { validateLogin };
