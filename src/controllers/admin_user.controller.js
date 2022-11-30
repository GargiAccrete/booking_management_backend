const httpError = require('../utils/httpError.util');
const { statusCodes, requestHeaders } = require('../config/const.config');
const AdminUserService = require('../services/admin_user.service');
const { getLoggedInUser, getTokenData, userData } = require('../utils/jwtToken.util');


const listMapStateData = async (req, res, next) => {
  try {
    const { body, params } = req;
    const result = await AdminUserService.getListMapStateData(body, params);
    if (result.error) {
      next(httpError(result.message, result.status));
    } else {
      res.json({ success: true, data: result.data });
    }
  } catch (e) {
    next(httpError(e.message, statusCodes.SERVER_ERROR));
  }
};

const listCity = async (req, res, next) => {
  try {
    const { body, params } = req;
    const result = await AdminUserService.getListMapCityData(body, params);
    if (result.error) {
      next(httpError(result.message, result.status));
    } else {
      res.json({ success: true, data: result.data });
    }
  } catch (e) {
    next(httpError(e.message, statusCodes.SERVER_ERROR));
  }
};

const list = async (req, res, next) => {
  try {
    // let authToken = req.headers['auth-token']
    // const info = await userData(authToken)
    const { body,params } = req;
    const result = await AdminUserService.getAdminUserList(body);

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
    let authToken = req.headers['auth-token']
    const info = await userData(authToken)
    const { body, params } = req;
    const result = await AdminUserService.create(body, params, info);
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

const viewById = async (req, res, next) => {
  try {
    let authToken = req.headers['auth-token']
    const info = await userData(authToken)
    const { body, params } = req;
    const result = await AdminUserService.viewById(body, params, info);
    if (result.error) {
      next(httpError(result.message, result.status));
    } else {
      res.json({ success: true, data: result.data });
    }
  } catch (e) {
    next(httpError(e.message, statusCodes.SERVER_ERROR));
  }
};

const update = async (req, res, next) => {
  try {
    let authToken = req.headers['auth-token']
    const info = await userData(authToken)
    const { body, params } = req;
    const result = await AdminUserService.update(body, params, info);
    if (result.error) {
      res.json({ error: true })
    } else {
      res.json({ success: true });
    }
  } catch (e) {
    res.json({ error: true })
  }
};

const deleteById = async (req, res, next) => {
  try {
    let authToken = req.headers['auth-token']
    const info = await userData(authToken)
    const { body, params } = req;
    const result = await AdminUserService.deleteById(body, params, info);
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
  listCity,
  listMapStateData,
  list,
  create,
  viewById,
  update,
  deleteById
};