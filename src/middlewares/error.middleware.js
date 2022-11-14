const { statusCodes } = require('../config/const.config');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const output = {
    error: true,
    message: err.message || '',
  };
  const httpStatusCode = err.status || statusCodes.SERVER_ERROR;

  return res.status(httpStatusCode).json(output);
};

module.exports = errorHandler;
