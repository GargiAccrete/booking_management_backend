const { statusCodes, dataStatusText, dataStatusValue, errorMessages, pageConfig, user_type } = require('../config/const.config');
const { convertTimestampToDate, getCurrentTimestamp } = require('../utils/date.util');
const loginModel = require('../models/login.model');
const { validateUserlogin } = require('../validations/auth.validation');
const bcrypt = require('bcrypt')

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

	// try {
	// 	const user_id = data.id || "";
	// 	const token = data.token || "";
	// 	if (user_id && token) {
	// 	  const qData = await userModel.viewById(user_id);
	// 	  if (qData) {
	// 		const tData = await userTokenModel.viewById(user_id, token);
	// 		if (tData) {
	// 		  const new_password = await bcrypt.hash(data.password, 12);
	// 		  const updatePassword = await userModel.updatePasswordById(user_id, {
	// 			password: new_password,
	// 			modified_at: getCurrentTimestamp(),
	// 			modified_by: user_id,
	// 		  });
	// 		  if (updatePassword) {
	// 			const deleteData = await userTokenModel.deleteByUserId(user_id, {
	// 			  modified_at: getCurrentTimestamp(),
	// 			  modified_by: user_id,
	// 			});
	// 		  }
	// 		  result.message = 'Password reset successfully!';
	// 		}
	// 	  } else {
	// 		result.error = true;
	// 		result.status = statusCodes.BAD_REQUEST;
	// 		result.message = 'Invalid link or expired!';
	// 	  }
	// 	} else {
	// 	  result.error = true;
	// 	  result.status = statusCodes.BAD_REQUEST;
	// 	  result.message = 'Invalid link or expired!';
	// 	} 
	//   } catch (e) {
	// 	result.error = true;
	// 	result.status = statusCodes.SERVER_ERROR;
	// 	result.message = e.message;
	//   }
	//   return result;
	// };
	// try {
	// 	const qData = await loginModel.checkUserbyEmail(data.email);
	// 	if (qData) {
	// 	  const validPass = await bcrypt.compare(data.password, qData.password);
	// 	  if (validPass) {
	// 		const userName = `${qData.Name}`;
	// 		result.data.token = loginToken(qData.id, userName);
	// 		result.data.userName = userName;
	// 		// result.data.user_type = qData.user_type;    
	// 	  } else {
	// 		result.error = true;
	// 		result.status = statusCodes.BAD_REQUEST;
	// 		result.message = 'Invalid credentials.';
	// 	  }  
	// 	} else {
	// 	  result.error = true;
	// 	  result.status = statusCodes.BAD_REQUEST;
	// 	  result.message = 'Invalid credentials.';
	// 	}
	//   } catch (e) {
	// 	result.error = true;
	// 	result.status = statusCodes.SERVER_ERROR;
	// 	result.message = e.message;
	//   }
	//   return result;
	// };
	
  
	try {
		const qData = await loginModel.login({
			name:data.name,
			contact:data.contact,
			// password:await bcrypt.hash(data.password,8),
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