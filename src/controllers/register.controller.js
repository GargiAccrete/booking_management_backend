const httpError = require('../utils/httpError.util');
const { getLoggedInUser, getTokenData } = require('../utils/jwtToken.util');
const { statusCodes, requestHeaders } = require('../config/const.config');
const registerService = require('../services/register.service');

const list = async (req, res, next) => {
    try {
        const { body, params } = req;
       
        const result = await registerService.getList(body, params);
    
        if (result.error) {
          next(httpError(result.message, result.status));
        } else {
          res.json({ success: true, data: result.data, totalRows: result.totalRows, currentPage: result.currentPage, totalPages: result.totalPages });
        }
      } catch (e) {
        next(httpError(e.message, statusCodes.SERVER_ERROR));
      }
};

const create = async (req, res, next) => {


  try {
    const headerToken = req.headers[requestHeaders.REQ_AUTH.toLowerCase()];
    const tokenData = getTokenData(headerToken);
    const { body, params } = req;
    const info = {
      userId: tokenData.userId || null,
      user_type: tokenData.user_type || null,
    };
    const result = await categoriesService.create(body, params, info);

    if (result.error) {
      next(httpError(result.message, result.status));
    } else {
      res.json({ success: true });
    }
  } catch (e) {
    next(httpError(e.message, statusCodes.SERVER_ERROR));
  }
};

const viewById = async (req, res, next) => {
    try {
       
        const { body, params } = req;
     
        const result = await categoriesService.viewById(body, params);
    
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
        const { body, params } = req;
       
        const result = await registerService.update(body, params);
    
        if (result.error) {
          next(httpError(result.message, result.status));
        } else {
          res.json({ success: true });
        }
      } catch (e) {
        next(httpError(e.message, statusCodes.SERVER_ERROR));
      }
    
};

const deleteById = async (req, res, next) => {
    try {
       
        const { body, params } = req;
      
        const result = await registerService.deleteById(body, params,);
    
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
  list,
  create,
  viewById,
  update,
  deleteById,
};