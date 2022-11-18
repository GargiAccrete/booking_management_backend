const { statusCodes, dataStatusText, dataStatusValue, errorMessages, pageConfig, user_type } = require('../config/const.config');
const { convertTimestampToDate, getCurrentTimestamp } = require('../utils/date.util');
const registerModel = require('../models/register.model')

const getListMapData = async (data, info) => {
  const result = {
    error: false,
    data: {},
  };

  try {
    const qData = await registerModel.fetchAllMapdata(info);
    result.data = [];
    qData.data.forEach((data) => {
      result.data.push({
        id: data.id,
        name:data.name,
        status: dataStatusText[data.status] || dataStatusText.NA,
        created: convertTimestampToDate(data.created_at)
      });
    });

  } catch (e) {
    result.error = true;
    result.status = statusCodes.SERVER_ERROR;
    result.message = e.message;
  }
  return result;
};

const getList = async (data, info) => {
  const result = {
    error: false,
    data: {},
  };

  try {
    const qData = await registerModel.fetchAll(info);
    result.data = [];
    qData.data.forEach((data) => {
      result.data.push({
        id: data.id,
        business_area: data.business_area_1,
        contact_no: data.contact_no,
        city: data.city,
        state: data.state,
        legal_name: data.legal_name,
        status: dataStatusText[data.status] || dataStatusText.NA,
        created: convertTimestampToDate(data.created_at)
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
  console.log(data);
  const result = {
    error: false,
    data: {},
  };
  const validationError = validateRegister(data);
  if (validationError) {
    result.error = true;
    result.status = statusCodes.BAD_REQUEST;
    result.message = `${errorMessages.BAD_REQUEST} ${validationError}`;
    return result;
  }

  try {
    const qData = await registerModel.create({
      business_type: data.business_type || 0,
      legal_name: data.legal_name,
      brand_associate: data.brand_associate || false,
      address_line_1: data.address_line_1 || '',
      address_line_2: data.address_line_2 || '',
      city: data.city,
      state: data.state,
      pincode: data.pincode,
      business_area: data.business_area || 0,
      contact_no: data.contact_no,
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
    const qData = await registerModel.viewById(id);
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
  const validationError = validateRegisterUpdate(data);
  if (validationError) {
    result.error = true;
    result.status = statusCodes.BAD_REQUEST;
    result.message = `${errorMessages.BAD_REQUEST} ${validationError}`;
    return result;
  }

  //   // Save data
  try {
    const qData = await registerModel.viewById(id);
    if (qData) {

      const saveData = await registerModel.update(id, {
        business_type: data.business_type,
        legal_name: data.legal_name,
        brand_associate: data.brand_associate,
        address_line_1: data.address_line_1,
        address_line_2: data.address_line_2,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
        business_area: data.business_area,
        contact_no: data.contact_no,
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
  const id = Number(params.id) || 0;

  // Save data
  try {
    const qData = await registerModel.viewById(id);
    if (qData) {
      const saveData = await registerModel.deleteById(id, {
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
  getListMapData,
  getList,
  create,
  viewById,
  update,
  deleteById,
};