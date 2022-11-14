// HTTP status codes
const statusCodes = {
  OK: 200,
  CREATED: 201,
  EMPTY_OK: 204,
  BAD_REQUEST: 400,
  UNAUTHORISED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

// API common error messages
const errorMessages = {
  BAD_REQUEST: 'Bad request.',
  UNAUTHORISED: 'Unauthorised access. Please login to your account.',
  FORBIDDEN: 'You are not authorised to make this request.',
  NOT_FOUND: 'Endpoint not found.',
  RESOURCE_NOT_FOUND: 'Resource not found.',
  SERVER_ERROR: 'Something went wrong, please try again later.',
  UNAUTHORISED_ACCESS: 'You are not Authorised to access this resource. ',
};

// Status values
const dataStatusValue = {
  ACTIVE: 1,
  INACTIVE: 0,
  DELETED: 2,
};
const dataStatusText = {
  ACTIVE: 'Active',
  1: 'Active',
  INACTIVE: 'Inactive',
  0: 'Inactive',
  DELETED: 'Deleted',
  2: 'Deleted',
  NA: 'Unknown',
};

// API request headers
const requestHeaders = {
  CONTENT_TYPE: 'Content-Type',
  REQ_TIME: 'X-Req-Time',
  REQ_AUTH: 'X-Auth-Token',
};

const pageConfig = {
  DEFAULT: 10,
  USERS: 10,
  PROPERTY: 10,
};

const user_type = {
  ADMIN: 1,
  CUSTOMER: 2,
};

module.exports = {
  statusCodes,
  errorMessages,
  dataStatusValue,
  dataStatusText,
  requestHeaders,
  pageConfig,
  user_type,
};
