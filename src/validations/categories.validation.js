const Joi = require('joi');


const validateRegister = (data) => {
  let validData = {
    business_type:Joi.number().allow('').required(),
    legale_name:Joi.number().allow('').required(),
    barnd_associate:Joi.number().allow('').required(),
    address_line_1:Joi.number().allow('').required(),
    address_line_2:Joi.number().allow('').required(),
    city:Joi.string().required(),
    state:Joi.string().required(),
    pincode:Joi.number().required(),
    bussiness_area:Joi.string().number().required(),
    contact_no:Joi.number().required(),
    status:joi.number().required(),
    created_at:Joi.number().allow('').required(),
    created_by:Joi.number().required(),
    modified_at:Joi.number().allow('').required(),
    modified_by:Joi.number().required()
  };

  const schema = Joi.object(validData);

  const { error } = schema.validate(data);
  return error ? error.details[0].message : null;
};

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
  validateRegister,
  validateCategory,
  validateCategoryUpdate,
};
