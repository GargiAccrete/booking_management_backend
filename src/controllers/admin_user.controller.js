const httpError = require('../utils/httpError.util');
const { statusCodes, requestHeaders } = require('../config/const.config');
const AdminUserService = require('../services/admin_user.service');


// const listMapStateData = async (req, res, next) => {
//   try {
   
//       const { body} = req;
//       const result = await registerService.getListMapStateData(body);
  
//       if (result.error) {
//         next(httpError(result.message, result.status));
//       } else {
//         res.json({ success: true, data: result.data});
//       }
//     } catch (e) {
//       next(httpError(e.message, statusCodes.SERVER_ERROR));
//     }
// };

// const listCity = async (req, res, next) => {
//   try {
//       const { body} = req;
//       const result = await registerService.getListMapCityData(body);
  
//       if (result.error) {
//         next(httpError(result.message, result.status));
//       } else {
//         res.json({ success: true, data: result.data});
//       }
//     } catch (e) {
//       next(httpError(e.message, statusCodes.SERVER_ERROR));
//     }
// };


const list = async (req, res, next) => {
    try {
     
        const { body} = req;
       
        const result = await AdminUserService.getAdminUserList(body);
    
        if (result.error) {
          next(httpError(result.message, result.status));
        } else {
          res.json({ success: true, data: result.data});
        }
      } catch (e) {
        next(httpError(e.message, statusCodes.SERVER_ERROR));
      }
};

const create = async (req, res, next) => {
  try {
    const { body,params} = req;
  const result = await AdminUserService.create(body, params);
    
    if (result.error) {
      next(httpError(result.message, result.status));
    } else {
      res.json({ success: true });
    }
  } catch (e) {
    next(httpError(e.message, statusCodes.SERVER_ERROR));
  }
};

const viewById = async (req, res, next) => {
    try {
       
        const { body, params } = req;
     
        const result = await AdminUserService.viewById(body, params);
    
        if (result.error) {
          next(httpError(result.message, result.status));
        } else {
          res.json({ success: true, data: result.data });
        }
      } catch (e) {
        next(httpError(e.message, statusCodes.SERVER_ERROR));
      }
    
};


const update = async (req, res, next) => {
    try {
        const { body, params } = req;
       
        const result = await AdminUserService.update(body, params);
    
        if (result.error) {
          res.json({error:true})
          // next(httpError(result.message, result.status));
        } else {
          res.json({ success: true });
        }
      } catch (e) {
        
        res.json({error:true})
        // next(httpError(e.message, statusCodes.SERVER_ERROR));
      }
    
};

const deleteById = async (req, res, next) => {
  try {
    
    const { body, params } = req;
    
    const result = await AdminUserService.deleteById(body, params);

        if (result.error) {
          next(httpError(result.message, result.status));
        } else {
          res.json({ success: true });
        }
      } catch (e) {
        next(httpError(e.message, statusCodes.SERVER_ERROR));
      }
  
};




module.exports = {
//   listCity,
//   listMapStateData,
list,
create,
viewById,
update,
deleteById
};