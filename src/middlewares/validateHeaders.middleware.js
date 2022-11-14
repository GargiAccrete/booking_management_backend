const { statusCodes, requestHeaders } = require('../config/const.config');
const { getCurrentTimestamp } = require('../utils/date.util');
const httpError = require('../utils/httpError.util');

const validateHeaders = (req, res, next) => {
  const { headers } = req;

  // Check if required headers are present
  if (!(requestHeaders.CONTENT_TYPE.toLowerCase() in headers)) {
    const message = `${requestHeaders.CONTENT_TYPE} header missing.`;
    next(httpError(message, statusCodes.BAD_REQUEST));
    return;
  }
  if (!(requestHeaders.REQ_TIME.toLowerCase() in headers)) {
    const message = `${requestHeaders.REQ_TIME} header missing.`;
    next(httpError(message, statusCodes.BAD_REQUEST));
    return;
  }

  // Check if header values are correct
  if(!(req.originalUrl).includes("/upload") && !(req.originalUrl).includes("/multiupload")) {
    const contentType = headers[requestHeaders.CONTENT_TYPE.toLowerCase()];
    if (contentType !== 'application/json') {
      const message = `${requestHeaders.CONTENT_TYPE} header is invalid.`;
      next(httpError(message, statusCodes.BAD_REQUEST));
      return;
    }
  }

  const requestTime = Number(headers[requestHeaders.REQ_TIME.toLowerCase()]);
  const currentTime = getCurrentTimestamp();
  const diffInSeconds = Number(Math.ceil((currentTime - requestTime) / 1000));
  if (diffInSeconds > 10 || diffInSeconds < 0) {
    const message = 'Request rejected by server.';
    next(httpError(message, statusCodes.BAD_REQUEST));
    return;
  }

  next();
};

module.exports = validateHeaders;
