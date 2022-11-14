const httpError = require('../utils/httpError.util');
const { statusCodes, requestHeaders } = require('../config/const.config');
const authService = require('../services/auth.service');
const { getTokenData } = require('../utils/jwtToken.util');


const credentials = {
  name:"admin",
  contact:"8888888888"
}

exports.login = (req,res) =>{
  if(req.body.name == credentials.name && req.body.contact == credentials.contact){
      res.redirect('/')
      // res.end("Login Successful")
  }else{
      res.end("Invalid Username")
  }
}

module.exports = {
  login
};