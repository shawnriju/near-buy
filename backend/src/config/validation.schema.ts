import * as Joi from 'joi';

export const validationSchema = Joi.object({
  // JWT
  JWT_SECRET: Joi.string().required().min(32),
  JWT_ACCESS_EXPIRY: Joi.string().default('15m'),
  JWT_REFRESH_EXPIRY: Joi.string().default('7d'),
  JWT_ISSUER: Joi.string().default('ecommerce-api'),

  // Database
  DATABASE_URL: Joi.string().required(),

  // Optional (if added later)
  //NODE_ENV: Joi.string().valid('development', 'production', 'test'),
  //PORT: Joi.number(),
});