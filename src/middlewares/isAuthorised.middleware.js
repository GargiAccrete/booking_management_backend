const {
  statusCodes,
  errorMessages,
  requestHeaders,
} = require('../config/const.config');
const httpError = require('../utils/httpError.util');
const { validateToken } = require('../utils/jwtToken.util');

const isAuthorised = (req, res, next) => {
  const { headers } = req;

  if (!(requestHeaders.REQ_AUTH.toLowerCase() in headers)) {
    const message = errorMessages.UNAUTHORISED;
    next(httpError(message, statusCodes.UNAUTHORISED));
    return;
  }

  const authToken = headers[requestHeaders.REQ_AUTH.toLowerCase()];
  if (!validateToken(authToken, null)) {
    const message = errorMessages.UNAUTHORISED;
    next(httpError(message, statusCodes.UNAUTHORISED));
    return;
  }

  next();
};

module.exports = isAuthorised;
