const dbConnection = require('../config/db.config');
const { dataStatusValue, pageConfig, user_type, statusCodes } = require('../config/const.config');

const tableName = 'brand_master';

const fetchAll = async (data) => {
    const query = `SELECT id, name, status, created_at, created_by FROM ${tableName} 
    WHERE status != ?`
    const qData = {
      data: [],
      totalRows: '',
    };
    const params = [dataStatusValue.DELETED,dataStatusValue.DELETED,dataStatusValue.DELETED];
    const resultData = await dbConnection.query(query, params);
    qData['data'] = resultData || [];
    return qData;
  };

  const create = async (data) => {
    try {
      const query = `INSERT INTO ${tableName} 
              ( name,
                status,
                created_at,
                created_by) 
               VALUES ( ?,?,?,?)`;
      const params = [
        data.name,
        data.status,
        data.created_at,
        data.created_by
      ];
      
      const qData = await dbConnection.query(query, params);
      return qData.insertId || null;
    } catch (error) {
      console.log(error);
    }
  };

  module.exports = {
    fetchAll,
    create
  };