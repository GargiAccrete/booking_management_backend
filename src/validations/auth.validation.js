const Joi = require('joi');

const validateUserlogin = (data) => {
  const schema = Joi.object({
    name:Joi.string().alphanum().min(3).max(30).required(),
    contact:joi.string().length(10).pattern(/^[0-9]+$/).required(),
  });

  const { error } = schema.validate(data);
  return error ? error.details[0].message : null;
};


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
  validateUserlogin,
  validateLogin,
  validateUpdateProfile,
  validateChangePassword,
  validateForgotPassword,
  validateResetPassword,
};
