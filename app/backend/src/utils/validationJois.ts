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

const matchJoi = Joi.object({
  homeTeam: Joi.number().required().messages({
    'any.required': MISSING_FIELDS,
  }),
  awayTeam: Joi.number().required().messages({
    'any.required': MISSING_FIELDS,
  }),
  homeTeamGoals: Joi.number().required().messages({
    'any.required': MISSING_FIELDS,
  }),
  awayTeamGoals: Joi.number().required().messages({
    'any.required': MISSING_FIELDS,
  }),
  inProgress: Joi.boolean(),
});

export { loginJoi, matchJoi };
