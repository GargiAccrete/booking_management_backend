const httpError = require('../utils/httpError.util');
const { getLoggedInUser, getTokenData } = require('../utils/jwtToken.util');
const { statusCodes, requestHeaders } = require('../config/const.config');
const registerService = require('../services/register.service');

const list = async (req, res, next) => {
    try {
     
        const { body} = req;
       
        const result = await registerService.getList(body);
    
        if (result.error) {
          next(httpError(result.message, result.status));
        } else {
          res.json({ success: true, data: result.data});
        }
      } catch (e) {
        next(httpError(e.message, statusCodes.SERVER_ERROR));
      }
};

const create = async (req, res, next) => {
  try {
    const { body,params} = req;
  const result = await registerService.create(body, params);
    
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
     
        const result = await registerService.viewById(body, params);
    
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
          res.json({error:true})
          // next(httpError(result.message, result.status));
        } else {
          res.json({ success: true });
        }
      } catch (e) {
        
        res.json({error:true})
        // next(httpError(e.message, statusCodes.SERVER_ERROR));
      }
    
};

const deleteById = async (req, res, next) => {
  try {
    
    const { body, params } = req;
    
    const result = await registerService.deleteById(body, params);

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
  deleteById
};