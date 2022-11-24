const dbConnection = require('../config/db.config');
// const { dataStatusValue, pageConfig, user_type } = require('../config/const.config');

const tableName = 'usersdata';

const login = async (data) => {
  console.log(data);
  const query = `INSERT INTO ${tableName} 
              (name, contact, password, status, created_at, created_by, modified_at, modified_by) 
              VALUES (?, ?, ?, ?, ?, ?,?)`;
  const params = [
     data.name,
     data.contact,
    // data.email,
    data.password,
    data.status,
    data.created_at,
    data.created_by,
    data.modified_at,
    data.modified_by
  ];

  const qData = await dbConnection.query(query, params);
  return qData.insertId || null;
};

// const checkUserbyEmail = async (email) => {
//   const query = `SELECT 
//                   id, name AS Name,password 
//                 FROM ${tableName} 
//                 WHERE email = ? AND status = ?`;
//   const params = [email, dataStatusValue.ACTIVE];
//   const qData = await dbConnection.query(query, params);
//   return qData[0] || null;
// };

const checkUserbyId = async (id) => {
  const query = `SELECT 
                id, password 
                FROM ${tableName} 
                WHERE id = ? AND status = ?`;
  const params = [id, dataStatusValue.ACTIVE];
  const qData = await dbConnection.query(query, params);
  return qData[0] || null;
};



module.exports = {
  login,
  // checkUserbyEmail,
  checkUserbyId

  
};