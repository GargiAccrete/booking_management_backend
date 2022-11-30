const httpError = require('../utils/httpError.util');
const { statusCodes, requestHeaders } = require('../config/const.config');
const barndService = require('../services/brand.service');
const { getLoggedInUser, getTokenData, userData } = require('../utils/jwtToken.util');


const list = async (req, res, next) => {
  try {
    // let authToken = req.headers['auth-token']
    // const info = await userData(authToken)
    const { body,params } = req;
    const result = await barndService.getList(body);

    if (result.error) {
      next(httpError(result.message, result.status));
    } else {
      res.json({ success: true, data: result.data });
    }
  } catch (e) {
    next(httpError(e.message, statusCodes.SERVER_ERROR));
  }
};

const create = async (req, res, next) => {
  try {
    // let authToken = req.headers['auth-token']
    // const info = await userData(authToken)
    const { body, params } = req;
    const result = await barndService.create(body, params,info);
    if (result.error) {
      res.json({ message: result.msg, error: result.error })
    } else {
      res.json({ success: true });
    }
  } catch (e) {
    console.log(e);
    res.json({ error: true, message: e })
  }
};

module.exports = {
  list,
  create
};
