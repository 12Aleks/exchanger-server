import * as Joi from 'joi';

export const validationSchema = Joi.object({
  PORT: Joi.number().required(),
  CLIENT_URL: Joi.string().uri().required(),
  API_KEY: Joi.string().required(),
  API_URL: Joi.string().uri().required(),
});
