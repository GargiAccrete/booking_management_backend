const Joi = require('joi');

// Validate login
const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(data);
  return error ? error.details[0].message : null;
};

// Validate update profile
const validateUpdateProfile = (data) => {
  const schema = Joi.object();

  const { error } = schema.validate(data);
  return error ? error.details[0].message : null;
};

// Validate change password
const validateChangePassword = (data) => {
  const schema = Joi.object({
    current_password: Joi.string().required(),
    password: Joi.string().required(),
    confirm_password: Joi.string().required().valid(Joi.ref('password')),
  });

  const { error } = schema.validate(data);
  return error ? error.details[0].message : null;
};

const validateForgotPassword = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
  });

  const { error } = schema.validate(data);
  return error ? error.details[0].message : null;
};

const validateResetPassword = (data) => {
  const schema = Joi.object({
    password: Joi.string().required(),
    confirm_password: Joi.string().required(),
    id: Joi.number().allow('').optional(),
    token: Joi.string().allow('').optional(),
  });

  const { error } = schema.validate(data);
  return error ? error.details[0].message : null;
};

module.exports = {
  validateLogin,
  validateUpdateProfile,
  validateChangePassword,
  validateForgotPassword,
  validateResetPassword,
};
