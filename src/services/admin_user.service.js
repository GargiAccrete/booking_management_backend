const { statusCodes, dataStatusText, dataStatusValue, errorMessages, pageConfig, user_type } = require('../config/const.config');
const { convertTimestampToDate, getCurrentTimestamp } = require('../utils/date.util');
const AdminUserModel = require('../models/admin_user.model');
const { loginToken } = require('../utils/jwtToken.util');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

// var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
// console.log(token);

const getListMapStateData = async (data, info) => {
  const result = {
    error: false,
    data: {},
  };

  try {
    const qData = await AdminUserModel.fetchAllMapStatedata(info);
    result.data = [];
    qData.data.forEach((data) => {
      result.data.push({
        id: data.id,
        name:data.name,
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

const getListMapCityData = async (data,params) => {
  console.log(params);
  const result = {
    error: false,
    data: {},
  };

   const state_id = Number(params.state_id)

  try {
    const qData = await AdminUserModel.fetchAllMapCitydata(state_id,params);
    result.data = [];
   
    qData.data.forEach((data) => {
      result.data.push({
        id: data.id,
        state_id:data.state_id,
        city:data.city,
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






const getAdminUserList = async (data, info) => {
  const result = {
    error: false,
    data: {},
  };

  try {
    const qData = await AdminUserModel.fetchAlladminUser(info);
    result.data = [];
    qData.data.forEach((data) => {
      result.data.push({
        id: data.id,
        name: data.name,
        email: data.email,
        // password:data.password,
        designation: data.designation,
        is_super_admin:data.is_super_admin,
        status:data.status,
        // created_at:data.created_at,
        // created_by:data.created_by,
        // modified_at:data.modified_at,
        // modified_by:data.modified_by
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

const create = async (data, params) => {
  
  const result = {
    error: false,
    data: {},
  };
  // const validationError = validateRegister(data);
  // if (validationError) {
  //   result.error = true;
  //   result.status = statusCodes.BAD_REQUEST;
  //   result.message = `${errorMessages.BAD_REQUEST} ${validationError}`;
  //   return result;
  // }
  try {
    // const salt =await bcrypt.genSalt(10);
    // const secPass = await bcrypt.hash(data.password,salt) ;
    // value = await bcrypt.hash(value,salt)
    const qData = await AdminUserModel.create({
      name: data.name,
      email: data.email,
      password: await bcrypt.hash(data.password,8),
      designation: data.designation,
      is_super_admin: data.is_super_admin,
      status: dataStatusValue.ACTIVE,
      created_at: getCurrentTimestamp(),
      created_by: 0,
      // modified_at: getCurrentTimestamp(),
      // modified_by: 0,
    });

    // const result = await bcrypt.compare(data.password,hash);
    
    // const jwtData=jwt.sign(data,jwt_secret);
    // console.log(jwtData);
    result.data = qData;

  } catch (e) {
    result.error = true;
    result.status = statusCodes.SERVER_ERROR;
    result.message = e.message;
  }
  
  return result;
};

const viewById = async (data, params, info) => {
  const result = {
    error: false,
    data: {},
  };
  const id = Number(params.id) || 0;
  // Get data
  try {
    const qData = await AdminUserModel.viewById(id);
    if (qData) {
      qData.status = dataStatusText[qData.status] || dataStatusText.NA,
        qData.created_at = convertTimestampToDate(qData.created_at);
      result.data = qData;
    } else {
      result.error = true;
      result.status = statusCodes.NOT_FOUND;
      result.message = `${errorMessages.RESOURCE_NOT_FOUND}`;
    }
  } catch (e) {
    result.error = true;
    result.status = statusCodes.SERVER_ERROR;
    result.message = e.message;
  }
  return result;
};

const update = async (data, params) => {
  const result = {
    error: false,
    data: {},
  };
  const id = Number(params.id) || 0;
  //Validate request
  //const validationError = validateRegisterUpdate(data);
  // if (validationError) {
  //   result.error = true;
  //   result.status = statusCodes.BAD_REQUEST;
  //   result.message = `${errorMessages.BAD_REQUEST} ${validationError}`;
  //   return result;
  // }

  //   // Save data
  try {
    const qData = await AdminUserModel.viewById(id);
    if (qData) {

      const saveData = await AdminUserModel.update(id, {
        name:data.name,
        email:data.email,
        // password:data.password,
        designation: data.designation,
        is_super_admin: data.is_super_admin,
        modified_at: getCurrentTimestamp(),
        modified_by: 0,
      });
      result.data = saveData;
    } else {
      result.error = true;
      result.status = statusCodes.NOT_FOUND;
      result.message = `${errorMessages.RESOURCE_NOT_FOUND}`;
    }
  } catch (e) {
    result.error = true;
    result.status = statusCodes.SERVER_ERROR;
    result.message = e.message;
  }

  return result;
};

const deleteById = async (data, params) => {
  const result = {
    error: false,
    data: {},
  };
  const id = Number(params.id);
  // Save data
  try {
    const qData = await AdminUserModel.viewById(id);
    if (qData) {
      const saveData = await AdminUserModel.deleteById(id, {
        modified_at: getCurrentTimestamp(),
        modified_by: id,
      });
      result.data = saveData;
    } else {
      result.error = true;
      result.status = statusCodes.NOT_FOUND;
      result.message = `${errorMessages.RESOURCE_NOT_FOUND}`;
    }
  } catch (e) {
    result.error = true;
    result.status = statusCodes.SERVER_ERROR;
    result.message = e.message;
  }
  return result;
};

const loginUser = async (data) => {
  const result = {
    error: false,
    data: {},
  };

  // Validate request
  // const validationError = validateLogin(data);
  // if (validationError) {
  //   result.error = true;
  //   result.status = statusCodes.BAD_REQUEST;
  //   result.message = `${errorMessages.BAD_REQUEST} ${validationError}`;
  //   return result;
  // }
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
    const qData = await AdminUserModel.checkUserbyEmail(data.email);
    if (qData) {
      const validPass = await bcrypt.compare(data.password, qData.password);
      if (validPass) {
        const displayName = `${qData.name}`;
        result.data.token = loginToken(qData.id, displayName);
        result.data.displayName = displayName;   
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




module.exports = {
getListMapStateData,
getListMapCityData,
loginUser,
getAdminUserList,
create,
viewById,
update,
deleteById,
};