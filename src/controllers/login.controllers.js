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
      res.json({message:result.msg, error: result.error})
      // next(httpError(result.message, result.status));
    } else {
      res.json({ success: true , authToken: result.token });
    }
  } catch (e) {
    res.json({error:true, message: e})
    // next(httpError(e.message, statusCodes.SERVER_ERROR));
  }
};

const logout = async (req, res, next) => {
  try {
    res.json({ success: true });
  } catch (e) {
    next(httpError(e.message, statusCodes.SERVER_ERROR));
  }
};

const loginlist = async (req, res, next) => {
  try {
      const { body} = req;
      const result = await loginService.getList(body);
      if (result.error) {
        next(httpError(result.message, result.status));
      } else {
        res.json({ success: true, data: result.data});
      }
    } catch (e) {
      next(httpError(e.message, statusCodes.SERVER_ERROR));
    }
};

module.exports = {
  login,
  logout,
  loginlist
};
