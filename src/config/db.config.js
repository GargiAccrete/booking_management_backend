const util = require('util');
const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

connection.connect((error) => {
  if (error) throw error;
});

connection.query = util.promisify(connection.query);

module.exports = connection;
