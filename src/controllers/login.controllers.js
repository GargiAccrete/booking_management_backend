const httpError = require('../utils/httpError.util');
const { statusCodes, requestHeaders } = require('../config/const.config');
const authService = require('../services/auth.service');
const { getTokenData } = require('../utils/jwtToken.util');
const loginService = require('../services/login.service');


const login = async (req, res, next) => {
  try {
  const { body,params} = req;
  const result = await loginService.login(body, params);
    if (result.error) {
      next(httpError(result.message, result.status));
    } else {
      res.json({ success: true });
    }
  } catch (e) {
    next(httpError(e.message, statusCodes.SERVER_ERROR));
  }
};

module.exports = {
  login
};
