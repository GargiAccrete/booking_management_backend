const httpError = require('../utils/httpError.util');
const { statusCodes, requestHeaders } = require('../config/const.config');
const authService = require('../services/auth.service');
const { getTokenData } = require('../utils/jwtToken.util');

const login = async (req, res, next) => {
  try {
    const result = await authService.loginUser(req.body);

    if (result.error) {
      next(httpError(result.message, result.status));
    } else {
      res.json({ success: true, data: result.data });
    }
  } catch (e) {
    next(httpError(e.message, statusCodes.SERVER_ERROR));
  }
};

// const logout = async (req, res, next) => {
//   try {
//     res.json({ success: true });
//   } catch (e) {
//     next(httpError(e.message, statusCodes.SERVER_ERROR));
//   }
// };

// const resetPassword = async (req, res, next) => {
//   try {
//     const result = await authService.resetPassword(req.body);

//     if (result.error) {
//       next(httpError(result.message, result.status));
//     } else {
//       res.json({ success: true, data: result.data, message: result.message });
//     }
//   } catch (e) {
//     next(httpError(e.message, statusCodes.SERVER_ERROR));
//   }
// };

// const forgotPassword = async (req, res, next) => {
//   try {
//     const result = await authService.forgotPassword(req.body);

//     if (result.error) {
//       next(httpError(result.message, result.status));
//     } else {
//       res.json({ success: true, data: result.data });
//     }
//   } catch (e) {
//     next(httpError(e.message, statusCodes.SERVER_ERROR));
//   }
// };

// const changePassword = async (req, res, next) => {
//   try {
//     const headerToken = req.headers[requestHeaders.REQ_AUTH.toLowerCase()];
//     const tokenData = getTokenData(headerToken);
//     const { body, params } = req;
//     const info = {
//       userId: tokenData.userId || null,
//       user_type: tokenData.user_type || null,
//     };
//     const result = await authService.changePassword(body, params, info);

//     if (result.error) {
//       next(httpError(result.message, result.status));
//     } else {
//       res.json({ success: true });
//     }
//   } catch (e) {
//     next(httpError(e.message, statusCodes.SERVER_ERROR));
//   }
// };

module.exports = {
  login,
  // logout,
  // resetPassword,
  // forgotPassword,
  // changePassword,
};
