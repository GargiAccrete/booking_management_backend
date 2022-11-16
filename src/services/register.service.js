const { statusCodes, dataStatusText, dataStatusValue, errorMessages, pageConfig, user_type } = require('../config/const.config');
const { convertTimestampToDate, getCurrentTimestamp } = require('../utils/date.util');
const registreModel = require('../models/register.model')

const getList = async (data, info) => {
  const result = {
    error: false,
    data: {},
    // totalRows: '',
    // currentPage: '',
    // totalPages: '',
  };
  // const id = Number(info.queryData.id) || 0;  
  // const page = (info.queryData && info.queryData.page) ? info.queryData.page : "";
  try {
    console.log("inside service")
    const qData = await registreModel.fetchAll( info);

    result.data = [];
    qData.data.forEach((data) => {
      result.data.push({
        id: data.id,
       business_area:data.business_area_1,
       contact_no:data.contact_no,
       city:data.city,
       state:data.state,
        legal_name: data.legal_name,
        status: dataStatusText[data.status] || dataStatusText.NA,
        created: convertTimestampToDate(data.created_at)
      });
    });
    // result["totalRows"] = Number(qData.totalRows);
    // result["currentPage"] = Number(page);
    // result["totalPages"] = Number(Math.ceil(Number(qData.totalRows)/pageConfig.PROPERTY));
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
  
  try {
   
    const qData = await registreModel.create({
      business_type: data.business_type || 0,
      legal_name: data.name || 'aaaa',
      brand_associate: data.brand_associate || false,
      address_line_1 : data.address_line_1 || '',
      address_line_2 : data.address_line_2 || '',
      city: data.city || 'gandhinagar',
      state : data.state || 'gujrat',
      pincode: data.pincode || 0,
      business_area: data.business_area || 0,
      contact_no: data.contact_no || 0,
      status: dataStatusValue.ACTIVE,
      created_at: getCurrentTimestamp(),
      created_by: 0,
      modified_at: getCurrentTimestamp(),
      modified_by: 0,
    });    
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
    const qData = await registreModel.viewById(id);
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
  // const { userId } = info;

  // Validate request
  const validationError = validateCategoryUpdate(data);
  if (validationError) {
    result.error = true;
    result.status = statusCodes.BAD_REQUEST;
    result.message = `${errorMessages.BAD_REQUEST} ${validationError}`;
    return result;
  }

//   // Save data
  try {
    const qData = await registreModel.viewById(id);
    if (qData) {
      const parent_id = data.parent_id || null;
    
      const saveData = await registreModel.update(id, {
        name: data.name,
        modified_at: getCurrentTimestamp(),
        modified_by: userId,
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
  const id = Number(params.id) || 0;
  // const { userId } = info;

  // Save data
  try {
    const qData = await registreModel.viewById(id);
    if (qData) {
      const saveData = await registreModel.deleteById(id, {
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

module.exports = {
<<<<<<< HEAD
  getList,
  create,
  viewById,
  update,
 deleteById,
=======
   getList,
  create,
 viewById,
  // update,
   deleteById,
>>>>>>> 97dfbab997076a22dcc8eb07c97d8e4d3da5032b
};