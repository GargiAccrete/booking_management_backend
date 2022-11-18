const { statusCodes, dataStatusText, dataStatusValue, errorMessages, pageConfig, user_type } = require('../config/const.config');
const { convertTimestampToDate, getCurrentTimestamp } = require('../utils/date.util');
const loginModel = require('../models/login.model');
const { validateUserlogin } = require('../validations/auth.validation');


const login = async (data, params) => {
	const result = {
	  error: false,
	  data: {},
	};
	const validationError = validateUserlogin(data);
	if (validationError) {
	  result.error = true;
	  result.status = statusCodes.BAD_REQUEST;
	  result.message = `${errorMessages.BAD_REQUEST} ${validationError}`;
	  return result;
	}
  
	try {
		const qData = await loginModel.login({
			name:data.name,
			contact:data.contact,
			status: dataStatusValue.ACTIVE,
			created_at: getCurrentTimestamp(),
			created_by: 0,
			modified_at: getCurrentTimestamp(),
			modified_by: 0
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
	login
  };