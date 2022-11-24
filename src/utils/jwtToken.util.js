const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

const loginToken = (userId, userName) => {
  const options = {
    expiresIn: '86400s',
  };
  const data = {
    userId,
    userName
  };
  return jwt.sign(data, process.env.SECRET_JWT, options);
};

// Generate jwt token
const signToken = (userId, userDisplayName, user_type) => {
  const options = {
    expiresIn: '86400s',
  };
  const data = {
    userId,
    userDisplayName,
    user_type
  };
  return jwt.sign(data, process.env.SECRET_JWT, options);
};

// Validate jwt token
const validateToken = (token, userId) => {
  try {
    const data = jwt.verify(token, process.env.SECRET_JWT);
    if (data.userId === userId) return false;
    return true;
  } catch (e) {
    return false;
  }
};

// Get user details from token
const getLoggedInUser = (token) => {
  const data = jwt.verify(token, process.env.SECRET_JWT);
  return data.userId || null;
};

const getLoggedInUserPolicyId = (token) => {
  const data = jwt.verify(token, process.env.SECRET_JWT);
  return data.access_policy || null;
};

const getTokenData = (token) => {
  const data = jwt.verify(token, process.env.SECRET_JWT);
  return data || null;
};

const getUserType = (token) => {
  const data = jwt.verify(token, process.env.SECRET_JWT);
  return data.user_type || null;
}


module.exports = {
  loginToken,
  signToken,
  validateToken,
  getLoggedInUser,
  getLoggedInUserPolicyId,
  getTokenData,
  getUserType
};
