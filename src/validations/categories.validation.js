const Joi = require('joi');

// Validate 
const validateCategory = (data) => {
  let validData = {
    parent_id: Joi.number().allow('').optional(),
    property_id: Joi.number().required(),
    name: Joi.string().required(),
  };

  const schema = Joi.object(validData);

  const { error } = schema.validate(data);
  return error ? error.details[0].message : null;
};

const validateCategoryUpdate = (data) => {
  let validData = {
    parent_id: Joi.number().allow('').optional(),
    property_id: Joi.number().required(),
    name: Joi.string().required(),
  };

  const schema = Joi.object(validData);

  const { error } = schema.validate(data);
  return error ? error.details[0].message : null;
};

module.exports = {
  validateCategory,
  validateCategoryUpdate,
};
