const { statusCodes, dataStatusText, dataStatusValue, errorMessages, pageConfig, user_type } = require('../config/const.config');
const { convertTimestampToDate, getCurrentTimestamp } = require('../utils/date.util');
const categoryModel = require('../models/categories.model');
const { validateCategory, validateCategoryUpdate } = require('../validations/categories.validation');

const getList = async (data, params, info) => {
  const result = {
    error: false,
    data: {},
    totalRows: '',
    currentPage: '',
    totalPages: '',
  };
  const property_id = Number(info.queryData.property_id) || 0;  
  const page = (info.queryData && info.queryData.page) ? info.queryData.page : "";
  try {
    const qData = await categoryModel.fetchAll(page, info, property_id);

    result.data = [];
    qData.data.forEach((data) => {
      result.data.push({
        id: data.id,
        parent_id: data.parent_id || "",
        name: data.name,
        status: dataStatusText[data.status] || dataStatusText.NA,
        created: convertTimestampToDate(data.created_at)
      });
    });
    result["totalRows"] = Number(qData.totalRows);
    result["currentPage"] = Number(page);
    result["totalPages"] = Number(Math.ceil(Number(qData.totalRows)/pageConfig.PROPERTY));
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
  const { userId } = info;
  
  // Validate request
  const validationError = validateCategory(data);
  if (validationError) {
    result.error = true;
    result.status = statusCodes.BAD_REQUEST;
    result.message = `${errorMessages.BAD_REQUEST} ${validationError}`;
    return result;
  }
  
  // Save data
  try {
    //Check duplicate
    const parent_id = data.parent_id || null;
    const duplicateData = await categoryModel.checkCategoryByName(data.name, data.property_id, parent_id);
    if (duplicateData) {
      result.error = true;
      result.status = statusCodes.BAD_REQUEST;
      result.message = `${errorMessages.BAD_REQUEST} Folder name already exists!`;
      return result;
    }
    const qData = await categoryModel.create({
      property_id: data.property_id,
      parent_id: parent_id,
      name: data.name,
      status: dataStatusValue.ACTIVE,
      created_at: getCurrentTimestamp(),
      modified_at: getCurrentTimestamp(),
      modified_by: userId,
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
    const qData = await categoryModel.viewById(id, info);
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

const update = async (data, params, info) => {
  const result = {
    error: false,
    data: {},
  };
  const id = Number(params.id) || 0;
  const { userId } = info;

  // Validate request
  const validationError = validateCategoryUpdate(data);
  if (validationError) {
    result.error = true;
    result.status = statusCodes.BAD_REQUEST;
    result.message = `${errorMessages.BAD_REQUEST} ${validationError}`;
    return result;
  }

  // Save data
  try {
    const qData = await categoryModel.viewById(id, info);
    if (qData) {
      const parent_id = data.parent_id || null;
      const duplicateData = await categoryModel.checkCategoryByName(data.name, data.property_id, parent_id, id);
      if (duplicateData) {
        result.error = true;
        result.status = statusCodes.BAD_REQUEST;
        result.message = `${errorMessages.BAD_REQUEST} Folder name already exists!`;
        return result;
      }
      const saveData = await categoryModel.update(id, {
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

const deleteById = async (data, params, info) => {
  const result = {
    error: false,
    data: {},
  };
  const id = Number(params.id) || 0;
  const { userId } = info;

  // Save data
  try {
    const qData = await categoryModel.viewById(id, info);
    if (qData) {
      const saveData = await categoryModel.deleteById(id, {
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




module.exports = {
  getList,
  create,
  viewById,
  update,
  deleteById,
};