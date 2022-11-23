const dbConnection = require('../config/db.config');
const { dataStatusValue, pageConfig, user_type } = require('../config/const.config');

const tableName = 'user_tokens';

const create = async (data) => {
  const query = `INSERT INTO ${tableName} 
            (user_id, token, status, expired_at, created_at, modified_at, modified_by) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const params = [
    data.user_id,
    data.token,
    data.status,
    data.expired_at,
    data.created_at,
    data.modified_at,
    data.modified_by,
  ];

  const qData = await dbConnection.query(query, params);
  return qData.insertId || null;
};



const viewById = async (user_id, token) => {
  const query = `SELECT 
                id
                FROM ${tableName} u
                WHERE u.user_id = ? AND u.token = ? AND u.status != ?`;
  const params = [user_id, token, dataStatusValue.DELETED];

  const qData = await dbConnection.query(query, params);
  return qData[0] || null;
};

const deleteByUserId = async (user_id, data) => {
  const query = `UPDATE ${tableName} SET status = ?, modified_at = ?, modified_by = ? WHERE user_id = ?`;
  const params = [dataStatusValue.DELETED, data.modified_at, data.modified_by, user_id];

  const qData = await dbConnection.query(query, params);
  return qData.affectedRows || null;
};

module.exports = {
  create,
  viewById,
  deleteByUserId,
};