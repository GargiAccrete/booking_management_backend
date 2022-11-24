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


module.exports = {
  create,
  viewById,
  deleteByUserId,
};