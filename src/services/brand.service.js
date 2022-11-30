const { statusCodes, dataStatusText, dataStatusValue, errorMessages, pageConfig, user_type } = require('../config/const.config');
const { convertTimestampToDate, getCurrentTimestamp } = require('../utils/date.util');
const brandModel = require('../models/brand.model');
const { loginToken } = require('../utils/jwtToken.util');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const SECRET_KEY = "USERADMINAPI";


const getList = async (data, info) => {
    const result = {
      error: false,
      data: {},
    };
  
    try {
      const qData = await brandModel.fetchAll(info);
      result.data = [];
      qData.data.forEach((data) => {
        result.data.push({
          id: data.id,
          name: data.name,
          status: data.status
        });
      });
  
    } catch (e) {
      result.error = true;
      result.status = statusCodes.SERVER_ERROR;
      result.message = e.message;
    }
    return result;
  };

  const create = async (data, params, info) => {
    const result = {
      error: false,
      data: {},
    };
   
    const {userId} = info;
    try {
      const qData = await brandModel.create({
        name:data.name,
        status: dataStatusValue.ACTIVE,
        created_at: getCurrentTimestamp(),
        created_by: userId,
        // modified_at: getCurrentTimestamp(),
        // modified_by: 0,
      });
      result.data = qData;
  
    } catch (e) {
      result.error = true;
      result.status = statusCodes.SERVER_ERROR;
      result.message = e.message;
    }
    return result;
  };
  

  module.exports = {
    getList,
    create
  };