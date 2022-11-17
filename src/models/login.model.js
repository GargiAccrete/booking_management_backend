const dbConnection = require('../config/db.config');
// const { dataStatusValue, pageConfig, user_type } = require('../config/const.config');

const tableName = 'usersdata';

const login = async (data) => {
  console.log(data);
  const query = `INSERT INTO ${tableName} 
              (name, contact,status, created_at, created_by, modified_at, modified_by) 
              VALUES (?, ?, ?, ?, ?, ?,?)`;
  const params = [
    data.name,
    data.contact,
    data.status,
    data.created_at,
    data.created_by,
    data.modified_at,
    data.modified_by
  ];

  const qData = await dbConnection.query(query, params);
  return qData.insertId || null;
};

module.exports = {
  login
};