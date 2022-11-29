const { statusCodes, dataStatusText, dataStatusValue, errorMessages, pageConfig, user_type } = require('../config/const.config');
const { convertTimestampToDate, getCurrentTimestamp } = require('../utils/date.util');
const loginModel = require('../models/login.model');
const { validateUserlogin } = require('../validations/auth.validation');
const bcrypt = require('bcrypt');
const { loginToken } = require('../utils/jwtToken.util');

const login = async (data, params) => {
	const result = {
	  error: false,
	  data: {},
	};
	const { email , password } = data
	try {
		const qData = await loginModel.checkUserbyEmail(email)
		let isMatch = await bcrypt.compare(password,qData[0].password)
		if(isMatch){
			result.success = 1;
      let token = await loginToken(qData[0].id,qData[0].email,qData[0].name)
      console.log(token);
      result.token = token
		} else{
			result.error = true;
			result.msg = 'Invalid user name or password'
		}
	} catch (error) {
		result.error = true;
	}
	return result;
  };

  const getList = async (data, params, info) => {
    const result = {
      error: false,
      data: {},
      totalRows: '',
      currentPage: '',
      totalPages: ''
  }

  try {
    const qData = await loginModel.fetchAll(info);
    result.data = [];
    qData.data.forEach((data) => {
      result.data.push({
        id: data.id,
        email:data.email,
        password:data.password,
        // status: dataStatusText[data.status] || dataStatusText.NA,
        // created: convertTimestampToDate(data.created_at)
      });
    });
  
  } catch (e) {
    result.error = true;
    result.status = statusCodes.SERVER_ERROR;
    result.message = e.message;
  }
  return result;
};

  module.exports = {
	login,
	getList
  };