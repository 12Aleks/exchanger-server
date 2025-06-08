import * as Joi from 'joi';

export const validationSchema = Joi.object({
  PORT: Joi.number().required(),
  CLIENT_URL: Joi.string().uri().required(),
  API_NBP_HISTORY_RATE: Joi.string().uri().required(),
  API_NBP_RATE: Joi.string().uri().required(),
  API_NBP_GOLD: Joi.string().uri().required(),
  API_NBP_RATE_YESTERDAY: Joi.string().uri().required(),
});
