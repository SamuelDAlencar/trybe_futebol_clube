import Joi = require('joi');

const MISSING_FIELDS = 'All fields must be filled';
const INCORRECT_FIELDS = 'Incorrect email or password';

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

export default loginJoi;
