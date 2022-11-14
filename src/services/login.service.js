const bcrypt = require('bcryptjs');
const { validateLogin, validateForgotPassword, validateResetPassword, validateChangePassword } = require('../validations/auth.validation');
const { statusCodes, errorMessages, user_type, dataStatusValue } = require('../config/const.config');
const { signToken } = require('../utils/jwtToken.util');
const userModel = require('../models/users.model');
const userTokenModel = require('../models/usertokens.model');
const crypto = require("crypto");
const { getCurrentTimestamp } = require('../utils/date.util');
const {sendEmail}  = require ('../utils/Email.util');
const { request } = require('http');


const login = async (data) => {
	let name = request.body.name;
	let contact = request.body.contact;
	// let password = request.body.password;
	// Ensure the input fields exists and are not empty
	if (name==admin && contact==8888888888) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query('SELECT * FROM userdata WHERE name = ? AND contact = ?', [name, contact], function(error, results, fields) {
			
			if (error) throw error;
			
			if (results > 0) {
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or contact!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter value');
		response.end();
	}
};

module.exports = {
	login,
	// resetPassword,
	// forgotPassword,
	// changePassword,
  };
  