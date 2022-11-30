const dbConnection = require('../config/db.config');
const { dataStatusValue, pageConfig, user_type, statusCodes } = require('../config/const.config');

const tableName = 'admin_user';

const fetchAllMapStatedata = async (data) => {
  const query = `SELECT  id, name FROM states WHERE status!= ?`
  const qData = {
    data: [],
    totalRows: '',
  };
  const params = [dataStatusValue.DELETED];
  const resultData = await dbConnection.query(query,params);
  qData['data'] = resultData || [];
  return qData;
};

const fetchAllMapCitydata = async (state_id,data) => {
  const query = `SELECT id, city, state_id FROM cities WHERE state_id=? AND status!= ?`
  const qData = {
    data: [],
    totalRows: '',
  };
  
  const params = [state_id,dataStatusValue.DELETED];
  const resultData = await dbConnection.query(query,params);
  qData['data'] = resultData || [];
  return qData;
};


const fetchAlladminUser = async (data) => {
  const query = `SELECT id, name, email, password, designation, is_super_admin, status, created_at, created_by, modified_at, modified_by FROM ${tableName} 
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
              email,
              password,
              designation,
              is_super_admin,
              status,
              created_at,
              created_by) 
             VALUES ( ?,?,?,?,?,?,?,?)`;
    const params = [
      data.name,
      data.email,
      data.password,
      data.designation,
      data.is_super_admin,
      data.status,
      data.created_at,
      data.created_by,
      // data.modified_at,
      // data.modified_by
    ];
    
    const qData = await dbConnection.query(query, params);
    return qData.insertId || null;
  } catch (error) {
    console.log(error);
  }
};

const viewById = async (id) =>{

    const query = `SELECT id, name, email, password, designation, is_super_admin, status, created_at, created_by, modified_at, modified_by FROM ${tableName} WHERE id = ? AND status != ?`;
    const params = [id, dataStatusValue.DELETED]
    console.log(query,params);
    const qData = await dbConnection.query(query, params);
    return qData[0] || null;
}

const update = async (id, data) => {
    const query = `UPDATE ${tableName} SET 
    name = ?,
    email = ?,
    designation = ?,
    is_super_admin = ?, 
    modified_at = ?,
    modified_by = ?         
    WHERE id = ? AND status != ?`;
    const params = [
      data.name,
      data.email,
      data.designation,
      data.is_super_admin,
      data.modified_at,
      data.modified_by,
      id,
      dataStatusValue.DELETED
    ];

    const qData = await dbConnection.query(query, params);
    return qData.affectedRows || null;
};

const deleteById = async (id, data) => {
  const query = `UPDATE ${tableName} SET status = ?, modified_at = ?, modified_by = ? WHERE id = ?`;
  const params = [dataStatusValue.DELETED, data.modified_at, data.modified_by, id];
  const qData = await dbConnection.query(query, params);
  return qData.affectedRows || null;
};

const checkUserbyEmail = async (email) => {
  const query = `SELECT 
                  id,Name AS name, Email AS email, password
                FROM ${tableName} 
                WHERE email = ? AND status != ?`;
  const params = [email, dataStatusValue.DELETED];
  const qData = await dbConnection.query(query, params);
  return qData || [];
};

module.exports = {
  fetchAllMapStatedata,
  fetchAllMapCitydata,
  checkUserbyEmail,
  fetchAlladminUser,
  create,
  viewById,
  update,
  deleteById
};