const bcrypt = require('bcryptjs');
const { validateLogin, validateForgotPassword, validateResetPassword, validateChangePassword } = require('../validations/auth.validation');
const { statusCodes, errorMessages, user_type, dataStatusValue } = require('../config/const.config');
const { signToken } = require('../utils/jwtToken.util');
const userModel = require('../models/users.model');
const userTokenModel = require('../models/usertokens.model');
const crypto = require("crypto");
const { getCurrentTimestamp } = require('../utils/date.util');
const {sendEmail}  = require ('../utils/Email.util');

const loginUser = async (data) => {
  const result = {
    error: false,
    data: {},
  };

  // Validate request
  const validationError = validateLogin(data);
  if (validationError) {
    result.error = true;
    result.status = statusCodes.BAD_REQUEST;
    result.message = `${errorMessages.BAD_REQUEST} ${validationError}`;
    return result;
  }
//   try{
//     const qData = await userModel.checkbyName(data.name);
//     if (qData){
//       const validName = await (data.name,qData.name);
//       if(validName){
//         const displayName = `${qData.name} ${qData.contact}`;
//         result.data.displayName = displayName;
//       }else {
//         result.error = true;
//         result.status = statusCodes.BAD_REQUEST;
//         result.message = 'Invalid credentials.';
//       }  
//     } else {
//       result.error = true;
//       result.status = statusCodes.BAD_REQUEST;
//       result.message = 'Invalid credentials.';
//     }
//   } catch (e) {
//     result.error = true;
//     result.status = statusCodes.SERVER_ERROR;
//     result.message = e.message;
//   }

//   return result;
// };

  // Check if user exists
  try {
    const qData = await userModel.checkUserbyEmail(data.email);
    if (qData) {
      const validPass = await bcrypt.compare(data.password, qData.password);
      if (validPass) {
        const displayName = `${qData.firstName} ${qData.lastName}`;
        result.data.token = signToken(qData.id, displayName, qData.user_type);
        result.data.displayName = displayName;
        result.data.user_type = qData.user_type;    
      } else {
        result.error = true;
        result.status = statusCodes.BAD_REQUEST;
        result.message = 'Invalid credentials.';
      }  
    } else {
      result.error = true;
      result.status = statusCodes.BAD_REQUEST;
      result.message = 'Invalid credentials.';
    }
  } catch (e) {
    result.error = true;
    result.status = statusCodes.SERVER_ERROR;
    result.message = e.message;
  }

  return result;
};



const resetPassword = async (data) => {
  const result = {
    error: false,
    data: {},
  };  
  const validationError = validateResetPassword(data);
  if (validationError) {
    result.error = true;
    result.status = statusCodes.BAD_REQUEST;
    result.message = `${errorMessages.BAD_REQUEST} ${validationError}`;
    return result;
  }
  const confirmValidationError = (data.password != data.confirm_password) ? true : false;
  if (confirmValidationError) {
    result.error = true;
    result.status = statusCodes.BAD_REQUEST;
    result.message = 'Confirm password must be same as password!';
    return result;
  }

  try {
    const user_id = data.id || "";
    const token = data.token || "";
    if (user_id && token) {
      const qData = await userModel.viewById(user_id);
      if (qData) {
        const tData = await userTokenModel.viewById(user_id, token);
        if (tData) {
          const new_password = await bcrypt.hash(data.password, 12);
          const updatePassword = await userModel.updatePasswordById(user_id, {
            password: new_password,
            modified_at: getCurrentTimestamp(),
            modified_by: user_id,
          });
          if (updatePassword) {
            const deleteData = await userTokenModel.deleteByUserId(user_id, {
              modified_at: getCurrentTimestamp(),
              modified_by: user_id,
            });
          }
          result.message = 'Password reset successfully!';
        }
      } else {
        result.error = true;
        result.status = statusCodes.BAD_REQUEST;
        result.message = 'Invalid link or expired!';
      }
    } else {
      result.error = true;
      result.status = statusCodes.BAD_REQUEST;
      result.message = 'Invalid link or expired!';
    } 
  } catch (e) {
    result.error = true;
    result.status = statusCodes.SERVER_ERROR;
    result.message = e.message;
  }
  return result;
};

const forgotPassword = async (data) => {
  const result = {
    error: false,
    data: {},
  };
  // Validate request
  const validationError = validateForgotPassword(data);
  if (validationError) {
    result.error = true;
    result.status = statusCodes.BAD_REQUEST;
    result.message = `${errorMessages.BAD_REQUEST} ${validationError}`;
    return result;
  }
  try {
    const qData = await userModel.checkUserbyEmail(data.email);
    if (qData) {
      const user_id = qData.id;
      const token = crypto.randomBytes(32).toString("hex");
      const displayName = `${qData.firstName} ${qData.lastName}`;
      const saveData = await userTokenModel.create({
        user_id: user_id,
        token: token,
        status: dataStatusValue.ACTIVE,
        expired_at: getCurrentTimestamp() + (24*60*60),
        created_at: getCurrentTimestamp(),
        modified_at: getCurrentTimestamp(),
        modified_by: user_id,
      }); 

      if (saveData) {
        //This link will be sent to user using email
        const link = `${process.env.FRONTEND_APP_URL}/reset-password/${user_id}/${token}`;
        const emailData={
          "to": data.email,
          "subject": "MastaHomes - Password reset link",
          "html":`<html><h3>Greetings from MastaHomes!</h3><h5><a href="${link}">Click here!</a> to reset your password.</h5></html>`
        }  
        sendEmail(emailData);
      }

    } else {
      result.error = false;
      result.message = 'Reset password link sent to your email address successfully!';
    }
  } catch (e) {
    result.error = true;
    result.status = statusCodes.SERVER_ERROR;
    result.message = e.message;
  }

  return result;
};

const changePassword = async (data, params, info) => {
  const result = {
    error: false,
    data: {},
  };
  const { userId } = info;
  
  // Validate request
  const validationError = validateChangePassword(data, true);
  if (validationError) {
    result.error = true;
    result.status = statusCodes.BAD_REQUEST;
    result.message = `${errorMessages.BAD_REQUEST} ${validationError}`;
    return result;
  }

  try {
    const qData = await userModel.checkUserbyId(userId);
    if (qData) {
      const validPass = await bcrypt.compare(data.current_password, qData.password);
      if (!validPass) {
        result.error = true;
        result.status = statusCodes.BAD_REQUEST;
        result.message = 'Current password not match!';
        return result;
      }
      const new_password = await bcrypt.hash(data.password, 12);
      const updatePassword = await userModel.updatePasswordById(userId, {
        password: new_password,
        modified_at: getCurrentTimestamp(),
        modified_by: userId,
      });
      result.message = 'Password reset successfully!';
    }  else {
      result.error = true;
      result.status = statusCodes.BAD_REQUEST;
      result.message = 'Resource not found!';
    }
  } catch (e) {
    result.error = true;
    result.status = statusCodes.SERVER_ERROR;
    result.message = e.message;
  }
  return result;
}
module.exports = {
  loginUser,
  resetPassword,
  forgotPassword,
  changePassword,
};
