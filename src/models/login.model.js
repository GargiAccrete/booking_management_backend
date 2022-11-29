const { dataStatusValue } = require('../config/const.config');
const dbConnection = require('../config/db.config');
// const { dataStatusValue, pageConfig, user_type } = require('../config/const.config');

const tableName = 'admin_user';

const login = async (data) => {
  console.log(data);
  const query = `INSERT INTO ${tableName} 
              (email, password, status, created_at, created_by, modified_at, modified_by) 
              VALUES (?, ?, ?, ?, ?, ?,?)`;
  const params = [
    data.email,
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

const checkUserbyId = async (id) => {
  const query = `SELECT 
                id, password 
                FROM ${tableName} 
                WHERE id = ? AND status = ?`;
  const params = [id, dataStatusValue.ACTIVE];
  const qData = await dbConnection.query(query, params);
  return qData[0] || null;
};

const checkUserbyEmail = async (email) => {
  const query = `SELECT 
                  id, Email AS email, password,name
                FROM ${tableName} 
                WHERE email = ? AND status != ?`;
  const params = [email, dataStatusValue.DELETED];
  const qData = await dbConnection.query(query, params);
  return qData || null;
};

const fetchAll = async (data) => {
  const query = `SELECT email, password FROM ${tableName} WHERE status !=?`
  const qData = {
    data: [],
    totalRows: '',
  };

  const params = [dataStatusValue.DELETED];
  const resultData = await dbConnection.query(query, params);
  qData['data'] = resultData || [];
  return qData;
};

module.exports = {
  login,
  checkUserbyEmail,
  checkUserbyId,
  fetchAll
};